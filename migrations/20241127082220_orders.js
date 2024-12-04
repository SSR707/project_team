const tableName = "order"
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.uuid("id").defaultTo(knex.fn.uuid()).primary()
        table.uuid("user_id").notNullable()
        table.uuid("ticket_id").notNullable()
        table.integer("total_amount").notNullable()
        table.enum("status", [true, false]).notNullable()
        table.timestamps(true, true)
        table
            .foreign("user_id")
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
        table
            .foreign("ticket_id")
            .references("id")
            .inTable("tickets")
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
