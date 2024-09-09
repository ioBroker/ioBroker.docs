import React from 'react';
import { createRoot } from 'react-dom/client';
import { Theme } from '@iobroker/adapter-react-v5';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import themeExtend from './createTheme';

let themeName = 'light';

const container = document.getElementById('root');
const root = createRoot(container);

const _theme = Theme(themeName);
const extend = themeExtend(themeName);
_theme.tabs = extend.tabs;
_theme.content = extend.content;
Object.assign(_theme.palette.primary, extend.palette.primary);
Object.assign(_theme.palette.secondary, extend.palette.secondary);
_theme.palette.darkPart = extend.palette.darkPart;
_theme.palette.lightPart = extend.palette.lightPart;

root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
