import React from 'react';
import { Box } from '@mui/material';
import { useStyles } from './ScriptEditor.styles';
import { I18n } from '../../../../utils/i18n';

const COMMENTS = 'home.demo.scenes.away.comments';

type TokenKind = 'fn' | 'prop' | 'str' | 'cmt' | 'kw' | 'text';
type Token = [TokenKind, string];

/** die drei Datenpunkte, die geschaltet werden, und ihr Kommentar in der Sprachdatei */
const TARGETS = [
    { id: 'CameraMonitoring', comment: '1' },
    { id: 'PresenceSimulation', comment: '2' },
    { id: 'RolloAutomatic', comment: '3' },
] as const;

/**
 * Das Skript in Zeilen und Stuecken, jedes mit seiner Art fuer die Faerbung. Die Adressen
 * sind Code und bleiben in jeder Sprache gleich, uebersetzt werden nur die Kommentare.
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
 * Der Code-Editor des JavaScript-Adapters mit einem TypeScript-Skript, in den Farben,
 * die man aus VS Code kennt - der Adapter nutzt denselben Editor.
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
