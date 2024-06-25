/*
  Warnings:

  - The `avatar` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "banner" BYTEA,
DROP COLUMN "avatar",
ADD COLUMN     "avatar" BYTEA;
