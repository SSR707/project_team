/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    await knex.schema.createTable("carts", (table) => {
        table.uuid("id").defaultTo(knex.raw("gen_random_uuid()")).primary()
        table.uuid("user_id").notNullable().references("id").inTable("users")
        table.integer("total").notNullable()
        table.timestamps(true, true)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    await knex.schema.dropTable("cart")
}
