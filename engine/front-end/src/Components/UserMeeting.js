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
            <DialogTitle id="user-meeting-dialog-support-title">10 Jahre Jubiläums-User-Treffen 2024 Herbst!</DialogTitle>
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
                        {this.state.result ? <div style={{ textAlign: 'center', color: this.state.error ? 'red' : undefined }}>
                            {this.state.result}
                        </div> : <div>
                            Wir nähern uns einem wichtigen Datum, das ioBroker Projekt wird im Juli 2024 bereits <b>10 Jahre</b> alt!
                            <br/>
                            Dies wollen wir mit einem <b>User-Treffen</b> feiern!
                            <br/>
                            Falls du interesse hast, melde Dich unverbindlich mit deiner Email-Adresse für Neuigkeiten an.
                            Deine Rückmeldung hilft uns die Veranstaltung besser planen zu können.
                            <br />
                            <br />
                            Wann: <b>November 2024</b> (voraussichtlich 09 Nov. 24),
                            <br />
                            Wo: Kreis <b>Frankfurt am Main</b>,
                            <br />
                            Preis: <b>ca 30€</b> pro Person,
                            <br />
                            Dauer: <b>einen Tag</b>.
                            <br />
                            <br />
                            Weitere Details werden wir zu einem späteren Zeitpunkt kommunizieren. <a href="https://forum.iobroker.net/topic/67171/anmeldung-umfrage-iobroker-usertreffen-2024" target="_blank">Oder schaue in forum vorbei.</a>
                            <br />
                            <TextField
                                variant="standard"
                                autoFocus
                                margin="dense"
                                id="email"
                                label="Deine Email Adresse"
                                type="email"
                                fullWidth
                                onChange={e => this.setState({ email: e.target.value })}
                            />
                            <div style={{ height: 20 }} />
                            {this.props.mobile ?
                                <select
                                    style={{
                                        width: '100%',
                                        overflow: 'hidden',
                                        whiteSpace: 'pre',
                                        textOverflow: 'ellipsis',
                                        webkitAppearance: 'none',
                                    }}
                                    value={this.state.intention || '_'}
                                    onChange={e => this.setState({ intention: e.target.value })}
                                >
                                    {INTENTIONS.map((item, i) => <option
                                        key={i || '_'}
                                        style={{ opacity: !i ? 0.5 : 1 }}
                                        value={i}
                                        disabled={!i}
                                    >
                                        {item}
                                    </option>)}
                                </select>
                                :
                                <FormControl fullWidth variant="standard">
                                    <InputLabel>Ich habe Interesse...</InputLabel>
                                    <Select
                                        value={this.state.intention || '_'}
                                        fullWidth
                                        onChange={e => this.setState({ intention: e.target.value })}
                                        renderValue={value => (!value || value === '_' ? <span style={{ opacity: 0.5 }}>{INTENTIONS[0]}</span> : INTENTIONS[value])}
                                    >
                                        {INTENTIONS.map((item, i) => <MenuItem
                                            key={i || '_'}
                                            style={{ opacity: !i ? 0.5 : 1 }}
                                            value={i}
                                            disabled={!i}
                                        >
                                            {item}
                                        </MenuItem>)}
                                    </Select>
                                </FormControl>}
                            <div style={{ fontSize: 12, fontStyle: 'italic', marginTop: 20 }}>
                                * Mit der Anmeldung stimme ich zu, dass die ioBroker GmbH mir Informationen über das geplante User-Treffen zusenden darf.
                            </div>
                        </div>}
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
                    startIcon={<CheckIcon />}
                >
                    Ich habe interesse!
                </Button>}
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
