#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const argv = process.argv.splice(2);
const ReadFile = (path) => {
    const data = (0, fs_1.readFileSync)(path, { encoding: 'utf-8' });
    const lines = data.split('\n');
    if (lines[lines.length - 1] === '')
        lines.pop();
    return lines;
};
let cnt = 1;
const FormatLine = (line, option) => {
    if (!option)
        return `${line}\n`;
    if (option === '-b' && line == '')
        return `\n`;
    return `${cnt++}\t${line}\n`;
};
const main = () => {
    const option = argv.find(option => option === '-b' || option === '-n');
    const fileNames = argv.filter(name => name[0] !== '-');
    if (fileNames.length === 0)
        fileNames.push(process.stdin.fd);
    for (const fileName of fileNames) {
        const lines = ReadFile(fileName);
        for (const line of lines) {
            process.stdout.write(FormatLine(line, option));
        }
    }
};
main();
process.stdout.on('error', err => {
    if (err.code == 'EPIPE') {
        process.exit(0);
    }
});
