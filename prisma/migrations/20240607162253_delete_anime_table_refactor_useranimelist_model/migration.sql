/*
  Warnings:

  - You are about to drop the `animes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_anime_list" DROP CONSTRAINT "user_anime_list_anime_id_fkey";

-- DropIndex
DROP INDEX "user_anime_list_user_id_anime_id_key";

-- DropTable
DROP TABLE "animes";
