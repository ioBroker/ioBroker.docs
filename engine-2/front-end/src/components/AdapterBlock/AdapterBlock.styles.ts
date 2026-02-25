import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    card: {
        width: '292px',
        height: '294px',
        borderRadius: '16px',
        padding: '16px',
        background: '#005894',
        color: 'white',
    },
    title: {
        fontFamily: "'Saira'",
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '20px',
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
    statsBlock: {},
    statsIcon: {},
    statsNumber: {},
    authorBlock: {},
    authorIcon: {},
    authorName: {},
    description: {
        fontFamily: "'Saira'",
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '14px',
        opacity: '0.5',
        lineHeight: '110%',
    },
    bottomIcons: {},
    bottomIcon: {},
}));
