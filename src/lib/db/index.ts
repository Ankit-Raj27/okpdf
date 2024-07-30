import {neon,neonConfig} from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/better-sqlite3"
neonConfig.fetchConnectionCache = true

if(!process.env.DATABSE_URL)
    throw new Error("database url not found")

const sql = neon(process.env.DATABSE_URL)

export const db = drizzle(sql)

