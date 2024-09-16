DO $$ BEGIN
 CREATE TYPE "public"."collection_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "bananalens_collections" ADD COLUMN "status" "collection_status" DEFAULT 'draft' NOT NULL;