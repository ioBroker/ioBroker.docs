import React, { useState, useRef, useEffect } from 'react';
import {
    Select,
    MenuItem,
    IconButton,
    Box,
    Input,
    InputAdornment,
    Menu,
    ListItemIcon,
    ListItemText,
    Tooltip,
} from '@mui/material';
import { Close } from '@mui/icons-material';

import logo from '../../assets/img/logo_net_small.svg';
import GitHubIcon from '../icons/GitHubIcon';
import MenuIcon from '../icons/MenuIcon';
import PersonIcon from '../icons/PersonIcon';
import SearchIcon from '../icons/SearchIcon';
import LogoutIcon from '../icons/LogoutIcon';
import { useHeaderStyles } from './Header.styles';
import SearchDialog from '../SearchDialog/SearchDialog';
import MenuModal, { type MenuItems, type MenuItemsSmall } from '../Menu/Menu';
import { I18n } from '../../utils/i18n';
import { ADAPTERS_LINK, BLOG_LINK, DOCS_LINK, HOME_LINK, LICENSES_LINK, PROFILE_LINK } from '../../config/api';
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

function NoIcon(): React.JSX.Element | null {
    return null;
}

export const Header = ({ selected, noSearch, onLanguageUpdate, loggedIn, dark }: HeaderProps): React.ReactNode => {
    const tt = (menuKey: string, fallbackKey: string): string => {
        const v = I18n.t(menuKey);
        return v === menuKey ? I18n.t(fallbackKey) : v;
    };
    const { classes } = useHeaderStyles({ dark: !!dark });
    const searchRef = useRef<HTMLInputElement | null>(null);

    const [searchOpened, setSearchOpened] = useState(false);
    const [search, setSearch] = useState('');
    const [language, setLanguage] = useState(I18n.getLanguage());
    const [showProfileMenu, setShowProfileMenu] = useState<HTMLElement | null>(null);
    const [searchDialogOpen, setSearchDialogOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

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
                    href={PROFILE_LINK}
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
            <SearchDialog
                search={search}
                open={searchDialogOpen}
                onClose={() => setSearchDialogOpen(false)}
            />

            <Box
                component="a"
                href={HOME_LINK}
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
                    <Tooltip title={I18n.t('tooltip.search')}>
                        <IconButton
                            className={classes.iconButton}
                            onClick={() => {
                                setSearchOpened(!searchOpened);
                                if (!searchOpened) {
                                    setTimeout(() => searchRef.current?.focus(), 100);
                                }
                            }}
                        >
                            <SearchIcon />
                        </IconButton>
                    </Tooltip>
                    <Input
                        inputRef={searchRef}
                        placeholder={tt('menu-search', 'Search')}
                        className={`${classes.searchInput} ${searchOpened ? 'visible' : ''}`}
                        endAdornment={
                            search ? (
                                <InputAdornment position="end">
                                    <IconButton
                                        size="small"
                                        onClick={e => {
                                            e.stopPropagation();
                                            setSearch('');
                                        }}
                                    >
                                        <Close fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            ) : null
                        }
                        value={search}
                        onKeyUp={e => {
                            if (e.key === 'Enter' && search) {
                                setSearchDialogOpen(true);
                            }
                        }}
                        onChange={e => setSearch(e.target.value)}
                    />
                </Box>
            )}

            {!searchOpened && (
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
            )}

            <div className={classes.flexGrow} />

            <Box className={classes.navBox}>
                <Box
                    component="a"
                    href={ADAPTERS_LINK}
                    className={`${classes.link} ${selected === 'adapters' ? classes.linkSelected : ''}`}
                >
                    {tt('menu-adapters', 'Adapters')}
                </Box>
                <Box
                    component="a"
                    href={DOCS_LINK}
                    className={`${classes.link} ${selected === 'docs' ? classes.linkSelected : ''}`}
                >
                    {tt('menu-docs', 'Docs')}
                </Box>
                <Box
                    component="a"
                    href={BLOG_LINK}
                    className={`${classes.link} ${selected === 'blog' ? classes.linkSelected : ''}`}
                >
                    {tt('menu-blog', 'Blog')}
                </Box>
                <Box
                    component="a"
                    href={LICENSES_LINK}
                    className={`${classes.link} ${selected === 'licenses' ? classes.linkSelected : ''}`}
                >
                    {tt('menu-licenses', 'Licenses')}
                </Box>

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
                            href={PROFILE_LINK}
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
