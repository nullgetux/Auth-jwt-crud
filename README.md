## install package

npm install

## Setting .env

DB_NAME=YOUR_DB_NAME

DB_USER=YOUR_DB_USER

DB_PASSWORD=YOUR_DB_PASSWORD

DB_HOST=YOUR_DB_HOST

JWT_SECRET=SECRET

PORT=3000

## Start Server

npm run dev / nodemon server

## Create model
npx sequelize-cli model:generate --name name --attributes name:typedata

## Migration
npx sequelize-cli db:migrate

## Create Seed
npx sequelize-cli seed:generate --name name

## Run seed
npm run seed
