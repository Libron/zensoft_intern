// Author: Urmat Bekboev

const levenstein = require('./lib/levenstein');
const fs = require('fs');

const config = {
    inputFile: 'input.txt',
    patternFile: 'patterns.txt',
    defaultEncoding: 'utf8',
    mode: process.env.mode
};

const input = fs.readFileSync(config.inputFile, config.defaultEncoding);
const patterns = fs.readFileSync(config.patternFile, config.defaultEncoding).split('\n');

const setRegex = (pattern, flag) => new RegExp(pattern, flag);
const result = [];

const getMatch = (text, pattern, mode) => {
    let match = [];
    switch (parseInt(mode)) {
        case 2:
            match = text.match(setRegex(`^.*${pattern}.*$`, 'gm'));
            break;
        case 3:
            text.split('\n').map(line => {
                if (Math.abs(line.length - pattern.length) <= 1) {
                    const minDistance = levenstein(line, pattern);
                    if (minDistance <= 1) {
                        match.push(line);
                    }
                }
            });
            break;
        case 1:
        default:
            match = text.match(setRegex(`^(${pattern})$`, 'gm'));
            break;
    }

    return match && result.push(...match);
};

patterns.map(item => {
    getMatch(input, item, config.mode)
});

console.log(result.join('\n'));
