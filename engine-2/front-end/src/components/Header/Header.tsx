import React, { useState, useEffect } from 'react';
import { Select, MenuItem, IconButton, Box, Menu, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import logo from '../../assets/img/logo_net_small.svg';
import GitHubIcon from '../icons/GitHubIcon';
import MenuIcon from '../icons/MenuIcon';
import PersonIcon from '../icons/PersonIcon';
import SearchIcon from '../icons/SearchIcon';
import LogoutIcon from '../icons/LogoutIcon';
import { useHeaderStyles } from './Header.styles';
import SearchPalette from '../SearchPalette/SearchPalette';
import MenuModal, { type MenuItems, type MenuItemsSmall } from '../Menu/Menu';
import { I18n } from '../../utils/i18n';
import {
    ADAPTERS_LINK,
    BLOG_LINK,
    DOCS_LINK,
    getLink,
    HOME_LINK,
    INSTALLATION_LINK,
    LICENSES_LINK,
    PROFILE_LINK,
} from '../../config/api';
import { logout } from '../../config/auth';
import { EXTERNAL_LINKS } from '../../config/links';

export interface HeaderProps {
    selected: string;
    noSearch?: boolean;
    onLanguageUpdate?: () => void;
    forceTheme?: 'dark' | 'light';
    /** keep the bar on the dark palette even in the light theme */
    dark?: boolean;
    loggedIn?: string;
    backgroundOpacity?: boolean;
    location?: string;
}

/** What the shortcut is called on this machine - the Mac has no Ctrl for this */
const SHORTCUT_LABEL = /mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent) ? '⌘K' : 'Ctrl+K';

function NoIcon(): React.JSX.Element | null {
    return null;
}

