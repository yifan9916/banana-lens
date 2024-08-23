DO $$ BEGIN
 CREATE TYPE "public"."photo_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "bananalens_photos" ADD COLUMN "status" "photo_status" DEFAULT 'draft' NOT NULL;