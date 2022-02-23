#! /usr/bin/env node

import * as path from 'path';

// 检测number
const numberify = (value: string): boolean | number => {
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
export const DEFAULT_CONFIG_FILE_NAME: string = 'geo.config.js';

// 路径配置文件
export const configPath: string = `${path.join(process.cwd(), DEFAULT_CONFIG_FILE_NAME)}`;

// packageJSON
export const packageInfo: any = require('../../package.json');

// commander配置文件
export const optionConfig: Array<IOptionConfig> = [
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
        argv: `--no-relative`,
        description: 'compile to an output directory relative to the input directory or file. require --output to be the folder.'
    },
    {
        argv: '--empty-dir',
        description: 'to remove the output directory before compiling, require --output to be the folder.'
    },
    {
        argv: `-e, --exclude <EXCLUDE...>`,
        description: 'exclude files that match the regular expression pattern.'
    }
];

// inquirer配置文件
export const promptConfig: Array<IPromptConfig> = [
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
];
