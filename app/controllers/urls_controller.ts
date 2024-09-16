import { inject } from '@adonisjs/core'
import IUrlService from '#services/url_service'
import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { deleteUrlValidator, updateUrlValidator, createUrlValidator } from '#validators/url'

@inject()
export default class UrlsController {
  private _urlService: IUrlService

  constructor(urlService: IUrlService) {
    this._urlService = urlService
  }

  /**
   * @shortenUrl
   * @requestBody {"url": "https://youtube.com"}
   */
  public async shortenUrl(ctx: HttpContext) {
    await ctx.request.validateUsing(createUrlValidator)
    await ctx.auth.authenticate().catch(() => {})

    let user: User | undefined

    if (ctx.auth.isAuthenticated) {
      user = await ctx.auth.user
    }

    const data = await this._urlService.saveUrl({ url: ctx.request.body().url }, user)

    ctx.logger.info(
      {
        ip: ctx.request.ip(),
        userAgent: ctx.request.header('User-Agent'),
        status: ctx.response.response.statusCode,
        url: ctx.request.body().url,
        generated_url: data.shortned_url_code,
      },
      'Generated URL'
    )

    return data
  }

  public async redirectToOriginalUrl({ response, params, auth }: HttpContext) {
    //await auth.authenticate()

    let user: User | undefined

    if (auth.isAuthenticated) user = await auth.user

    const url = await this._urlService.redirect(params.url, user)
    return response.redirect(url)
  }

  public async get({ auth }: HttpContext) {
    return await this._urlService.index(auth.getUserOrFail().id)
  }

  /**
   * @update
   * @paramPath id - ID da URL a ser editada - @type(number) @required
   * @requestBody {"targetUrl": "https://google.com"}
   */
  public async update({ request, params, auth }: HttpContext) {
    await auth.authenticate()
    await this._urlService.verifyOwnership(params.id, auth.user!.id)

    await request.validateUsing(updateUrlValidator)

    return await this._urlService.update(params.id, request.body().targetUrl)
  }

  /**
   * @delete
   * @paramPath id - ID da URL a ser excluida - @type(number) @required
   */
  public async delete(ctx: HttpContext) {
    await ctx.auth.authenticate()
    await this._urlService.verifyOwnership(ctx.params.id, ctx.auth.user!.id)

    await ctx.request.validateUsing(deleteUrlValidator)
    await this._urlService.delete(ctx.params.id)

    ctx.logger.warn(
      {
        ip: ctx.request.ip(),
        userAgent: ctx.request.header('User-Agent'),
        status: ctx.response.response.statusCode,
        url_id: ctx.params.id,
        user_id: ctx.auth.user!.id,
      },
      'Deleted URL'
    )

    return { message: 'Url deletada com sucesso' }
  }
}
