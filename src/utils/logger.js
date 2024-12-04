import { Logtail } from "@logtail/node";
import { LogtailTransport } from "@logtail/winston";
import { createLogger, format } from "winston";
import { config } from "dotenv";


config()


const logtail = new Logtail(process.env.LOGGER_TOKEN)

export const logger = createLogger({
  level: "silly",
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.colorize({all: true})
  ),
  transports: [
    new LogtailTransport(logtail)
  ]
})