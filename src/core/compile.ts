#! /usr/bin/env node

import * as path from 'path';
import * as fs from 'fs-extra';
import encodeGeo from './zigZag';
import { toFixed } from '@hyhello/utils';
import { error, succeed, ensureDir } from '../utils';

// 获取文件size
const fileSize = function (dir) {
    const fileObj = fs.statSync(dir);
    return toFixed(fileObj.size / 1024, 2);
}

const compile = (options) => {
    let isEmpty = false;
    const logs = [];
    options.input.forEach((file, index) => {
        try {
            const iBasename = path.basename(file);
            const rawJSON = fs.readJsonSync(file, 'utf8');
            const json = encodeGeo(rawJSON);
            let output = options.output[index];
            const oDirname = path.dirname(output);
            if (oDirname) {
                fs.ensureDirSync(oDirname);
                if (options.emptyDir && !isEmpty) {
                    fs.emptyDirSync(oDirname);
                    isEmpty = true;
                }
            }
            const inBytes = fileSize(file);
            const writePath = path.join(oDirname, path.basename(output));
            fs.writeFileSync(writePath, JSON.stringify(json, null, options.indent), 'utf8');
            const outBytes = fileSize(writePath);
            logs.push({
                '文件名': iBasename,
                '编码前大小': inBytes + 'kb',
                '编码后大小': outBytes + 'kb',
                '编码比': toFixed(100 - (outBytes * 100) / inBytes, 1) + '%'
            });
            if (index === options.input.length - 1) {
                console.table(logs);
                process.exit(0);
            }
        } catch (e) {
            error(e.message);
            process.exit(1);
        }
    });
};

module.exports = compile;
