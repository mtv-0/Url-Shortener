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
    await ctx.auth.authenticate()

    let user: User | undefined

    if (ctx.auth.isAuthenticated) {
      user = await ctx.auth.user
    }

    return { url: await this._urlService.saveUrl({ url: ctx.request.body().url }, user) }
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
  public async delete({ request, params, auth }: HttpContext) {
    await auth.authenticate()
    await this._urlService.verifyOwnership(params.id, auth.user!.id)

    await request.validateUsing(deleteUrlValidator)
    await this._urlService.delete(params.id)
    return { message: 'Url deletada com sucesso' }
  }
}
