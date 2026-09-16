import { makeStyles } from '../../../../theme';

const height = 30;
/** how much further right the slanted edge stands at the top than at the bottom */
const slant = 10;
/*
 * The dark stroke between name and language runs parallel to the slanted edge: 108 degrees are
 * perpendicular to it (90 + atan(10 / 30)), and the edge lies at 9.5 pixels along the gradient -
 * so the stroke is 3 pixels wide.
 */
const divider = (color: string): string => `linear-gradient(108deg, #0d0d0d 0 12.5px, ${color} 12.5px)`;

export const useStyles = makeStyles()(theme => ({
    badge: {
        display: 'inline-flex',
        height: `${height}px`,
        // room for the tab of the puzzle piece
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
