-- CreateTable
CREATE TABLE "animes" (
    "id" SERIAL NOT NULL,
    "anime_id" INTEGER NOT NULL,

    CONSTRAINT "animes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_anime_list" (
    "animeList" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "anime_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "progress" INTEGER NOT NULL,
    "rewatches" INTEGER NOT NULL,
    "start_date" INTEGER NOT NULL,
    "finish_date" INTEGER,
    "favorite" BOOLEAN NOT NULL,

    CONSTRAINT "user_anime_list_pkey" PRIMARY KEY ("animeList")
);

-- CreateIndex
CREATE UNIQUE INDEX "animes_anime_id_key" ON "animes"("anime_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_anime_list_user_id_key" ON "user_anime_list"("user_id");

-- AddForeignKey
ALTER TABLE "user_anime_list" ADD CONSTRAINT "user_anime_list_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "animes"("anime_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_anime_list" ADD CONSTRAINT "user_anime_list_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
