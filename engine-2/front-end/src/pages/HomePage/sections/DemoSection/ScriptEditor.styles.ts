import { makeStyles } from '../../../../theme';

/*
 * The colours of the code editor in its dark theme ("Dark+"). Like the two other views it stays
 * dark in both themes of the page.
 */
const ink = {
    ground: '#1e1e1e',
    text: '#d4d4d4',
    lineNumber: '#858585',
    fn: '#dcdcaa',
    prop: '#9cdcfe',
    str: '#ce9178',
    cmt: '#6a9955',
    kw: '#569cd6',
};

export const useStyles = makeStyles()(theme => ({
    editor: {
        flex: 1,
        display: 'flex',
        borderRadius: theme.custom.radius.group,
        overflow: 'hidden',
        backgroundColor: ink.ground,
    },
    /** long lines are not wrapped but scrolled sideways - as in the editor */
    code: {
        flex: 1,
        margin: 0,
        padding: '18px 20px 18px 0',
        overflowX: 'auto',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
        fontSize: '14px',
        lineHeight: 1.7,
        color: ink.text,
        [theme.breakpoints.down('sm')]: {
            fontSize: '13px',
        },
    },
    line: {
        display: 'block',
        whiteSpace: 'pre',
    },
    lineNumber: {
        display: 'inline-block',
        width: '3em',
        marginRight: '1.5em',
        textAlign: 'right',
        color: ink.lineNumber,
        userSelect: 'none',
    },
    fn: {
        color: ink.fn,
    },
    prop: {
        color: ink.prop,
    },
    str: {
        color: ink.str,
    },
    cmt: {
        color: ink.cmt,
    },
    kw: {
        color: ink.kw,
    },
    text: {
        color: ink.text,
    },
}));
