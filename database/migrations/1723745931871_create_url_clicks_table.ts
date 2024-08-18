import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'url_clicks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('location').nullable().defaultTo(null)
      table.timestamp('created_at')

      table
        .integer('url_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('urls')
        .onDelete('CASCADE')

      table
        .integer('user_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
