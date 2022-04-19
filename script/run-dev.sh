#!/bin/bash/env

echo "star devserver......."

cd ../Credential\ Manager\ Api
yarn dev &
cd ../Credential\ Manager\ App
yarn start
