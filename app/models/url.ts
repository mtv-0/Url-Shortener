import { DateTime } from 'luxon'
import { BaseModel, column, computed } from '@adonisjs/lucid/orm'
import env from '#start/env'

export default class Url extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare original_url: string

  @column()
  declare shortned_url_code: string

  @column()
  declare user_id: number | null | undefined

  @column()
  declare deleted_at: Date | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @computed()
  get shortned_url() {
    return `https://${env.get('HOST')}/${this.shortned_url_code}`
  }
}
