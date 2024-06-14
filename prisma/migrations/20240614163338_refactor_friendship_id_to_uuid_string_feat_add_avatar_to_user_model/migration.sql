/*
  Warnings:

  - The primary key for the `friendships` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "friendships" DROP CONSTRAINT "friendships_pkey",
ALTER COLUMN "friendship_id" DROP DEFAULT,
ALTER COLUMN "friendship_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "friendships_pkey" PRIMARY KEY ("friendship_id");
DROP SEQUENCE "friendships_friendship_id_seq";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar" TEXT;
