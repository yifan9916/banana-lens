DO $$ BEGIN
 CREATE TYPE "public"."camera" AS ENUM('SonyA7M4', 'iPhone15ProMax');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bananalens_camera_metadata" (
	"id" serial PRIMARY KEY NOT NULL,
	"camera" "camera" NOT NULL,
	"aperture" text NOT NULL,
	"focalLength" text NOT NULL,
	"iso" text NOT NULL,
	"shutterSpeed" text NOT NULL,
	"photoId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bananalens_collections" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "bananalens_collections_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bananalens_photos" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"views" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "bananalens_photos_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bananalens_photos_to_collections" (
	"photo_id" integer NOT NULL,
	"collection_id" integer NOT NULL,
	CONSTRAINT "bananalens_photos_to_collections_photo_id_collection_id_pk" PRIMARY KEY("photo_id","collection_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bananalens_camera_metadata" ADD CONSTRAINT "bananalens_camera_metadata_photoId_bananalens_photos_id_fk" FOREIGN KEY ("photoId") REFERENCES "public"."bananalens_photos"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bananalens_photos_to_collections" ADD CONSTRAINT "bananalens_photos_to_collections_photo_id_bananalens_photos_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."bananalens_photos"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bananalens_photos_to_collections" ADD CONSTRAINT "bananalens_photos_to_collections_collection_id_bananalens_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."bananalens_collections"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
