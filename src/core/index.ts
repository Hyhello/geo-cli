#! /usr/bin/env node

const compile = require('./compile');
const parseArgv = require('./parseArgv');
const init = require('../commands/init');

export default function apply (args, opts, command) {
    // 执行命令
    if (opts.init) {
        init();
    } else {
        compile(parseArgv(args, opts, command));
    }
};;
