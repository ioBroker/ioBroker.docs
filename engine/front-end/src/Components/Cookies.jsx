import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Box, Button} from '@mui/material';

import I18n from '../i18n';

const styles = {
    mainDiv: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        background: '#3c4043',
        borderRadius: 2,
        color: '#fff',
        boxShadow: '0 1px 3px 0 rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)',
        fontSize: 14,
        minHeight: 48,
        padding: 8,
        zIndex: 2,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 16,
        margin: 16,
    },
    mainDivMobile: {
        width: 'calc(100% - 48px)',
        flexDirection: 'column',
        alignItems: 'left',
    },
    text: {
        lineHeight: 'normal',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        wordBreak: 'break-word',
        display: 'inline-block',
    },
    buttonMore: theme => ({
        color: theme.palette.secondary.light,
        lineHeight: 'normal',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        wordBreak: 'break-word',
        display: 'inline-block',
        cursor: 'pointer',
    }),
    buttonOk: {
        lineHeight: 'normal',
        verticalAlign: 'top',
        display: 'inline-block',
    },
};

class Cookies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmed: window.localStorage ? window.localStorage.getItem('Docs.cookies') === 'true' : false,
        };
    }

    onConfirm() {
        window.localStorage && window.localStorage.setItem('Docs.cookies', 'true');
        this.setState({ confirmed: true });
    }

    render() {
        if (this.state.confirmed) {
            return null;
        }

        return <div style={{ ...styles.mainDiv, ...(this.props.mobile ? styles.mainDivMobile : undefined) }}>
            <div style={styles.text}>{I18n.t('cookies_text')}</div>
            <Box sx={styles.buttonMore} onClick={() => this.props.onNavigate(null, 'privacy')}>{I18n.t('Privacy policy')}</Box>
            <Button variant="contained" style={styles.buttonOk} onClick={() => this.onConfirm()}>{I18n.t('Got it!')}</Button>
        </div>;
    }
}

Cookies.propTypes = {
    mobile: PropTypes.bool,
    onNavigate: PropTypes.func,
};

export default Cookies;
