import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import theme from '@iobroker/adapter-react-v5/Theme';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import themeExtend from './createTheme';

let themeName = 'light';

function build() {
    const container = document.getElementById('root');
    const root = createRoot(container);

    const _theme = theme(themeName);
    const extend = themeExtend(themeName);
    _theme.tabs = extend.tabs;
    _theme.content = extend.content;
    Object.assign(_theme.palette.primary, extend.palette.primary);
    Object.assign(_theme.palette.secondary, extend.palette.secondary);
    _theme.palette.darkPart = extend.palette.darkPart;
    _theme.palette.lightPart = extend.palette.lightPart;

    return root.render(<StyledEngineProvider injectFirst>
        <ThemeProvider theme={_theme}>
            <App
                onThemeChange={_themeName => {
                    themeName = _themeName;
                    build();
                }}
            />
        </ThemeProvider>
    </StyledEngineProvider>);
}

build();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
