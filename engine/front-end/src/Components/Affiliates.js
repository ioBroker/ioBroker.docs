import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Accordion,
    AccordionSummary,
    AccordionActions, Box,
} from '@mui/material';

import {
    MdExpandMore as IconExpandMore,
    MdHelpOutline as IconQuestion,
} from 'react-icons/md';

import I18n from '../i18n';
import Utils from '../Utils';

const styles = {
    mainDiv: {
        marginTop: 10,
        marginBottom: 10,
        background: '#fdfbf4',
        width: 'calc(100% - 20px)',
        border: '1px solid #d5a91b',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    title: theme => ({
        color: theme.palette.primary.light,
        fontSize: 24,
        fontWeight: 'bold',
    }),
    imgDiv: {

    },
    img: {
        mixBlendMode: 'multiply',
        maxHeight: 128,
    },
    text: {
        flexGrow: 1,
        padding: 10,
    },
    buttonDiv: {
        textAlign: 'center',
    },
    button: {
        width: 150,
        background: '#d8dedc',
    },
    partnerLink: {
        fontSize: 10,
    },
    question: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        opacity: 0.7,
    },
    date: {
        position: 'absolute',
        top: 2,
        right: 2,
        opacity: 0.7,
        fontSize: 10,
    },
    moreDetails: {
        display: 'block',
    },
};

class Affiliates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            explanation: false,
        };
    }

    renderExplanation() {
        if (!this.state.explanation) {
            return null;
        }

        return <Dialog
            open={!0}
            onClose={() => this.setState({ explanation: false })}
        >
            <DialogTitle id="alert-dialog-title">{I18n.t('Why this link is here?')}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {I18n.t('Partner explanation')}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => this.setState({ explanation: false })} color="primary" autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>;
    }

    renderOne(one) {
        return <div key={one.text} style={styles.mainDiv}>
            {one.date ? <div style={styles.date}>
                <span style={{ marginRight: 8 }}>{I18n.t('Last edit')}:</span>
                {one.date}
            </div> : null}
            {one.title ? <Box sx={styles.title}>{one.title}</Box> : null}
            {one.img ? <div style={styles.imgDiv}>
                <img style={styles.img} src={one.img} alt="product" />
            </div> : null}
            {one.text ? <div style={styles.text}>{one.text}</div> : null}
            <div style={styles.buttonDiv}>
                <Button style={styles.button} onClick={() => Utils.openLink(one.link)} color="secondary">
                    <span style={{ marginRight: 8 }}>{I18n.t('to Shop')}</span>
                    *
                </Button>
                <div style={styles.partnerLink}>{I18n.t('* partner link')}</div>
            </div>
            <IconButton title={I18n.t('Explanation')} onClick={() => this.setState({ explanation: true })} style={styles.question}><IconQuestion /></IconButton>
            {this.renderExplanation()}
        </div>;
    }

    renderExpands() {
        if (this.props.data.length > 1) {
            return <Accordion key="expansion">
                <AccordionSummary
                    style={styles.summary}
                    expandIcon={<IconExpandMore />}
                >
                    {I18n.t('More devices')}
                </AccordionSummary>
                <AccordionActions style={styles.moreDetails}>
                    {this.props.data.filter((a, i) => i > 0).map(a => this.renderOne(a))}
                </AccordionActions>
            </Accordion>;
        }
        return null;
    }

    render() {
        return [
            this.renderOne(this.props.data[0]),
            this.renderExpands(),
        ];
    }
}

Affiliates.propTypes = {
    data: PropTypes.array,
};

export default Affiliates;
