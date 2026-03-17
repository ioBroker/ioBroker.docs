import React from 'react';
import { Dialog, DialogContent, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useStyles } from './AdapterPage.styles';

type LicenseModalProps = {
    open: boolean;
    onClose: () => void;
};

const LicenseModal = ({ open, onClose }: LicenseModalProps): React.ReactNode => {
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
                <IconButton onClick={onClose} className={classes.licenseCloseButton}>
                    <CloseIcon />
                </IconButton>
            </DialogContent>
            <DialogContent className={classes.licenseContent}>
                <Typography className={classes.licenseParagraph}>
                    Copyright (c) 2021 Ralf Gaudes ralf@gaudes.net
                </Typography>
                <Typography className={classes.licenseParagraph}>
                    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
                    associated documentation files (the "Software"), to deal in the Software without restriction,
                    including without limitation the rights to use, copy, modify, merge, publish, distribute,
                    sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
                    furnished to do so, subject to the following conditions:
                </Typography>
                <Typography className={classes.licenseParagraph}>
                    The above copyright notice and this permission notice shall be included in all copies or
                    substantial portions of the Software.
                </Typography>
                <Typography className={classes.licenseParagraph}>
                    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
                    NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
                    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
                    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
                    OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                </Typography>
            </DialogContent>
        </Dialog>
    );
};

export default LicenseModal;
