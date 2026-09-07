import React, { useState, useEffect } from 'react';
import { Box, Tooltip } from '@mui/material';
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
import {
    ADAPTERS_LINK,
    BLOG_LINK,
    DOCS_LINK,
    IMPRINT_LINK,
    INSTALLATION_LINK,
    LICENSES_LINK,
    PRIVACY_LINK,
    STATISTICS_LINK,
} from '../../config/api';
import { EXTERNAL_LINKS } from '../../config/links';
import { openCookieSettings } from '../CookiesHint/CookiesHint';

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
    tooltip?: string;
    classes: any;
}): React.JSX.Element {
    const button = (
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
                        return res === key ? I18n.t(props.name) : res;
                    })()}
                </div>
            ) : !props.noText ? (
                <div style={{ marginTop: props.textOffset || undefined, height: 16 }} />
            ) : null}
        </Box>
    );

    return props.tooltip ? <Tooltip title={props.tooltip}>{button}</Tooltip> : button;
}

function Braces(props: {
    children: React.JSX.Element | React.JSX.Element[];
    style?: React.CSSProperties;
    classes: any;
    outerClassName?: string;
    leftClassName?: string;
    rightClassName?: string;
    contentClassName?: string;
}): React.JSX.Element {
    return (
        <Box
            className={props.outerClassName ? `${props.classes.braces} ${props.outerClassName}` : props.classes.braces}
            style={props.style}
        >
            <div className={props.leftClassName || props.classes.bracesLeft} />
            <div className={props.contentClassName || props.classes.bracesContent}>{props.children}</div>
            <div className={props.rightClassName || props.classes.bracesRight} />
        </Box>
    );
}

function Link(props: { name: string; url?: string; classes: any }): React.JSX.Element {
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
        <Box
            component="a"
            className={props.classes.link}
            href={props.url || `/${props.name}`}
        >
            {(() => {
                const menuKey = `menu-${props.name}`;
                const menuRes = I18n.t(menuKey);
                if (menuRes !== menuKey) {
                    return menuRes;
                }
                const genericKey = mapToGeneric[props.name] || props.name.charAt(0).toUpperCase() + props.name.slice(1);
                return I18n.t(genericKey);
            })()}
        </Box>
    );
}

