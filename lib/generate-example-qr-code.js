const getToken = require('./get-token');
const fs = require('fs-extra');
const path = require('path');
const request = require('request-promise');
const range = require('lodash/range');

module.exports = async () => {
    const appDir = process.cwd();
    const distDir = path.resolve(appDir, process.env.DIST_PATH || 'build');
    console.log('distDir:' + distDir);
    await fs.emptyDir(distDir);
    const generate = async (target, filename) => {
        const token = await getToken();
        if (!token) {
            return;
        }
        const res = await request.post(`https://api.weixin.qq.com/wxa/getwxacode?access_token=${token}`, {
            body: {
                "path": target, "env_version": "release", "width": 400
            }, encoding: null, json: true
        });
        const targetDir = path.resolve(distDir, filename);
        await fs.writeFile(targetDir, res);
        console.log('完成二维码图片生成:' + targetDir);
    };

    const EXAMPLE_PATH = process.env.EXAMPLE_PATH || './doc/example.json';

    const exampleJSON = await fs.readJSON(path.resolve(appDir, EXAMPLE_PATH));
    await generate('pages/index/index', `index.jpg`);
    await Promise.allSettled(range(0, (exampleJSON.list || []).length).map(async (index) => {
        await generate(`pages/detail/index?index=${index}`, `${index}.jpg`);
    }));
};
