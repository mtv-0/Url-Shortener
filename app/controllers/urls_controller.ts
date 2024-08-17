import { inject } from '@adonisjs/core'
import IUrlService from '#services/url_service'
import { HttpContext } from '@adonisjs/core/http'
//import IUrlService from '#contracts/IUrlService'

@inject()
export default class UrlsController {
  private _urlService: IUrlService

  constructor(urlService: IUrlService) {
    this._urlService = urlService
  }

  public shortenUrl(ctx: HttpContext) {
    return this._urlService.saveUrl({ url: ctx.request.body().url })
  }

  public async redirectToOriginalUrl({ params }: HttpContext) {
    const url = await this._urlService.redirect(params.url)
    return url
  }

  public async get({ auth }: HttpContext) {
    return await this._urlService.index(auth.getUserOrFail().id)
  }

  public async update({ request, params }: HttpContext) {
    return await this._urlService.update(params.id, request.body().targetUrl)
  }

  public async delete({ params }: HttpContext) {
    await this._urlService.delete(params.id)
    return 'Url deletada com sucesso'
  }
}
