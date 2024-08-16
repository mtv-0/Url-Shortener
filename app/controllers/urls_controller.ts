import { inject } from '@adonisjs/core'
import IUrlService from '#services/url_service'
//import IUrlService from '#contracts/IUrlService'

@inject()
export default class UrlsController {
  private _urlService: IUrlService

  constructor(urlService: IUrlService) {
    this._urlService = urlService
  }

  shortenUrl() {
    return this._urlService.saveUrl()
  }
  redirectToOriginalUrl() {}
  get() {}
  update() {}
  delete() {}
}
