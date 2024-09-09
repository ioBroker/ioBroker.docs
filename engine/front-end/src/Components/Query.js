import React, { Component } from 'react';
import { Button } from '@mui/material';

import userTreffen from '../assets/2024_05_01_usertreffen_long.jpg';

const styles = {
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
        animation: 'hue-animation 16s infinite',
        width: 22,
        height: 22,
        marginRight: 5,
    },
};

class Query extends Component {
    render() {
        return <Button
            key="button"
            color="grey"
            sx={styles.mainButton}
            onClick={() => window.open('https://usertreffen.iobroker.in', 'usertreffen')}
        >
            <img src={userTreffen} alt="usertreffen" style={{ height: 36 }} />
        </Button>;
    }
}

export default Query;
