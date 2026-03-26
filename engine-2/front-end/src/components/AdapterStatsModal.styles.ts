import { makeStyles } from '../theme'; 

export const useStyles = makeStyles()((theme) => ({
    dialogPaper: {
        borderRadius: '6px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #D8D8D8',
        boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
    },
    container: {
        padding: '20px 24px 18px 24px',
        minWidth: '720px',
        maxWidth: '920px',
        '@media (max-width: 900px)': {
            minWidth: 'unset',
            width: '100%',
            padding: '20px',
        },
    },
    title: {
        fontSize: '16px',
        fontWeight: 500,
        color: '#3A3A3A',
        marginBottom: '10px',
    },
    total: {
        fontSize: '20px',
        fontWeight: 600,
        textAlign: 'center',
        marginBottom: '12px',
        color: '#3A3A3A',
    },
    content: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        alignItems: 'start',
        '@media (max-width: 900px)': {
            width: '400px',
            gridTemplateColumns: '1fr',
        },
         '@media (max-width: 530px)': {
            width: '300px',
        },
    },
    chartCard: {
        border: '1px solid #E6E6E6',
        borderRadius: '6px',
        padding: '12px',
        backgroundColor: '#FFFFFF',
    },
    tableCard: {
        border: '1px solid #E6E6E6',
        borderRadius: '6px',
        padding: '10px 12px',
        backgroundColor: '#FFFFFF',
        maxHeight: '324px', 
        overflowY: 'auto',
    },
    tableHeader: {
        display: 'grid',
        gridTemplateColumns: '1fr 80px 60px',
        fontWeight: 600,
        fontSize: '14px',
        color: '#5A5A5A',
        marginBottom: '6px',
    },
    sortHeader: {
        cursor: 'pointer',
        userSelect: 'none',
        display: 'inline-flex',
        alignItems: 'center',
    },
    sortArrow: {
        fontSize: '12px',
        marginLeft: '4px',
    },
    tableRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 80px 60px',
        fontSize: '14px',
        color: '#3A3A3A',
        padding: '6px 0',
        borderTop: '1px solid #EEEEEE',
    },
    closeRow: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '12px',
    },
    closeButton: {
        border: 'none',
        background: 'transparent',
        color: '#5A5A5A',
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '13px',
        cursor: 'pointer',
        padding: '8px 16px',
        '&:hover': {
            backgroundColor: '#F0F0F0',
            borderRadius: '4px'
        }
    },
}));
