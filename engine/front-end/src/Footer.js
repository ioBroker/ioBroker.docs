import React from 'react';
import PropTypes from 'prop-types';

import {
    FaGithubSquare as IconGithub,
    FaFacebookSquare as IconFacebook,
    FaDiscord as IconDiscord,
} from 'react-icons/fa';

import LogoIoBroker from './assets/iobroker-logo-small.png';

import Utils from './Utils';
import I18n from './i18n';
import {Box} from "@mui/material";

const styles = {
    footer: theme => ({
        background: theme.palette.primary.light,
        textAlign: 'center',
        p: '20px',
    }),
    footerIconDiv: {
        width: 54,
        height: 54,
        cursor: 'pointer',
        display: 'inline-block',
        position: 'relative',
    },
    footerIcon: {
        width: 54,
        height: 54,
        color: '#b1b1b1',
    },
    footerCopyright: {
        color: '#b1b1b1',
    },
    footerLogo: {
        width: 72,
        filter: 'grayscale(100%) invert(1)',
    },
    footerIconText: {
        position: 'absolute',
        bottom: 3,
        width: '100%',
        textAlign: 'center',
        fontSize: 8,
    },
    footerLink: {
        display: 'inline-block',
        cursor: 'pointer',
        color: '#b1b1b1',
        paddingRight: 10,
    },
};

class Loader extends React.Component {
    render() {
        return <Box sx={styles.footer}>
            <div title="Repository" style={styles.footerIconDiv}>
                <IconGithub
                    style={styles.footerIcon}
                    onClick={() => Utils.openLink('https://github.com/ioBroker')}
                />
            </div>
            <div title="Community adapters repository" style={styles.footerIconDiv}>
                <IconGithub
                    style={styles.footerIcon}
                    onClick={() => Utils.openLink('https://github.com/iobroker-community-adapters')}
                />
                <div style={styles.footerIconText}>Community</div>
            </div>
            <div title="Unofficial Facebook group" style={styles.footerIconDiv}>
                <IconFacebook
                    style={styles.footerIcon}
                    onClick={() => Utils.openLink('https://www.facebook.com/groups/440499112958264')}
                />
            </div>
            <div title="Discord Server" style={styles.footerIconDiv}>
                <IconDiscord
                    style={{ ...styles.footerIcon, height: 50 }}
                    onClick={() => Utils.openLink('https://discord.gg/HwUCwsH')}
                />
            </div>
            <br />

            <div style={styles.footerLink} onClick={() => this.props.onNavigate(null, 'imprint')}>{I18n.t('Imprint')}</div>
            <div style={{ ...styles.footerLink, cursor: 'inherit' }}> | </div>
            <div style={styles.footerLink} onClick={() => this.props.onNavigate(null, 'privacy')}>{I18n.t('Privacy policy')}</div>

            <p style={styles.footerCopyright}>Copyright © 2014-2024 by the ioBroker Community and the ioBroker GmbH.</p>
            <img src={LogoIoBroker} style={styles.footerLogo} alt="logo" />
        </Box>;
    }
}

Loader.propTypes = {
    onNavigate: PropTypes.func,
};

export default Loader;
