ALTER TABLE "product_delivery" ADD COLUMN "duration_days" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "product_delivery" DROP COLUMN IF EXISTS "release_date";