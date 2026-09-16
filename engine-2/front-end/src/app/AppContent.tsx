import { Box } from '@mui/material';
import { makeStyles } from '../theme';
import { useAppLinks, useRoutes } from './providers/router';
import { Header, Footer } from '../components';
import CookiesHint from '../components/CookiesHint/CookiesHint';
import Divider from '../components/Divider/Divider';
import { useLayoutEffect, useReducer } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { getAnchorFromHash } from '../utils/anchor';

const useStyles = makeStyles()(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        margin: 0,
        padding: 0,
    },
    header: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
    },
    main: {
        flexGrow: 1,
        width: '100%',
        paddingTop: 64,
    },
}));

// Pages that render their own footer inside the scrollable area
const PAGES_WITH_INLINE_FOOTER = ['/adapters', '/docs'];

const AppContent = (): React.ReactNode => {
    const { classes } = useStyles();
    const routes = useRoutes();
    const [, forceUpdate] = useReducer((x: number) => x + 1, 0);
    const location = useLocation();
    const navigationType = useNavigationType();

    // plain <a href="/adapters"> anywhere in the app is a router jump, not a page load
    useAppLinks();

    // A router jump keeps the window where it was - a link far down the home page would open the
    // next page just as far down. A new page starts at its top, unless the address names an anchor;
    // "back" is left to the browser, which restores where the reader was.
    useLayoutEffect(() => {
        if (navigationType === 'POP' || getAnchorFromHash()) {
            return;
        }
        window.scrollTo(0, 0);
    }, [location.pathname, navigationType]);

    // sub pages count too: /docs/README.md and /adapters/alarm carry their own footer
    const hideGlobalFooter = PAGES_WITH_INLINE_FOOTER.some(
        p => location.pathname === p || location.pathname.startsWith(`${p}/`),
    );

    return (
        <Box className={classes.root}>
            <Box className={classes.header}>
                <Header
                    selected=""
                    noSearch={false}
                    onLanguageUpdate={() => forceUpdate()}
                    dark={location.pathname === '/'}
                />
            </Box>
            <Box
                component="main"
                className={classes.main}
            >
                {routes}
            </Box>
            {!hideGlobalFooter && (
                <>
                    {/* Without `position`, the line measures itself; see Divider. */}
                    <Divider beforeFooter />
                    <Footer />
                </>
            )}
            <CookiesHint />
        </Box>
    );
};

export default AppContent;
