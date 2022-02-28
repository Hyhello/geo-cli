#! /usr/bin/env node

import compile from './compile';
import parseArgv from './parseArgv';
import init from '../commands/init';

export default function apply (args, opts, command) {
    // 执行命令
    if (opts.init) {
        init();
    } else {
        compile(parseArgv(args, opts, command));
    }
};;
