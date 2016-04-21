#! /app/bin/node

var mongoApi = require('./database/mongo_api');

mongoApi.cleanDB();

process.exit();