import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
} from '@mui/material';

import {
    MdCloud as IconCloud,
    MdClose as IconClose,
} from 'react-icons/md';
import ServerImg from '../assets/iob-server.png';
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
import Query from '../Components/Query';

import BackImage from '../assets/background.jpg';
import LinusShell from '../Components/LinusShell';
import I18n from '../i18n';
import userTreffen from '../assets/2024_05_01_usertreffen_long.jpg';

const styles = {
    content: theme => theme.content,
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
        marginLeft: 10,
        marginRight: 10,
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
        paddingTop: 12,
        paddingBottom: 12,
        display: 'flex',
        borderRadius: 100,
        textTransform: 'uppercase',
        background: '#3399CC',
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 20,
        opacity: 0.9,
        fontFamily: 'Audiowide, sans-serif',
        alignItems: 'center',
        justifyContent: 'center',
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
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 20,
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
    darkPart: theme => theme.palette.darkPart,
    lightPart: theme => theme.palette.lightPart,
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
};

class Intro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showActionDialog: false,
        };

        const d = new Date();
        this.action = (d.getMonth() === 11 && d.getDate() >= 8) || (d.getMonth() === 0 && d.getDate() <= 6);
    }

    renderCloud() {
        const long = I18n.getLanguage() === 'ru';

        return <div
            style={{
                ...styles.cloudButton,
                marginTop: this.props.mobile ? 20 : 10,
                width: long ? 330 : 230,
                marginLeft: long ? 'calc(50% - 165px)' : 'calc(50% - 115px)',
            }}
            onClick={() => window.document.location = 'https://iobroker.pro/accountRemote'}
        >
            <IconCloud style={styles.cloudButtonIcon} />
            <div style={styles.cloudButtonText}>{I18n.t('get cloud')}</div>
        </div>;
    }

    renderActionDialog() {
        return this.state.showActionDialog ? <Dialog
            key="dialog"
            open={!0}
            onClose={() => this.setState({ showActionDialog: false })}
        >
            <DialogContent>
                <DialogContentText style={styles.saleText}>
                    <img src={SaleImage} alt="sale" style={styles.saleImage} />
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
                    ...styles.cloudButtonSale,
                    marginTop: smallMargin ? 10 : undefined,
                    width: long ? 300 : 300,
                    marginLeft: long ? 'calc(50% - 165px)' : 'calc(50% - 115px)',
                }}
                onClick={() => this.setState({ showActionDialog: true })}
            >
                <img style={styles.cloudButtonSaleIcon} src={ChristmasSale} alt="sale" />
                <div style={styles.cloudButtonText}>{I18n.t('cloud sale!')}</div>
            </div>,
            this.renderActionDialog(),
        ];
    }

    static renderServer() {
        const smallMargin = window.screen.height < 500;

        const long = I18n.getLanguage() === 'ru';

        return <div
            style={{
                ...styles.serverButton,
                marginTop: smallMargin ? 10 : undefined,
                width: long ? 500 : 350,
                marginLeft: long ? 'calc(50% - 250px)' : 'calc(50% - 175px)',
            }}
            onClick={() => {
                const win = window.open('https://iobroker.com/shop', '_blank');
                win.focus();
            }}
        >
            <img style={styles.serverButtonImage} src={ServerImg} alt="server" />
            <div style={styles.serverButtonText}>{I18n.t('buy IOB server')}</div>
        </div>;
    }

    /*renderUserMeeting() {
        return <div
            style={{
                marginTop: this.props.mobile ? 20 : 10,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    ...styles.userButton,
                    padding: this.props.mobile ? 10 : 15,
                }}
                onClick={() => window.open('https://usertreffen.iobroker.in', 'usertreffen')}
            >
                <img
                    src={userTreffen}
                    alt="usertreffen"
                    style={{
                        height: this.props.mobile ? 35 : 70,
                        borderRadius: this.props.mobile ? 5 : 10,
                    }}
                />
            </div>
        </div>;
    }*/

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

    // Create your rules and scripts with scenes, JavaScript, blockly or node-red

    // Actual 262 official adapters. Discover all...

    render() {
        let i = 0;

        let middleButton;
        if (this.action) {
            middleButton = this.renderAction();
        } else {
            middleButton = this.renderCloud();
        }

        return [
            <Box sx={styles.content} style={styles.backImage} key="content">
                <div style={styles.title}>
                    <div style={{ ...styles.titleDiv, marginTop: this.props.mobile ? 50 : 75 }}>
                        <div style={styles.titleMain}>ioBroker</div>
                        <div style={styles.titleSecond}>Automate your life</div>
                        <div style={styles.titleDescription}>Open source automation platform</div>
                    </div>
                </div>
                {middleButton}
                {!this.props.mobile ? <LinusShell
                    header={I18n.t('install on linux')}
                    copyTitle={I18n.t('copy to clipboard')}
                    copiedText={I18n.t('copied to clipboard')}
                    typedText="curl -sLf https://iobroker.net/install.sh | bash -"
                /> : null}
            </Box>,
            <div
                key="parts"
                style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    display: 'flex',
                    gap: 10,
                }}
            >
                {!userMeeting ? <Query key="query" theme={this.props.theme} mobile={this.props.mobile} language={this.props.language} /> : null}
                <SupportUs key="supportus" theme={this.props.theme} mobile={this.props.mobile} language={this.props.language} noColoring={userMeeting} />
            </div>,
            <ForumInfo key="forum" backStyle={(i++ % 2) ? styles.darkPart : styles.lightPart} theme={this.props.theme} mobile={this.props.mobile} language={this.props.language} />,
            <About key="about" backStyle={(i++ % 2) ? styles.darkPart : styles.lightPart} theme={this.props.theme} mobile={this.props.mobile} language={this.props.language} />,
            <Subscribe key="subscribe" backStyle={(i++ % 2) ? styles.darkPart : styles.lightPart} theme={this.props.theme} mobile={this.props.mobile} language={this.props.language} />,
            <Press key="press" backStyle={(i++ % 2) ? styles.darkPart : styles.lightPart} theme={this.props.theme} mobile={this.props.mobile} language={this.props.language} />,
            <Adapters key="adapters" backStyle={(i++ % 2) ? styles.darkPart : styles.lightPart} theme={this.props.theme} mobile={this.props.mobile} language={this.props.language} onNavigate={this.props.onNavigate} />,
            <Screenshots key="screenshots" backStyle={(i++ % 2) ? styles.darkPart : styles.lightPart} theme={this.props.theme} mobile={this.props.mobile} language={this.props.language} onNavigate={this.props.onNavigate} />,
            <Footer key="footer" theme={this.props.theme} mobile={this.props.mobile} onNavigate={this.props.onNavigate} />,
        ];
    }
}

Intro.propTypes = {
    language: PropTypes.string,
    onNavigate: PropTypes.func,
    theme: PropTypes.string,
    mobile: PropTypes.bool,
};

export default Intro;
