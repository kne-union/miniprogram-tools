const getToken = require('./get-token');
const fs = require('fs-extra');
const path = require('path');
const request = require('request-promise');
const range = require('lodash/range');

module.exports = async () => {
    const appDir = process.cwd();
    const EXAMPLE_LENGTH = process.env.EXAMPLE_LENGTH;
    const token = await getToken();
    if (!token) {
        return;
    }
    const distDir = path.resolve(appDir, 'qr-code');
    await fs.emptyDir(distDir);
    await Promise.allSettled(range(0, EXAMPLE_LENGTH).map(async (index) => {
        const res = await request.post(`https://api.weixin.qq.com/wxa/getwxacode?access_token=${token}`, {
            body: {
                "path": `pages/detail/index?index=${index}`, "env_version": "release", "width": 400
            }, encoding: null, json: true
        });

        await fs.writeFile(path.resolve(distDir, `${index}.jpg`), res);
    }));
};
