import React, { useState, useRef } from 'react';

import { Dialog, Box, IconButton, TextField, InputAdornment } from '@mui/material';
import { Close } from '@mui/icons-material';

import logo from '../../assets/img/logo_net_small.svg';
// import { I18n, type Language } from '../../utils/i18n';

import { ThemeSwitcher } from '../ThemeSwitcher';
// import SearchDialog from '../SearchDialog';
import SearchIcon from '../icons/SearchIcon';
import GitHubIcon from '../icons/GitHubIcon';
import FacebookIcon from '../icons/FacebookIcon';
import DiscordIcon from '../icons/DiscordIcon';
import InstagramIcon from '../icons/InstagramIcon';
// import MainContext from '../../MainContext';
// import type { ExtendedRoutes } from '../../App';
//import type { MenuPoints } from '../../types';

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
    return (
        <Box
            component="a"
            sx={(theme) => ({
                color: props.selected === props.name ? '#1D90CA' : theme.palette.text.primary,
                cursor: props.selected === props.name ? 'default' : 'pointer',
                '&:hover': {
                    color: props.selected !== props.name
                        ? (theme.palette.mode === 'dark' ? '#7ec3f3' : '#006bbc')
                        : undefined,
                },
                fontSize: props.big ? 28 : 20,
                '@media (max-width: 800px)': {
                    fontSize: 20,
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
            {/* {I18n.t(`menu-${props.name}`)} */}
            {props.name}
        </Box>
    );
}

function OwnButton(props: {
    href?: string;
    name?: string;
    icon: React.JSX.Element;
    textOffset?: number;
}): React.JSX.Element {
    return (
        <Box
            component="a"
            href={props.href || `/${props.name}`}
            sx={(theme) => ({
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
                    {/* {I18n.t(`menu-${props.name}`)} */}
                    {props.name}
                </div>
            ) : null}
        </Box>
    );
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
    const [_searchDialogOpen, setSearchDialogOpen] = useState(false);
    // const [language, setLanguage] = useState<Language>(I18n.getLanguage());
    const inputRef = useRef<HTMLInputElement | null>(null);
    // const context = React.useContext(MainContext);

    const languages = (
        <>
            <div
                style={{
                    cursor: 'pointer',
                    // color: language === 'en' ? 'var(--primary, #FFF)' : undefined,
                }}
            // onClick={() => {
            //     I18n.setLanguage('en');
            //     setLanguage('en');
            //     props.onLanguageUpdate?.();
            // }}
            >
                En
            </div>{' '}
            /{' '}
            <div
                style={{
                    cursor: 'pointer',
                    // color: language === 'de' ? 'var(--primary, #FFF)' : undefined,
                }}
                onClick={() => {
                    // I18n.setLanguage('de');
                    // setLanguage('de');
                    props.onLanguageUpdate?.();
                }}
            >
                De
            </div>{' '}
            /{' '}
            <div
                style={{
                    cursor: 'pointer',
                    // color: language === 'ru' ? 'var(--primary, #FFF)' : undefined,
                }}
                onClick={() => {
                    //I18n.setLanguage('ru');
                    //setLanguage('ru');
                    props.onLanguageUpdate?.();
                }}
            >
                Py
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
                    maxWidth: 1200,
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
            {/* <SearchDialog
                search={search}
                open={searchDialogOpen}
                onClose={() => setSearchDialogOpen(false)}
            /> */}
            <Box
                sx={(theme) => ({
                    fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
                    backgroundColor: theme.palette.mode === 'dark' ? '#080B1CE0' : '#FFFFFFE0',
                    borderRadius: '20px',
                    border: '1px solid #1D90CA',
                })}
            >
                <Box
                    sx={(theme) => ({
                        display: 'flex',
                        flexDirection: 'column',
                        color: theme.palette.text.primary,
                         padding: '40px 50px 40px 60px',
                        gap: '120px',
                        '@media (max-width: 800px)': {
                            padding: '20px 30px 20px 30px',
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
                            <a href="https://www.iobroker.net/">
                                <img
                                    src={logo}
                                    style={{
                                        marginLeft: -8,
                                        width: 70,
                                        height: 70,
                                        cursor: 'pointer',
                                        marginBottom: 40,
                                        marginRight: 20,
                                    }}
                                    alt="logo"
                                />
                            </a>
                            <Link
                                name="Blog"
                                selected={props.selected}
                                url="https://www.iobroker.net/blog"
                                onClose={props.onClose}
                            />
                            <Link
                                name="Forum"
                                selected={props.selected}
                                url="https://forum.iobroker.net/"
                                onClose={props.onClose}
                            />
                            <Link
                                name="Statistik"
                                selected={props.selected}
                                url="https://www.iobroker.net/statistics"
                                onClose={props.onClose}
                            />
                            <Link
                                name="Impressum"
                                selected={props.selected}
                                // navigateTo={context.navigateTo}
                                onClose={props.onClose}
                                location={props.location}
                            />
                            <Link
                                name="Datenschutz"
                                selected={props.selected}
                                // navigateTo={context.navigateTo}
                                onClose={props.onClose}
                                location={props.location}
                            />
                            <Box style={{ marginTop: 16, fontSize: 24, gap: 8, display: 'flex' }}>{languages}</Box>
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
                                    fontSize: 64,
                                    '@media (max-width: 800px)': {
                                        fontSize: 32,
                                    },
                                }}
                            >
                                {/* {I18n.t('menu-menu')} */}
                                {"Menu"}
                            </Box>
                            <Link
                                name="Docs"
                                selected={props.selected}
                                big
                                url="https://www.iobroker.net/docs"
                                onClose={props.onClose}
                            />
                            <Link
                                name="Adapters"
                                selected={props.selected}
                                big
                                url="https://www.iobroker.net/adapters"
                                onClose={props.onClose}
                            />
                            <Link
                                name="Licenses"
                                selected={props.selected}
                                big
                                url="https://www.iobroker.net/licenses"
                                onClose={props.onClose}
                            />
                            <Link
                                name="Installation"
                                selected={props.selected}
                                big
                                url="https://www.iobroker.net/installation"
                                onClose={props.onClose}
                            />
                            <Link
                                noDesktop
                                name="Blog"
                                selected={props.selected}
                                url="https://www.iobroker.net/blog"
                                onClose={props.onClose}
                            />
                            <Link
                                noDesktop
                                name="Forum"
                                selected={props.selected}
                                url="https://forum.iobroker.net/"
                                onClose={props.onClose}
                            />
                            <Link
                                noDesktop
                                name="Statistik"
                                selected={props.selected}
                                url="https://www.iobroker.net/statistics"
                                onClose={props.onClose}
                            />
                            <Box
                                style={{ marginTop: 16, fontSize: 24, gap: 8 }}
                                sx={{ display: 'flex', '@media (min-width: 800px)': { display: 'none' } }}
                            >
                                {languages}
                            </Box>
                        </Box>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Box
                                style={{
                                    cursor: 'pointer',
                                }}
                                sx={(theme) => ({
                                    width: 40,
                                    height: 40,
                                    marginTop: '24px',
                                    marginBottom: '46px',
                                    color: theme.palette.text.primary,
                                    '@media (max-width: 800px)': {
                                        width: 28,
                                        height: 28,
                                        marginTop: '8px',
                                        marginBottom: '24px',
                                    },
                                    '&:hover': {
                                        color: theme.palette.mode === 'dark' ? '#7ec3f3' : '#006bbc',
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
                                    placeholder='Suchen'
                                    inputRef={inputRef}
                                    sx={(theme) => ({
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
                                href="https://github.com/ioBroker"
                                icon={<GitHubIcon />}
                            />
                            <OwnButton
                                name={'community'}
                                href="https://github.com/iobroker-community-adapters"
                                icon={<GitHubIcon />}
                            />
                            <OwnButton
                                name={'group'}
                                textOffset={-8}
                                href="https://www.facebook.com/groups/440499112958264"
                                icon={<FacebookIcon />}
                            />
                            <OwnButton
                                href="https://www.facebook.com/iobroker1/"
                                icon={<FacebookIcon />}
                            />
                            <OwnButton
                                href="https://discord.gg/HwUCwsH"
                                icon={<DiscordIcon />}
                            />
                            <OwnButton
                                href="https://www.instagram.com/iobroker.gmbh/"
                                icon={<InstagramIcon />}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
}
