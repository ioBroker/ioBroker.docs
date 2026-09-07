import { makeStyles } from '../../theme';

export const useStyles = makeStyles<{ isFluid?: boolean }>()((theme, { isFluid }) => {
    /**
     * Above 900 px the field keeps its set width beside the menu column; below it the row
     * is the only thing on the line, so the field simply takes what is left.
     * This replaces a ladder of hand-measured widths at 902 / 768 / 595 / 451 px - four
     * numbers that belonged to no breakpoint of the site and, on a 375 px phone, still
     * left the field 33 px wider than its row.
     */
    const widths = {
        [theme.breakpoints.down('md')]: {
            width: '100%',
            minWidth: 0,
        },
    };

    return {
        // filled field on the first surface step - the hairline replaces the border
        topBarSearch: {
            width: isFluid ? '100%' : '460px',
            // a flex item only shrinks below its content when its automatic minimum is lifted
            minWidth: 0,
            '& img': {
                width: '18px',
                height: '18px',
                opacity: 0.7,
                filter:
                    theme.palette.mode !== 'dark'
                        ? 'brightness(0) saturate(100%) invert(23%) sepia(89%) saturate(1247%) hue-rotate(175deg) brightness(95%) contrast(101%)'
                        : 'none',
            },
            ...(!isFluid && widths),
            '& .MuiTextField-root': {
                width: isFluid ? '100%' : '460px',
                ...(!isFluid && widths),
            },
            '& .MuiOutlinedInput-root': {
                height: `${theme.custom.control.compactHeight}px`,
                borderRadius: `${theme.custom.radius.control}px`,
                paddingLeft: '10px',
                background: theme.custom.surfaces.surface,
                transition: 'background 0.2s ease, box-shadow 0.2s ease',
                '& fieldset': {
                    border: 'none',
                },
                boxShadow: `inset 0 0 0 1px ${theme.custom.hairline}`,
                '&:hover': {
                    background: theme.custom.surfaces.raised,
                },
                '&:hover fieldset': {
                    border: 'none',
                },
                '&.Mui-focused': {
                    background: theme.custom.surfaces.raised,
                    boxShadow: theme.custom.focusRing,
                },
                '&.Mui-focused fieldset': {
                    border: 'none',
                },
            },
            '& .MuiInputBase-input': {
                color: theme.palette.text.primary,
                fontSize: '15px',
                padding: '0px',
                '&::placeholder': {
                    color: theme.custom.textSubtle,
                    opacity: 1,
                },
            },
        },
    };
});
