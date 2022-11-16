import React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import I18n from '../i18n';

class DialogMessage extends React.Component {

    handleOk = () => {
        this.props.onClose && this.props.onClose();
    };

    render() {
        return <Dialog
            open={!0}
            maxWidth="sm"
            fullWidth
            onClose={() => this.handleOk()}
            aria-labelledby="message-dialog-title"
            aria-describedby="message-dialog-description"
        >
            <DialogTitle id="message-dialog-title">{this.props.title || I18n.t('Message')}</DialogTitle>
            <DialogContent>
                <DialogContentText id="message-dialog-description">
                    {this.props.text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => this.handleOk()} color="primary" autoFocus>{I18n.t('Close')}</Button>
            </DialogActions>
        </Dialog>;
    }
}

DialogMessage.propTypes = {
    onClose: PropTypes.func,
    title: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.object
};

export default DialogMessage;
