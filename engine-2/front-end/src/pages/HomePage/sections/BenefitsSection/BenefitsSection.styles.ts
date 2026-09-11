import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    benefitsSection: {
        position: 'relative',
        backgroundColor: theme.palette.background.default,
        overflow: 'hidden',
        paddingTop: theme.custom.layout.section.lg,
        paddingBottom: theme.custom.layout.section.lg,
        // ohne Licht: der Abschnitt steht auf dem ruhigen Grund (Denis, 11.09.2026)
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
     * Zwei Felder nebeneinander, wie im Entwurf. Vier in einer Reihe waeren hier zu eng:
     * anders als bei den vier Schritten steht in jedem Feld ein ganzer Satz.
     */
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: `${theme.custom.layout.grid}px`,
        // die Kennzeile steht allein ueber dem Raster, es ruecken 20 statt 48 Punkte
        marginTop: '20px',
        [theme.breakpoints.down('md')]: {
            marginTop: '16px',
        },
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr',
        },
    },
    /*
     * Das Feld ist hoeher als sein Inhalt: Nummer und Titel stehen oben, der Satz unten,
     * dazwischen liegt der freie Platz. Genauso sind die vier Schritte im Abschnitt
     * "Was ist ioBroker?" gebaut - das Feld bekommt damit Luft und eine Ordnung, statt
     * dass der Text am Titel klebt (Denis, 11.09.2026).
     */
    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '24px',
        minHeight: '250px',
        padding: '32px',
        borderRadius: theme.custom.radius.card,
        backgroundColor: theme.custom.surfaces.surface,
        boxShadow: theme.custom.elevation.card,
        [theme.breakpoints.down('md')]: {
            minHeight: '210px',
        },
        [theme.breakpoints.down('sm')]: {
            // untereinander waere die zusaetzliche Hoehe nur Leerraum
            minHeight: 0,
            gap: '16px',
            padding: '20px',
        },
    },
    /** Nummer und Titel gehoeren zusammen und stehen als Paar am oberen Rand */
    itemHead: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '10px',
    },
    /** dieselbe Nummer wie in den Abschnitten darueber */
    itemNumber: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '17px',
        lineHeight: 1.6,
        color: theme.custom.textAccent,
        whiteSpace: 'nowrap',
    },
    itemTitle: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '20px',
        fontWeight: 400,
        '&&': {
            lineHeight: 1.3,
        },
        color: theme.custom.textHeading,
        margin: 0,
        [theme.breakpoints.down('sm')]: {
            fontSize: '18px',
        },
    },
    itemText: {
        ...theme.custom.reading.body,
        color: theme.custom.textMuted,
    },
}));
