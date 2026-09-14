import { makeStyles } from '../../../../theme';

/*
 * Die Farben der Blockly-Bloecke, wie der Adapter sie zeichnet: rosa fuer Ereignisse,
 * blau fuer Logik und Steuerung, violett fuer Zahlen. Wie beim Regel-Editor bleibt die
 * Arbeitsflaeche in beiden Themen der Seite dunkel.
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

/** die kleine Nase links, mit der ein Wert-Block in seine Luecke greift */
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

/** die Nase unten, mit der ein Befehl am naechsten haengt */
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
    /** die gepunktete Arbeitsflaeche; ist sie zu schmal, wird sie wie im Editor geschoben */
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
    /** ein Block, der als Wert in einer Luecke steckt */
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
     * Der Ausloeser-Block hat die Form eines C: oben der Kopf mit dem Objekt rechts daneben,
     * links der Arm, unten der Fuss. Das Raster richtet Kopf und Fuss an derselben Kante
     * aus - die dritte Spalte ist flexibel, damit der Inhalt sie nicht verbreitert.
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
    /** der gelbe Kommentar, der am "falls"-Block haengt */
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
    /** der "falls"-Block ist wieder ein C, die Befehle stecken in seinem Mund */
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
    /** ein Steuerbefehl: "steuere <Objekt> mit <Wert> mit Verzoegerung" */
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
