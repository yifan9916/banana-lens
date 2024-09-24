ALTER TABLE "bananalens_files" RENAME COLUMN "photoId" TO "photo_id";--> statement-breakpoint
ALTER TABLE "bananalens_files" DROP CONSTRAINT "bananalens_files_photoId_bananalens_photos_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bananalens_files" ADD CONSTRAINT "bananalens_files_photo_id_bananalens_photos_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."bananalens_photos"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
