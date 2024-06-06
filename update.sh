#!/usr/bin/env bash

# pull
git pull

# stop
docker ps -q --filter ancestor=gougoule-finance-frontend | xargs docker stop
docker ps -q --filter ancestor=gougoule-finance-backend | xargs docker stop

# update
cd backend
docker build --pull -t gougoule-finance-backend .

cd ../frontend
docker build --pull -t gougoule-finance-frontend .

# go back 
cd ../

# start

docker run --network="host" -d gougoule-finance-backend
docker run -d -p 8765:3000 gougoule-finance-frontend
