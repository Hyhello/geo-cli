#! /usr/bin/env node
const fs = require('fs');
const apply = require('./core');
const program = require('commander');
const { error, checkNodeVersion } = require('./utils');
const { packageInfo, optionConfig } = require('./config');

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

module.exports = Service;
