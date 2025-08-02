import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box } from "@mui/material";

import I18n from '../i18n';

const styles = {
    mainDiv: {
        background: '#FFFFFF',
        width: 'calc(100% - 100px)',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 50,
        paddingLeft: 50,
        paddingRight: 50,
    },
    mainDivMobile: {
        paddingLeft: 20,
        paddingRight: 20,
        width: 'calc(100% - 40px)',
    },
    title: {
        fontSize: 32,
        paddingBottom: 20,
    },
    boxDiv: {
        textAlign: 'center',
        display: 'inline-box',
    },
    box: {

    },
    adapter: {
        width: 50,
        m: '5px',
        display: 'inline-block',
        cursor: 'pointer',
        opacity: 0.8,
        verticalAlign: 'top',
        transition: 'opacity 0.3s, transform 0.3s',
        '&:hover': {
            opacity: 1,
            transform: 'scale(1.2)',
        },
    },
    icon: {
        verticalAlign: 'top',
        width: 50,
        borderRadius: 5,
        overflow: 'hidden',
    },
};

const IGNORE = ['general', 'visualization-widgets', 'overview', 'visualization', 'date-and-time', 'visualization-icons', 'logic'];

class Adapters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adapters: [],
            count: 250,
        };

        this.load();
    }

    load() {
        fetch('adapters.json')
            .then(res => res.json())
            .then(adapters => {
                const ads = [];
                let count = 0;
                Object.keys(adapters.pages).forEach(type => {
                    const pages = adapters.pages[type].pages;
                    if (adapters.pages[type].pages) {
                        Object.keys(pages).forEach(a => {
                            count++;
                            if (!IGNORE.includes(type)) {
                                ads.push({
                                    name: a,
                                    type,
                                    installs: pages[a].installs || 0,
                                    icon: `${this.props.language}/${pages[a].icon}`,
                                });
                            }
                        });
                    }
                });
                ads.sort((a, b) => b.installs - a.installs);
                this.setState({ adapters: ads, count });
            });
    }

    render() {
        if (!this.state.adapters.length) {
            return null;
        }

        this.words = this.words || {};
        this.words.installed = I18n.t('installed %s times');

        return <Box
            key="adaptersAll"
            sx={this.props.backStyle}
            style={{ ...styles.mainDiv, ...(this.props.mobile ? styles.mainDivMobile : undefined) }}
        >
            <div style={styles.title}>{I18n.t('Over %s connected services and systems!', this.state.count)}</div>
            <div style={styles.boxDiv}>
                <div style={styles.box}>
                    {this.state.adapters.map((a, i) =>
                        <Box key={`${a}_${i}`} sx={styles.adapter} title={`${a.name}, ${this.words.installed.replace('%s', a.installs)}`}>
                            <img
                                style={styles.icon}
                                src={a.icon}
                                alt={a.name}
                                onClick={() =>
                                    this.props.onNavigate(null, 'adapters', `adapterref/iobroker.${a.name}/README.md`)}
                            />
                        </Box>)}
                </div>
            </div>
        </Box>;
    }
}

Adapters.propTypes = {
    onNavigate: PropTypes.func,
    language: PropTypes.string,
    mobile: PropTypes.bool,
    backStyle: PropTypes.func,
};

export default Adapters;
