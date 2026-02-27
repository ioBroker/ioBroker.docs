import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    tableContainer: {
        width: '100%',
        maxHeight: 'calc(100vh - 300px)',
    },
    table: {
        borderCollapse: 'separate',
        borderSpacing: '0 8px',
        '& .MuiTableCell-root': {
            borderBottom: 'none',
            padding: '16px',
            color: '#fff',
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
            color: '#fff',
            paddingBottom: '8px',
            background: 'transparent',
            borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
        },
    },
    tableRow: {
        '& .MuiTableCell-root': {
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            verticalAlign: 'top'
        },
    },
    nameCell: {
        width: '20%',
        verticalAlign: 'top'
    },
    nameContent: {
        display: 'flex',
        alignItems: 'start',
        gap: '12px',
        textDecoration: 'none',
        color: '#fff',
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
    },
    adapterName: {
        fontSize: '16px',
        fontWeight: 400,
    },
    descriptionCell: {
        width: '35%',
        fontSize: '14px',
        color: 'rgba(255, 255, 255, 0.7)',
    },
    authorCell: {
        width: '20%',
        fontSize: '14px',
    },
    statsCell: {
        width: '5%',
        textAlign: 'center',
        fontSize: '14px',
    },
    lastCell: {

    },
    headerIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& img': {
            width: '20px',
            height: '20px',
        },
    },
}));
