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
            description: '生成配置文件geo.config.js'
        },
        {
            argv: '-c, --config-file <path>',
            description: '自定义配置文件，仅支持.js',
            default: DEFAULT_CONFIG_FILE_NAME
        },
        {
            argv: '-i, --input <INPUT...>',
            description: '输入文件或文件夹, 优化并重写所有 *.json 文件'
        },
        {
            argv: '-o, --output <OUTPUT...>',
            description: '输出文件或文件夹（默认情况下与输入相同）'
        },
        {
            argv: '-p, --pretty [boolean|indent]',
            description: '美化JSON文件',
            format: numberify
        },
        {
            argv: `-r, --recursive`,
            description: '是否递归查询.json文件，需要 --input 为文件夹'
        },
        {
            argv: `--relative [boolean]`,
            description: '编译到相对于输入目录或文件的输出目录中。需要--output 为文件夹',
            format: booleanify,
            default: true
        },
        {
            argv: '--empty-dir',
            description: '在编译之前删除输出目录，需要--output 为文件夹'
        },
        {
            argv: `-e, --exclude <EXCLUDE...>`,
            description: '排除与正则表达式模式匹配的文件。'
        }
    ],
    promptConfig: [
        {
            type: 'input',
            name: 'input',
            message: '请输入编译入口（文件或者文件夹）'
        },
        {
            type: 'input',
            name: 'output',
            message: '请输入编译出口（文件或者文件夹）'
        },
        {
            type: 'confirm',
            name: 'pretty',
            message: '是否美化JSON？'
        },
        {
            type: 'input',
            name: 'exclude',
            message: '排除项（多个请以逗号或空格分割）',
            filter: function (val) {
                return val ? val.split(/,|\s+/g) : [];
            }
        }
    ]
};
