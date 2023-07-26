import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import I18n from '../i18n';

class DialogError extends React.Component {
    handleOk = () => {
        this.props.onClose && this.props.onClose();
    };

    render() {
        return <Dialog
            open={!0}
            maxWidth="sm"
            fullWidth
            onClose={() => this.handleOk()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle
                className={this.props.classes.titleBackground}
                classes={{ root: this.props.classes.titleColor }}
                id="alert-dialog-title"
            >
                {this.props.title || I18n.t('Error')}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {this.props.text || I18n.t('Unknown error!')}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => this.handleOk()} color="primary" autoFocus>{I18n.t('Ok')}</Button>
            </DialogActions>
        </Dialog>;
    }
}

DialogError.propTypes = {
    onClose: PropTypes.func,
    title: PropTypes.string,
    text: PropTypes.string,
};
export default DialogError;
