#!/usr/bin/env bash

docker run --network="host" -d hub-for-things-backend
docker run -d -p 8765:3000 hub-for-things-frontend