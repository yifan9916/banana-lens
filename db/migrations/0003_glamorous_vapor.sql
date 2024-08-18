DROP INDEX IF EXISTS "collectionKeyIndex";--> statement-breakpoint
DROP INDEX IF EXISTS "photoKeyIndex";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "collection_key_index" ON "bananalens_collections" USING btree ("key");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "photo_key_index" ON "bananalens_photos" USING btree ("key");