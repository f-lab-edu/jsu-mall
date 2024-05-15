CREATE TABLE IF NOT EXISTS "product_color" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"color_id" integer NOT NULL,
	CONSTRAINT "product_color_unique" UNIQUE("product_id","color_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_size" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"size_id" integer NOT NULL,
	CONSTRAINT "product_size_unique" UNIQUE("product_id","size_id")
);
--> statement-breakpoint
ALTER TABLE "product" DROP CONSTRAINT "product_color_id_color_id_fk";
--> statement-breakpoint
ALTER TABLE "product" DROP CONSTRAINT "product_size_id_size_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_color" ADD CONSTRAINT "product_color_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_color" ADD CONSTRAINT "product_color_color_id_color_id_fk" FOREIGN KEY ("color_id") REFERENCES "public"."color"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_size" ADD CONSTRAINT "product_size_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_size" ADD CONSTRAINT "product_size_size_id_size_id_fk" FOREIGN KEY ("size_id") REFERENCES "public"."size"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "product" DROP COLUMN IF EXISTS "color_id";--> statement-breakpoint
ALTER TABLE "product" DROP COLUMN IF EXISTS "size_id";