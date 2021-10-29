#! /usr/bin/env node

const path = require('path');

const booleanify = (value) => {
    if (value === "true" || value == 1) {
        return true;
    }
    if (value === "false" || value == 0 || !value) {
        return false;
    }
};

const numberify = (value) => {
    const n = parseFloat(value);
    if (value === "true") {
        return true;
    }
    if (value === "false") {
        return false;
    }
    return isNaN(n) ? !!value : n;
};

// 默认配置文件名称
const DEFAULT_CONFIG_FILE_NAME = 'geo.config.js';

// 配置文件
module.exports = {
    DEFAULT_CONFIG_FILE_NAME,
    configPath: `${path.join(process.cwd(), DEFAULT_CONFIG_FILE_NAME)}`,
    packageInfo: require('../../package.json'),
    optionConfig: [
        {
            argv: '--init',
            description: 'generating a configuration file.'
        },
        {
            argv: '-c, --config-file <path>',
            description: 'custom configuration file. only .js file is supported.',
            default: DEFAULT_CONFIG_FILE_NAME
        },
        {
            argv: '-i, --input <INPUT...>',
            description: 'enter a file or folder, optimize and rewrite all *. Json files.'
        },
        {
            argv: '-o, --output <OUTPUT...>',
            description: 'output file or folder (same as --input by default).'
        },
        {
            argv: '-p, --pretty [boolean|indent]',
            description: 'beautify JSON files.',
            format: numberify
        },
        {
            argv: `-r, --recursive`,
            description: 'whether to recursively query. Json files. require --output to be the folder.'
        },
        {
            argv: `--relative [boolean]`,
            description: 'compile to an output directory relative to the input directory or file. require --output to be the folder.',
            format: booleanify,
            default: true
        },
        {
            argv: '--empty-dir',
            description: 'to remove the output directory before compiling, require --output to be the folder.'
        },
        {
            argv: `-e, --exclude <EXCLUDE...>`,
            description: 'exclude files that match the regular expression pattern.'
        }
    ],
    promptConfig: [
        {
            type: 'input',
            name: 'input',
            message: 'please enter the compile entry (file or folder)'
        },
        {
            type: 'input',
            name: 'output',
            message: 'please enter the compile exit (file or folder)'
        },
        {
            type: 'confirm',
            name: 'pretty',
            message: 'do you beautify JSON'
        },
        {
            type: 'input',
            name: 'exclude',
            message: 'exclusions (separate multiple items with commas or Spaces)',
            filter: function (val) {
                return val ? val.split(/,|\s+/g) : [];
            }
        }
    ]
};
