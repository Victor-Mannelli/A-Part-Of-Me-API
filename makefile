dev:
	clear && npm run dev

studio:
	npx prisma studio

build:
	npm run build 
	npx prisma generate deploy 
	npx prisma migrate

test:
	npm run test

dbsetup:
	npx prisma generate
	npx prisma migrate dev
	
dbseed:
	node ./dist/utils/seeddb.js

seed:
	npx ts-node ./utils/seed.ts
