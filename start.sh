#!/usr/bin/env bash

docker run --network="host" -d gougoule-finance-backend
docker run -d -p 8765:3000 gougoule-finance-frontend