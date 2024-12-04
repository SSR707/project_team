const tableName = "events"

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.uuid("id").defaultTo(knex.fn.uuid()).primary()
        table.string("name").notNullable()
        table.text("description").notNullable()
        table.string("location").notNullable()
        table.date("date").notNullable()
        table.time("time").notNullable()
        table.integer("total_tickets").notNullable()
        table.integer("available_tickets").notNullable()
        table.uuid("category_id").notNullable()
        table.timestamps(true, true)
        table
            .foreign("category_id")
            .references("id")
            .inTable("categorys")
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