export const Footer = ({ scrollTop }: FooterProps): React.ReactNode => {
    const { classes } = useFooterStyles();
    const [lng, setLng] = useState(I18n.getLanguage());
    useEffect(() => I18n.subscribe(setLng), []);

    return (
        <Box
            className={classes.root}
            data-lang={lng}
        >
            <Box className={classes.container}>
                <Box className={classes.mainContent}>
                    <Box className={classes.logoBox}>
                        <img
                            src={logo}
                            className={classes.logo}
                            alt="logo"
                        />
                    </Box>

                    <Box className={classes.sectionsWrapper}>
                        <Box className={classes.sectionsRow}>
                            <Braces
                                classes={classes}
                                outerClassName={classes.sectionBrace}
                            >
                                <div className={classes.supportColumn}>
                                    {/* eine Beschriftung fuer jede Breite - es gab zwei
                                        Fassungen mit demselben Text, die bei 736 px
                                        wechselten (Denis, 06.09.2026) */}
                                    <div className={classes.supportLabel}>{I18n.t('Support us')}</div>
                                    <div className={classes.donateButtons}>
                                        <OwnButton
                                            noText
                                            classes={classes}
                                            href={EXTERNAL_LINKS.PAYPAL_DONATE}
                                            tooltip={I18n.t('tooltip.paypal')}
                                            icon={<PayPalIcon />}
                                        />
                                        <OwnButton
                                            noText
                                            classes={classes}
                                            href={EXTERNAL_LINKS.AMAZON}
                                            tooltip={I18n.t('tooltip.amazon')}
                                            icon={<AmazonIcon />}
                                        />
                                    </div>
                                </div>
                            </Braces>

                            <Braces
                                classes={classes}
                                outerClassName={classes.sectionBrace}
                            >
                                <div className={classes.linksColumn}>
                                    <Link
                                        classes={classes}
                                        name="adapters"
                                        url={ADAPTERS_LINK}
                                    />
                                    <Link
                                        classes={classes}
                                        name="licenses"
                                        url={LICENSES_LINK}
                                    />
                                    <Link
                                        classes={classes}
                                        name="installation"
                                        url={INSTALLATION_LINK}
                                    />
                                </div>
                            </Braces>

                            <Braces
                                classes={classes}
                                outerClassName={classes.sectionBrace}
                            >
                                <div className={classes.linksColumn}>
                                    <Link
                                        classes={classes}
                                        name="blog"
                                        url={BLOG_LINK}
                                    />
                                    <Link
                                        classes={classes}
                                        name="docs"
                                        url={DOCS_LINK}
                                    />
                                    <Link
                                        classes={classes}
                                        name="statistics"
                                        url={STATISTICS_LINK}
                                    />
                                </div>
                            </Braces>

                            {/* Mobile only*/}
                            <Box className={classes.legalLinksMobile}>
                                <Braces
                                    classes={classes}
                                    outerClassName={classes.sectionBrace}
                                >
                                    <div className={classes.linksColumn}>
                                        <Box
                                            className={classes.link}
                                            onClick={() => openCookieSettings()}
                                        >
                                            {I18n.t('Cookies')}
                                        </Box>
                                        <Link
                                            classes={classes}
                                            name="imprint"
                                            url={IMPRINT_LINK}
                                        />
                                        <Link
                                            classes={classes}
                                            name="policy"
                                            url={PRIVACY_LINK}
                                        />
                                    </div>
                                </Braces>
                            </Box>
                        </Box>

                        <Braces
                            classes={classes}
                            style={{ width: '100%' }}
                            outerClassName={classes.socialBrace}
                            leftClassName={classes.socialBracesLeft}
                            rightClassName={classes.socialBracesRight}
                            contentClassName={classes.socialBracesContent}
                        >
                            <Box className={classes.socialRow}>
                                <div className={classes.followUsText}>{I18n.t('Follow us:')}</div>
                                <div className={classes.socialIconsWrapper}>
                                    {/* stand bis 06.09.2026 unter 600 px auf `hideOnSmall` -
                                        das Forum ist der wichtigste der sieben Verweise
                                        und fehlte ausgerechnet auf dem Handy */}
                                    <OwnButton
                                        classes={classes}
                                        noText
                                        href={EXTERNAL_LINKS.FORUM}
                                        tooltip={I18n.t('tooltip.forum')}
                                        icon={<ForumIcon />}
                                    />
                                    <OwnButton
                                        classes={classes}
                                        noText
                                        href={EXTERNAL_LINKS.GITHUB}
                                        tooltip={I18n.t('tooltip.github')}
                                        icon={<GitHubIcon />}
                                    />
                                    {/* "GitHub Community" stand hier als zweites GitHub-Zeichen
                                        und war fuer Besucher nicht von dem daneben zu
                                        unterscheiden - am 06.09.2026 entfernt (Denis) */}
                                    {/* ohne Bildunterschrift: sie war nach dem Entfernen von
                                        "GitHub Community" die einzige in der Reihe und hing
                                        allein unter einem Zeichen (Denis, 06.09.2026).
                                        Gruppe und Seite unterscheidet jetzt nur der Tooltip. */}
                                    <OwnButton
                                        classes={classes}
                                        noText
                                        href={EXTERNAL_LINKS.FACEBOOK_GROUP}
                                        tooltip={I18n.t('tooltip.facebook_group')}
                                        icon={<FacebookIcon />}
                                    />
                                    {/* Die Facebook-Seite stand hier mit demselben Zeichen wie die
                                        Gruppe daneben - fuer Besucher nicht zu unterscheiden. Am
                                        06.09.2026 entfernt (Denis), die Gruppe bleibt. Im
                                        Hauptmenue stehen weiter beide. */}
                                    <OwnButton
                                        classes={classes}
                                        noText
                                        href={EXTERNAL_LINKS.DISCORD}
                                        tooltip={I18n.t('tooltip.discord')}
                                        icon={<DiscordIcon />}
                                    />
                                    <OwnButton
                                        classes={classes}
                                        noText
                                        href={EXTERNAL_LINKS.INSTAGRAM}
                                        tooltip={I18n.t('tooltip.instagram')}
                                        icon={<InstagramIcon />}
                                    />
                                </div>
                            </Box>
                        </Braces>
                    </Box>
                </Box>

                <Box className={classes.copyright}>
                    <div className={classes.copyrightText}>
                        Copyright 2014-{new Date().getFullYear()} by ioBroker GmbH and ioBroker Community
                    </div>
                    <div className={classes.flexGrow} />
                    <Box
                        className={`${classes.link} ${classes.legalLinksDesktop}`}
                        onClick={() => openCookieSettings()}
                    >
                        {I18n.t('Cookies')}
                    </Box>
                    <Box
                        component="a"
                        className={`${classes.link} ${classes.legalLinksDesktop}`}
                        href={IMPRINT_LINK}
                    >
                        {I18n.t('Imprint')}
                    </Box>
                    <Box
                        component="a"
                        className={`${classes.link} ${classes.legalLinksDesktop}`}
                        href={PRIVACY_LINK}
                    >
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
