#!/usr/bin/env node

const publish = require('./lib/publish');
const qrcode = require('./lib/generate-example-qr-code');

const args = process.argv.slice(2);

const script = args[0];

console.log(`执行命令:${script || 'publish'}`);

switch (script) {
    case 'publish':
        publish().catch((e) => {
            console.error(e);
        });
        break;
    case 'qr-code':
        qrcode().catch((e) => {
            console.error(e);
        });
        break;
    default:
        publish().catch((e) => {
            console.error(e);
        });
}
