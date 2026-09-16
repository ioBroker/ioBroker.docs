import { makeStyles } from '../../../../theme';

/*
 * The colours of the rules editor in the dark theme of the adapter. The view shows the editor as
 * it is - so it stays dark on the light page as well, just as a screenshot would.
 */
const ink = {
    ground: '#15181e',
    band: '#1a1e2f',
    then: '#13212a',
    card: '#1d222d',
    line: 'rgba(255, 255, 255, 0.24)',
    trigger: '#ec8a3c',
    condition: '#a78bee',
    action: '#4db6a0',
    link: '#5aa5f5',
    device: '#2e93d6',
    text: '#f2f4f7',
    muted: '#9aa2ad',
};

export const useStyles = makeStyles()(theme => ({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: theme.custom.radius.group,
        overflow: 'hidden',
        backgroundColor: ink.ground,
        fontFamily: theme.typography.fontFamily,
        color: ink.text,
    },
    section: {
        padding: '14px 18px 20px 18px',
        [theme.breakpoints.down('sm')]: {
            padding: '12px 12px 16px 12px',
        },
    },
    /** the part with the actions has a light green background and fills the rest */
    sectionThen: {
        flex: 1,
        backgroundColor: ink.then,
    },
    sectionTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '12px',
        fontSize: '14px',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
    },
    titleIf: {
        color: ink.trigger,
    },
    titleThen: {
        color: ink.action,
    },
    sectionIcon: {
        fontSize: '20px',
    },
    band: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 18px',
        backgroundColor: ink.band,
        borderTop: `1px solid ${ink.line}`,
        borderBottom: `1px solid ${ink.line}`,
        [theme.breakpoints.down('sm')]: {
            padding: '10px 12px',
        },
    },
    bandIcon: {
        fontSize: '20px',
        color: ink.condition,
    },
    bandTitle: {
        fontSize: '14px',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: ink.condition,
    },
    chevron: {
        fontSize: '18px',
        color: ink.muted,
    },
    bandText: {
        fontSize: '14px',
        color: ink.muted,
    },
    /*
     * The cards are as wide as the widest of them, as in the editor - and never wider than the room
     * they have.
     */
    cards: {
        display: 'grid',
        gridTemplateColumns: 'minmax(0, max-content)',
        gap: '10px',
    },
    card: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 14px 8px 12px',
        borderRadius: '8px',
        backgroundColor: ink.card,
        minWidth: 0,
    },
    /** the stripe on the left says which part of the rule the card belongs to */
    cardTrigger: {
        boxShadow: `inset 3px 0 0 0 ${ink.trigger}, 0 2px 6px rgba(0, 0, 0, 0.35)`,
    },
    cardAction: {
        boxShadow: `inset 3px 0 0 0 ${ink.action}, 0 2px 6px rgba(0, 0, 0, 0.35)`,
    },
    kindIcon: {
        fontSize: '18px',
        color: ink.text,
        flexShrink: 0,
    },
    device: {
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
    },
    deviceIcon: {
        fontSize: '24px',
        color: ink.device,
    },
    expand: {
        fontSize: '18px',
        color: ink.link,
    },
    text: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minWidth: 0,
    },
    caption: {
        fontSize: '11px',
        lineHeight: 1.4,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: ink.link,
    },
    name: {
        fontSize: '17px',
        lineHeight: 1.3,
        fontWeight: 700,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    /*
     * The address does not take part in deciding the width: it is as wide as the name above it and,
     * as in the editor, cut off with dots.
     */
    id: {
        width: 0,
        minWidth: '100%',
        fontSize: '13px',
        lineHeight: 1.4,
        color: ink.link,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    chip: {
        marginLeft: '16px',
        padding: '2px 12px',
        borderRadius: theme.custom.radius.pill,
        border: `1px solid ${ink.muted}`,
        fontSize: '13px',
        lineHeight: 1.4,
        color: ink.link,
        whiteSpace: 'nowrap',
        flexShrink: 0,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    help: {
        fontSize: '24px',
        color: ink.text,
        flexShrink: 0,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    /** the line with which an "else" branch is added */
    otherwise: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginTop: '20px',
        fontSize: '15px',
        color: ink.muted,
    },
    otherwiseIcon: {
        fontSize: '18px',
        color: ink.text,
    },
    otherwiseLine: {
        flex: 1,
        height: '1px',
        backgroundColor: ink.line,
    },
}));
