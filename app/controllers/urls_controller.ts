import { inject } from '@adonisjs/core'
import IUrlService from '#services/url_service'
import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { deleteUrlValidator, updateUrlValidator, createUrlValidator } from '#validators/url'
//import IUrlService from '#contracts/IUrlService'

@inject()
export default class UrlsController {
  private _urlService: IUrlService

  constructor(urlService: IUrlService) {
    this._urlService = urlService
  }

  public async shortenUrl(ctx: HttpContext) {
    await ctx.request.validateUsing(createUrlValidator)
    await ctx.auth.authenticate()

    let user: User | undefined

    if (ctx.auth.isAuthenticated) {
      user = await ctx.auth.user
    }

    return { url: await this._urlService.saveUrl({ url: ctx.request.body().url }, user) }
  }

  public async redirectToOriginalUrl({ params }: HttpContext) {
    const url = await this._urlService.redirect(params.url)
    return url
  }

  public async get({ request, auth }: HttpContext) {
    console.log(request)
    return await this._urlService.index(auth.getUserOrFail().id)
  }

  public async update({ request, params }: HttpContext) {
    await request.validateUsing(updateUrlValidator)

    return await this._urlService.update(params.id, request.body().targetUrl)
  }

  public async delete({ request, params }: HttpContext) {
    await request.validateUsing(deleteUrlValidator)
    await this._urlService.delete(params.id)
    return { message: 'Url deletada com sucesso' }
  }
}
