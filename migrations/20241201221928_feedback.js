const tableName = "feedback"

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.uuid("id").defaultTo(knex.raw("gen_random_uuid()")).primary()
        table
            .uuid("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
        table
            .uuid("event_id")
            .notNullable()
            .references("id")
            .inTable("events")
            .onDelete("CASCADE")
        
        table.string("type").notNullable()
        table.text("message").notNullable()
        table.string("status").notNullable()
        table.timestamps(true, true)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTableIfExists(tableName)
}
