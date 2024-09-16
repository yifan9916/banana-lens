DO $$ BEGIN
 CREATE TYPE "public"."media_resolution" AS ENUM('low', 'high');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."photo_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bananalens_files" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"resolution" "media_resolution" DEFAULT 'low' NOT NULL,
	"photoId" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bananalens_files" ADD CONSTRAINT "bananalens_files_photoId_bananalens_photos_id_fk" FOREIGN KEY ("photoId") REFERENCES "public"."bananalens_photos"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "bananalens_collections" DROP COLUMN IF EXISTS "status";