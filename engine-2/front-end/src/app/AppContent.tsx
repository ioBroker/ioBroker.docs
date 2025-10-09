import { Box } from '@mui/material';
import { makeStyles } from '../theme';
import { useRoutes } from './providers/router';
import { Header, Footer } from '../components';

const useStyles = makeStyles()((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        paddingTop: 64,
        width: '100%',
        margin: 0,
        padding: 0,
    },
    main: {
        flexGrow: 1,
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        width: '100%',
    },
}));

const AppContent = () => {
    const { classes } = useStyles();
    const routes = useRoutes();

    return (
        <Box className={classes.root}>
            <Header
                title="My App"
                links={[
                    { label: 'Home', path: '/' },
                    { label: 'About', path: '/about' },
                ]}
            />
            <Box component="main" className={classes.main}>
                {routes}
            </Box>
            <Footer />
        </Box>
    );
};

export default AppContent;
