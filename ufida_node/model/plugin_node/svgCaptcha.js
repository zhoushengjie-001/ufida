const svgCaptcha = require('svg-captcha')

module.exports = () => {
    let captcha = svgCaptcha.create({
        size: 4,
        ignoreChars: '0o1i',
        noise: 1,
        background: '#FFF',
        width: 90,
        height: 40
    });
    return captcha
}