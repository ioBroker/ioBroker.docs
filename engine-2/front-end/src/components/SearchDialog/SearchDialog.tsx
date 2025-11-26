import React from 'react';
import { Dialog } from '@mui/material';

export default function SearchDialog(props: { onClose: () => void; open: boolean; search: string }): React.JSX.Element {
    return (
        <Dialog
            open={props.open}
            onClose={() => props.onClose()}
            scroll="body"
            PaperProps={{
                sx: {
                    overflow: 'hidden',
                },
            }}
        >
            Not implemented
        </Dialog>
    );
}
