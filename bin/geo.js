#! /usr/bin/env node

require('v8-compile-cache');

const Service = require('../lib/service');
const service = new Service();

service.run(process.argv.slice(2))
