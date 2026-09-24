import type React from 'react';
import { Box, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { I18n } from '../../utils/i18n';
import { makeStyles } from '../../theme/makeStyles';

/**
 * A picture from a document, shown at the size it really has.
 *
 * The documents cap their pictures - at 600 px without a declared width, at the width of the column
 * otherwise - and a diagram or a screenshot loses its labels at that size. A click opens it here,
 * as large as the window allows and never larger than the file itself: an upscaled screenshot is
 * blurred and shows nothing that the small one did not.
 *
 * `Modal` brings what such an overlay needs and what is tedious to write again: the Escape key, the
 * click beside the picture, the focus that stays inside while it is open and returns afterwards.
 */

const useStyles = makeStyles()(theme => ({
    backdrop: {
        // darker than the standard backdrop: what counts here is the picture, not the page behind
        backgroundColor: 'rgba(0, 0, 0, 0.82)',
    },
    frame: {
        position: 'absolute' as const,
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(4),
        // the click beside the picture closes - so does the one on the picture, one gesture less to
        // learn than "outside closes, inside does not"
        cursor: 'zoom-out',
        outline: 'none',
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1.5),
        },
    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
        // no upscaling: `width: auto` keeps the file's own size as the upper limit
        width: 'auto',
        height: 'auto',
        objectFit: 'contain' as const,
        borderRadius: `${theme.custom.radius.control}px`,
    },
    close: {
        position: 'absolute' as const,
        top: theme.spacing(2),
        right: theme.spacing(2),
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
    },
}));

export interface ImageLightboxProps {
    /** the address of the picture, or nothing while none is open */
    src?: string;
    alt?: string;
    onClose: () => void;
}

export const ImageLightbox = ({ src, alt, onClose }: ImageLightboxProps): React.ReactNode => {
    const { classes } = useStyles();

    return (
        <Modal
            open={!!src}
            onClose={onClose}
            slotProps={{ backdrop: { className: classes.backdrop } }}
            aria-label={alt || I18n.t('image.enlarged')}
        >
            <Box
                className={classes.frame}
                onClick={onClose}
            >
                {!!src && (
                    <img
                        src={src}
                        alt={alt ?? ''}
                        className={classes.image}
                    />
                )}
                <IconButton
                    className={classes.close}
                    onClick={onClose}
                    aria-label={I18n.t('image.close')}
                    size="large"
                >
                    <CloseIcon />
                </IconButton>
            </Box>
        </Modal>
    );
};

export default ImageLightbox;
