import React from 'react';
import { useStyles } from './EditorBadge.styles';

export type EditorKind = 'rules' | 'blockly' | 'typescript';

/** the names stand on the badges like this in the adapter and are not translated */
const BADGES: Record<EditorKind, { name: string; language: string }> = {
    rules: { name: 'RULES', language: 'JS' },
    blockly: { name: 'Blockly', language: 'JS' },
    typescript: { name: 'TypeScript', language: 'TS' },
};

/**
 * The badge with which the JavaScript adapter marks the kind of a script: on the left a puzzle
 * piece with the name of the editor, on the right, set off at a slant, the language it is
 * compiled to.
 */
export const EditorBadge: React.FC<{ editor: EditorKind }> = ({ editor }) => {
    const { classes, cx } = useStyles();
    const badge = BADGES[editor];

    return (
        <span className={classes.badge}>
            <span className={cx(classes.name, classes[editor])}>{badge.name}</span>
            <span className={cx(classes.language, editor === 'typescript' ? classes.languageTs : classes.languageJs)}>
                {badge.language}
            </span>
        </span>
    );
};
