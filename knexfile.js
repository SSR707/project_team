// Update with your config settings.
import { config } from "dotenv"
config()
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
    development: {
        client: "pg",
        connection: {
            host: "127.0.0.1",
            port: process.env.PG_PORT,
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DATABASE,
        },
        migrations: {
            tableName: "knex_migrations",
            directory: "./migrations",
        },
    },

    staging: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },

    production: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
}
