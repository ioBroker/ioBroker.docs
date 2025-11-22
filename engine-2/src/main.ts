#!/usr/bin/env node

if (process.argv.includes('--debug')) {
    process.env.DEBUG = '*';
} else {
    process.env.NODE_ENV = 'production';
}
import type { AppConfig } from './types'
import web from './lib/web';
import { init } from './lib/search';

import {readFileSync } from 'fs';

// Load application configuration
const configData = readFileSync(`${__dirname}/../config.json`, 'utf-8');
const appConfig: AppConfig = JSON.parse(configData);

const app = web(appConfig);
init(app.app,appConfig);
