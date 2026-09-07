import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    /**
     * "Open the menu" - the single button variant of `MenuToggle`, for the widths where the
     * menu is an overlay and closes with its own cross, so a second, collapsing button next
     * to it would have nothing to do.
     */
    button: {
        all: 'unset',
        boxSizing: 'border-box',
        // a finger needs 44 px, the visible part stays the 40 x 36 of the toggle
        width: 44,
        height: 44,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        borderRadius: `${theme.custom.radius.control}px`,
        '&:focus-visible': {
            outline: 'none',
            boxShadow: theme.custom.focusRing,
        },
    },
    /** the quiet frame - a hairline instead of a coloured edge */
    frame: {
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: `${theme.custom.control.compactHeight}px`,
        padding: '3px',
        borderRadius: `${theme.custom.radius.control}px`,
        background: theme.custom.surfaces.surface,
        boxShadow: `inset 0 0 0 1px ${theme.custom.hairline}`,
    },
    /** the tile carries the mark, one surface step above the frame */
    tile: {
        width: 34,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: `${theme.custom.radius.chip}px`,
        backgroundColor: theme.custom.surfaces.overlay,
        color: theme.palette.primary.main,
        transition: 'color 0.2s ease',
        'button:hover &': {
            color: theme.palette.primary.light,
        },
    },
}));
