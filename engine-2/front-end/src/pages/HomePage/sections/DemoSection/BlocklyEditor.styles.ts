import { makeStyles } from '../../../../theme';

/*
 * The colours of the Blockly blocks, as the adapter draws them: pink for events, blue for logic
 * and control, violet for numbers. As with the rules editor, the workspace stays dark in both
 * themes of the page.
 */
const ink = {
    workspace: '#0b101b',
    dots: 'rgba(255, 255, 255, 0.2)',
    event: '#a55b80',
    eventField: '#e2bfd1',
    logic: '#5b80a5',
    logicField: '#cfdae6',
    number: '#5b67a5',
    object: '#86b8a7',
    objectField: '#e5efeb',
    gear: '#5b4fd4',
    comment: '#ffff3c',
    commentPaper: '#fff8a8',
    edge: 'rgba(255, 255, 255, 0.35)',
    seam: 'rgba(255, 255, 255, 0.16)',
    link: '#1d90ca',
    dark: '#111111',
    white: '#ffffff',
};

/** the small tab on the left with which a value block reaches into its slot */
const tab = {
    content: '""',
    position: 'absolute',
    left: '-6px',
    top: '6px',
    width: '6px',
    height: '14px',
    borderRadius: '4px 0 0 4px',
    backgroundColor: 'inherit',
} as const;

/** the tab at the bottom by which a command hangs on the next one */
const notch = {
    content: '""',
    position: 'absolute',
    left: '14px',
    bottom: '-5px',
    width: '16px',
    height: '5px',
    borderRadius: '0 0 4px 4px',
    backgroundColor: 'inherit',
    zIndex: 1,
} as const;

export const useStyles = makeStyles()(theme => ({
    /** the dotted workspace; if it is too narrow, it is scrolled as in the editor */
    workspace: {
        flex: 1,
        overflow: 'auto',
        padding: '28px',
        borderRadius: theme.custom.radius.group,
        backgroundColor: ink.workspace,
        backgroundImage: `radial-gradient(${ink.dots} 1px, transparent 1.5px)`,
        backgroundSize: '22px 22px',
        fontFamily: theme.typography.fontFamily,
        fontSize: '14px',
        lineHeight: 1.4,
        color: ink.white,
        whiteSpace: 'nowrap',
        [theme.breakpoints.down('sm')]: {
            padding: '20px 16px',
        },
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        minHeight: '28px',
    },
    field: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '1px 8px',
        borderRadius: '4px',
        color: ink.dark,
    },
    fieldEvent: {
        backgroundColor: ink.eventField,
    },
    fieldLogic: {
        backgroundColor: ink.logicField,
    },
    fieldNumber: {
        backgroundColor: '#d2d6ec',
    },
    caret: {
        fontSize: '11px',
        color: ink.event,
        marginLeft: '2px',
    },
    gear: {
        display: 'inline-grid',
        placeItems: 'center',
        width: '22px',
        height: '22px',
        borderRadius: '4px',
        fontSize: '16px',
        backgroundColor: ink.gear,
        boxShadow: `inset 0 0 0 1px ${ink.edge}`,
        color: ink.white,
    },
    /** a block that sits in a slot as a value */
    value: {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '4px 8px',
        borderRadius: '4px',
        boxShadow: `inset 0 0 0 1px ${ink.edge}`,
        '&::before': tab,
    },
    objectBlock: {
        backgroundColor: ink.object,
    },
    objectField: {
        backgroundColor: ink.objectField,
    },
    objectIcon: {
        fontSize: '18px',
        color: ink.link,
    },
    equals: {
        marginLeft: '4px',
        fontWeight: 700,
        color: ink.link,
    },
    compareBlock: {
        backgroundColor: ink.logic,
    },
    eventValue: {
        backgroundColor: ink.event,
        padding: '2px 6px',
    },
    valueIcon: {
        fontSize: '16px',
        color: ink.white,
    },
    numberBlock: {
        backgroundColor: ink.number,
        padding: '2px 6px',
    },
    booleanBlock: {
        backgroundColor: ink.logic,
        padding: '2px 6px',
    },
    /*
     * The trigger block has the shape of a C: the head at the top with the object to its right, the
     * arm on the left, the foot at the bottom. The grid aligns head and foot on the same edge - the
     * third column is flexible, so that the content does not widen it.
     */
    event: {
        display: 'inline-grid',
        gridTemplateColumns: '20px max-content 1fr',
        gridTemplateRows: 'auto auto 20px',
    },
    eventHead: {
        gridColumn: '1 / 3',
        gridRow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        padding: '8px 12px 10px 10px',
        borderRadius: '12px 4px 0 0',
        backgroundColor: ink.event,
    },
    eventSlot: {
        gridColumn: 3,
        gridRow: 1,
        justifySelf: 'start',
        alignSelf: 'start',
        paddingTop: '6px',
    },
    eventArm: {
        gridColumn: 1,
        gridRow: 2,
        backgroundColor: ink.event,
    },
    eventBody: {
        gridColumn: '2 / 4',
        gridRow: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    eventFoot: {
        gridColumn: '1 / 3',
        gridRow: 3,
        borderRadius: '0 0 4px 12px',
        backgroundColor: ink.event,
    },
    /** the yellow comment attached to the "if" block */
    comment: {
        position: 'relative',
        zIndex: 2,
        marginTop: '4px',
        marginBottom: '-4px',
        padding: '4px',
        borderRadius: '4px',
        backgroundColor: ink.comment,
        '&::after': {
            content: '""',
            position: 'absolute',
            left: '28px',
            bottom: '-8px',
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: `8px solid ${ink.comment}`,
        },
    },
    commentText: {
        display: 'block',
        padding: '4px 10px',
        borderRadius: '2px',
        backgroundColor: ink.commentPaper,
        color: ink.dark,
    },
    /** the "if" block is a C again, the commands sit in its mouth */
    ifBlock: {
        position: 'relative',
        display: 'inline-grid',
        gridTemplateColumns: 'max-content 1fr',
        gridTemplateRows: 'auto auto 18px',
        '&::after': notch,
    },
    ifLabel: {
        gridColumn: 1,
        gridRow: 1,
        padding: '8px 10px 8px 12px',
        backgroundColor: ink.logic,
        borderRadius: '4px 0 0 0',
    },
    ifSlot: {
        gridColumn: 2,
        gridRow: 1,
        justifySelf: 'start',
        display: 'flex',
        alignItems: 'center',
        padding: '6px 10px 6px 12px',
        backgroundColor: ink.logic,
        borderRadius: '0 4px 0 0',
    },
    doLabel: {
        gridColumn: 1,
        gridRow: 2,
        padding: '10px 16px 0 12px',
        backgroundColor: ink.logic,
    },
    ifBody: {
        gridColumn: 2,
        gridRow: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    ifFoot: {
        gridColumn: 1,
        gridRow: 3,
        width: 'calc(100% + 40px)',
        borderRadius: '0 0 4px 4px',
        backgroundColor: ink.logic,
    },
    /** a control command: "control <object> with <value> with delay" */
    control: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '5px 10px',
        borderRadius: '0 4px 4px 0',
        backgroundColor: ink.logic,
        boxShadow: `inset 0 1px 0 0 ${ink.seam}, inset -1px 0 0 0 ${ink.seam}`,
        '&::after': notch,
    },
    checkbox: {
        width: '18px',
        height: '18px',
        borderRadius: '4px',
        backgroundColor: ink.logicField,
    },
}));
