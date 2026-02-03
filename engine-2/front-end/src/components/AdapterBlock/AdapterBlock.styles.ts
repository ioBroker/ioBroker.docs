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
    icon: {
        background: '#FFFFFF',
        borderRadius: '8px',
        padding: '4px',
        '& img': {
            width: 60,
        },
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
