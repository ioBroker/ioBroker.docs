import React, { Component } from 'react';
import { withStyles } from '@mui/styles';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import ImgUserMeeting from '../assets/usermeeting.png';

import I18n from '../i18n';
import {InputLabel, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

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

class SupportUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            intention: '',
            result: '',
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
            .then(res => res.json())
            .then(() => this.setState({ result: 'Ihre Email Adresse wurde erfolgreich in der Interessentenliste eingetragen!' }))
            .catch(e => {
                console.error(e);
                this.setState({ result: 'Kann Ihre Email Adresse nicht eintragen :(' });
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
            <DialogTitle id="user-meeting-dialog-support-title">10 Jahre Jubiläums-Usertreffen 2024 Herbst!</DialogTitle>
            <DialogContent>
                <DialogContentText id="user-meeting-dialog-slide-description" className={this.props.classes.background}>
                    <div style={{
                        width: 'calc(100%- 40px)',
                        height: 'calc(100%- 40px)',
                        backgroundColor: '#FFFFFFC0',
                        padding: 20,
                        textAlign: 'left',
                    }}>
                        Wir nähern uns zu einem wichtigen Datum, nämlich wird es ioBroker Projekt im Juli 2024 <b>10 Jahre</b> her sein!<br/>
                        Dies wollen wir mit einem <b>Usertreffen</b> feiern!<br/>
                        Falls du interesse hast, dann lass uns deine Email adresse, so dass wir die Organisation planen können.<br/><br />
                        Wann: <b>November 2024</b>,<br />
                        Wo: Kreis <b>Frankfurt am Main</b>,<br />
                        Preis: <b>ca 30€</b> pro Person,<br />
                        Dauer: <b>einen Samstag</b> (voraussichtlich 09 Nov. 24)<br />
                        <br />
                        Weitere Details werden nach der Interessentenermittlung folgen.<br /><br />
                        <TextField
                            variant="standard"
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Deine Email Adresse"
                            type="email"
                            fullWidth
                            onChange={(e) => this.setState({ email: e.target.value })}
                        />
                        <div style={{ height: 20 }} />
                        <FormControl fullWidth variant="standard">
                            <InputLabel>Intentionen</InputLabel>
                            <Select
                                value={this.state.intention || '_'}
                                label="Intention"
                                fullWidth
                                onChange={(e) => this.setState({ intention: e.target.value })}
                            >
                                <MenuItem value="_" style={{ opacity: 0.5 }}>Bitte auswählen...</MenuItem>
                                <MenuItem value="1">Ich habe keine Interesse an User-Treffen aber haltet mich an laufendem</MenuItem>
                                <MenuItem value="2">Ich überlege vorbei zu schauen</MenuItem>
                                <MenuItem value="3">Ich werde user-Treffen nicht verpassen</MenuItem>
                                <MenuItem value="3">Ich will einen Vortrag halten (Eintritt kostenlos)</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {this.state.result ? null : <Button
                    variant="contained"
                    disabled={!this.state.email || !this.state.email.includes('@') || !this.state.email.includes('.') || !this.state.intention || this.state.intention === '_'}
                    onClick={async () => {
                        try {
                            await this.sendRequest();
                        } catch (e) {
                            console.error(e);
                            this.props.onClose();
                        }
                    }}
                    color="primary"
                >
                    Ich habe interesse!
                </Button>}
                <Button
                    color="grey"
                    variant="contained"
                    onClick={() => this.props.onClose()}
                >
                    {I18n.t('Close')}
                </Button>
            </DialogActions>
        </Dialog>;
    }
}

SupportUs.propTypes = {
    mobile: PropTypes.bool,
    onClose: PropTypes.func,
};

export default withStyles(styles)(SupportUs);
