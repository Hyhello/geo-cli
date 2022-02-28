#! /usr/bin/env node

import * as ora from 'ora';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as chalk from 'chalk';
import * as semver from 'semver';
import { packageInfo } from 'src/config';

const NAMESPACE: string = packageInfo.name;

const nodeVersion: string = packageInfo.engines.node;

// 检测路径是否存在
export const checkPathExists = function (buildConfigPath: string): boolean {
    return fs.pathExistsSync(buildConfigPath);
}

// 加载配置文件
export const loadConfig = function (configFile: string, cwd: string = process.cwd()): IGeo | {} {
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

// 日志信息
export const log = (message: string) => {
    console.log(`[${NAMESPACE}]`, message)
}

// 成功信息
export const succeed = (...message: string[]) => {
    ora().succeed(chalk.greenBright.bold(`[${NAMESPACE}]`, message))
}

// 提示信息
export const info = (...message: string[]) => {
    ora().info(chalk.blueBright.bold(`[${NAMESPACE}]`, message))
}

// 错误信息
export const error = (...message: string[]) => {
    ora().fail(chalk.redBright.bold(`[${NAMESPACE}]`, message));
}

// 下划线重点信息
export const underline = (message: string): string => {
    return chalk.underline.blueBright.bold(message)
}

export const checkNodeVersion = function () {
    if (!semver.satisfies(process.version, nodeVersion)) {
        error(`You ar using Node ${process.version}, but this version of ${NAMESPACE} requres Node ${nodeVersion} .\nPlease upgrage your Node version.`);
    }
}

export const isDirectory = function (dir: string): boolean {
    try {
        return fs.lstatSync(dir).isDirectory();
    } catch (e) {
        return false;
    }
}
