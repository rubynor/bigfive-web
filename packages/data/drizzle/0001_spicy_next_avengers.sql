ALTER TABLE "results" ADD COLUMN "demographics" jsonb;--> statement-breakpoint
ALTER TABLE "results" ADD COLUMN "series_token" text;--> statement-breakpoint
CREATE INDEX "results_series_token_idx" ON "results" USING btree ("series_token");