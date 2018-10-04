// WORKAROUND made by: -> axe312ger
// https://github.com/sindresorhus/opn/pull/100

const opn = require('opn')
const execa = require('execa')
const commandExists = require('command-exists')
// const openUrl = `http://localhost:9999`

module.exports = function (openUrl) {
    if (['win32', 'darwin'].includes(process.platform)) {
        opn(openUrl, {
            wait: false
        })
    } else {
        try {
            const xdgOpenExists = commandExists('xdg-open')
            if (!xdgOpenExists) {
                throw new Error('xdg-open does not exist')
            }
            execa('xdg-open', [openUrl])
        } catch (_) {
            console.log(`Unable to open your browser automatically. Please open the following URI in your browser:\n\n${openUrl}\n\n`)
        }
    }
}





