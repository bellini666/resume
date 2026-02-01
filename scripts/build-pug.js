'use strict';
const upath = require('upath');
const sh = require('shelljs');
const renderPug = require('./render-pug');

const srcPath = upath.resolve(upath.dirname(__filename), '../src');

async function processFiles() {
    const files = sh.find(srcPath);
    const promises = [];

    files.forEach(filePath => {
        if (
            filePath.match(/\.pug$/)
            && !filePath.match(/include/)
            && !filePath.match(/mixin/)
            && !filePath.match(/\/pug\/layouts\//)
        ) {
            promises.push(renderPug(filePath));
        }
    });

    await Promise.all(promises);
}

processFiles().catch(err => {
    console.error(err);
    process.exit(1);
});