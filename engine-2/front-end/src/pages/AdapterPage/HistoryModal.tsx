import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useStyles } from './AdapterPage.styles'; 

interface HistoryModalProps {
    open: boolean;
    onClose: () => void;
}

const historyData = [
    { version: '6.6.1', date: '2024-02-22', changes: ['(bluefox) Just some packages were updated'] },
    { version: '6.6.0', date: '2023-10-13', changes: ['(bluefox) Corrected adapter termination if the alias has no'] },
    { version: '6.5.7', date: '2023-10-08', changes: ['(foxriver76) upgrade socket-classes to fix error with vis subscriptions'] },
    { version: '6.5.6', date: '2023-09-28', changes: ['(bluefox) upgraded socket-classes to correct the error by unsubscribing on client disconnect'] },
    { version: '6.5.5', date: '2023-09-14', changes: ['(foxriver76) upgrade socket-classes to fix crash cases'] },
    { version: '6.5.3', date: '2023-09-05', changes: ['(mcm1957) added missing node16 requirement'] },
    { version: '6.5.2', date: '2023-08-01', changes: ['(bluefox) Added the subscribing on the specific instance messages'] },
    { version: '6.4.0', date: '2023-07-07', changes: ['(bluefox) extended the getObjects function with the possibility to read the list of IDs'] },
    { version: '6.3.5', date: '2023-03-17', changes: ['(bluefox) Increased the max size of the message to 200MB'] },
    { version: '6.3.4', date: '2023-03-03', changes: ['(bluefox) Allowed deletion of fullcalendar objects'] },
    { version: '6.3.3', date: '2022-12-22', changes: ['(bluefox) used new socket-classes'] },
    { version: '6.3.1', date: '2022-11-27', changes: ['(bluefox) Added fileChange event'] },
    { version: '6.2.0', date: '2022-11-08', changes: [
        '(Apollon77) Prepare for future js-controller versions',
        '(bluefox) Function getObjects for web was extended by devices, channels and enums'
    ]},
    { version: '6.1.10', date: '2022-08-24', changes: ['(bluefox) Caught error by subscribing'] },
    { version: '6.1.8', date: '2022-07-08', changes: ['(bluefox) Corrected getAdapterInstances method'] },
];

const HistoryModal: React.FC<HistoryModalProps> = ({ open, onClose }) => {
    const { classes } = useStyles();

    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            classes={{ 
                container: classes.licenseDialogContainer, 
                paper: classes.historyDialogPaper 
            }}
            PaperProps={{ elevation: 0 }}
            BackdropProps={{ style: { backgroundColor: 'transparent' } }}
        >
            <DialogTitle className={classes.historyTitle}>
                HISTORY
                <IconButton onClick={onClose} className={classes.licenseCloseButton}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            
            <DialogContent className={classes.historyContent}>
                {historyData.map((item, index) => (
                    <Box key={index} className={classes.historyItemBlock}>
                        <Typography className={classes.historyVersionDate}>
                            {item.version} ({item.date})
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