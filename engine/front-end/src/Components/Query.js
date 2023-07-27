import React, { Component } from 'react';
import { withStyles } from '@mui/styles';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';

import { MdCake as IconCake } from 'react-icons/md';

import UserMeeting from '../Components/UserMeeting';

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

    render() {
        return [
            <Button
                key="button"
                color="grey"
                className={this.props.classes.mainButton}
                onClick={() => this.setState({ showUserMeetingDialog: true })}
            >
                <IconCake className={this.props.classes.coloredIcon} />
                Umfrage: User-Treffen November 2024
            </Button>,
            this.renderUserMeetingDialog(),
        ];
    }
}

Query.propTypes = {
    mobile: PropTypes.bool,
};

export default withStyles(styles)(Query);
