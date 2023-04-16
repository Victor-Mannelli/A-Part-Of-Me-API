/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `UserAnimeList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserAnimeList_user_id_key" ON "UserAnimeList"("user_id");
