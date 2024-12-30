const path = require('path')

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
    chrome: {
        skipDownload: false,
    },
    cacheDirectory: path.join(__dirname, '.cache', 'puppeteer')
};