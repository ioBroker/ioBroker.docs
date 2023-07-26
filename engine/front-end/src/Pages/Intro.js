import React, { Component } from 'react';
import { withStyles } from '@mui/styles';
import PropTypes from 'prop-types';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
} from '@mui/material';

import {
    MdCloud as IconCloud,
    MdClose as IconClose,
    MdCake as IconCake,
} from 'react-icons/md';
import ServerImg from '../assets/iob-server.png';
import HausAutomatisierungImg from '../assets/haus_automatisierung.png';
import ChristmasSale from '../assets/christmas.svg';
import SaleImage from '../assets/sale.svg';

import Footer from '../Footer';
import ForumInfo from '../Components/ForumInfo';
import Subscribe from '../Components/Subscribe';
import Press from '../Components/Press';
import Adapters from '../Components/Adapters';
import SupportUs from '../Components/SupportUs';
import About from '../Components/About';
import Screenshots from '../Components/Screenshots';
import UserMeeting from '../Components/UserMeeting';

import BackImage from '../assets/background.jpg';
import LinusShell from '../Components/LinusShell';
import I18n from '../i18n';

const styles = theme => ({
    content: theme.content,
    backImage: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${BackImage})`,
        height: 'calc(100vh - 50px)',
        textAlign: 'center',
    },
    title: {
        margin: 'auto',
        width: '100%',
        maxWidth: 650,
        paddingTop: 50,
    },
    titleDiv: {
        background: '#FFFFFFAA',
        borderRadius: 20,
        paddingTop: 20,
        paddingLeft: 40,
        paddingBottom: 20,
        paddingRight: 40,
    },
    titleMain: {
        fontSize: 48,
        fontFamily: 'Audiowide',
    },
    titleSecond: {
        fontSize: 32,
        fontFamily: 'Audiowide',
    },
    titleDescription: {
        fontSize: 24,
    },
    cloudButton: {
        marginTop: 100,
        paddingTop: 25,
        height: 45,
        borderRadius: 100,
        textTransform: 'uppercase',
        background: '#3399CC',
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 20,
        opacity: 0.9,
        fontFamily: 'Audiowide, sans-serif',
        cursor: 'pointer',
    },
    cloudButtonSale: {
        marginTop: 100,
        paddingTop: 25,
        height: 45,
        borderRadius: 100,
        textTransform: 'uppercase',
        background: '#1b4777',
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 20,
        opacity: 0.9,
        fontFamily: 'Audiowide, sans-serif',
        cursor: 'pointer',
    },
    cloudButtonSaleIcon: {
        width: 48,
        height: 48,
        marginTop: -15,
        marginRight: 5,
        verticalAlign: 'top',
    },
    serverButton: {
        marginTop: 100,
        paddingTop: 25,
        height: 45,
        borderRadius: 100,
        textTransform: 'uppercase',
        background: '#3399CC',
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 20,
        opacity: 0.9,
        fontFamily: 'Audiowide, sans-serif',
        cursor: 'pointer',
    },
    serverButtonImage: {
        width: 50,
        height: 40,
        marginRight: 10,
        verticalAlign: 'top',
        marginTop: -8,
    },
    serverButtonText: {
        whiteSpace: 'nowrap',
        display: 'inline-block',
        verticalAlign: 'top',
    },
    userButton: {
        marginTop: 100,
        marginLeft: 10,
        marginRight: 10,
        padding: 15,
        borderRadius: 100,
        textTransform: 'uppercase',
        background: '#3399CC',
        color: '#FFFFFF',
        fontSize: 20,
        opacity: 0.9,
        fontFamily: 'Audiowide, sans-serif',
        cursor: 'pointer',
        display: 'flex',
        gap: 8,
        alignItems: 'center',
    },
    userButtonImage: {
        width: 50,
        height: 40,
        marginRight: 10,
        verticalAlign: 'top',
        marginTop: -8,
    },
    userButtonText: {
        whiteSpace: 'nowrap',
        display: 'inline-block',
        verticalAlign: 'top',
    },
    hausButtonImage: {
        width: 75,
        height: 40,
        marginRight: 10,
        verticalAlign: 'top',
        marginTop: -8,
    },
    cloudButtonIcon: {
        width: 32,
        height: 32,
        marginRight: 5,
        verticalAlign: 'top',
        marginTop: -3,
    },
    cloudButtonText: {
        whiteSpace: 'nowrap',
        display: 'inline-block',
        verticalAlign: 'top',
    },
    darkPart: theme.palette.darkPart,
    lightPart: theme.palette.lightPart,
    saleImage: {
        width: 100,
        height: 100,
    },
    saleText: {
        fontSize: 24,
        textAlign: 'center',
    },
    '@keyframes colors': {
        '0%':   {
            color: '#4778e1',
        },
        '25%': {
            color: '#a9a9a9',
        },
        '50%':  {
            color: '#2f4c8f',
        },
        '100%': {
            color: '#ffffff',
        },
    },
    coloredIcon: {
        animation: `$colors 3000ms ${theme.transitions.easing.easeInOut} infinite alternate`,
        width: 30,
        height: 30,
    },
});

class Intro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showActionDialog: false,
        };

        const d = new Date();
        this.action = (d.getMonth() === 11 && d.getDate() >= 8) || (d.getMonth() === 0 && d.getDate() <= 8);
    }

    renderCloud() {
        const smallMargin = window.screen.height < 500;

        const long = I18n.getLanguage() === 'ru';

        return <div
            style={{
                marginTop: smallMargin ? 10 : undefined,
                width: long ? 330 : 230,
                marginLeft: long ? 'calc(50% - 165px)' : 'calc(50% - 115px)',
            }}
            className={this.props.classes.cloudButton}
            onClick={() => window.document.location = 'https://iobroker.pro/accountRemote'}
        >
            <IconCloud className={this.props.classes.cloudButtonIcon} />
            <div className={this.props.classes.cloudButtonText}>{I18n.t('get cloud')}</div>
        </div>;
    }

    renderActionDialog() {
        return this.state.showActionDialog ? <Dialog
            key="dialog"
            open={!0}
            onClose={() => this.setState({ showActionDialog: false })}
        >
            <DialogContent>
                <DialogContentText className={this.props.classes.saleText}>
                    <img src={SaleImage} alt="sale" className={this.props.classes.saleImage} />
                    <br />
                    {I18n.t('33% discount on Remote access and Assistants!')}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => window.document.location = 'https://iobroker.pro/accountRemote'} autoFocus color="primary">
                    {I18n.t('Get it!')}
                </Button>
                <Button onClick={() => this.setState({ showActionDialog: false })}>
                    <IconClose />
                </Button>
            </DialogActions>
        </Dialog> : null;
    }

    renderAction() {
        const smallMargin = window.screen.height < 500;

        const long = I18n.getLanguage() === 'ru';

        return [
            <div
                key="button"
                style={{
                    marginTop: smallMargin ? 10 : undefined,
                    width: long ? 300 : 300,
                    marginLeft: long ? 'calc(50% - 165px)' : 'calc(50% - 115px)',
                }}
                className={this.props.classes.cloudButtonSale}
                onClick={() => this.setState({ showActionDialog: true })}
            >
                <img className={this.props.classes.cloudButtonSaleIcon} src={ChristmasSale} alt="sale" />
                <div className={this.props.classes.cloudButtonText}>{I18n.t('cloud sale!')}</div>
            </div>,
            this.renderActionDialog(),
        ];
    }

    renderServer() {
        const smallMargin = window.screen.height < 500;

        const long = I18n.getLanguage() === 'ru';

        return <div
            style={{
                marginTop: smallMargin ? 10 : undefined,
                width: long ? 500 : 350,
                marginLeft: long ? 'calc(50% - 250px)' : 'calc(50% - 175px)',
            }}
            className={this.props.classes.serverButton}
            onClick={() => {
                const win = window.open('https://iobroker.com/shop', '_blank');
                win.focus();
            }}
        >
            <img className={this.props.classes.serverButtonImage} src={ServerImg} alt="server" />
            <div className={this.props.classes.serverButtonText}>{I18n.t('buy IOB server')}</div>
        </div>;
    }

    renderUserMeetingDialog() {
        if (!this.state.showUserMeetingDialog) {
            return null;
        }
        return <UserMeeting
            key="userMeeting"
            mobile={this.props.mobile}
            onClose={() => this.setState({ showUserMeetingDialog: false })}
        />;
    }

    renderUserMeeting() {
        const smallMargin = window.screen.height < 500;

        return <div
            style={{
                marginTop: smallMargin ? 10 : undefined,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <div
                className={this.props.classes.userButton}
                onClick={() => this.setState({ showUserMeetingDialog: true })}
            >
                <IconCake className={this.props.classes.coloredIcon} />
                <div
                    className={this.props.classes.userButtonText}
                    style={{
                        whiteSpace: this.props.mobile ? 'wrap' : undefined,
                    }}
                >
                    {'Abfrage: Usertreffen November 2024'}
                </div>
            </div>
        </div>;
    }

    renderHausAutomatisierung() {
        const smallMargin = window.screen.height < 500;

        return <div
            style={{
                marginTop: smallMargin ? 10 : undefined,
                width: 550,
                marginLeft: 'calc(50% - 275px)',
                background: '#144578',
            }}
            className={this.props.classes.serverButton}
            onClick={() => {
                const win = window.open('https://shop.haus-automatisierung.com/iobroker-master-kurs.html?refid=iobroker', '_blank');
                win.focus();
            }}
        >
            <img className={this.props.classes.hausButtonImage} src={HausAutomatisierungImg} alt="server" />
            <div className={this.props.classes.serverButtonText}>{I18n.t('Video course from our partner')}</div>
        </div>;
    }

    // What differs ioBroker from other open source automation platforms?
    //
    // - Comprehensive visualization
    //   vis, mobile.
    //
    // - Multi-hosts distributed system
    //   Install adapters on different computers and connect it in one system.
    //
    // - Very robust architecture
    //   Every adapter runs in the own process and does not disturb each other.

    // Configure all only with your web browser

    // Create your rules and scripts with scenes, javascript, blockly or node-red

    // Actual 262 official adapters. Discover all...

    render() {
        let i = 0;

        let link = new Date().getMinutes() % 2;

        if (I18n.getLanguage() !== 'de') {
            link = 0;
        }
        let middleButton;
        let noColoring = false;
        if (window.location.hash === '#usertreffen') {
            middleButton = this.renderUserMeeting();
            noColoring = true;
        } else if (this.action) {
            middleButton = this.renderAction();
        } else {
            switch (link) {
                case 1:
                    middleButton = I18n.getLanguage() === 'de' ? this.renderHausAutomatisierung() : this.renderCloud();
                    break;
                case 2:
                    middleButton = this.renderServer();
                    break;
                case 0:
                default:
                    middleButton = this.renderCloud();
                    break;
            }
        }

        return [
            <div className={`${this.props.classes.content} ${this.props.classes.backImage}`} key="content">
                <div className={this.props.classes.title}>
                    <div className={this.props.classes.titleDiv}>
                        <div className={this.props.classes.titleMain}>ioBroker</div>
                        <div className={this.props.classes.titleSecond}>Automate your life</div>
                        <div className={this.props.classes.titleDescription}>Open source automation platform</div>
                    </div>
                </div>
                {middleButton}
                {!this.props.mobile ? <LinusShell
                    header={I18n.t('install on linux')}
                    copyTitle={I18n.t('copy to clipboard')}
                    copiedText={I18n.t('copied to clipboard')}
                    typedText="curl -sLf https://iobroker.net/install.sh | bash -"
                /> : null}
            </div>,
            <SupportUs key="supportus" theme={this.props.theme} mobile={this.props.mobile} language={this.props.language} noColoring={noColoring} />,
            <ForumInfo key="forum" backClass={(i++ % 2) ? this.props.classes.darkPart : this.props.classes.lightPart} theme={this.props.theme} mobile={this.props.mobile} language={this.props.language} />,
            <About key="about" backClass={(i++ % 2) ? this.props.classes.darkPart : this.props.classes.lightPart} theme={this.props.theme} mobile={this.props.mobile} language={this.props.language} />,
            <Subscribe key="subscribe" backClass={(i++ % 2) ? this.props.classes.darkPart : this.props.classes.lightPart} theme={this.props.theme} mobile={this.props.mobile} language={this.props.language} />,
            <Press key="press" backClass={(i++ % 2) ? this.props.classes.darkPart : this.props.classes.lightPart} theme={this.props.theme} mobile={this.props.mobile} language={this.props.language} />,
            <Adapters key="adapters" backClass={(i++ % 2) ? this.props.classes.darkPart : this.props.classes.lightPart} theme={this.props.theme} mobile={this.props.mobile} language={this.props.language} onNavigate={this.props.onNavigate} />,
            <Screenshots key="screenshots" backClass={(i++ % 2) ? this.props.classes.darkPart : this.props.classes.lightPart} theme={this.props.theme} mobile={this.props.mobile} language={this.props.language} onNavigate={this.props.onNavigate} />,
            <Footer key="footer" theme={this.props.theme} mobile={this.props.mobile} onNavigate={this.props.onNavigate} />,
            this.renderUserMeetingDialog(),
        ];
    }
}

Intro.propTypes = {
    language: PropTypes.string,
    onNavigate: PropTypes.func,
    theme: PropTypes.string,
    mobile: PropTypes.bool,
};

export default withStyles(styles)(Intro);
