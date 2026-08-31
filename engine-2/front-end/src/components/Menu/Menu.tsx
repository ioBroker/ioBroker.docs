import React, { useState, useRef, useEffect } from 'react';

import { Dialog, Box, IconButton, TextField, InputAdornment, Tooltip, useTheme } from '@mui/material';
import { Close } from '@mui/icons-material';

import logo from '../../assets/img/logo_net_small.svg';
import { I18n, type Language } from '../../utils/i18n';
import {
    ADAPTERS_LINK,
    BLOG_LINK,
    DOCS_LINK,
    HOME_LINK,
    IMPRINT_LINK,
    INSTALLATION_LINK,
    LICENSES_LINK,
    PRIVACY_LINK,
    STATISTICS_LINK,
} from '../../config/api';
import { EXTERNAL_LINKS } from '../../config/links';
import { ThemeSwitcher } from '../ThemeSwitcher';
import SearchDialog from '../SearchDialog/SearchDialog';
import SearchIcon from '../icons/SearchIcon';
import GitHubIcon from '../icons/GitHubIcon';
import FacebookIcon from '../icons/FacebookIcon';
import DiscordIcon from '../icons/DiscordIcon';
import InstagramIcon from '../icons/InstagramIcon';

export type MenuItems = 'Adapters' | 'Docs' | 'Blog' | 'Licenses' | 'Profile' | 'Installation';
export type MenuItemsSmall = 'Forum' | 'Statistik' | 'Impressum' | 'Datenschutz';

function Link(props: {
    name: MenuItems | MenuItemsSmall;
    big?: boolean;
    selected?: MenuItems | MenuItemsSmall;
    noDesktop?: boolean;
    url?: string;
    location?: string;
    // navigateTo?: ((path: ExtendedRoutes | MenuPoints | '', query?: string) => void) | null;
    onClose?: () => void;
}): React.JSX.Element {
    const nameToKey: Record<string, string> = {
        Adapters: 'menu-adapters',
        Docs: 'menu-docs',
        Blog: 'menu-blog',
        Licenses: 'menu-licenses',
        Installation: 'menu-installation',
        Forum: 'menu-forum',
        Statistik: 'menu-statistics',
        Impressum: 'menu-imprint',
        Datenschutz: 'menu-policy',
        Profile: 'menu-profile',
    };
    return (
        <Box
            component="a"
            sx={theme => ({
                color: props.selected === props.name ? '#1D90CA' : theme.palette.text.primary,
                cursor: props.selected === props.name ? 'default' : 'pointer',
                '&:hover': {
                    color:
                        props.selected !== props.name
                            ? theme.palette.mode === 'dark'
                                ? '#7ec3f3'
                                : '#006bbc'
                            : undefined,
                },
                fontSize: props.big ? 22 : 17,
                '@media (max-width: 800px)': {
                    fontSize: 17,
                },
                '@media (min-width: 800px)': {
                    display: props.noDesktop ? 'none' : undefined,
                },
            })}
            // onClick={e => {
            //     if (props.name && props.navigateTo) {
            //         e.preventDefault();
            //         void props.navigateTo(props.name as any);
            //     }
            //     props.onClose?.();
            // }}
            href={props.url || (props.location ? `/${props.location}/${props.name}` : `/${props.name}`)}
            style={{
                textWrap: 'nowrap',
                textDecoration: 'none',
                textTransform: props.big || props.noDesktop ? 'uppercase' : undefined,
            }}
        >
            {I18n.t(nameToKey[props.name] || props.name)}
        </Box>
    );
}

function OwnButton(props: {
    href?: string;
    name?: string;
    icon: React.JSX.Element;
    textOffset?: number;
    tooltip?: string;
}): React.JSX.Element {
    const button = (
        <Box
            component="a"
            href={props.href || `/${props.name}`}
            sx={theme => ({
                color: theme.palette.text.primary,
                '&:hover': {
                    textDecoration: 'none',
                    color: theme.palette.mode === 'dark' ? '#7ec3f3' : '#006bbc',
                },
            })}
            style={{
                textDecoration: 'none',
                display: 'block',
                textAlign: 'center',
                fontSize: '10px',
            }}
            rel="noreferrer"
            target="_blank"
        >
            {props.icon}
            {props.name ? (
                <div style={{ marginTop: props.textOffset || undefined }}>
                    {I18n.t(`menu-${props.name.toLowerCase()}`)}
                </div>
            ) : null}
        </Box>
    );

    return props.tooltip ? <Tooltip title={props.tooltip}>{button}</Tooltip> : button;
}

