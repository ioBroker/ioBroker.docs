import { makeStyles } from '../../../../theme';

const height = 30;
/** wie weit die schraege Kante oben weiter rechts steht als unten */
const slant = 10;
/*
 * Der dunkle Strich zwischen Name und Sprache laeuft parallel zur schraegen Kante: 108 Grad
 * stehen senkrecht auf ihr (90 + atan(10 / 30)), und die Kante liegt entlang des Verlaufs
 * bei 9,5 Bildpunkten - der Strich ist also 3 Bildpunkte breit.
 */
const divider = (color: string): string => `linear-gradient(108deg, #0d0d0d 0 12.5px, ${color} 12.5px)`;

export const useStyles = makeStyles()(theme => ({
    badge: {
        display: 'inline-flex',
        height: `${height}px`,
        // Platz fuer die Nase des Puzzleteils
        marginLeft: '6px',
        fontFamily: theme.typography.fontFamily,
        fontSize: '15px',
        fontWeight: 700,
        lineHeight: `${height}px`,
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap',
        flexShrink: 0,
    },
    name: {
        position: 'relative',
        padding: `0 ${slant + 8}px 0 12px`,
        borderRadius: '4px 0 0 4px',
        color: '#ffffff',
        '&::before': {
            content: '""',
            position: 'absolute',
            left: '-6px',
            top: '50%',
            width: '7px',
            height: '12px',
            transform: 'translateY(-50%)',
            borderRadius: '3px 0 0 3px',
            backgroundColor: 'inherit',
        },
    },
    rules: {
        backgroundColor: '#0b2a6e',
    },
    blockly: {
        backgroundColor: '#5b86b0',
    },
    typescript: {
        backgroundColor: '#262626',
    },
    language: {
        marginLeft: `-${slant}px`,
        padding: `0 10px 0 ${slant + 8}px`,
        borderRadius: '0 4px 4px 0',
        clipPath: `polygon(${slant}px 0, 100% 0, 100% 100%, 0 100%)`,
    },
    languageJs: {
        backgroundImage: divider('#f7df1e'),
        color: '#111111',
    },
    languageTs: {
        backgroundImage: divider('#3178c6'),
        color: '#ffffff',
    },
}));
