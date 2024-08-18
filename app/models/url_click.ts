import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class UrlClick extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number | null | undefined

  @column()
  declare location: string | null

  @column()
  declare url_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}
