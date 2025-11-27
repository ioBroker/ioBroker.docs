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
import SearchDialog from '../SearchDialog/SearchDialog';
import MenuModal from '../Menu/Menu';
import { I18n } from '../../utils/i18n';
import i18next from 'i18next';



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

export const Header = ({
  selected,
  noSearch,
  onLanguageUpdate,
  loggedIn,
}: HeaderProps) => {
  const tt = (menuKey: string, fallbackKey: string): string => {
    const v = I18n.t(menuKey);
    return v === menuKey ? I18n.t(fallbackKey) : v;
  };
  const { classes } = useHeaderStyles();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement | null>(null);

  const [searchOpened, setSearchOpened] = useState(false);
  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState(I18n.getLanguage());
  const [showProfileMenu, setShowProfileMenu] = useState<HTMLElement | null>(null);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsub = I18n.subscribe(lng => setLanguage(lng));
    const handler = (lng: string) => setLanguage(lng as any);
    i18next.on('languageChanged', handler);
    return () => {
      unsub();
      i18next.off('languageChanged', handler);
    };
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
        <MenuItem onClick={() => {
          setShowProfileMenu(null);
          navigate('/profile');
        }}>
          <ListItemIcon sx={{ color: 'inherit' }}>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText>{tt('menu-profile', 'Profile')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => console.log('logout')}>
          <ListItemIcon sx={{ color: 'inherit' }}>
            <LogoutIcon />
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
          selected={selected as any}
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
            const lng = e.target.value as string;
            setLanguage(lng as any);
            I18n.setLanguage(lng as any);
            i18next.changeLanguage(lng);
            onLanguageUpdate?.();
          }}
        >
          <MenuItem value="de" className={classes.menuItem}>
            {I18n.t('languages.de')}
          </MenuItem>
          <MenuItem value="en" className={classes.menuItem}>
            {I18n.t('languages.en')}
          </MenuItem>
          <MenuItem value="ru" className={classes.menuItem}>
            {I18n.t('languages.ru')}
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
          {tt('menu-adapters', 'Adapters')}
        </Box>
        <Box
          component="a"
          href="https://www.iobroker.net/docs"
          className={`${classes.link} ${selected === 'docs' ? classes.linkSelected : ''}`}
        >
          {tt('menu-docs', 'Docs')}
        </Box>
        <Box
          component="a"
          href="https://www.iobroker.net/blog"
          className={`${classes.link} ${selected === 'blog' ? classes.linkSelected : ''}`}
        >
          {tt('menu-blog', 'Blog')}
        </Box>
        <Box
          component="a"
          href="https://www.iobroker.net/licenses"
          className={`${classes.link} ${selected === 'licenses' ? classes.linkSelected : ''}`}
        >
          {tt('menu-licenses', 'Licenses')}
        </Box>

        {loggedIn ? (
          <IconButton
            className={`${classes.iconButton} ${selected === 'profile' ? classes.linkSelected : ''}`}
            onClick={e => setShowProfileMenu(e.currentTarget as HTMLElement)}
          >
            <PersonIcon style={{ marginTop: 0 }}/>
          </IconButton>
        ) : (
          <IconButton
            className={classes.iconButton}
            onClick={() => navigate('/profile')}
          >
            <PersonIcon style={{ marginTop: 0 }} />
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
