import React, { Component } from 'react';
import { withStyles } from '@mui/styles';
import PropTypes from 'prop-types';

import {
    Close as CloseIcon,
    Check as CheckIcon,
} from '@mui/icons-material';

import  {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
} from '@mui/material';

import ImgUserMeeting from '../assets/usermeeting.png';

import I18n from '../i18n';

const styles = () => ({
    background: {
        backgroundImage: `url(${ImgUserMeeting})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        borderRadius: 20,
        color: '#1f1f1f',
    },
    dialog: {
        textAlign: 'center',
    },
    dialogDesktop: {
        minWidth: 550,
    },
});

const INTENTIONS = [
    'Bitte auswählen...',
    'Ich habe keine Interesse am User-Treffen, aber haltet mich auf dem laufenden',
    'Ich überlege vorbei zu schauen',
    'Ich werde das User-Treffen nicht verpassen',
    'Ich will einen Vortrag halten (Eintritt kostenlos)',
];

class SupportUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            intention: '',
            result: '',
            error: false,
        };
    }

    sendRequest() {
        fetch('https://usertreffen.iobroker.in', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'origin',
            body: JSON.stringify({
                email: this.state.email,
                intention: this.state.intention,
            }),
        })
            .then(() => this.setState({ result: 'Ihre Email Adresse wurde erfolgreich in der Interessentenliste eingetragen!' }))
            .catch(e => {
                console.error(e);
                this.setState({ result: 'Kann Ihre Email Adresse nicht eintragen :(', error: true });
            });
    }

    render() {
        return <Dialog
            key="dialogUserTreffen"
            open={!0}
            keepMounted
            fullScreen={this.props.mobile}
            fullWidth
            maxWidth="md"
            className={`${this.props.classes.dialog} ${this.props.mobile ? '' : this.props.classes.dialogDesktop}`}
            onClose={() => this.props.onClose()}
            aria-labelledby="user-meeting-dialog-support-title"
            aria-describedby="user-meeting-dialog-support-description"
        >
            <DialogTitle id="user-meeting-dialog-support-title">10 Jahre Jubiläums-User-Treffen 2024 am 9 November!</DialogTitle>
            <DialogContent>
                <DialogContentText id="user-meeting-dialog-slide-description" className={this.props.classes.background}>
                    <div
                        style={{
                            width: 'calc(100% - 40px)',
                            height: 'calc(100% - 40px)',
                            backgroundColor: '#FFFFFFC0',
                            padding: 20,
                            textAlign: 'left',
                        }}
                    >
                        <div>
                            Under construction
                        </div>
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {this.props.mobile ?
                    <Button
                        color="grey"
                        variant="contained"
                        onClick={() => this.props.onClose()}
                    >
                        <CloseIcon />
                    </Button>
                    :
                    <Button
                        color="grey"
                        variant="contained"
                        onClick={() => this.props.onClose()}
                        startIcon={<CloseIcon />}
                    >
                        {I18n.t('Close')}
                    </Button>}
            </DialogActions>
        </Dialog>;
    }
}

SupportUs.propTypes = {
    mobile: PropTypes.bool,
    onClose: PropTypes.func,
};

export default withStyles(styles)(SupportUs);
