/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    await knex.schema.createTable("cart_item", (table) => {
        table.uuid("id").defaultTo(knex.fn.uuid())
        table
            .uuid("cart_id")
            .notNullable()
            .references("id")
            .inTable("carts")
            .onDelete("CASCADE")
        table
            .uuid("ticket_id")
            .notNullable()
            .references("id")
            .inTable("tickets")
            .onDelete("CASCADE")
        table.integer("quantity").notNullable()
        table.timestamps(true, true)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    await knex.schema.dropTable("cart_item")
}
