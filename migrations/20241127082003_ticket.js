const tableName = "tickets"

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.uuid("id").defaultTo(knex.fn.uuid()).primary()
        table.enum("type", ["VIP", "Standard", "Economy"]).notNullable()
        table.decimal("price", 14, 2).notNullable()
        table.string("currency", 3).notNullable()
        table.string("seat_number").notNullable()
        table.enum("status", ["available", "sold", "reserved"]).notNullable()
        table.uuid("event_id").notNullable()
        table.timestamps(true, true)
        table
            .foreign("event_id")
            .references("id")
            .inTable("events")
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
