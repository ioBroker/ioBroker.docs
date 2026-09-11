import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    faqSection: {
        position: 'relative',
        backgroundColor: theme.palette.background.default,
        overflow: 'hidden',
        paddingTop: theme.custom.layout.section.lg,
        paddingBottom: theme.custom.layout.section.lg,
        [theme.breakpoints.down('md')]: {
            paddingTop: theme.custom.layout.section.md,
            paddingBottom: theme.custom.layout.section.md,
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.custom.layout.section.sm,
            paddingBottom: theme.custom.layout.section.sm,
        },
    },
    container: {
        maxWidth: theme.custom.layout.contentMaxWidth + 2 * theme.custom.layout.gutter.lg,
        margin: '0 auto',
        padding: `0 ${theme.custom.layout.gutter.lg}px`,
        position: 'relative',
        zIndex: 1,
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            padding: `0 ${theme.custom.layout.gutter.sm}px`,
        },
    },
    label: {
        ...theme.custom.reading.caption,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: theme.palette.primary.main,
        marginBottom: '20px',
    },
    labelSlashes: {
        color: theme.palette.primary.main,
        marginRight: '8px',
    },
    /*
     * Die Fragen stehen als Liste mit Haarlinien, wie die drei Schritte im Abschnitt
     * darueber: dieselbe Handschrift, kein zweites Muster fuer denselben Zweck. Die
     * Antworten sind zugeklappt, damit die Liste als Ganzes ueberblickbar bleibt.
     */
    list: {
        marginTop: '8px',
        borderBottom: `1px solid ${theme.custom.hairline}`,
    },
    item: {
        borderTop: `1px solid ${theme.custom.hairline}`,
        // die erste Frage beginnt ohne Linie, sie stuende sonst direkt unter der Kennzeile
        '&:first-of-type': {
            borderTop: 'none',
        },
    },
    /*
     * Die Frage ist die Schaltflaeche. Das eigene Dreieck des Browsers wird
     * ausgeblendet, rechts steht stattdessen ein Kreuz, das sich beim Oeffnen dreht.
     */
    question: {
        listStyle: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
        padding: '22px 0',
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '20px',
        lineHeight: 1.3,
        color: theme.custom.textHeading,
        transition: 'color 0.2s ease',
        '&::-webkit-details-marker': {
            display: 'none',
        },
        '&:hover': {
            color: theme.palette.primary.main,
        },
        '&:focus-visible': {
            outline: 'none',
            boxShadow: theme.custom.focusRing,
            borderRadius: theme.custom.radius.control,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '17px',
            gap: '16px',
            padding: '18px 0',
        },
    },
    /*
     * Rechts steht unser Pfeil, nicht ein eigenes Zeichen, und zwar schraeg wie ueberall
     * sonst auf der Seite: zu zeigt er nach schraeg unten, offen nach schraeg oben. Das
     * Bild liegt von sich aus richtig, dazwischen liegt eine halbe Drehung.
     */
    sign: {
        flexShrink: 0,
        width: '22px',
        height: '22px',
        transition: 'transform 0.2s ease',
        'details[open] &': {
            transform: 'rotate(180deg)',
        },
        [theme.breakpoints.down('sm')]: {
            width: '18px',
            height: '18px',
        },
    },
    answer: {
        ...theme.custom.reading.body,
        color: theme.custom.textMuted,
        maxWidth: '820px',
        margin: 0,
        padding: '0 0 24px',
        [theme.breakpoints.down('sm')]: {
            padding: '0 0 18px',
        },
    },
}));
