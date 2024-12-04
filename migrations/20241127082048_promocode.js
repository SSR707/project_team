const tableName = "promocode"

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.uuid("id").defaultTo(knex.fn.uuid()).primary()
        table.string("promocode").notNullable()
        table.decimal("discount", 14, 2).notNullable()
        table.boolean("status").notNullable()
        table.uuid("ticket_id").notNullable()
        table.uuid("user_id").notNullable()
        table.timestamps(true, true)
        table
            .foreign("ticket_id")
            .references("id")
            .inTable("tickets")
            .onDelete("CASCADE")

        table
            .foreign("user_id")
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable(tableName)
}
