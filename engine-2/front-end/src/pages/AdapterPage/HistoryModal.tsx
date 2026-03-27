import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useStyles } from './AdapterPage.styles';

interface HistoryModalProps {
    open: boolean;
    onClose: () => void;
    items?: Array<{ version: string; date?: string; changes: string[] }>;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ open, onClose, items = [] }) => {
    const { classes } = useStyles();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            classes={{
                container: classes.licenseDialogContainer,
                paper: classes.historyDialogPaper,
            }}
            PaperProps={{ elevation: 0 }}
            BackdropProps={{ style: { backgroundColor: 'transparent' } }}
        >
            <DialogTitle className={classes.historyTitle}>
                HISTORY
                <IconButton
                    onClick={onClose}
                    className={classes.licenseCloseButton}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent className={classes.historyContent}>
                {items.map((item, index) => (
                    <Box
                        key={index}
                        className={classes.historyItemBlock}
                    >
                        <Typography className={classes.historyVersionDate}>
                            {item.date ? `${item.version} (${item.date})` : item.version}
                        </Typography>
                        <ul className={classes.historyChangeList}>
                            {item.changes.map((change, idx) => (
                                <li key={idx}>{change}</li>
                            ))}
                        </ul>
                    </Box>
                ))}
            </DialogContent>
        </Dialog>
    );
};

export default HistoryModal;
