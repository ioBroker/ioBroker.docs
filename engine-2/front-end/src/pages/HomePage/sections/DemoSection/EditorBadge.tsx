import React from 'react';
import { useStyles } from './EditorBadge.styles';

export type EditorKind = 'rules' | 'blockly' | 'typescript';

/** die Namen stehen im Adapter so auf den Marken und werden nicht uebersetzt */
const BADGES: Record<EditorKind, { name: string; language: string }> = {
    rules: { name: 'RULES', language: 'JS' },
    blockly: { name: 'Blockly', language: 'JS' },
    typescript: { name: 'TypeScript', language: 'TS' },
};

/**
 * Die Marke, mit der der JavaScript-Adapter die Art eines Skripts kennzeichnet: links ein
 * Puzzleteil mit dem Namen des Editors, rechts schraeg abgesetzt die Sprache, in die er
 * uebersetzt wird.
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
