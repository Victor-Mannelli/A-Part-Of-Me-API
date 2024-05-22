/*
  Warnings:

  - The `title` column on the `animes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "animes" DROP COLUMN "title",
ADD COLUMN     "title" JSONB;
