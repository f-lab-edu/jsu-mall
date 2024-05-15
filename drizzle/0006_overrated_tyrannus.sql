CREATE TABLE IF NOT EXISTS "Color" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Size" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "color" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"hex_code" varchar NOT NULL,
	CONSTRAINT "color_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "size" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "size_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "color_id" integer;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "size_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_color_id_Color_id_fk" FOREIGN KEY ("color_id") REFERENCES "public"."Color"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_size_id_Size_id_fk" FOREIGN KEY ("size_id") REFERENCES "public"."Size"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
