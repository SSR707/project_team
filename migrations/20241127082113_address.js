/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    await knex.schema.createTable("address", (table) => {
        table.uuid("id").defaultTo(knex.raw("gen_random_uuid()")).primary()
        table.uuid("user_id").notNullable().references("id").inTable("users")
        table.string("title").notNullable()
        table.string("address_line_1").notNullable()
        table.string("address_line_2").notNullable()
        table.string("country").notNullable()
        table.string("city").notNullable()
        table.string("postal_code").notNullable()
        table.string("phone_number").notNullable()
        table.timestamps(true, true)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    await knex.schema.dropTable("address")
}
