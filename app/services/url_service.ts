import Url from '#models/url'
import UrlClick from '#models/url_click'
import User from '#models/user'
import { uniqueShortUrl } from '../utils/generateShortUrl.js'

interface UrlInterface {
  url: string
}

export default class UrlService {
  private async findUrlRow(shortnedUrl: string): Promise<Url> {
    return await Url.findByOrFail('shortned_url_code', shortnedUrl)
  }

  private saveUrlView(urlId: number, user?: User) {
    UrlClick.create({
      url_id: urlId,
      user_id: user?.id,
    })
  }

  async redirect(shortnedUrl: string, user?: User) {
    const url = await this.findUrlRow(shortnedUrl)
    this.saveUrlView(url.id, user)
    return url.original_url
  }

  async saveUrl(data: UrlInterface, user?: User): Promise<Url> {
    return await Url.create({
      original_url: data.url,
      shortned_url_code: await uniqueShortUrl(),
      user_id: user?.id,
    })
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
    const url = await Url.query().where({ id: urlId, deleted_at: null }).firstOrFail()

    await url
      .merge({
        original_url: targetUrl,
      })
      .save()

    return url
  }
  async index(userId: number): Promise<Url[]> {
    const urls = await Url.query().where({ user_id: userId, deleted_at: null }).withCount('clicks')

    return urls
  }
}
