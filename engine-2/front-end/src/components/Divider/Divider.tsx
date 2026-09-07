import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useStyles } from './Divider.styles';
import logo from '../../assets/img/logo_net_small.svg';

interface DividerProps {
    /**
     * Dot position as a percentage. Without it, the line measures **itself**—the normal
     * case; see below.
     */
    position?: number;
    /** Only used with `position`: reference width for conversion to pixels. */
    parentWidth?: number;
    thick?: number;
    style?: React.CSSProperties;
    sx?: Record<string, any>;
    /** Footer divider; includes the larger space above it. */
    beforeFooter?: boolean;
}

/** Nearest scrolling ancestor; documentation and adapter pages do not scroll the window. */
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
     * The dot starts moving **as soon as the line becomes visible** (Denis, 06.09.2026).
     * The line measures its own position in the viewport: when it appears at the bottom,
     * the dot is left; when it leaves at the top, it is right. Thus it travels precisely
     * while visible.
     *
     * Previously its position came from the page: first as reading progress (on a
     * 17,845 px documentation page it was nearly right whenever visible), then as a run-up
     * over the final viewport—where it stayed still while the line was visible. Neither
     * connected the dot to the line correctly.
     *
     * The viewport is not always the window: documentation and adapter pages scroll an
     * inner block, hence `findScroller`.
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
        // `capture` also receives scroll events from inner blocks; scroll events do not bubble.
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
                 * A hairline, not a brand stroke (Denis, 06.09.2026: “the line is
                 * finer”). The profile app already used this version; this one still had
                 * 2 px in `palette.primary.main`, making the divider as heavy as a heading.
                 * The dot carries the motif; the line divides.
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
