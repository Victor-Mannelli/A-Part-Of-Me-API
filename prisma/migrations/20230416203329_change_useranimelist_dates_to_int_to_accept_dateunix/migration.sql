/*
  Warnings:

  - The `start_date` column on the `user_anime_list` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `finish_date` column on the `user_anime_list` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "user_anime_list" DROP COLUMN "start_date",
ADD COLUMN     "start_date" INTEGER,
DROP COLUMN "finish_date",
ADD COLUMN     "finish_date" INTEGER;
