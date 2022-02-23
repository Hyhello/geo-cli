#! /usr/bin/env node

const ora = require("ora");
const path = require("path");
const fs = require('fs-extra');
const chalk = require("chalk");
const semver = require('semver');
const { packageInfo } = require('../config');

const NAMESPACE = packageInfo.name;

const nodeVersion = packageInfo.engines.node;

// 检测路径是否存在
const checkPathExists = function (buildConfigPath) {
    return fs.pathExistsSync(buildConfigPath);
}

// 加载配置文件
const loadConfig = function (configFile, cwd = process.cwd()) {
    if (checkPathExists(configFile)) {
        if (path.isAbsolute(configFile)) {
            return require(configFile);
        } else {
            return require(path.join(cwd, configFile));
        }
    }
    let dir = cwd;
    while (true) {
        const js = path.join(dir, configFile);
        if (checkPathExists(js)) {
            return require(js);
        }
        const parent = path.dirname(dir);
        if (dir === parent) {
            return {};
        }
        dir = parent;
    }
}

const utils = {
    // 日志信息
    log: (message) => {
        console.log(`[${NAMESPACE}]`, message)
    },
    // 成功信息
    succeed: (...message) => {
        ora().succeed(chalk.greenBright.bold(`[${NAMESPACE}]`, message))
    },
    // 提示信息
    info: (...message) => {
        ora().info(chalk.blueBright.bold(`[${NAMESPACE}]`, message))
    },
    // 错误信息
    error: (...message) => {
        ora().fail(chalk.redBright.bold(`[${NAMESPACE}]`, message));
    },
    // 下划线重点信息
    underline: (message) => {
        return chalk.underline.blueBright.bold(message)
    },
    checkNodeVersion: function () {
        if (!semver.satisfies(process.version, nodeVersion)) {
            utils.error(`You ar using Node ${process.version}, but this version of ${NAMESPACE} requres Node ${nodeVersion} .\nPlease upgrage your Node version.`);
        }
    },
    loadConfig,
    // 检查路径是否存在
    checkPathExists,
    isDirectory: function (dir) {
        try {
            return fs.lstatSync(dir).isDirectory();
        } catch (e) {
            return false;
        }
    },
    JSONTokener: function (str) {
        if (str !== null && str.startsWith('\ufeff')) {
            str = str.substring(1);
        }
        return JSON.parse(str);
    }
};

module.exports = utils;
