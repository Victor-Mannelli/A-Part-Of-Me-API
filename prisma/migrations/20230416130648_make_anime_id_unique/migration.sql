/*
  Warnings:

  - A unique constraint covering the columns `[anime_id]` on the table `user_anime_list` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_anime_list_anime_id_key" ON "user_anime_list"("anime_id");
