import { Box } from '@mui/material';
import { makeStyles } from '../theme';
import { useRoutes } from './providers/router';
import { Header, Footer } from '../components';

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

    return (
        <Box className={classes.root}>
            <Box className={classes.header}>
                <Header selected="" noSearch={false} />
            </Box>
            <Box component="main" className={classes.main}>
                {routes}
            </Box>
            <Footer />
        </Box>
    );
};

export default AppContent;
