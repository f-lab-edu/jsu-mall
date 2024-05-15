ALTER TABLE "product" ADD COLUMN "color_id" integer;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "size_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_color_id_color_id_fk" FOREIGN KEY ("color_id") REFERENCES "public"."color"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_size_id_size_id_fk" FOREIGN KEY ("size_id") REFERENCES "public"."size"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
