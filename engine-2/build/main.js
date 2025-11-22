#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.argv.includes('--debug')) {
    process.env.DEBUG = '*';
}
else {
    process.env.NODE_ENV = 'production';
}
const web_1 = __importDefault(require("./lib/web"));
const search_1 = require("./lib/search");
const fs_1 = require("fs");
// Load application configuration
const configData = (0, fs_1.readFileSync)(`${__dirname}/../config.json`, 'utf-8');
const appConfig = JSON.parse(configData);
const app = (0, web_1.default)(appConfig);
(0, search_1.init)(app.app, appConfig);
//# sourceMappingURL=main.js.map