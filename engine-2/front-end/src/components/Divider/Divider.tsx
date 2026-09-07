import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { useStyles } from './Divider.styles';
import { useTheme } from '@mui/material/styles';
import logo from '../../assets/img/logo_net_small.svg';

interface DividerProps {
    /**
     * Stand des Punktes in Prozent. Ohne diese Angabe misst die Linie sich **selbst** -
     * das ist der Normalfall, siehe unten.
     */
    position?: number;
    /** nur zusammen mit `position`: Bezugsbreite fuer die Umrechnung in Pixel */
    parentWidth?: number;
    thick?: number;
    style?: React.CSSProperties;
    sx?: Record<string, any>;
    /** Trenner zur Fusszeile - bringt den groesseren Abstand nach oben mit */
    beforeFooter?: boolean;
}

/** naechster scrollender Vorfahr - auf den Doku- und Adapterseiten scrollt nicht das Fenster */
function findScroller(el: HTMLElement): HTMLElement | null {
    let node = el.parentElement;
    while (node) {
        const style = getComputedStyle(node);
        if (/(auto|scroll|overlay)/.test(style.overflowY) && node.scrollHeight > node.clientHeight) {
            return node;
        }
        node = node.parentElement;
    }
    return null;
}

export default function Divider(props: DividerProps): React.JSX.Element {
    const { classes } = useStyles();
    const theme = useTheme();
    const ref = useRef<HTMLDivElement>(null);
    const [self, setSelf] = useState<{ percent: number; width: number } | null>(null);
    const controlled = props.position !== undefined;

    /**
     * Der Punkt setzt sich in Bewegung, **sobald die Linie zu sehen ist** (Denis,
     * 06.09.2026). Dafuer misst die Linie ihre eigene Lage im sichtbaren Ausschnitt:
     * taucht sie unten auf, steht der Punkt links; wandert sie nach oben aus dem Bild,
     * ist er rechts. Er legt seine Strecke also genau in der Zeit zurueck, in der man
     * ihn sehen kann.
     *
     * Vorher kam der Stand von der Seite: erst als Lesefortschritt (auf einer 17.845 px
     * langen Doku stand der Punkt bei jeder sichtbaren Gelegenheit schon fast rechts),
     * dann als Anlauf ueber den letzten Bildschirm - da stand er dagegen still, solange
     * die Linie im Bild war. Beides hat den Bezug zwischen Punkt und Linie verfehlt.
     *
     * Der Ausschnitt ist nicht immer das Fenster: auf den Doku- und Adapterseiten
     * scrollt ein innerer Block, deshalb `findScroller`.
     */
    const measure = useCallback((): void => {
        const el = ref.current;
        if (!el) {
            return;
        }
        const scroller = findScroller(el);
        const viewTop = scroller ? scroller.getBoundingClientRect().top : 0;
        const viewHeight = scroller ? scroller.clientHeight : window.innerHeight;
        if (viewHeight <= 0) {
            return;
        }
        const done = viewTop + viewHeight - el.getBoundingClientRect().top;
        setSelf({
            percent: Math.min(100, Math.max(0, Math.round((done / viewHeight) * 100))),
            width: el.clientWidth,
        });
    }, []);

    useEffect(() => {
        if (controlled) {
            return undefined;
        }
        // `capture`, damit auch das Scrollen innerer Bloecke ankommt - Scroll-Ereignisse
        // steigen nicht auf
        window.addEventListener('scroll', measure, true);
        window.addEventListener('resize', measure);
        measure();
        return () => {
            window.removeEventListener('scroll', measure, true);
            window.removeEventListener('resize', measure);
        };
    }, [controlled, measure]);

    let left: number | undefined;
    const percent = controlled ? props.position : self?.percent;
    if (percent !== undefined) {
        const width = (controlled ? props.parentWidth : self?.width) || window.innerWidth;
        left = Math.min(Math.max((width * percent) / 100 - 15, 0), Math.max(width - 15, 0));
    }

    return (
        <Box
            ref={ref}
            className={props.beforeFooter ? `${classes.divider} ${classes.beforeFooter}` : classes.divider}
            sx={{
                ...props.sx,
            }}
            style={{
                /**
                 * Eine Haarlinie, kein Markenstrich (Denis, 06.09.2026: "die Linie ist
                 * feiner"). Die Profil-App hatte diese Fassung schon; hier stand noch
                 * 2 px in `palette.primary.main`, was den Trenner so schwer machte wie
                 * eine Ueberschrift. Der Punkt darauf traegt das Motiv, die Linie trennt.
                 */
                borderBottom: `${props.thick || 1}px solid ${theme.custom.hairlineStrong}`,
                ...props.style,
            }}
        >
            {left !== undefined ? (
                <img
                    src={logo}
                    className={classes.logo}
                    style={{
                        left,
                    }}
                    alt="logo"
                />
            ) : null}
        </Box>
    );
}
