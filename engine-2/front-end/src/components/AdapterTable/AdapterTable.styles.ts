import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    tableContainer: {
        width: '100%',
        marginBottom: '100px',
    },
    table: {
        borderCollapse: 'separate',
        borderSpacing: '0 8px',
        '& .MuiTableCell-root': {
            borderBottom: 'none',
            padding: '16px',
            color: theme.palette.mode === 'dark' ? 'white' : theme.palette.secondary.main,
            fontFamily: "'Saira'",
        },
    },
    tableHead: {
        '& .MuiTableRow-root': {
            background: 'transparent',
        },
        '& .MuiTableCell-root': {
            fontFamily: theme.typography.h1.fontFamily,
            fontWeight: 400,
            fontSize: '20px',
            color: theme.palette.mode === 'dark' ? 'white' : theme.palette.secondary.main,
            paddingBottom: '16px',
            background: 'transparent',
            borderBottom:
                theme.palette.mode === 'dark'
                    ? `1px solid rgba(255, 255, 255, 0.1)`
                    : `1px solid rgba(29, 144, 202, 0.5)`,
        },
    },
    tableRow: {
        fontSize: '14px',
        fontWeight: 400,
        '& .MuiTableCell-root': {
            borderBottom:
                theme.palette.mode === 'dark'
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : `1px solid rgba(29, 144, 202, 0.5)`,
            verticalAlign: 'top',
            color: theme.palette.mode === 'dark' ? 'white' : theme.palette.secondary.main,
        },
    },
    nameCell: {
        width: '20%',
        verticalAlign: 'top',
    },
    nameContent: {
        display: 'flex',
        alignItems: 'start',
        gap: '12px',
        textDecoration: 'none',
        color: theme.palette.mode === 'dark' ? 'white' : theme.palette.secondary.main,
    },
    adapterIcon: {
        width: '40px',
        height: '40px',
        background: '#fff',
        borderRadius: '4px',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        '& img': {
            width: '40px',
            height: '40px',
            objectFit: 'contain',
        },
        [theme.breakpoints.down(1281)]: {
            width: '32px',
            height: '32px',
            '& img': {
                width: '32px',
                height: '32px',
                objectFit: 'contain',
            },
        },
    },
    adapterName: {
        fontSize: '14px',
        fontWeight: 400,
        letterSpacing: '-0.03em',
        color: theme.palette.mode === 'dark' ? 'white' : theme.palette.secondary.main,
        [theme.breakpoints.down(1441)]: {
            fontSize: '16px',
            fontWeight: 300,
        },
        [theme.breakpoints.down(1280)]: {
            fontSize: '14px',
            fontWeight: 300,
        },
    },
    descriptionCell: {
        width: '35%',
        fontSize: '14px',
        fontWeight: 400,
        letterSpacing: '-0.03em',
        color: theme.palette.mode === 'dark' ? 'white' : theme.palette.secondary.main,
        [theme.breakpoints.down(1441)]: {
            fontSize: '16px',
            fontWeight: 300,
        },
        [theme.breakpoints.down(1280)]: {
            fontSize: '14px',
            fontWeight: 300,
        },
    },
    authorCell: {
        width: '20%',
        fontSize: '14px',
        fontWeight: 400,
        letterSpacing: '-0.03em',
        color: theme.palette.mode === 'dark' ? 'white' : theme.palette.secondary.main,
        [theme.breakpoints.down(1441)]: {
            fontSize: '16px',
            fontWeight: 300,
        },
        [theme.breakpoints.down(1280)]: {
            fontSize: '14px',
            fontWeight: 300,
        },
    },
    statsCell: {
        width: '5%',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: 400,
        letterSpacing: '-0.03em',
        color: theme.palette.mode === 'dark' ? 'white' : theme.palette.secondary.main,
        [theme.breakpoints.down(1441)]: {
            fontSize: '16px',
            fontWeight: 300,
        },
        [theme.breakpoints.down(1280)]: {
            fontSize: '14px',
            fontWeight: 300,
        },
    },
    lastCell: {},
    headerIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& img': {
            width: '20px',
            height: '20px',
            filter:
                theme.palette.mode === 'dark'
                    ? 'none'
                    : 'brightness(0) saturate(100%) invert(23%) sepia(89%) saturate(1247%) hue-rotate(175deg) brightness(95%) contrast(101%)',
        },
    },
}));
