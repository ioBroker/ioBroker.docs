import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery } from '@mui/material';
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
import { I18n } from '../../utils/i18n';

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
                <div style={{ marginTop: props.textOffset || undefined }}>
                    {(() => {
                        const key = `menu-${props.name}`;
                        const res = I18n.t(key);
                        return res === key ? I18n.t(props.name as string) : res;
                    })()}
                </div>
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
    leftClassName?: string;
    rightClassName?: string;
    contentClassName?: string;
}): React.JSX.Element {
    return (
        <Box className={props.classes.braces} style={props.style}>
            <div className={props.leftClassName || props.classes.bracesLeft} />
            <div className={props.contentClassName || props.classes.bracesContent}>{props.children}</div>
            <div className={props.rightClassName || props.classes.bracesRight} />
        </Box>
    );
}

function Link(props: {
    name: string;
    url?: string;
    classes: any;
}): React.JSX.Element {
    const mapToGeneric: Record<string, string> = {
        adapters: 'Adapters',
        licenses: 'Licenses',
        installation: 'Installation',
        blog: 'Blog',
        docs: 'Docs',
        statistics: 'Statistics',
        imprint: 'Imprint',
        policy: 'Privacy',
    };
    return (
        <Box component="a" className={props.classes.link} href={props.url || `/${props.name}`}>
            {(() => {
                const menuKey = `menu-${props.name}`;
                const menuRes = I18n.t(menuKey);
                if (menuRes !== menuKey) {
                    return menuRes;
                }
                const genericKey = mapToGeneric[props.name] || (props.name.charAt(0).toUpperCase() + props.name.slice(1));
                return I18n.t(genericKey);
            })()}
        </Box>
    );
}

export const Footer = ({ scrollTop }: FooterProps) => {
    const { classes } = useFooterStyles();
    const [, setShowCookies] = useState(false);
    const [lng, setLng] = useState(I18n.getLanguage());
    useEffect(() => I18n.subscribe(setLng), []);
    const isSmallScreen = useMediaQuery('(max-width:500px)');
    const bracesSize = isSmallScreen ? { height: 166, width: 157 } : { height: 171, width: 195 };

    return (
        <Box className={classes.root} data-lang={lng}>
            <Box className={classes.container}>
                <Box className={classes.mainContent}>
                    <Box className={classes.logoBox}>
                        <img src={logo} className={classes.logo} alt="logo" />
                    </Box>

                    <Box className={classes.sectionsWrapper}>
                        <Box className={classes.sectionsRow}>
                            <Braces classes={classes} style={bracesSize}>
                                <div className={classes.supportColumn}>
                                    <div className={classes.supportText}>
                                        <div>{I18n.t('Support us')}</div>
                                    </div>
                                    <div className={classes.supportTextMobile}>
                                        <div>{I18n.t('Support us (mobile)')}</div>
                                    </div>
                                    <div className={classes.donateButtons}>
                                        <OwnButton
                                            noText
                                            classes={classes}
                                            href="https://www.paypal.com/donate?token=J1zM6AXCz_P6OnZLIK971kfv4cD7mWjxhTGmD1R9sQGYbVEF0EftIrcY2eqo7VbEAT9ekhVU_UxGBxgf"
                                            icon={<PayPalIcon />}
                                        />
                                        <OwnButton
                                            noText
                                            classes={classes}
                                            href="https://www.amazon.de/s?k=homematic&tag=httpwwwiobron-21"
                                            icon={<AmazonIcon />}
                                        />
                                    </div>
                                </div>
                            </Braces>

                            <Braces classes={classes} style={bracesSize}>
                                <div className={classes.linksColumn}>
                                    <Link classes={classes} name="adapters" url="https://www.iobroker.net/adapters" />
                                    <Link classes={classes} name="licenses" url="https://www.iobroker.net/licenses" />
                                    <Link classes={classes} name="installation" url="https://www.iobroker.net/installation" />
                                </div>
                            </Braces>

                            <Braces classes={classes} style={bracesSize}>
                                <div className={classes.linksColumn}>
                                    <Link classes={classes} name="blog" url="https://www.iobroker.net/blog" />
                                    <Link classes={classes} name="docs" url="https://www.iobroker.net/docs" />
                                    <Link classes={classes} name="statistics" url="https://www.iobroker.net/statistics" />
                                </div>
                            </Braces>

                            {/* Mobile only*/}
                            <Box className={classes.legalLinksMobile}>
                                <Braces classes={classes} style={bracesSize}>
                                    <div className={classes.linksColumn}>
                                        <Box className={classes.link} onClick={() => setShowCookies(true)}>
                                            {I18n.t('Cookies')}
                                        </Box>
                                        <Link classes={classes} name="imprint" url="/imprint" />
                                        <Link classes={classes} name="policy" url="/policy" />
                                    </div>
                                </Braces>
                            </Box>
                        </Box>

                        <Braces
                            classes={classes}
                            style={{ width: '100%' }}
                            leftClassName={classes.socialBracesLeft}
                            rightClassName={classes.socialBracesRight}
                            contentClassName={classes.socialBracesContent}
                        >
                            <Box className={classes.socialRow}>
                                <div className={classes.followUsText}>{I18n.t('Follow us:')}</div>
                                <div className={classes.socialIconsWrapper}>
                                    <Box className={classes.hideOnSmall}>
                                        <OwnButton classes={classes} href="https://forum.iobroker.net" icon={<ForumIcon />} />
                                    </Box>
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
                                </div>
                            </Box>
                        </Braces>
                    </Box>
                </Box>

                <Box className={classes.copyright}>
                    <div className={classes.copyrightText}>Copyright 2014-{new Date().getFullYear()} by ioBroker GmbH and ioBroker Community</div>
                    <div className={classes.flexGrow} />
                    <Box className={`${classes.link} ${classes.legalLinksDesktop}`} onClick={() => setShowCookies(true)}>
                        {I18n.t('Cookies')}
                    </Box>
                    <Box component="a" className={`${classes.link} ${classes.legalLinksDesktop}`} href="/imprint">
                        {I18n.t('Imprint')}
                    </Box>
                    <Box component="a" className={`${classes.link} ${classes.legalLinksDesktop}`} href="/policy">
                        {I18n.t('Privacy')}
                    </Box>
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
