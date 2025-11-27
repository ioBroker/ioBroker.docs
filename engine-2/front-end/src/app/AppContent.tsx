import { Box } from '@mui/material';
import { makeStyles } from '../theme';
import { useRoutes } from './providers/router';
import { Header, Footer } from '../components';
import Divider from '../components/Divider/Divider';
import { usePageScrollProgress } from '../hooks/usePageScrollProgress';
import { useReducer } from 'react';

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

const AppContent = () => {
    const { classes } = useStyles();
    const routes = useRoutes();
    const { scrollPosition } = usePageScrollProgress();
    const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

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
            <Divider
                position={scrollPosition}
                parentWidth={window.innerWidth}
            />
            <Footer />
        </Box>
    );
};

export default AppContent;
