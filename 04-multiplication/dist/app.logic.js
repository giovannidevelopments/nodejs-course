"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const yargs_plugin_1 = require("./config/plugins/yargs.plugin");
const { b: base, l: limit, s: showTable } = yargs_plugin_1.yarg;
let outputMessage = '';
const headerMessage = `
===============================
        Tabla del ${base}
===============================
`;
for (let i = 1; i <= limit; i++) {
    outputMessage += `${base}x${i}=${base * i}\n`;
}
outputMessage = headerMessage + outputMessage;
if (showTable) {
    console.log(outputMessage);
}
const outputPath = `outputs/`;
fs_1.default.mkdirSync(outputPath, { recursive: true });
fs_1.default.writeFileSync(`${outputPath}/tabla-${base}.txt`, outputMessage);
console.log("File created!");
