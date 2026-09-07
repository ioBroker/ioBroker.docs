import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    divider: {
        zIndex: 9,
        width: '100%',
        position: 'relative',
        overflow: 'visible',
        marginBottom: '8px',
    },
    /**
     * Dieselbe Linie, aber als Trenner zur Fusszeile. Ueber ihr lag bisher nur der
     * untere Innenabstand des letzten Abschnitts - auf dem Handy 48 px, zu wenig
     * (Denis, 06.09.2026). Die Zugabe steht hier und nicht an `divider`, weil dieselbe
     * Linie innerhalb der Seiten auch Abschnitte trennt; dort gilt weiter der Rhythmus
     * des Abschnitts. Der Abstand darunter bleibt klein, damit die Linie zur Fusszeile
     * gehoert und nicht zwischen den Bloecken schwebt.
     */
    beforeFooter: {
        marginTop: '64px',
        [theme.breakpoints.down('md')]: {
            marginTop: '48px',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '40px',
        },
    },
    logo: {
        position: 'absolute',
        width: 14,
        height: 14,
        // die Linie ist 1 px hoch, der Punkt 14 - die Haelfte davon haelt ihn mittig
        top: -7,
        borderRadius: '50%',
        backgroundColor: theme.palette.background.default,
    },
}));
