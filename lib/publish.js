const ci = require('miniprogram-ci');
const path = require('path');
const fs = require('fs-extra');

module.exports = async () => {
    if (!process.env.APP_ID) {
        console.error('未正确设置 APP_ID');
        return null;
    }

    if (!process.env.PRIVATE_KEY) {
        console.error('未正确设置 PRIVATE_KEY');
        return null;
    }
    const rootDir = path.resolve(process.cwd()), projectDir = path.resolve(rootDir, process.env.PROJECT_DIR || './');

    const project = new ci.Project({
        appid: process.env.APP_ID,
        type: 'miniProgram',
        projectPath: path.resolve(projectDir, 'dist'),
        privateKey: process.env.PRIVATE_KEY,
        ignores: ['node_modules/**/*'],
    });

    const result = await ci.analyseCode(project);

    console.log('分析结果:' + JSON.stringify(result, null, 2));

    const VERSION = process.env.VERSION || (await fs.readJSON(path.resolve(rootDir, './package.json'))).version;

    const uploadResult = await ci.upload({
        project, version: VERSION, desc: '发布新的小程序版本', setting: {
            es6: true, es7: true
        }, onProgressUpdate: console.log,
    })
    console.log(uploadResult)
};
