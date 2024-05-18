/*
  Warnings:

  - Made the column `favorite` on table `user_anime_list` required. This step will fail if there are existing NULL values in that column.
  - Made the column `start_date` on table `user_anime_list` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user_anime_list" ALTER COLUMN "score" SET DEFAULT 0,
ALTER COLUMN "progress" SET DEFAULT 0,
ALTER COLUMN "rewatches" SET DEFAULT 0,
ALTER COLUMN "favorite" SET NOT NULL,
ALTER COLUMN "favorite" SET DEFAULT false,
ALTER COLUMN "start_date" SET NOT NULL;
