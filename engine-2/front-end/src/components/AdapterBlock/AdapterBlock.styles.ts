import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    card: {
        width: '100%',
        height: '294px',
        borderRadius: '16px',
        padding: '16px',
        background: theme.palette.secondary.main,
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        '@media (max-width: 480px)': {
            padding: '12px',
        },
    },
    title: {
        fontFamily: "'Saira'",
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '20px',
        cursor: 'pointer',
        marginBottom: '20px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        '@media (max-width: 480px)': {
            fontSize: '18px',
        },
    },
    titleLink: {
        display: 'block',
        lineHeight: '1',
    },
    topIcons: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        gap: 30,
        '@media (max-width: 480px)': {
            gap: 16,
        },
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
        '@media (max-width: 480px)': {
            width: '56px',
            height: '56px',
            '& img': {
                width: 48,
            },
        },
    },
    statsBlocks: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        gap: '4px',
    },
    statsBlock: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        minWidth: 0,
    },
    statsIcon: {},
    statsNumber: {
        maxWidth: '100%',
        whiteSpace: 'nowrap',
    },
    authorBlock: {
        display: 'flex',
        marginTop: '16px',
    },
    authorIcon: {
        marginRight: '4px',
    },
    authorName: {
        fontSize: '12px',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    description: {
        fontFamily: "'Saira'",
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '14px',
        opacity: '1',
        lineHeight: '110%',
        cursor: 'pointer',
        marginTop: '4px',
        display: '-webkit-box',
        WebkitLineClamp: 4,
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
