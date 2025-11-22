import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import logo from '../../assets/img/logo_net_small.svg';
import { Close } from '@mui/icons-material';
import MenuIcon from '../icons/MenuIcon';
import PersonIcon from '../icons/PersonIcon';
import SearchIcon from '../icons/SearchIcon';
import LogoutIcon from '../icons/LogoutIcon';
import { useHeaderStyles } from './Header.styles';
import MenuModal from '../Menu/Menu';

export interface HeaderProps {
    selected: string;
    noSearch?: boolean;
    onLanguageUpdate?: () => void;
    forceTheme?: 'dark' | 'light';
    loggedIn?: string;
    backgroundOpacity?: boolean;
    location?: string;
}

function NoIcon(): React.JSX.Element | null {
    return null;
}

export const Header = ({ selected, noSearch, onLanguageUpdate, loggedIn }: HeaderProps) => {
    const { classes } = useHeaderStyles();
    const navigate = useNavigate();
    const searchRef = useRef<HTMLInputElement | null>(null);

    const [searchOpened, setSearchOpened] = useState(false);
    const [search, setSearch] = useState('');
    const [language, setLanguage] = useState('en');
    const [showProfileMenu, setShowProfileMenu] = useState<HTMLElement | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            console.log(window.scrollY);
            setScrolled(window.scrollY > 850);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // initialer Status

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const renderProfileMenu = () => {
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
                    onClick={() => {
                        setShowProfileMenu(null);
                        navigate('/profile');
                    }}
                >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => console.log('logout')}>
                    <ListItemIcon sx={{ color: 'inherit' }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>
        );
    };

    return (
        <Box
            className={classes.root}
            sx={{
                boxShadow: scrolled ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
                transition: 'box-shadow 0.2s ease-in-out',
            }}
        >
            {menuOpen && (
                <MenuModal
                    onClose={() => setMenuOpen(false)}
                    selected={selected as any}
                    noSearch={noSearch}
                    onLanguageUpdate={onLanguageUpdate}
                />
            )}
            {renderProfileMenu()}

            <img
                src={logo}
                className={classes.logo}
                alt="logo"
                onClick={e => {
                    e.preventDefault();
                    navigate('/');
                }}
            />

            {!noSearch && (
                <Box className={classes.searchBox}>
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
                    <Input
                        inputRef={searchRef}
                        placeholder="Search"
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
                                console.log('Search:', search);
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
                        setLanguage(e.target.value);
                        onLanguageUpdate?.();
                    }}
                >
                    <MenuItem
                        value="en"
                        className={classes.menuItem}
                    >
                        DE
                    </MenuItem>
                    <MenuItem
                        value="de"
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
                    href="https://www.iobroker.net/adapters"
                    className={`${classes.link} ${selected === 'adapters' ? classes.linkSelected : ''}`}
                >
                    Adapter
                </Box>
                <Box
                    component="a"
                    href="https://www.iobroker.net/docs"
                    className={`${classes.link} ${selected === 'docs' ? classes.linkSelected : ''}`}
                >
                    Docu
                </Box>
                <Box
                    component="a"
                    href="https://www.iobroker.net/blog"
                    className={`${classes.link} ${selected === 'blog' ? classes.linkSelected : ''}`}
                >
                    Blog
                </Box>
                <Box
                    component="a"
                    href="https://www.iobroker.net/licenses"
                    className={`${classes.link} ${selected === 'licenses' ? classes.linkSelected : ''}`}
                >
                    Lizenzen
                </Box>

                {loggedIn ? (
                    <IconButton
                        className={`${classes.iconButton} ${selected === 'profile' ? classes.linkSelected : ''}`}
                        onClick={e => setShowProfileMenu(e.currentTarget as HTMLElement)}
                    >
                        <PersonIcon />
                    </IconButton>
                ) : (
                    <IconButton
                        className={classes.iconButton}
                        onClick={() => navigate('/profile')}
                    >
                        <PersonIcon />
                    </IconButton>
                )}

                <IconButton
                    className={classes.iconButton}
                    onClick={() => setMenuOpen(true)}
                >
                    <MenuIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Header;
