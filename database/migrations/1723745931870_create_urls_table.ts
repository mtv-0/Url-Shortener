import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'urls'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('original_url').notNullable()
      table.string('shortned_url ').notNullable().unique()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at')

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
