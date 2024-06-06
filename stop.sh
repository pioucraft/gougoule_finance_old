#!/usr/bin/env bash

docker ps -q --filter ancestor=gougoule-finance-frontend | xargs docker stop
docker ps -q --filter ancestor=gougoule-finance-backend | xargs docker stop