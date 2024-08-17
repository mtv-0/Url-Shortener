import Url from '#models/url'
import env from '#start/env'
import { generateShortUrl } from '../utils/generateShortUrl.js'

interface UrlInterface {
  url: string
}

export default class UrlService {
  async redirect(shortnedUrl: string) {
    const url = await Url.findByOrFail('shortned_url', shortnedUrl)
    return url.original_url
  }

  async saveUrl(data: UrlInterface): Promise<string> {
    const newUrl = `${env.get('HOST')}/${generateShortUrl()}`

    await Url.create({ original_url: data.url, shortned_url: newUrl })

    return newUrl
  }
  async delete(urlId: number): Promise<Url> {
    const url = await Url.findOrFail(urlId)

    await url
      .merge({
        deleted_at: new Date(),
      })
      .save()

    return url
  }
  async update(urlId: number, targetUrl: string): Promise<Url> {
    const url = await Url.findOrFail(urlId)

    await url
      .merge({
        original_url: targetUrl,
      })
      .save()

    return url
  }
  async index(userId: number): Promise<Url[]> {
    const urls = await Url.query().where({ user_id: userId, deleted_at: null })
    return urls
  }
}
