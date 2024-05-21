/*
  Warnings:

  - You are about to drop the column `average_score` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `banner_image` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `cover_image` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `next_airing_episode` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `trailer_id` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `trailer_site` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `trailer_thumbnail` on the `animes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "animes" DROP COLUMN "average_score",
DROP COLUMN "banner_image",
DROP COLUMN "cover_image",
DROP COLUMN "end_date",
DROP COLUMN "next_airing_episode",
DROP COLUMN "start_date",
DROP COLUMN "trailer_id",
DROP COLUMN "trailer_site",
DROP COLUMN "trailer_thumbnail",
ADD COLUMN     "averageScore" INTEGER,
ADD COLUMN     "bannerImage" TEXT,
ADD COLUMN     "coverImage" JSONB,
ADD COLUMN     "endDate" JSONB,
ADD COLUMN     "nextAiringEpisode" JSONB,
ADD COLUMN     "startDate" JSONB,
ADD COLUMN     "trailer" JSONB;
