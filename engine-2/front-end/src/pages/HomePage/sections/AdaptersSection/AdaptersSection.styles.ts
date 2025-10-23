import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    container: {
        maxWidth: 1276,
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            padding: '0 20px',
        },
    },
    section: {
        marginTop: '30px',
        padding: '80px 0',
        height: '100%',
        background: `url(/codeBackground.png) no-repeat center center`,
        backgroundSize: 'cover',
        [theme.breakpoints.down('md')]: {
            marginTop: '100px',
            padding: '60px 0',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '60px',
            padding: '40px 0',
        },
    },
    adaptersContent: {
        display: 'flex',
        gap: theme.spacing(10),
        alignItems: 'stretch',
        // alignItems: 'flex-start',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            textAlign: 'center',
            gap: theme.spacing(5),
        },
    },
    adaptersText: {
        flex: '1 1 45%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    adaptersGrid: {
        flex: '1 1 55%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: theme.spacing(20),
        justifyContent: 'center',
        gap: theme.spacing(1),
        [theme.breakpoints.down('md')]: {
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
        },
    },
    adapterColumn: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1),
        marginBottom: '38px',
        // [theme.breakpoints.down('md')]: {
        //     display: 'contents',
        // },
    },
    offsetColumn: {
        transform: `translateY(38px)`,
        // [theme.breakpoints.down('md')]: {
        //     transform: 'none',
        // },
    },
    adapterIcon: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '16px',
        width: 84,
        height: 84,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
}));