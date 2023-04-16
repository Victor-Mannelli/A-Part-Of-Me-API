/*
  Warnings:

  - The primary key for the `user_anime_list` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `animeList` on the `user_anime_list` table. All the data in the column will be lost.
  - The `start_date` column on the `user_anime_list` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `finish_date` column on the `user_anime_list` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "user_anime_list" DROP CONSTRAINT "user_anime_list_anime_id_fkey";

-- DropForeignKey
ALTER TABLE "user_anime_list" DROP CONSTRAINT "user_anime_list_user_id_fkey";

-- DropIndex
DROP INDEX "user_anime_list_anime_id_key";

-- DropIndex
DROP INDEX "user_anime_list_user_id_key";

-- AlterTable
ALTER TABLE "animes" ADD COLUMN     "average_score" INTEGER,
ADD COLUMN     "banner_image" TEXT,
ADD COLUMN     "chapters" INTEGER,
ADD COLUMN     "cover_image" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "end_date" INTEGER,
ADD COLUMN     "episodes" INTEGER,
ADD COLUMN     "genres" JSONB,
ADD COLUMN     "next_airing_episode" JSONB,
ADD COLUMN     "start_date" INTEGER,
ADD COLUMN     "status" TEXT,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "volumes" INTEGER;

-- AlterTable
ALTER TABLE "user_anime_list" DROP CONSTRAINT "user_anime_list_pkey",
DROP COLUMN "animeList",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "score" DROP NOT NULL,
ALTER COLUMN "progress" DROP NOT NULL,
ALTER COLUMN "rewatches" DROP NOT NULL,
DROP COLUMN "start_date",
ADD COLUMN     "start_date" TIMESTAMP(3),
DROP COLUMN "finish_date",
ADD COLUMN     "finish_date" TIMESTAMP(3),
ALTER COLUMN "favorite" DROP NOT NULL,
ADD CONSTRAINT "user_anime_list_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "user_anime_list" ADD CONSTRAINT "user_anime_list_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_anime_list" ADD CONSTRAINT "user_anime_list_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "animes"("anime_id") ON DELETE RESTRICT ON UPDATE CASCADE;
