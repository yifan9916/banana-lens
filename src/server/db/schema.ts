import { sql } from 'drizzle-orm';
import {
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

const createTable = pgTableCreator((name) => `bananalens_${name}`);

export const photosTable = createTable('photos', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  views: integer('views').notNull(),
  likes: integer('likes').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
});

export type InsertPhoto = typeof photosTable.$inferInsert;
export type SelectPhoto = typeof photosTable.$inferSelect;
