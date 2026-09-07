import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    container: {
        maxWidth: 1376,
        margin: '0 auto',
        padding: `0 ${theme.custom.layout.gutter.lg}px`,
        [theme.breakpoints.down('sm')]: {
            padding: `0 ${theme.custom.layout.gutter.sm}px`,
        },
    },
    newsletterSection: {
        position: 'relative',
        zIndex: 2,
        padding: '96px 0',
        [theme.breakpoints.down('md')]: {
            padding: '64px 0',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '48px 0',
        },
    },
    newsletterContent: {
        display: 'flex',
        gap: '55px',
        alignItems: 'end',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            // stacked, but still starting at the same edge as everything else - nothing
            // on this site is centred, and this block was the exception
            alignItems: 'flex-start',
            gap: '51px',
        },
    },
    newsletterText: {
        width: '460px',
        marginRight: '153px',
        height: 'fit-content',
        [theme.breakpoints.down('lg')]: {
            marginRight: 0,
        },
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
        },
    },
    newsletterTitle: {
        fontWeight: '500',
        fontSize: '20px',
        letterSpacing: '-0.03em',
        marginBottom: theme.spacing(1),
        marginTop: 0,
        lineHeight: '130%',
        [theme.breakpoints.down('sm')]: {
            fontSize: '18px',
            marginTop: 0,
        },
        // [theme.breakpoints.down('md')]: {
        //     textAlign: 'center'
        // },
    },
    newsletterSubTitle: {
        fontWeight: '400',
        /**
         * Half strength on the dark ground: white at 0.5 measures 5.3:1 there, clear of
         * the 4.5:1 running text needs. On the light theme the same trick would put the
         * brand tone at about 2.6:1 on white - unreadable - so the text steps back
         * through its own quieter tone instead.
         */
        ...(theme.palette.mode === 'dark' ? { opacity: 0.5 } : { color: theme.custom.textSubtle }),
        fontSize: theme.custom.reading.body.fontSize,
        letterSpacing: '0',
        // marginBottom: theme.spacing(2),
        // paddingBottom: '10px',
        lineHeight: theme.custom.reading.body.lineHeight,
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
            marginBottom: 0,
            paddingBottom: 0,
        },
    },
    newsletterInputContainer: {
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        padding: `0 ${theme.spacing(1)}`,
        width: '300px',
        [theme.breakpoints.down('md')]: {
            width: '260px',
        },
        [theme.breakpoints.down('sm')]: {
            width: '220px',
        },
        // 230 px field plus the two braces and the arrow button were 337 px - wider than
        // a 320 px phone. Below this the field takes what the row has left instead.
        [theme.breakpoints.down(400)]: {
            width: 'auto',
            flex: '1 1 auto',
            minWidth: 0,
        },
    },
    bracesLeft: {
        borderTop: `1px solid ${theme.palette.primary.main}`,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderLeft: `1px solid ${theme.palette.primary.main}`,
        // Without this, Flexbox compresses the arm; one shrank to 0 px in the footer
        // and the bracket was missing on one side.
        flexShrink: 0,
        // Arm length from the kit; see `theme.custom.brace`.
        width: theme.custom.brace.lg,
        height: 52,
        [theme.breakpoints.down('md')]: {
            width: theme.custom.brace.md,
            height: 48,
        },
        [theme.breakpoints.down('sm')]: {
            width: theme.custom.brace.sm,
            height: 44,
        },
    },
    bracesRight: {
        borderTop: `1px solid ${theme.palette.primary.main}`,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderRight: `1px solid ${theme.palette.primary.main}`,
        // Without this, Flexbox compresses the arm; one shrank to 0 px in the footer
        // and the bracket was missing on one side.
        flexShrink: 0,
        // Arm length from the kit; see `theme.custom.brace`.
        width: theme.custom.brace.lg,
        height: 52,
        [theme.breakpoints.down('md')]: {
            width: theme.custom.brace.md,
            height: 48,
        },
        [theme.breakpoints.down('sm')]: {
            width: theme.custom.brace.sm,
            height: 44,
        },
    },
    newsletterInput: {
        flex: 1,
        backgroundColor: 'transparent',
        // the field is an input, not a headline - it reads on the same step as the
        // running text beside it. At 24 px it was set larger than anything else on
        // the page, which is what made the whole block look enormous.
        fontSize: theme.custom.reading.body.fontSize,
        lineHeight: theme.custom.reading.body.lineHeight,
        border: 'none',
        color: theme.palette.text.primary,
        padding: theme.spacing(1),
        outline: 'none',
        // The one deliberate centring on the page: the field sits between two brackets
        // and is much wider than the address in it - left aligned, the text clung to the
        // left bracket and left the rest of the field empty. This applies to what is
        // typed as well, since a placeholder cannot be aligned on its own.
        textAlign: 'center',
        '&::placeholder': {
            color: theme.palette.text.primary,
            // Quieter than before (0.6): the placeholder is an example, not information
            // that must be read, and should not make the field look filled (Denis, 06.09.2026).
            opacity: 0.45,
            // pulled apart so the line carries the width of the field
            letterSpacing: '0.12em',
            /**
             * Below this point the field no longer carries the row: below 400 px it takes
             * only the space left by the row (167 px inside at 360 px), while the
             * letter-spaced "ihreemail@email.com" needs 191 px and was clipped on the right
             * (Denis, 06.09.2026). Without spacing it is 157 px and fits. The spacing was
             * a remedy for an overly empty field, not a value in itself.
             */
            [theme.breakpoints.down(400)]: {
                letterSpacing: 'normal',
            },
        },
    },
}));
