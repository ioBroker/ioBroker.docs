// https://www.amazon.de/s?k=homematic&tag=httpwwwiobron-21
// https://www.paypal.com/de_DE/DE/i/btn/btn_donateCC_LG.gif
// http://paypal.me/iobrokerService

// <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
// <input type="hidden" name="cmd" value="_s-xclick" />
// <input type="hidden" name="hosted_button_id" value="ZET3WCD5KHJ9G" />
// <input type="image" src="https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
// <img alt="" border="0" src="https://www.paypal.com/en_DE/i/scr/pixel.gif" width="1" height="1" />
// </form>

import React, { Component } from 'react';
import { withStyles } from '@mui/styles';
import PropTypes from 'prop-types';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
} from '@mui/material';

// import {FaHandsHelping as IconSupport} from 'react-icons/fa';

import ImgPayPal from '../assets/paypal.png';
import ImgAmazon from '../assets/amazon.png';
import ImgAmazonSmall from '../assets/amazon_small.png';

import I18n from '../i18n';
import Utils from '../Utils';

const styles = () => ({
    mainButton: {
        background: '#3399CC',
        color: '#FFFFFF',
        '&:hover': {
            animation: 'none',
            background: '#3399CC',
            opacity: 0.9,
        },
    },
    dialog: {
        textAlign: 'center',
    },
    dialogDesktop: {
        minWidth: 550,
    },
    mainButtonIcon: {
        marginRight: 5,
        width: 32,
    },
    card: {
        width: 'calc(50% - 20px)',
        display: 'inline-block',
        margin: 8,
        verticalAlign: 'top',
        textAlign: 'center',
        minHeight: 312,
    },
    media: {
        height: 100,
        backgroundSize: 'contain',
        margin: 10,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
    },
    goodsMedia: {
        minHeight: 80,
    },
    cardMobile: {
        minWidth: 250,
    },
    amazonButton: {
        background: 'linear-gradient(to bottom, #f8de9a 0%,#f7c641 100%)',
        border: '1px solid #A48D53',
        height: 35,
    },
    '@keyframes hue-animation': {
        '0%': {
            backgroundColor: 'hsl(82, 100%, 50%)',
        },
        '50%': {
            backgroundColor: 'hsl(200, 100%, 50%)',
        },
        '100%': {
            backgroundColor: 'hsl(82, 100%, 50%)',
        },
    },
    hueAnimation: {
        animation: '$hue-animation 16s infinite',
    },
});

const AMAZON_LINK = 'https://www.amazon.de/s?k=homematic&tag=httpwwwiobron-21';

class SupportUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
        };
    }

    static onPaypal() {
        window.document.getElementById('paypalFormSubmit').click();
    }

    renderPaypal() {
        const { classes } = this.props;

        return <Card key="paypal" className={`${classes.card} ${this.props.mobile ? this.props.classes.cardMobile : ''}`}>
            <CardActionArea onClick={() => SupportUs.onPaypal()}>
                <CardMedia
                    className={classes.media}
                    image={ImgPayPal}
                    title={I18n.t('Donate with PayPal')}
                />
                <CardContent>
                    <h5>{I18n.t('Donate with PayPal')}</h5>
                    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                        <input type="hidden" name="cmd" value="_s-xclick" />
                        <input type="hidden" name="hosted_button_id" value="2EHHSVEKASKGC" />
                        <input
                            type="image"
                            src="https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif"
                            name="submit"
                            title={I18n.t('PayPal - The safer, easier way to pay online!')}
                            alt={I18n.t('Donate with PayPal button')}
                            id="paypalFormSubmit"
                        />
                        <img alt="" src="https://www.paypal.com/en_DE/i/scr/pixel.gif" width="1" height="1" />
                    </form>
                </CardContent>
            </CardActionArea>
        </Card>;
    }

    renderAmazon() {
        const { classes } = this.props;

        return <Card key="amazon" className={`${classes.card} ${this.props.mobile ? this.props.classes.cardMobile : ''}`}>
            <CardActionArea onClick={() => Utils.openLink(AMAZON_LINK)}>
                <CardMedia
                    className={classes.media}
                    image={ImgAmazon}
                    title={I18n.t('Buy what you need at amazon')}
                />
                <CardContent>
                    <h5>{I18n.t('Amazon Affiliate Links')}</h5>
                    <Button className={classes.amazonButton} onClick={() => Utils.openLink(AMAZON_LINK)}>{I18n.t('Buy at Amazon')}</Button>
                    <div style={{ textAlign: 'left' }}>{I18n.t('Amazon explanation')}</div>
                </CardContent>
            </CardActionArea>
        </Card>;
    }

    renderDialog() {
        return <Dialog
            key="dialogSupport"
            open={this.state.opened}
            keepMounted
            fullScreen={this.props.mobile}
            fullWidth
            maxWidth="md"
            className={`${this.props.classes.dialog} ${this.props.mobile ? '' : this.props.classes.dialogDesktop}`}
            onClose={() => this.setState({ opened: false })}
            aria-labelledby="alert-dialog-support-title"
            aria-describedby="alert-dialog-support-description"
        >
            <DialogTitle id="alert-dialog-support-title">{I18n.t('Support us!')}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {this.renderPaypal()}
                    {this.renderAmazon()}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => this.setState({ opened: false })} color="primary">{I18n.t('Close')}</Button>
            </DialogActions>
        </Dialog>;
    }

    render() {
        return [
            <Button
                key="button"
                color="grey"
                className={`${this.props.classes.mainButton} ${!this.props.noColoring ? this.props.classes.hueAnimation : ''}`}
                onClick={() => this.setState({ opened: true })}
            >
                <img src={ImgAmazonSmall} className={this.props.classes.mainButtonIcon} alt="logo" />
                {I18n.t('Support us!')}
            </Button>,
            this.renderDialog(),
        ];
    }
}

SupportUs.propTypes = {
    mobile: PropTypes.bool,
    noColoring: PropTypes.bool,
};

export default withStyles(styles)(SupportUs);
