#! /usr/bin/env node

import * as fs from 'fs-extra';
import * as inquirer from 'inquirer';
import { execSync } from 'child_process';
import { error, succeed, underline, checkPathExists } from '../utils';
import { configPath, promptConfig, DEFAULT_CONFIG_FILE_NAME } from '../config';

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
