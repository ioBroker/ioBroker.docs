import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    card: {
        width: '100%',
        maxWidth: '292px',
        height: '294px',
        borderRadius: '16px',
        padding: '16px',
        background: theme.palette.secondary.main,
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down(1280)]: {
            maxWidth: 'none',
        },
    },
    title: {
        fontFamily: "'Saira'",
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '20px',
        cursor: 'pointer',
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
        cursor: 'pointer',
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
        cursor: 'pointer',
        display: '-webkit-box',
        WebkitLineClamp: 5,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    bottomIcons: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 'auto',
    },
    bottomIcon: {
        cursor: 'pointer',
    },
}));
