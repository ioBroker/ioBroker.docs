import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

import {
    FaCogs as IconAutomate,
    FaNodeJs as IconJS,
    FaLaptopCode as IconPlatforms,
    FaThumbsUp as IconSocial,
} from 'react-icons/fa';

import Image1 from '../assets/464030846.jpg';
import Image2 from '../assets/493271902.jpg';

import I18n from '../i18n';

const styles = {
    mainDiv: {
        background: '#FFFFFF',
        width: 'calc(100% - 40px)',
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        overflow: 'hidden',
    },
    title: {
        fontSize: 32,
        padding: 15,
        fontWeight: 'bold',
    },
    preBox: {
        display: 'inline-block',
        maxWidth: 1100,
        width: '100%',
    },
    box: {
        display: 'inline-block',
        width: '100%',
    },
    image: {
        display: 'inline-block',
    },
    imageMobile: {
        width: '100%',
    },
    imageDesktop: {
        width: 'calc(50% - 30px)',
    },
    img: {
        width: '100%',
    },
    text: {
        textAlign: 'left',
        fontSize: 20,
        display: 'inline-block',
        verticalAlign: 'top',
        padding: '10px 20px',
    },
    textMobile: {
        width: '100%',
    },
    textDesktop: {
        width: 'calc(50% - 30px)',
    },
    textLine: {
        display: 'block',
        paddingBottom: 10,
        position: 'relative',
        marginBottom: 10,
    },
    point: {
        '&::before': {
            content: '"•"',
            pr: '5px',
            fontSize: 24,
        },
    },
    icon: {
        fontSize: 48,
        borderRadius: '50%',
        border: '2px solid #3399CC',
        color: '#3399CC',
        // color: '#2dc997',
        padding: 5,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    lineTitle: {
        display: 'inline-block',
        fontWeight: 'bold',
        marginLeft: 80,
        verticalAlign: 'top',
        width: 'calc(100% - 90px)',
        textTransform: 'uppercase',
    },
    lineComment: {
        display: 'inline-block',
        verticalAlign: 'top',
        marginLeft: 80,
    },
};

class About extends Component {
    render() {
        return <Box key="about" style={styles.mainDiv} sx={this.props.backStyle}>
            <div style={styles.title}>{I18n.t('About ioBroker')}</div>
            <div style={styles.preBox}>
                <div style={styles.box}>
                    <div style={{ ...styles.image, ...(this.props.mobile ? styles.imageMobile : styles.imageDesktop) }}>
                        <img style={styles.img} src={Image1} alt="Image1" />
                    </div>
                    <div style={{ ...styles.text, ...(this.props.mobile ? styles.textMobile : styles.textDesktop) }}>
                        <Box component="span" style={styles.textLine} sx={styles.point}>{I18n.t('ioBroker is an IoT platform (Fog computing).')}</Box>
                        <Box component="span" style={styles.textLine} sx={styles.point}>{I18n.t('The ability to manage your IoT system as one intelligent, robust project.')}</Box>
                        <Box component="span" style={styles.textLine} sx={styles.point}>{I18n.t('Unique graphics and beautiful interfaces for you.')}</Box>
                        <Box component="span" style={styles.textLine} sx={styles.point}>{I18n.t('Use one of the best open source products for managing your automation system on premise.')}</Box>
                        <Box component="span" style={styles.textLine} sx={styles.point}>{I18n.t('Comprehensive smart home support')}</Box>
                    </div>
                </div>
                <div style={styles.box}>
                    <div style={{ ...styles.text, ...(this.props.mobile ? styles.textMobile : styles.textDesktop) }}>
                        <div style={styles.textLine}>
                            <IconAutomate style={{ ...styles.icon, fontSize: this.props.mobile ? 24 : 48 }} />
                            <div style={{ ...styles.lineTitle, marginLeft: this.props.mobile ? 50 : 80 }}>{I18n.t('Automate everything')}</div>
                            <div style={{ ...styles.lineComment, marginLeft: this.props.mobile ? 50 : 80 }}>{I18n.t('Light, shutter, thermostat, schedule, ...')}</div>
                        </div>
                        <div style={styles.textLine}>
                            <IconJS style={{ ...styles.icon, fontSize: this.props.mobile ? 24 : 48 }} />
                            <div style={{ ...styles.lineTitle, marginLeft: this.props.mobile ? 50 : 80 }}>{I18n.t('Written with Node.js')}</div>
                            <div style={{ ...styles.lineComment, marginLeft: this.props.mobile ? 50 : 80 }}>{I18n.t('Javascript is most popular language')}</div>
                        </div>
                        <div style={styles.textLine}>
                            <IconPlatforms style={{ ...styles.icon, fontSize: this.props.mobile ? 24 : 48 }} />
                            <div style={{ ...styles.lineTitle, marginLeft: this.props.mobile ? 50 : 80 }}>{I18n.t('Runs on')}</div>
                            <div style={{ ...styles.lineComment, marginLeft: this.props.mobile ? 50 : 80 }}>{I18n.t('Windows, Linux, OSX, Raspberry Pi, ARM or PC')}</div>
                        </div>
                        <div style={styles.textLine}>
                            <IconSocial style={{ ...styles.icon, fontSize: this.props.mobile ? 24 : 48 }} />
                            <div style={{ ...styles.lineTitle, marginLeft: this.props.mobile ? 50 : 80 }}>{I18n.t('Social support')}</div>
                            <div style={{ ...styles.lineComment, marginLeft: this.props.mobile ? 50 : 80 }}>{I18n.t('Dynamically growing community.')}</div>
                        </div>
                    </div>
                    <div style={{ ...styles.image, ...(this.props.mobile ? styles.imageMobile : styles.imageDesktop) }}>
                        <img style={styles.img} src={Image2} alt="Image2" />
                    </div>
                </div>
            </div>
        </Box>;
    }
}

About.propTypes = {
    mobile: PropTypes.bool,
    backStyle: PropTypes.func,
};

export default About;
