const tableName = "payment"
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.uuid("id").defaultTo(knex.fn.uuid()).primary()
        table.uuid("order_id").notNullable()
        table.integer("amount").notNullable()
        table
            .enum("method", ["credit_card", "paypal", "cash"])
            .defaultTo("credit_card")
        table.enum("status", [true, false]).notNullable()
        table.timestamps(true, true)
        table
            .foreign("order_id")
            .references("id")
            .inTable("order")
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
