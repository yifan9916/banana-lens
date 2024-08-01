import { relations, sql } from 'drizzle-orm';
import {
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const Camera = pgEnum('camera', ['SonyA7M4', 'iPhone15ProMax']);

const createTable = pgTableCreator((name) => `bananalens_${name}`);

export const collectionsTable = createTable(
  'collections',
  {
    id: serial('id').primaryKey(),
    key: text('key').unique().notNull(),

    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (table) => {
    return {
      collectionKeyIndex: uniqueIndex('collectionKeyIndex').on(table.key),
    };
  }
);

export const photosTable = createTable(
  'photos',
  {
    id: serial('id').primaryKey(),
    key: text('key').unique().notNull(),

    views: integer('views').notNull().default(0),

    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (table) => {
    return {
      photoKeyIndex: uniqueIndex('photoKeyIndex').on(table.key),
    };
  }
);

export const cameraMetadataTable = createTable('camera_metadata', {
  id: serial('id').primaryKey(),

  camera: Camera('camera').notNull(),
  aperture: text('aperture').notNull(),
  focalLength: text('focalLength').notNull(),
  iso: text('iso').notNull(),
  shutterSpeed: text('shutterSpeed').notNull(),

  photoId: integer('photoId')
    .references(() => photosTable.id)
    .notNull(),
});

export const photosToCollectionsTable = createTable(
  'photos_to_collections',
  {
    photoId: integer('photo_id')
      .references(() => photosTable.id)
      .notNull(),
    collectionId: integer('collection_id')
      .references(() => collectionsTable.id)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.photoId, table.collectionId] }),
    };
  }
);

// DRIZZLE RELATIONS
export const photosTableRelations = relations(photosTable, ({ one, many }) => {
  return {
    cameraMetadata: one(cameraMetadataTable, {
      fields: [photosTable.id],
      references: [cameraMetadataTable.id],
    }),
    photosToCollections: many(photosToCollectionsTable),
  };
});

export const collectionsTableRelations = relations(
  collectionsTable,
  ({ many }) => {
    return {
      photosToCollections: many(photosToCollectionsTable),
    };
  }
);

export const cameraMetadataTableRelations = relations(
  cameraMetadataTable,
  ({ one }) => {
    return {
      photo: one(photosTable, {
        fields: [cameraMetadataTable.id],
        references: [photosTable.id],
      }),
    };
  }
);

export const photosToCollectionsRelations = relations(
  photosToCollectionsTable,
  ({ one }) => {
    return {
      collection: one(collectionsTable, {
        fields: [photosToCollectionsTable.collectionId],
        references: [collectionsTable.id],
      }),
      photo: one(photosTable, {
        fields: [photosToCollectionsTable.photoId],
        references: [photosTable.id],
      }),
    };
  }
);

export type InsertPhoto = typeof photosTable.$inferInsert;
export type SelectPhoto = typeof photosTable.$inferSelect;
export type InsertCameraMetadata = typeof cameraMetadataTable.$inferInsert;
export type SelectCameraMetadata = typeof cameraMetadataTable.$inferSelect;
export type InsertCollection = typeof collectionsTable.$inferInsert;
export type SelectCollection = typeof collectionsTable.$inferSelect;
