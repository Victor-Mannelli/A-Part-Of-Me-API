/*
  Warnings:

  - You are about to drop the `animes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_anime_list` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_anime_list" DROP CONSTRAINT "user_anime_list_anime_id_fkey";

-- DropForeignKey
ALTER TABLE "user_anime_list" DROP CONSTRAINT "user_anime_list_user_id_fkey";

-- DropTable
DROP TABLE "animes";

-- DropTable
DROP TABLE "user_anime_list";
