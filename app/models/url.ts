import { DateTime } from 'luxon'
import { BaseModel, column, computed, hasMany } from '@adonisjs/lucid/orm'
import env from '#start/env'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import UrlClick from './url_click.js'

export default class Url extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  // @example(https://youtube.com)
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

  @hasMany(() => UrlClick, { foreignKey: 'url_id' })
  declare clicks: HasMany<typeof UrlClick>

  @computed()
  get shortned_url() {
    return `https://${env.get('HOST')}/${this.shortned_url_code}`
  }

  serializeExtras = true
}
