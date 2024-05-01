#!/usr/bin/env bash

cd backend
docker build --pull -t hub-for-things-backend .

cd ../frontend
docker build --pull -t hub-for-things-frontend .