interface MenuProps {
    onClose: () => void;
    selected?: MenuItems | MenuItemsSmall;
    noSearch?: boolean;
    onLanguageUpdate?: () => void;
    location?: string;
}

export default function Menu(props: MenuProps): React.JSX.Element {
    const [search, setSearch] = useState('');
    const [searchDialogOpen, setSearchDialogOpen] = useState(false);
    const [language, setLanguage] = useState<Language>(I18n.getLanguage());
    const inputRef = useRef<HTMLInputElement | null>(null);
    const theme = useTheme();
    useEffect(() => {
        const unsub = I18n.subscribe(lng => setLanguage(lng));
        return () => {
            unsub();
        };
    }, []);

    const languages = (
        <>
            <div
                style={{
                    cursor: 'pointer',
                    color: language === 'en' ? theme.palette.primary.main : undefined,
                }}
                onClick={() => {
                    I18n.setLanguage('en');
                    props.onLanguageUpdate?.();
                }}
            >
                EN
            </div>{' '}
            /{' '}
            <div
                style={{
                    cursor: 'pointer',
                    color: language === 'de' ? theme.palette.primary.main : undefined,
                }}
                onClick={() => {
                    I18n.setLanguage('de');
                    props.onLanguageUpdate?.();
                }}
            >
                DE
            </div>{' '}
            /{' '}
            <div
                style={{
                    cursor: 'pointer',
                    color: language === 'ru' ? theme.palette.primary.main : undefined,
                }}
                onClick={() => {
                    I18n.setLanguage('ru');
                    props.onLanguageUpdate?.();
                }}
            >
                RU
            </div>
        </>
    );

    return (
        <Dialog
            className="menu"
            open={!0}
            onClose={() => props.onClose()}
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    backgroundColor: 'transparent',
                    margin: 0,
                    maxHeight: 'unset',
                    maxWidth: 960,
                    boxShadow: 'none',
                    width: '90%',
                    '@media (max-width: 800px)': {
                        width: 'calc(100% - 20px)',
                    },
                },
                '&.MuiDialog-root': {
                    backdropFilter: 'blur(10px)',
                },
            }}
        >
            <SearchDialog
                search={search}
                open={searchDialogOpen}
                onClose={() => setSearchDialogOpen(false)}
            />
            <Box
                sx={theme => ({
                    fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
                    backgroundColor: theme.palette.mode === 'dark' ? '#080B1CE0' : '#FFFFFFE0',
                    borderRadius: `${theme.custom.radius.card}px`,
                    boxShadow: `inset 0 0 0 1px ${theme.custom.hairlineStrong}, ${theme.custom.elevation.overlay}`,
                })}
            >
                <Box
                    sx={theme => ({
                        display: 'flex',
                        flexDirection: 'column',
                        color: theme.palette.text.primary,
                        padding: '28px 32px 32px 40px',
                        gap: '56px',
                        '@media (max-width: 800px)': {
                            padding: '16px 20px 24px 24px',
                            gap: '32px',
                        },
                    })}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                '@media (max-width: 800px)': {
                                    display: 'none',
                                },
                            }}
                            style={{ flexDirection: 'column', gap: 12 }}
                        >
                            <a href={HOME_LINK}>
                                <img
                                    src={logo}
                                    style={{
                                        marginLeft: -2,
                                        width: 36,
                                        height: 36,
                                        cursor: 'pointer',
                                        marginBottom: 20,
                                        marginRight: 20,
                                    }}
                                    alt="logo"
                                />
                            </a>
                            <Link
                                name="Blog"
                                selected={props.selected}
                                url={BLOG_LINK}
                                onClose={props.onClose}
                            />
                            <Link
                                name="Forum"
                                selected={props.selected}
                                url={EXTERNAL_LINKS.FORUM}
                                onClose={props.onClose}
                            />
                            <Link
                                name="Statistik"
                                selected={props.selected}
                                url={STATISTICS_LINK}
                                onClose={props.onClose}
                            />
                            <Link
                                name="Impressum"
                                url={IMPRINT_LINK}
                                selected={props.selected}
                                // navigateTo={context.navigateTo}
                                onClose={props.onClose}
                                location={props.location}
                            />
                            <Link
                                name="Datenschutz"
                                url={PRIVACY_LINK}
                                selected={props.selected}
                                // navigateTo={context.navigateTo}
                                onClose={props.onClose}
                                location={props.location}
                            />
                            <Box style={{ marginTop: 16, fontSize: 18, gap: 8, display: 'flex' }}>{languages}</Box>
                        </Box>
                        <Box
                            sx={{
                                gap: '16px',
                                '@media (max-width: 800px)': {
                                    gap: '8px',
                                },
                            }}
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <Box
                                style={{
                                    marginBottom: 20,
                                    color: '#1D90CA',
                                }}
                                sx={{
                                    fontSize: 44,
                                    '@media (max-width: 800px)': {
                                        fontSize: 28,
                                    },
                                }}
                            >
                                {I18n.t('menu-menu')}
                            </Box>
                            <Link
                                name="Docs"
                                selected={props.selected}
                                big
                                url={DOCS_LINK}
                                onClose={props.onClose}
                            />
                            <Link
                                name="Adapters"
                                selected={props.selected}
                                big
                                url={ADAPTERS_LINK}
                                onClose={props.onClose}
                            />
                            <Link
                                name="Licenses"
                                selected={props.selected}
                                big
                                url={LICENSES_LINK}
                                onClose={props.onClose}
                            />
                            <Link
                                name="Installation"
                                selected={props.selected}
                                big
                                url={INSTALLATION_LINK}
                                onClose={props.onClose}
                            />
                            <Link
                                noDesktop
                                name="Blog"
                                selected={props.selected}
                                url={BLOG_LINK}
                                onClose={props.onClose}
                            />
                            <Link
                                noDesktop
                                name="Forum"
                                selected={props.selected}
                                url={EXTERNAL_LINKS.FORUM}
                                onClose={props.onClose}
                            />
                            <Link
                                noDesktop
                                name="Statistik"
                                selected={props.selected}
                                url={STATISTICS_LINK}
                                onClose={props.onClose}
                            />
                            <Box
                                style={{ marginTop: 16, fontSize: 18, gap: 8 }}
                                sx={{ display: 'flex', '@media (min-width: 800px)': { display: 'none' } }}
                            >
                                {languages}
                            </Box>
                        </Box>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Tooltip title={I18n.t('tooltip.close')}>
                                <Box
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                    sx={theme => ({
                                        width: theme.custom.control.compactHeight,
                                        height: theme.custom.control.compactHeight,
                                        padding: '8px',
                                        boxSizing: 'border-box',
                                        borderRadius: `${theme.custom.radius.control}px`,
                                        marginBottom: '20px',
                                        color: theme.custom.textMuted,
                                        transition: 'background-color 0.2s ease, color 0.2s ease',
                                        '@media (max-width: 800px)': {
                                            width: 32,
                                            height: 32,
                                            padding: '7px',
                                            marginBottom: '16px',
                                        },
                                        '&:hover': {
                                            backgroundColor: theme.custom.surfaces.raised,
                                            color: theme.palette.text.primary,
                                        },
                                    })}
                                    onClick={() => props.onClose()}
                                >
                                    <svg
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        viewBox="0 0 40 40"
                                        fill="none"
                                    >
                                        <path
                                            d="M20 24.2586L5.09506 39.1635C4.53739 39.7212 3.82763 40 2.96578 40C2.10393 40 1.39417 39.7212 0.836501 39.1635C0.278833 38.6058 0 37.8961 0 37.0342C0 36.1724 0.278833 35.4626 0.836501 34.9049L15.7414 20L0.836501 5.09506C0.278833 4.53739 0 3.82763 0 2.96578C0 2.10393 0.278833 1.39417 0.836501 0.836501C1.39417 0.278833 2.10393 0 2.96578 0C3.82763 0 4.53739 0.278833 5.09506 0.836501L20 15.7414L34.9049 0.836501C35.4626 0.278833 36.1724 0 37.0342 0C37.8961 0 38.6058 0.278833 39.1635 0.836501C39.7212 1.39417 40 2.10393 40 2.96578C40 3.82763 39.7212 4.53739 39.1635 5.09506L24.2586 20L39.1635 34.9049C39.7212 35.4626 40 36.1724 40 37.0342C40 37.8961 39.7212 38.6058 39.1635 39.1635C38.6058 39.7212 37.8961 40 37.0342 40C36.1724 40 35.4626 39.7212 34.9049 39.1635L20 24.2586Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </Box>
                            </Tooltip>
                            <ThemeSwitcher />
                        </div>
                    </div>
                    <Box
                        style={{ display: 'flex' }}
                        sx={{
                            flexDirection: 'row',
                            flexWrap: 'nowrap',
                            gap: '8px',
                            alignItems: 'center',
                            '@media (max-width: 800px)': { flexDirection: 'column', gap: '40px', alignItems: 'unset' },
                        }}
                    >
                        <div style={{ flexGrow: 1 }}>
                            {!props.noSearch ? (
                                <TextField
                                    variant="standard"
                                    placeholder={I18n.t('menu-search')}
                                    inputRef={inputRef}
                                    sx={theme => ({
                                        '& .MuiInputAdornment-root': {
                                            color: theme.palette.text.primary,
                                        },
                                        '& .MuiInputBase-root': {
                                            color: theme.palette.text.primary,
                                            fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
                                            '&:hover::before': {
                                                borderBottom: `1px solid ${theme.palette.text.primary}`,
                                            },
                                            '&::before': {
                                                borderBottom: `1px solid ${theme.palette.text.primary}`,
                                            },
                                            height: 32,
                                        },
                                        '& .MuiButtonBase-root': {
                                            color: theme.palette.text.primary,
                                        },
                                        '& .MuiInputBase-input': {
                                            padding: 0,
                                        },
                                        width: '100%',
                                        maxWidth: 345,
                                    })}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            ),
                                            endAdornment: search ? (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={e => {
                                                            e.stopPropagation();
                                                            setSearch('');
                                                            inputRef.current?.focus();
                                                        }}
                                                    >
                                                        <Close />
                                                    </IconButton>
                                                </InputAdornment>
                                            ) : null,
                                        },
                                    }}
                                    value={search}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter' && search) {
                                            setSearchDialogOpen(true);
                                        }
                                    }}
                                    onChange={e => setSearch(e.target.value)}
                                />
                            ) : null}
                        </div>
                        <Box
                            style={{ display: 'flex', gap: 20 }}
                            sx={{
                                flexWrap: 'wrap',
                                '@media (min-width: 800px)': {
                                    flexWrap: 'nowrap',
                                },
                            }}
                        >
                            <OwnButton
                                href={EXTERNAL_LINKS.GITHUB}
                                tooltip={I18n.t('tooltip.github')}
                                icon={<GitHubIcon />}
                            />
                            <OwnButton
                                name={'community'}
                                href={EXTERNAL_LINKS.GITHUB_COMMUNITY}
                                tooltip={I18n.t('tooltip.github_community')}
                                icon={<GitHubIcon />}
                            />
                            <OwnButton
                                name={'group'}
                                textOffset={-8}
                                href={EXTERNAL_LINKS.FACEBOOK_GROUP}
                                tooltip={I18n.t('tooltip.facebook_group')}
                                icon={<FacebookIcon />}
                            />
                            <OwnButton
                                href={EXTERNAL_LINKS.FACEBOOK_PAGE}
                                tooltip={I18n.t('tooltip.facebook_page')}
                                icon={<FacebookIcon />}
                            />
                            <OwnButton
                                href={EXTERNAL_LINKS.DISCORD}
                                tooltip={I18n.t('tooltip.discord')}
                                icon={<DiscordIcon />}
                            />
                            <OwnButton
                                href={EXTERNAL_LINKS.INSTAGRAM}
                                tooltip={I18n.t('tooltip.instagram')}
                                icon={<InstagramIcon />}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
}
