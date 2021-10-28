#! /usr/bin/env node

require('v8-compile-cache');

const fs = require('fs-extra');
const inquirer = require('inquirer');
const { execSync } = require('child_process');
const { error, succeed, underline, checkPathExists } = require('../utils');
const { configPath, promptConfig, DEFAULT_CONFIG_FILE_NAME } = require('../config');

// 创建配置文件
const createConfigFile = (jsonObj) => {
    const str = `module.exports = ${JSON.stringify(jsonObj, null, 2)}`;
    fs.writeFileSync(configPath, str);
};

const init = function () {
    if (checkPathExists(configPath)) {
        error(`${DEFAULT_CONFIG_FILE_NAME} 配置文件已存在！`);
        process.exit(1);
    } else {
        inquirer.prompt(promptConfig).then(answers => {
            delete answers.isJS;
            createConfigFile(answers);
            // 格式化配置文件
            execSync(`npx prettier --write ${configPath}`);
            succeed(
                `配置文件生成成功，请查看项目根目录下的 ${underline(DEFAULT_CONFIG_FILE_NAME)} 文件确认配置是否正确！`
            );
            process.exit(0);
        });
    }
}

module.exports = init;
