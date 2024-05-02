import React, { Component } from 'react';
import { withStyles } from '@mui/styles';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';

import userTreffen from '../assets/2024_05_01_usertreffen_long.jpg';

const styles = () => ({
    '@keyframes hue-animation': {
        '0%': {
            color: 'hsl(82, 100%, 50%)',
        },
        '50%': {
            color: 'hsl(200, 100%, 50%)',
        },
        '100%': {
            color: 'hsl(82, 100%, 50%)',
        },
    },
    mainButton: {
        background: '#3399CC',
        color: '#FFFFFF',
        '&:hover': {
            animation: 'none',
            background: '#3399CC',
            opacity: 0.9,
        },
    },
    coloredIcon: {
        animation: '$hue-animation 16s infinite',
        width: 22,
        height: 22,
        marginRight: 5,
    },
});

class Query extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUserMeetingDialog: false,
        };
    }

    render() {
        return <Button
            key="button"
            color="grey"
            className={this.props.classes.mainButton}
            onClick={() => window.open('https://usertreffen.iobroker.in', 'usertreffen')}
        >
            <img src={userTreffen} alt="usertreffen"/>
        </Button>;
    }
}

Query.propTypes = {
    mobile: PropTypes.bool,
};

export default withStyles(styles)(Query);
