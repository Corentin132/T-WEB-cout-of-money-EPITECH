#!/bin/sh

mkdir -p ./build
cp tsoa.json ./build
npm run start:build
npm run swagger
npm run start:dev 