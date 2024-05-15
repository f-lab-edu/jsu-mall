ALTER TABLE "product" DROP CONSTRAINT "product_color_id_color_id_fk";
--> statement-breakpoint
ALTER TABLE "product" DROP CONSTRAINT "product_size_id_size_id_fk";
--> statement-breakpoint
ALTER TABLE "product" DROP COLUMN IF EXISTS "color_id";--> statement-breakpoint
ALTER TABLE "product" DROP COLUMN IF EXISTS "size_id";