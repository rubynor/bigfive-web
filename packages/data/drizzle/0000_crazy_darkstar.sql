CREATE TABLE "feedback" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "results" (
	"id" text PRIMARY KEY NOT NULL,
	"lang" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"answers" jsonb NOT NULL
);
