/*
  Warnings:

  - Changed the type of `start_date` on the `UserAnimeList` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `finish_date` on the `UserAnimeList` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "UserAnimeList" DROP COLUMN "start_date",
ADD COLUMN     "start_date" INTEGER NOT NULL,
DROP COLUMN "finish_date",
ADD COLUMN     "finish_date" INTEGER NOT NULL;