export const Header = ({ selected, noSearch, onLanguageUpdate, loggedIn, dark }: HeaderProps): React.ReactNode => {
    const tt = (menuKey: string, fallbackKey: string): string => {
        const v = I18n.t(menuKey);
        return v === menuKey ? I18n.t(fallbackKey) : v;
    };
    const { classes } = useHeaderStyles({ dark: !!dark });
    const [paletteOpen, setPaletteOpen] = useState(false);
    const [language, setLanguage] = useState(I18n.getLanguage());
    const [showProfileMenu, setShowProfileMenu] = useState<HTMLElement | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    // Ctrl+K, and ⌘K on a Mac, open the search wherever the reader is - the browser's own
    // "search in page" is not what somebody expects from a documentation site.
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent): void => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                setPaletteOpen(true);
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    useEffect(() => {
        const unsub = I18n.subscribe(lng => setLanguage(lng));
        return () => {
            unsub();
        };
    }, []);

    const renderProfileMenu = (): React.JSX.Element | null => {
        if (!showProfileMenu) {
            return null;
        }

        return (
            <Menu
                anchorEl={showProfileMenu}
                open={!0}
                onClose={() => setShowProfileMenu(null)}
                className={classes.profileMenu}
            >
                <MenuItem
                    component="a"
                    href={getLink(PROFILE_LINK)}
                    onClick={() => setShowProfileMenu(null)}
                >
                    <ListItemIcon className={classes.profileMenuIcon}>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText>{tt('menu-profile', 'Profile')}</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => logout()}>
                    <ListItemIcon className={classes.profileMenuIcon}>
                        {/* the logout glyph is 42 px by default - here it follows its box */}
                        <LogoutIcon style={{ width: '100%', height: '100%' }} />
                    </ListItemIcon>
                    <ListItemText>{tt('menu-logout', 'Logout')}</ListItemText>
                </MenuItem>
            </Menu>
        );
    };

    return (
        <Box className={classes.root}>
            {menuOpen && (
                <MenuModal
                    onClose={() => setMenuOpen(false)}
                    selected={selected as MenuItems | MenuItemsSmall}
                    noSearch={noSearch}
                    onLanguageUpdate={onLanguageUpdate}
                />
            )}
            {renderProfileMenu()}
            <SearchPalette
                open={paletteOpen}
                onClose={() => setPaletteOpen(false)}
            />

            <Box
                component="a"
                href={getLink(HOME_LINK)}
                className={classes.logoLink}
            >
                <img
                    src={logo}
                    className={classes.logo}
                    alt="logo"
                />
            </Box>

            {!noSearch && (
                <Box className={classes.searchBox}>
                    <Tooltip title={`${tt('menu-search', 'Search')} (${SHORTCUT_LABEL})`}>
                        <IconButton
                            className={classes.iconButton}
                            aria-label={tt('menu-search', 'Search')}
                            onClick={() => setPaletteOpen(true)}
                        >
                            <SearchIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}

            <Select
                variant="standard"
                className={classes.languageSelect}
                value={language}
                IconComponent={NoIcon}
                onChange={e => {
                    I18n.setLanguage(e.target.value);
                    onLanguageUpdate?.();
                }}
            >
                <MenuItem
                    value="de"
                    className={classes.menuItem}
                >
                    DE
                </MenuItem>
                <MenuItem
                    value="en"
                    className={classes.menuItem}
                >
                    EN
                </MenuItem>
                <MenuItem
                    value="ru"
                    className={classes.menuItem}
                >
                    РУ
                </MenuItem>
            </Select>

            <div className={classes.flexGrow} />

            <Box className={classes.navBox}>
                <Box
                    component="a"
                    href={getLink(ADAPTERS_LINK)}
                    className={`${classes.link} ${selected === 'adapters' ? classes.linkSelected : ''}`}
                >
                    {tt('menu-adapters', 'Adapters')}
                </Box>
                <Box
                    component="a"
                    href={getLink(DOCS_LINK)}
                    className={`${classes.link} ${selected === 'docs' ? classes.linkSelected : ''}`}
                >
                    {tt('menu-docs', 'Docs')}
                </Box>
                <Box
                    component="a"
                    href={getLink(BLOG_LINK)}
                    className={`${classes.link} ${selected === 'blog' ? classes.linkSelected : ''}`}
                >
                    {tt('menu-blog', 'Blog')}
                </Box>
                <Box
                    component="a"
                    href={getLink(LICENSES_LINK)}
                    className={`${classes.link} ${selected === 'licenses' ? classes.linkSelected : ''}`}
                >
                    {tt('menu-licenses', 'Licenses')}
                </Box>

                <Box
                    component="a"
                    href={getLink(INSTALLATION_LINK)}
                    className={`${classes.link} ${selected === 'installation' ? classes.linkSelected : ''}`}
                >
                    {tt('menu-installation', 'Install')}
                </Box>

                <Tooltip title={I18n.t('tooltip.forum')}>
                    <Box
                        component="a"
                        href={EXTERNAL_LINKS.FORUM}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Forum"
                        className={classes.link}
                    >
                        {tt('menu-forum', 'Forum')}
                    </Box>
                </Tooltip>

                <Tooltip title={I18n.t('tooltip.github')}>
                    <IconButton
                        className={classes.iconButton}
                        component="a"
                        href={EXTERNAL_LINKS.GITHUB}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        {/* the cat glyph fills its whole viewBox, so it needs a little air to
                            read at the same size as the person and burger icons */}
                        <GitHubIcon style={{ width: '80%', height: '80%' }} />
                    </IconButton>
                </Tooltip>

                <Tooltip title={I18n.t('tooltip.profile')}>
                    {loggedIn ? (
                        <IconButton
                            className={`${classes.iconButton} ${selected === 'profile' ? classes.linkSelected : ''}`}
                            onClick={e => setShowProfileMenu(e.currentTarget)}
                        >
                            <PersonIcon />
                        </IconButton>
                    ) : (
                        <IconButton
                            className={classes.iconButton}
                            component="a"
                            href={getLink(PROFILE_LINK)}
                        >
                            <PersonIcon />
                        </IconButton>
                    )}
                </Tooltip>

                <Tooltip title={I18n.t('tooltip.menu')}>
                    <IconButton
                        className={classes.iconButton}
                        onClick={() => setMenuOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default Header;
