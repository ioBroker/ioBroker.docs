import React, { useState } from 'react';
import { Box } from '@mui/material';
import ForumIcon from '../icons/ForumIcon';
import GitHubIcon from '../icons/GitHubIcon';
import FacebookIcon from '../icons/FacebookIcon';
import DiscordIcon from '../icons/DiscordIcon';
import InstagramIcon from '../icons/InstagramIcon';
import PayPalIcon from '../icons/PayPalIcon';
import AmazonIcon from '../icons/AmazonIcon';
import ArrowIcon from '../icons/ArrowIcon';
import logo from '../../assets/img/logo_net.svg';
import { useFooterStyles } from './Footer.styles';

export interface FooterProps {
    scrollTop?: () => void;
    location?: string;
}

function OwnButton(props: {
    href?: string;
    name?: string;
    icon: React.JSX.Element;
    textOffset?: number;
    noText?: boolean;
    classes: any;
}): React.JSX.Element {
    return (
        <Box
            component="a"
            className={props.classes.socialButton}
            href={props.href || `/${props.name}`}
            rel="noreferrer"
            target="_blank"
        >
            {props.icon}
            {props.name ? (
                <div style={{ marginTop: props.textOffset || undefined }}>{props.name}</div>
            ) : !props.noText ? (
                <div style={{ marginTop: props.textOffset || undefined, height: 16 }} />
            ) : null}
        </Box>
    );
}

function Braces(props: {
    children: React.JSX.Element | React.JSX.Element[];
    style?: React.CSSProperties;
    classes: any;
}): React.JSX.Element {
    return (
        <Box className={props.classes.braces} style={props.style}>
            <div className={props.classes.bracesLeft} />
            <div className={props.classes.bracesContent}>{props.children}</div>
            <div className={props.classes.bracesRight} />
        </Box>
    );
}

function Link(props: {
    name: string;
    url?: string;
    classes: any;
}): React.JSX.Element {
    return (
        <Box component="a" className={props.classes.link} href={props.url || `/${props.name}`}>
            {props.name}
        </Box>
    );
}

export const Footer = ({ scrollTop }: FooterProps) => {
    const { classes } = useFooterStyles();
    const [, setShowCookies] = useState(false);

    return (
        <Box className={classes.root}>
            <Box className={classes.container}>
                <Box className={classes.mainContent}>
                    <Box className={classes.logoBox}>
                        <img src={logo} className={classes.logo} alt="logo" />
                    </Box>

                    <Box className={classes.sectionsWrapper}>
                        <Box className={classes.sectionsRow}>
                            {/* Support Us */}
                            <Braces classes={classes} style={{ minHeight: 120, minWidth: 150 }}>
                                <div className={classes.supportColumn}>
                                    <div className={classes.supportText}>
                                        <div>Support</div>
                                        <div>us:</div>
                                    </div>
                                    <div className={classes.donateButtons}>
                                        <OwnButton
                                            noText
                                            classes={classes}
                                            href="https://www.paypal.com/donate"
                                            icon={<PayPalIcon />}
                                        />
                                        <OwnButton
                                            noText
                                            classes={classes}
                                            href="https://www.amazon.de"
                                            icon={<AmazonIcon />}
                                        />
                                    </div>
                                </div>
                            </Braces>

                            <Braces classes={classes} style={{ minHeight: 120, minWidth: 150 }}>
                                <div className={classes.linksColumn}>
                                    <Link classes={classes} name="Adapters" url="https://www.iobroker.net/adapters" />
                                    <Link classes={classes} name="Licenses" url="https://www.iobroker.net/licenses" />
                                    <Link classes={classes} name="Installation" url="https://www.iobroker.net/installation" />
                                </div>
                            </Braces>

                            <Braces classes={classes} style={{ minHeight: 120, minWidth: 150 }}>
                                <div className={classes.linksColumn}>
                                    <Link classes={classes} name="Blog" url="https://www.iobroker.net/blog" />
                                    <Link classes={classes} name="Docs" url="https://www.iobroker.net/docs" />
                                    <Link classes={classes} name="Statistics" url="https://www.iobroker.net/statistics" />
                                </div>
                            </Braces>
                        </Box>

                        <Braces classes={classes} style={{ width: '100%' }}>
                            <Box className={classes.socialRow}>
                                <div className={classes.followUsText}>Follow us:</div>
                                <OwnButton classes={classes} href="https://forum.iobroker.net" icon={<ForumIcon />} />
                                <OwnButton classes={classes} href="https://github.com/ioBroker" icon={<GitHubIcon />} />
                                <OwnButton
                                    classes={classes}
                                    name="community"
                                    href="https://github.com/iobroker-community-adapters"
                                    icon={<GitHubIcon />}
                                />
                                <OwnButton
                                    classes={classes}
                                    name="group"
                                    textOffset={-8}
                                    href="https://www.facebook.com/groups/440499112958264"
                                    icon={<FacebookIcon />}
                                />
                                <OwnButton
                                    classes={classes}
                                    href="https://www.facebook.com/iobroker1/"
                                    textOffset={-8}
                                    icon={<FacebookIcon />}
                                />
                                <OwnButton classes={classes} href="https://discord.gg/HwUCwsH" icon={<DiscordIcon />} />
                                <OwnButton
                                    classes={classes}
                                    href="https://www.instagram.com/iobroker.gmbh/"
                                    icon={<InstagramIcon />}
                                />
                            </Box>
                        </Braces>
                    </Box>
                </Box>

                <Box className={classes.copyright}>
                    <div className={classes.copyrightText}>© {new Date().getFullYear()} ioBroker</div>
                    <div className={classes.flexGrow} />
                    <Box className={classes.link} onClick={() => setShowCookies(true)}>
                        Cookies
                    </Box>
                    <Link classes={classes} name="Imprint" url="/imprint" />
                    <Link classes={classes} name="Policy" url="/policy" />
                    <div
                        className={classes.scrollTop}
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            scrollTop?.();
                        }}
                    >
                        <ArrowIcon />
                    </div>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
