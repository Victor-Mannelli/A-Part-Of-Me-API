/*
  Warnings:

  - Added the required column `favorite` to the `UserAnimeList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAnimeList" ADD COLUMN     "favorite" BOOLEAN NOT NULL;
