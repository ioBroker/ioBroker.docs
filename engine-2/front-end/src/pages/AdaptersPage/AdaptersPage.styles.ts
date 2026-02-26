import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    topBar: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '24px',
        margin: "0 32px 30px 32px"
    },
    menuToggle: {
        flexShrink: 0,
        '& .MuiToggleButtonGroup-root': {
            border: '2px solid #00A8E1',
            borderRadius: '8px',
            height: '32px',
            width: '55px',
        },
        '& .MuiToggleButton-root': {
            border: 'none',
            borderRadius: '0',
            color: '#fff',
            padding: '0 5px',
            '&:not(:last-of-type)': {
                borderRight: '2px solid #00A8E1',
            }
        },
    },
    container: {
        display: 'flex',
        gap: '33px',
    },
    menuBlock: {
        flexShrink: 0,
    },
    mainBlock: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    searchAndMenuButton: {
        display: 'flex',
        justifyContent: 'space-between',
        flex: 1,
        marginLeft: 'calc(304px - 55px + 1px)',
    },
    adaptersSearch: {
        width: '460px',

        '& .MuiTextField-root': {
            width: '460px',
        },
        '& .MuiOutlinedInput-root': {
            height: '32px',
            borderRadius: '10px',
            paddingLeft: '12px',
            '& fieldset': {
                borderColor: '#00A8E1 !important',
                borderWidth: '2px !important',
            },
            '&:hover fieldset': {
                borderColor: '#00A8E1 !important',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#00A8E1 !important',
            },
        },
        '& .MuiInputBase-input': {
            color: '#fff',
            fontSize: '14px',
            padding: '0px',
        },
    },
    adaptersButton: {
        flexShrink: 0,
        '& .MuiToggleButtonGroup-root': {
            border: '2px solid #00A8E1',
            borderRadius: '8px',
            height: '32px',
            width: '76px'
        },
        '& .MuiToggleButton-root': {
            color: 'rgba(255, 255, 255, 0.7)',
            border: 'none',
            padding: '8px 12px',
            minWidth: '38px',
            '&:not(:last-of-type)': {
                borderRight: '2px solid #00A8E1',
            },
            '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
            },
        },
    },
    adaptersGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 292px)',
        gap: '20px',
    },
}));
