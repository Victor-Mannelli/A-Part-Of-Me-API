-- CreateTable
CREATE TABLE "animes" (
    "anime_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "episodes" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "chapters" INTEGER NOT NULL,
    "volumes" INTEGER NOT NULL,
    "source" TEXT NOT NULL,
    "updatedAt" INTEGER NOT NULL,
    "coverImage" TEXT NOT NULL,
    "bannerImage" TEXT NOT NULL,
    "genres" TEXT[],
    "synonyms" TEXT[],
    "averageScore" INTEGER NOT NULL,
    "popularity" INTEGER NOT NULL,
    "favourites" INTEGER NOT NULL,
    "isAdult" BOOLEAN NOT NULL,

    CONSTRAINT "animes_pkey" PRIMARY KEY ("anime_id")
);

-- CreateTable
CREATE TABLE "startdate" (
    "id" SERIAL NOT NULL,
    "anime_id" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,

    CONSTRAINT "startdate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enddate" (
    "id" SERIAL NOT NULL,
    "anime_id" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,

    CONSTRAINT "enddate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trailer" (
    "trailer_id" SERIAL NOT NULL,
    "anime_id" INTEGER NOT NULL,
    "site" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "trailer_pkey" PRIMARY KEY ("trailer_id")
);

-- CreateTable
CREATE TABLE "tags" (
    "tag_id" SERIAL NOT NULL,
    "anime_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "isAdult" BOOLEAN NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("tag_id")
);

-- CreateTable
CREATE TABLE "airing" (
    "next_airing_id" SERIAL NOT NULL,
    "anime_id" INTEGER NOT NULL,
    "timeUntilAiring" INTEGER NOT NULL,
    "episode" INTEGER NOT NULL,

    CONSTRAINT "airing_pkey" PRIMARY KEY ("next_airing_id")
);

-- AddForeignKey
ALTER TABLE "startdate" ADD CONSTRAINT "startdate_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "animes"("anime_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enddate" ADD CONSTRAINT "enddate_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "animes"("anime_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trailer" ADD CONSTRAINT "trailer_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "animes"("anime_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "animes"("anime_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "airing" ADD CONSTRAINT "airing_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "animes"("anime_id") ON DELETE CASCADE ON UPDATE CASCADE;
