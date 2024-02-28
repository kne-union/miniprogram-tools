const getToken = require('./get-token');
const fs = require('fs-extra');
const path = require('path');
const request = require('request-promise');
const range = require('lodash/range');

module.exports = async () => {
    const appDir = process.cwd();
    const token = await getToken();
    if (!token) {
        return;
    }

    const EXAMPLE_PATH = process.env.EXAMPLE_PATH || './doc/example.json';

    const exampleJSON = await fs.writeJson(path.resolve(appDir, EXAMPLE_PATH));

    const distDir = path.resolve(appDir, 'qr-code');
    await fs.emptyDir(distDir);
    await Promise.allSettled(range(0, (exampleJSON.list || []).length).map(async (index) => {
        const res = await request.post(`https://api.weixin.qq.com/wxa/getwxacode?access_token=${token}`, {
            body: {
                "path": `pages/detail/index?index=${index}`, "env_version": "release", "width": 400
            }, encoding: null, json: true
        });

        await fs.writeFile(path.resolve(distDir, `${index}.jpg`), res);
    }));
};
