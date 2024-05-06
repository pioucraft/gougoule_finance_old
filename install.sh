#!/usr/bin/env bash

cd backend
docker build --pull -t gougoule-finance-backend .

cd ../frontend
docker build --pull -t gougoule-finance-frontend .