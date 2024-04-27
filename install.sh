#!/usr/bin/env bash

cd backend
mkdir backups

docker build --pull -t hub-for-things-backend .

cd ../frontend
docker build --pull -t hub-for-things-frontend .