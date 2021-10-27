#! /usr/bin/env node

const Service = require('../lib/service');
const service = new Service();

service.run(process.argv.slice(2))
