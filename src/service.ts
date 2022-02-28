#! /usr/bin/env node

import * as fs from 'fs';
import apply from './core';
import { Command } from 'commander';
import { error, checkNodeVersion } from './utils';
import { packageInfo, optionConfig } from './config';

const program = new Command();

// 设置默认命令
const setupDefaultCommands = () => {
    program.name('geo');
    program.usage("[INPUT...] [options]");
    program.description(packageInfo.description, {
        INPUT: 'Alias to --input'
    });
    program.arguments('[INPUT...]');
    program.version(packageInfo.version, '-v, --version', 'output current version number');
    program.helpOption('-h, --help', 'get help');
    program.addHelpCommand(false);
    program.showHelpAfterError();
}

// 注册options
const registerOptions = () => {
    optionConfig.forEach(opt => {
        const args = [opt.argv, opt.description, opt.format, opt.default].filter(arg => !!arg);
        // TODO: 暂时想到比较好的解决办法，所以采用ts-ignore
        // @ts-ignore
        program.option(...args);
    });
    program.action(apply);
};

class Service {
    constructor() {
        checkNodeVersion();
        setupDefaultCommands();
        registerOptions();
    }
    run(rawArgv = []) {
        program.parse(rawArgv, { from: 'user'});
    }
}

export default Service;
