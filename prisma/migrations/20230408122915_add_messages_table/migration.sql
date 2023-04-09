/*
  Warnings:

  - The primary key for the `friends` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `friends` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `friends` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `friends` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "friends" DROP CONSTRAINT "friends_friend_id_fkey";

-- AlterTable
CREATE SEQUENCE friends_friend_id_seq;
ALTER TABLE "friends" DROP CONSTRAINT "friends_pkey",
DROP COLUMN "id",
ADD COLUMN     "user_id" INTEGER NOT NULL,
ALTER COLUMN "friend_id" SET DEFAULT nextval('friends_friend_id_seq'),
ADD CONSTRAINT "friends_pkey" PRIMARY KEY ("friend_id");
ALTER SEQUENCE friends_friend_id_seq OWNED BY "friends"."friend_id";

-- CreateTable
CREATE TABLE "messages" (
    "message_id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "author_id" INTEGER NOT NULL,
    "receiver_id" INTEGER NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("message_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "friends_user_id_key" ON "friends"("user_id");

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "friends"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
