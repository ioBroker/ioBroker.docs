import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    card: {
        width: '292px',
        height: '294px',
        borderRadius: '16px',
        padding: '16px',
        background: theme.palette.secondary.main,
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up(1440)]: {
            width: '251px',
        },
    },
    title: {
        fontFamily: "'Saira'",
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '20px',
        marginBottom: '20px'
    },
    titleLink: {
        display: 'block',
        lineHeight: '1'

    },
    topIcons: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        gap: 30,
    },
    icon: {
        background: '#FFFFFF',
        borderRadius: '8px',
        padding: '4px',
        width: '69px',
        height: '69px',
        '& img': {
            width: 60,
        },
    },
    statsBlocks: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
    },
    statsBlock: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    statsIcon: {},
    statsNumber: {},
    authorBlock: {
        display: 'flex',
        marginTop: '16px'
    },
    authorIcon: {
        marginRight: '4px'
    },
    authorName: {
        fontSize: '12px'
    },
    description: {
        fontFamily: "'Saira'",
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '14px',
        opacity: '0.5',
        lineHeight: '110%',
    },
    bottomIcons: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 'auto',
    },
    bottomIcon: {},
}));
