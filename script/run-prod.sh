#!/bin/bash/env

echo "star Electron Credential Manager App......."

cd ../Credential\ Manager\ Api
yarn dev &
cd ../Credential\ Manager
yarn start
