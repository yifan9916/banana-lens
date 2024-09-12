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

const PhotoStatus = pgEnum('photo_status', ['draft', 'published']);
const CollectionStatus = pgEnum('photo_status', ['draft', 'published']);

const createTable = pgTableCreator((name) => `bananalens_${name}`);

export const collectionsTable = createTable(
  'collections',
  {
    id: serial('id').primaryKey(),
    key: text('key').unique().notNull(),

    status: CollectionStatus('status').notNull().default('draft'),

    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (table) => {
    return {
      collectionKeyIndex: uniqueIndex('collection_key_index').on(table.key),
    };
  }
);

export const photosTable = createTable(
  'photos',
  {
    id: serial('id').primaryKey(),
    key: text('key').unique().notNull(),

    status: PhotoStatus('status').notNull().default('draft'),
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
      photoKeyIndex: uniqueIndex('photo_key_index').on(table.key),
    };
  }
);

// TODO change text to int for aperture, focal, iso
export const cameraMetadataTable = createTable('camera_metadata', {
  id: serial('id').primaryKey(),

  camera: text('camera').notNull(),
  aperture: text('aperture').notNull(),
  focalLength: text('focal_length').notNull(),
  iso: text('iso').notNull(),
  shutterSpeed: text('shutter_speed').notNull(),

  photoId: integer('photo_id')
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
      references: [cameraMetadataTable.photoId],
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
        fields: [cameraMetadataTable.photoId],
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
