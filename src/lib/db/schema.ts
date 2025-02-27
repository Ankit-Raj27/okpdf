import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const userSystemEnum = pgEnum('userSystemEnum',['system','user'])   //who is messaging at the moment, system or user

// chats history row schema
export const chats = pgTable("chats",{
    id:serial('id').primaryKey(),
    pdnName: text("pdfName").notNull(),
    pdfUrl : text("pdfUrl").notNull(),
    createdAt : timestamp("createdAt").notNull().defaultNow(),
    userId : varchar("userId",{length:256}).notNull(),
    fileKey : text("fileKey").notNull()
})
// message block schema
export const messages = pgTable("messages",{
    id:serial("id").primaryKey(),
    chatId : integer("chatId").references(()=>chats.id).notNull(),
    content : text("content").notNull(),
    createdAt : timestamp("createdAt").notNull().defaultNow(),
    role : userSystemEnum("role").notNull()
})