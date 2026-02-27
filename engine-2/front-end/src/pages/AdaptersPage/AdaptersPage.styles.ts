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
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: '8px',
            height: '32px',
            width: '55px',
        },
        '& .MuiToggleButton-root': {
            border: 'none',
            borderRadius: '0',
            color: '#fff',
            padding: '0 5px',
            minWidth: '27px',
            '&:not(:last-of-type)': {
                borderRight: `2px solid ${theme.palette.primary.main}`,
            }
        },
    },
    container: {
        display: 'flex',
        gap: '30px',
    },
    menuBlock: {
        flexShrink: 0,
    },
    mainBlock: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxHeight: 'calc(100vh - 120px)', 
        overflowY: 'scroll', 
        overflowX: 'hidden',
        paddingRight: '12px', 
        marginRight: '8px',
        '&::-webkit-scrollbar': {
            width: '8px', 
        },
        '&::-webkit-scrollbar-track': {
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            border: `1px solid ${theme.palette.primary.main}`,
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.palette.secondary.main, // Голубой или белый по макету
            borderRadius: '8px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: theme.palette.secondary.main,
        },
    },
    searchAndMenuButton: {
        display: 'flex',
        justifyContent: 'space-between',
        flex: 1,
        marginLeft: 'calc(296px - 55px + 1px)',
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
                borderColor: `${theme.palette.primary.main} !important`,
                borderWidth: '2px !important',
            },
            '&:hover fieldset': {
                borderColor: `${theme.palette.primary.main} !important`,
            },
            '&.Mui-focused fieldset': {
                borderColor: `${theme.palette.primary.main} !important`,
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
            border: `2px solid ${theme.palette.primary.main}`,
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
                borderRight: `2px solid ${theme.palette.primary.main}`,
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
        paddingBottom: '100px', 
         [theme.breakpoints.up(1440)]: {
            gridTemplateColumns: 'repeat(auto-fill, 251px)',
        },
    },
}));
