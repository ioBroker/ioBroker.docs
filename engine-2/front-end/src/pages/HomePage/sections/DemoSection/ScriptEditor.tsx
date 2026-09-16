import React from 'react';
import { Box } from '@mui/material';
import { useStyles } from './ScriptEditor.styles';
import { I18n } from '../../../../utils/i18n';

const COMMENTS = 'home.demo.scenes.away.comments';

type TokenKind = 'fn' | 'prop' | 'str' | 'cmt' | 'kw' | 'text';
type Token = [TokenKind, string];

/** the three data points that are switched, and their comment in the language file */
const TARGETS = [
    { id: 'CameraMonitoring', comment: '1' },
    { id: 'PresenceSimulation', comment: '2' },
    { id: 'RolloAutomatic', comment: '3' },
] as const;

/**
 * The script in lines and pieces, each with its kind for the colouring. The addresses are code
 * and stay the same in every language, only the comments are translated.
 */
function getLines(): Token[][] {
    const comment = (key: string): Token => ['cmt', `/* ${I18n.t(`${COMMENTS}.${key}`)} */`];

    return [
        [
            ['fn', 'on'],
            ['text', '({ '],
            ['prop', 'id'],
            ['text', ': '],
            ['str', "'0_userdata.0.NobodyHome'"],
            ['text', ' '],
            comment('trigger'),
            ['text', ', '],
            ['prop', 'val'],
            ['text', ': '],
            ['kw', 'true'],
            ['text', ' }, () '],
            ['kw', '=>'],
            ['text', ' {'],
        ],
        ...TARGETS.map((target): Token[] => [
            ['text', '    '],
            ['fn', 'setState'],
            ['text', '('],
            ['str', `'0_userdata.0.${target.id}'`],
            ['text', ' '],
            comment(target.comment),
            ['text', ', '],
            ['kw', 'true'],
            ['text', ');'],
        ]),
        [['text', '});']],
    ];
}

/**
 * The code editor of the JavaScript adapter with a TypeScript script, in the colours known from
 * VS Code - the adapter uses the same editor.
 */
export const ScriptEditor: React.FC = () => {
    const { classes } = useStyles();

    const kindClass: Record<TokenKind, string> = {
        fn: classes.fn,
        prop: classes.prop,
        str: classes.str,
        cmt: classes.cmt,
        kw: classes.kw,
        text: classes.text,
    };

    return (
        <Box className={classes.editor}>
            <pre className={classes.code}>
                {getLines().map((tokens, line) => (
                    <span
                        key={line}
                        className={classes.line}
                    >
                        <span
                            className={classes.lineNumber}
                            aria-hidden="true"
                        >
                            {line + 1}
                        </span>
                        {tokens.map(([kind, text], index) => (
                            <span
                                key={index}
                                className={kindClass[kind]}
                            >
                                {text}
                            </span>
                        ))}
                    </span>
                ))}
            </pre>
        </Box>
    );
};
