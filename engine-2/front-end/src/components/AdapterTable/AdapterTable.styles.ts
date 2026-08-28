import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => {
    const cellText = {
        fontSize: '15px',
        fontWeight: 400,
        lineHeight: 1.5,
        color: theme.custom.textMuted,
        [theme.breakpoints.down(1280)]: {
            fontSize: '14px',
        },
    } as const;

    return {
        tableContainer: {
            width: '100%',
            marginBottom: '100px',
        },
        // rows are separated by hairlines, not by frames or blue lines
        table: {
            borderCollapse: 'collapse',
            '& .MuiTableCell-root': {
                borderBottom: 'none',
                padding: '14px 16px',
                color: theme.palette.text.primary,
                fontFamily: "'Roboto', sans-serif",
            },
        },
        tableHead: {
            '& .MuiTableRow-root': {
                background: 'transparent',
            },
            '& .MuiTableCell-root': {
                fontFamily: theme.typography.h1.fontFamily,
                fontWeight: 400,
                fontSize: '15px',
                letterSpacing: '0.02em',
                color: theme.custom.textSubtle,
                padding: '0 16px 12px 16px',
                background: 'transparent',
                borderBottom: `1px solid ${theme.custom.hairline}`,
            },
        },
        tableRow: {
            transition: 'background 0.2s ease',
            '& .MuiTableCell-root': {
                borderBottom: `1px solid ${theme.custom.hairline}`,
                verticalAlign: 'top',
            },
            '&:hover .MuiTableCell-root': {
                background: theme.custom.surfaces.surface,
            },
            '&:hover .MuiTableCell-root:first-of-type': {
                borderTopLeftRadius: `${theme.custom.radius.chip}px`,
                borderBottomLeftRadius: `${theme.custom.radius.chip}px`,
            },
            '&:hover .MuiTableCell-root:last-of-type': {
                borderTopRightRadius: `${theme.custom.radius.chip}px`,
                borderBottomRightRadius: `${theme.custom.radius.chip}px`,
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
            color: 'inherit',
        },
        adapterIcon: {
            width: '36px',
            height: '36px',
            background: '#fff',
            borderRadius: `${theme.custom.radius.chip}px`,
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: `inset 0 0 0 1px ${theme.custom.hairline}`,
            '& img': {
                width: '100%',
                height: '100%',
                objectFit: 'contain',
            },
            [theme.breakpoints.down(1281)]: {
                width: '32px',
                height: '32px',
            },
        },
        adapterName: {
            fontSize: '16px',
            fontWeight: 700,
            lineHeight: 1.3,
            color: theme.palette.text.primary,
            transition: 'color 0.2s ease',
            '&:hover': {
                color: theme.palette.primary.main,
            },
            [theme.breakpoints.down(1280)]: {
                fontSize: '15px',
            },
        },
        descriptionCell: {
            width: '35%',
            ...cellText,
        },
        authorCell: {
            width: '20%',
            ...cellText,
            color: theme.custom.textSubtle,
        },
        statsCell: {
            width: '5%',
            textAlign: 'center',
            fontVariantNumeric: 'tabular-nums',
            ...cellText,
        },
        lastCell: {},
        headerIcon: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& img': {
                width: '18px',
                height: '18px',
                opacity: 0.7,
                filter:
                    theme.palette.mode === 'dark'
                        ? 'none'
                        : 'brightness(0) saturate(100%) invert(23%) sepia(89%) saturate(1247%) hue-rotate(175deg) brightness(95%) contrast(101%)',
            },
        },
    };
});
