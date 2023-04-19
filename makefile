dev:
	clear && npm run dev

ws:
	npm run ws

studio:
	npx prisma studio

build:
	npm run build 
	npx prisma generate deploy 
	npx prisma migrate

test:
	npm run test

dbtestsetup: 
	npm run test:migrate

dbsetup:
	npx prisma generate
	npx prisma migrate dev

dbpull: 
	npx prisma db pull

seed:
	npm run seed

   