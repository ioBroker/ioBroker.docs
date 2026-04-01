import { Box } from '@mui/material';
import { makeStyles } from '../theme';
import { useRoutes } from './providers/router';
import { Header, Footer } from '../components';
import Divider from '../components/Divider/Divider';
import { usePageScrollProgress } from '../hooks/usePageScrollProgress';
import { useReducer } from 'react';
import { useLocation } from 'react-router-dom';

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
    const { scrollPosition } = usePageScrollProgress();
    const [, forceUpdate] = useReducer((x: number) => x + 1, 0);
    const location = useLocation();

    const hideGlobalFooter = PAGES_WITH_INLINE_FOOTER.some(p => location.pathname === p)
        || location.pathname.startsWith('/adapters/');

    return (
        <Box className={classes.root}>
            <Box className={classes.header}>
                <Header
                    selected=""
                    noSearch={false}
                    onLanguageUpdate={() => forceUpdate()}
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
                    <Divider
                        position={scrollPosition}
                        parentWidth={window.innerWidth}
                    />
                    <Footer />
                </>
            )}
        </Box>
    );
};

export default AppContent;
