const tableName = "users"

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.uuid("id").defaultTo(knex.raw("gen_random_uuid()")).primary()
        table.string("firstname").notNullable()
        table.string("lastname").notNullable()
        table.string("email").notNullable().unique()
        table.string("password")
        table.string("phone").notNullable().defaultTo("")
        table.string("google_id").defaultTo("")
        table.date("birth_date")
        table
            .enum("role", ["user", "admin", "superAdmin"])
            .notNullable()
            .defaultTo("user")
        table.boolean("is_active").defaultTo(false)
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
