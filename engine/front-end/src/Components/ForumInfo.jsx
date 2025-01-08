import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
} from '@mui/material';

import {
    FaUsers as IconForum,
    FaAddressCard as IconUsers,
    FaComments as IconPosts,
    FaComment as IconThemes,
} from 'react-icons/fa';

import I18n from '../i18n';
import Utils from '../Utils';

const styles = {
    forumDiv: {
        width: 'calc(100% - 60px)',
        textAlign: 'center',
        padding: 30,
    },
    forumTitle: {
        fontSize: 20,
    },
    forumDivInfo: {
        width: '100%',
        maxWidth: 600,
        display: 'inline-block',
    },
    forumDivInfoBox: {
        width: '100%',
        display: 'flex',
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    forumDivInfoCard: {
        width: 200,
        flex: 1,
    },
    forumIconMain: {
        display: 'inline-block',
        width: 64,
        height: 64,
    },
    forumDivInfoIcon: {
        width: 32,
        height: 32,
    },
    forumDivInfoText: {
        fontSize: 20,
    },
    forumDivInfoValue: {
        fontSize: 32,
    },
    forumDivInfoValueMobile: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    forumButton: {
        display: 'inline-block',
        color: '#FFFFFF',
        fontSize: 20,
        marginTop: 20,
    },
};

class ForumInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: 18490,
            topics: 23000,
            posts: 250000,
            date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
        };
        this.load();
    }

    onGoToForum() {
        if (this.props.language === 'ru') {
            Utils.openLink('https://forum.iobroker.net/category/28/%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9');
        } else if (this.props.language === 'zh-cn') {
            Utils.openLink('https://bbs.iobroker.cn/');
        } else if (this.props.language === 'de') {
            Utils.openLink('https://forum.iobroker.net/category/4/deutsch');
        }  else if (this.props.language === 'nl') {
            Utils.openLink('https://forum.iobroker.net/category/40/nederlands');
        } else {
            Utils.openLink('https://forum.iobroker.net/');
        }
    }

    load() {
        fetch('data/forum.json')
            .then(res => res.json())
            .then(stats => {
                stats.date = `${new Date(stats.date).toLocaleDateString()} ${new Date(stats.date).toLocaleTimeString()}`;
                this.setState(stats);
            })
            .catch(e => console.error(`Cannot load forum stats: ${e}`));
    }

    render() {
        return <Box key="forum" style={styles.forumDiv} sx={this.props.backStyle}>
            <IconForum style={styles.forumIconMain} />
            <br />
            <span style={styles.forumTitle}>{I18n.t('forum-text')}</span>
            <br />
            <div style={styles.forumDivInfo}>
                <div style={styles.forumDivInfoBox}>
                    <div style={styles.forumDivInfoCard} title={this.state.date}>
                        <IconPosts style={styles.forumDivInfoIcon} />
                        <br />
                        <span style={styles.forumDivInfoText}>{I18n.t('Posts')}</span>
                        <br />
                        <span style={{ ...styles.forumDivInfoValue, ...(this.props.mobile ? styles.forumDivInfoValueMobile : undefined) }}>{this.state.posts}</span>
                    </div>
                    <div style={styles.forumDivInfoCard} title={this.state.date}>
                        <IconUsers style={styles.forumDivInfoIcon} />
                        <br />
                        <span style={styles.forumDivInfoText}>{I18n.t('Users')}</span>
                        <br />
                        <span style={{ ...styles.forumDivInfoValue, ...(this.props.mobile ? styles.forumDivInfoValueMobile : undefined) }}>{this.state.users}</span>
                    </div>
                    <div style={styles.forumDivInfoCard} title={this.state.date}>
                        <IconThemes style={styles.forumDivInfoIcon} />
                        <br />
                        <span style={styles.forumDivInfoText}>{I18n.t('Themes')}</span>
                        <br />
                        <span style={{ ...styles.forumDivInfoValue, ...(this.props.mobile ? styles.forumDivInfoValueMobile : undefined) }}>{this.state.topics}</span>
                    </div>
                </div>
            </div>
            <br />
            <Button variant="contained" color="secondary" style={styles.forumButton} onClick={() => this.onGoToForum()}>
                {I18n.t('Join now')}
            </Button>
        </Box>;
    }
}

ForumInfo.propTypes = {
    language: PropTypes.string,
    mobile: PropTypes.bool,
    backStyle: PropTypes.func,
};

export default ForumInfo;
