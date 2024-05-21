/*
  Warnings:

  - Added the required column `updated_at` to the `animes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_anime_list" DROP CONSTRAINT "user_anime_list_anime_id_fkey";

-- AlterTable
ALTER TABLE "animes" ADD COLUMN     "updated_at" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "user_anime_list" ADD CONSTRAINT "user_anime_list_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "animes"("anime_id") ON DELETE CASCADE ON UPDATE CASCADE;
