/*
  Warnings:

  - A unique constraint covering the columns `[room_id]` on the table `messages` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `room_id` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "friendshipFriendship_id" TEXT,
ADD COLUMN     "room_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "messages_room_id_key" ON "messages"("room_id");

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_friendshipFriendship_id_fkey" FOREIGN KEY ("friendshipFriendship_id") REFERENCES "friendships"("friendship_id") ON DELETE SET NULL ON UPDATE CASCADE;
