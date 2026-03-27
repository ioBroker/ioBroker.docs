import React from 'react';
import { Dialog, DialogContent, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useStyles } from './AdapterPage.styles';

type LicenseModalProps = {
    open: boolean;
    onClose: () => void;
    paragraphs?: string[];
};

const LicenseModal = ({ open, onClose, paragraphs = [] }: LicenseModalProps): React.ReactNode => {
    const { classes } = useStyles();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            classes={{
                container: classes.licenseDialogContainer,
                paper: classes.licenseDialogPaper,
            }}
            BackdropProps={{
                style: { backgroundColor: 'transparent' },
            }}
        >
            <DialogContent className={classes.licenseTitle}>
                MIT License
                <IconButton
                    onClick={onClose}
                    className={classes.licenseCloseButton}
                >
                    <CloseIcon />
                </IconButton>
            </DialogContent>
            <DialogContent className={classes.licenseContent}>
                {paragraphs.length > 0 ? (
                    paragraphs.map((text, index) => (
                        <Typography
                            className={classes.licenseParagraph}
                            key={index}
                        >
                            {text}
                        </Typography>
                    ))
                ) : (
                    <Typography className={classes.licenseParagraph}>{''}</Typography>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default LicenseModal;
