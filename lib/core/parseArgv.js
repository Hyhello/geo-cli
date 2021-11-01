#! /usr/bin/env node

const glob = require('glob');
const path = require('path');
const { oneOf, error, isEmpty, compact, isDirectory, loadConfig, checkPathExists } = require('../utils');

const SUFFIX = '.json';

// 解析参数
const parseArgv = (args, opts, command) => {

    // 输入
    let input = opts.input || args;

    // 错误集合
    const errors = [];

    // 加载配置文件
    const config = loadConfig(opts.configFile);

    // 容错机制
    if (config == null || typeof config !== 'object' || Array.isArray(config)) {
        error(`Invalid config file "${opts.configFile}"`);
        process.exit(1);
    }

    if (!input.length && isEmpty(config.input)) {
        error(`stdin compilation requires either [input] or --config-file [path]\n`);
        command.help();
    }

    // --recursive
    if (opts.recursive) {
        config.recursive = opts.recursive;
    }

    // --relative
    if (opts.relative) {
        config.relative = opts.relative;
    }

    // --pretty
    if (opts.pretty) {
        config.pretty = opts.pretty;
    }

    // --set-indent
    config.indent = config.pretty;
    if (typeof config.pretty === 'boolean') {
        config.indent = config.pretty ? 2 : 0;
    }

    // --empty-dir
    if (opts.emptyDir) {
        config.emptyDir = opts.emptyDir;
    }

    // --exclude
    if (opts.exclude) {
        config.exclude = opts.exclude;
    }

    // --input
    if (!input.length) {
        input = [].concat(config.input);
    }

    // 获取当前目录名称
    const filenames = input.reduce(function (globbed, dir) {
        if (!checkPathExists(dir)) {
            errors.push(dir + ' does not exist');
        } else {
            if (isDirectory(dir)) {
                const pattern = !config.recursive ? `${dir}/*${SUFFIX}` : `${dir}/**/*${SUFFIX}`;
                globbed.push(...glob.sync(pattern, { ignore: config.exclude }));
            } else {
                globbed.push(...glob.sync(dir, { ignore: config.exclude }));
            }
        }
        return globbed;
    }, []);

    // --input
    config.input = Array.from(new Set(filenames));

    // --output
    const output = opts.output || compact([].concat(config.output));

    if (output.length) {
        const dir = output[0];
        // 此处默认有后缀的认为是文件，否则认为为文件夹
        const isDir = !!path.extname(dir);
        if (output.length === 1 && !isDir) {
            config.input.forEach((file, index) => {
                output[index] = isDir ? file : path.join(dir, config.relative ? file : path.basename(file));
            });
            config.output = output;
        } else {
            config.output = output.concat(config.input.slice(output.length));
        }
    } else {
        config.output = config.input;
    }

    // 抛出错误
    if (errors.length) {
        error();
        errors.forEach(function (e) {
            console.error('    ' + e);
        });
        process.exit(1);
    }
    return config;
};

module.exports = parseArgv;
