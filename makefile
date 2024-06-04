dev:
	clear && npm run start:dev

build:
	npm run pre-commit && npm run build 

test:
	npm run test

dbsetup:	
	npx prisma generate
	npx prisma migrate dev
	
	