/*
  Warnings:

  - You are about to drop the column `averageScore` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `bannerImage` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `chapters` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `coverImage` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `episodes` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `favourites` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `format` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `genres` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `isAdult` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `popularity` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `season` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `synonyms` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the column `volumes` on the `animes` table. All the data in the column will be lost.
  - You are about to drop the `airing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `enddate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `startdate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trailer` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AnimeStatus" AS ENUM ('watching', 'dropped', 'finished', 'rewatching');

-- DropForeignKey
ALTER TABLE "airing" DROP CONSTRAINT "airing_anime_id_fkey";

-- DropForeignKey
ALTER TABLE "enddate" DROP CONSTRAINT "enddate_anime_id_fkey";

-- DropForeignKey
ALTER TABLE "startdate" DROP CONSTRAINT "startdate_anime_id_fkey";

-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_anime_id_fkey";

-- DropForeignKey
ALTER TABLE "trailer" DROP CONSTRAINT "trailer_anime_id_fkey";

-- AlterTable
ALTER TABLE "animes" DROP COLUMN "averageScore",
DROP COLUMN "bannerImage",
DROP COLUMN "chapters",
DROP COLUMN "coverImage",
DROP COLUMN "description",
DROP COLUMN "duration",
DROP COLUMN "episodes",
DROP COLUMN "favourites",
DROP COLUMN "format",
DROP COLUMN "genres",
DROP COLUMN "isAdult",
DROP COLUMN "popularity",
DROP COLUMN "season",
DROP COLUMN "source",
DROP COLUMN "status",
DROP COLUMN "synonyms",
DROP COLUMN "title",
DROP COLUMN "type",
DROP COLUMN "updatedAt",
DROP COLUMN "volumes";

-- DropTable
DROP TABLE "airing";

-- DropTable
DROP TABLE "enddate";

-- DropTable
DROP TABLE "startdate";

-- DropTable
DROP TABLE "tags";

-- DropTable
DROP TABLE "trailer";

-- CreateTable
CREATE TABLE "UserAnimeList" (
    "animeList" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "anime_id" INTEGER NOT NULL,
    "status" "AnimeStatus" NOT NULL,
    "score" INTEGER NOT NULL,
    "progress" INTEGER NOT NULL,
    "rewatches" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "finish_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAnimeList_pkey" PRIMARY KEY ("animeList")
);

-- AddForeignKey
ALTER TABLE "UserAnimeList" ADD CONSTRAINT "UserAnimeList_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnimeList" ADD CONSTRAINT "UserAnimeList_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "animes"("anime_id") ON DELETE CASCADE ON UPDATE CASCADE;
