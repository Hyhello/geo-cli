#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
const commander_1 = require("commander");
const utils_1 = require("./utils");
const config_1 = require("./config");
const program = new commander_1.Command();
const setupDefaultCommands = () => {
    program.name('geo');
    program.usage("[INPUT...] [options]");
    program.description(config_1.packageInfo.description, {
        INPUT: 'Alias to --input'
    });
    program.arguments('[INPUT...]');
    program.version(config_1.packageInfo.version, '-v, --version', 'output current version number');
    program.helpOption('-h, --help', 'get help');
    program.addHelpCommand(false);
    program.showHelpAfterError();
};
const registerOptions = () => {
    config_1.optionConfig.forEach(opt => {
        const args = [opt.argv, opt.description, opt.format, opt.default].filter(arg => !!arg);
        program.option(...args);
    });
    program.action(core_1.default);
};
class Service {
    constructor() {
        (0, utils_1.checkNodeVersion)();
        setupDefaultCommands();
        registerOptions();
    }
    run(rawArgv = []) {
        program.parse(rawArgv, { from: 'user' });
    }
}
exports.default = Service;
