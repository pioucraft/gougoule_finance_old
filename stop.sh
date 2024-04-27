#!/usr/bin/env bash

docker ps -q --filter ancestor=hub-for-things-frontend | xargs docker stop
docker ps -q --filter ancestor=hub-for-things-backend | xargs docker stop