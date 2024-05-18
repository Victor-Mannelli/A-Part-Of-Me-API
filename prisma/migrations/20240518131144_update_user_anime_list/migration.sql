/*
  Warnings:

  - The `start_date` column on the `user_anime_list` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `finish_date` column on the `user_anime_list` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `status` on table `user_anime_list` required. This step will fail if there are existing NULL values in that column.
  - Made the column `score` on table `user_anime_list` required. This step will fail if there are existing NULL values in that column.
  - Made the column `progress` on table `user_anime_list` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rewatches` on table `user_anime_list` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user_anime_list" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "score" SET NOT NULL,
ALTER COLUMN "progress" SET NOT NULL,
ALTER COLUMN "rewatches" SET NOT NULL,
DROP COLUMN "start_date",
ADD COLUMN     "start_date" TIMESTAMP(3),
DROP COLUMN "finish_date",
ADD COLUMN     "finish_date" TIMESTAMP(3);
