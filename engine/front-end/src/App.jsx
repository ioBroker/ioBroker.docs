import React from 'react';
import ReactGA from 'react-ga';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import {
    Tabs,
    Tab,
    Toolbar,
    Menu,
    MenuItem,
    IconButton,
    Drawer,
    List,
    ListItemText,
    ListItemIcon,
    Input,
    Popper,
    Paper,
    Box,
    ListItemButton,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Button,
    DialogContentText,
} from '@mui/material';

import {
    Info,
    Search as IconSearch,
    Menu as IconMenu,
    Language as IconLanguage,
    Public,
    Close,
} from '@mui/icons-material';

import { Theme } from '@iobroker/adapter-react-v5';

import themeExtend, { APP_BAR_HEIGHT } from './createTheme';

import DialogError from './Dialogs/Error';
import MDPage from './MDPage';
import TreePage from './TreePage';
import Router from './Router';
import Utils from './Utils';
import Cookies from './Components/Cookies';

import 'react-splitter-layout/lib/index.css';

import LogoBig from './assets/iobroker-logo.svg';
import LogoBigNY from './assets/iobroker-logo-ny.svg';
import LogoSmall from './assets/iobroker-logo-small.png';
import LogoSmallNY from './assets/iobroker-logo-small-ny.png';

// Pages
import Blog from './Pages/Blog';
import Statistics from './Pages/Statistics';
import Downloads from './Pages/Downloads';

// pages
import PageIntro from './Pages/Intro';

import Loader from './Components/Loader';
import I18n from './i18n';

const styles = {
    root: {},

    tabContent: {
        height: `calc(100% - ${APP_BAR_HEIGHT}px)`,
        overflow: 'auto',
        position: 'relative',
    },
    logoBig: {
        width: 135,
        height: APP_BAR_HEIGHT,
        cursor: 'pointer',
    },
    logoSmall: {
        width: APP_BAR_HEIGHT - 10,
        height: APP_BAR_HEIGHT - 10,
        cursor: 'pointer',
    },
    tabs: theme => ({ display: 'flex', ...theme.tabs }),
    tabsNoTabs: {
        paddingLeft: 0,
    },
    tab: {
        minWidth: 'inherit',
    },
    tabAction: theme => ({
        backgroundColor: theme.palette.secondary.main,
        color: 'white',
    }),

    language: theme => ({
        color: theme.palette.primary.main,
        display: 'inherit',
    }),
    languageButton: {
        width: 32,
        height: 32,
        cursor: 'pointer',
        marginLeft: 15,
    },
    languageText: {
        paddingTop: 3,
        cursor: 'pointer',
    },
    subMenu: {
        marginLeft: 30,
        padding: 0,
    },
    subMenuItem: {
        padding: '3px 0 3px 10px',
    },
    subMenuItemText: {
        fontSize: 14,
    },
    searchDiv: {
        marginLeft: 10,
        display: 'inline-block',
        background: '#CCCCCC',
        borderRadius: 3,
        height: 36,
        whiteSpace: 'nowrap',
    },
    search: {
        width: 120,
        transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        // padding: '8px 8px 8px 72px',
        boxSizing: 'content-box',
        backgroundColor: '#CCCCCC',
        padding: '3px 0 1px 0',
        border: 0,
        marginLeft: '10px',
        borderRadius: '3px',
        '&:after': {
            border: 0,
        },
        '&:before': {
            border: 0,
        },
    },
    searchInput: {
        display: 'inline-block',
    },
    searchFocus: {
        width: 200,
    },
    searchButton: {
        float: 'left',
        marginLeft: 5,
        marginTop: 10,
        height: 20,
        width: 20,
    },
    searchResultsDiv: {
        minWidth: 100,
        padding: 10,
        zIndex: 100,
    },

    sRdiv: {
        cursor: 'pointer',
        '&:hover': {
            background: '#EEEEEE',
        },
    },
    sRdivNotLast: {
        borderBottom: '1px solid #CCCCCC',
    },
    sRdivType: {
        display: 'inline-block',
        borderRight: '1px solid #CCCCCC',
        padding: '2px 5px',
        textAlign: 'right',
        width: 120,
    },
    sRdivText: {
        display: 'inline-block',
        padding: '2px 5px',
    },
    infoNet: {
        color: '#2978d0',
        marginLeft: 4,
    },
    infoPro: {
        color: '#164477',
        marginLeft: 4,
    },
};

const LANGUAGES = {
    en: { full: 'English', short: 'En' },
    de: { full: 'Deutsch', short: 'De' },
    ru: { full: 'Русский', short: 'Ру' },
    'zh-cn': { full: '简体中文', short: 'zh-cn' },
};

const PAGES = {
    blog: {
        tabIndex: 1,
        component: Blog,
        icon: null,
        name: 'Blog',
    },
    download: {
        tabIndex: 2,
        component: Downloads,
        icon: null,
        name: 'Download',
    },
    documentation: {
        tabIndex: 3,
        name: 'Documentation',
        content: 'content.json',
    },
    adapters: {
        tabIndex: 4,
        name: 'Adapters',
        content: 'adapters.json',
    },
    forum: {
        tabIndex: 5,
        name: 'Forum',
        links: {
            en: 'https://forum.iobroker.net',
            nl: 'https://forum.iobroker.net/category/40/nederlands',
            de: 'https://forum.iobroker.net/category/4/deutsch',
            ru: 'https://forum.iobroker.net/category/28/%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9',
            'zh-cn': 'https://bbs.iobroker.cn/',
        },
        target: '_self',
    },
    cloud: {
        tabIndex: 6,
        name: 'Cloud',
        menu: [
            { link: 'https://iobroker.net', name: 'Free (.net)', target: 'this', info: true },
            { link: 'https://iobroker.pro', name: 'Pro (.pro)', target: 'this', info: true },
        ],
    },
    intro: { component: PageIntro, name: 'intro' },
    imprint: { name: 'imprint', md: 'imprint.md' },
    privacy: { name: 'privacy', md: 'privacy.md' },
    statistics: { component: Statistics },
};

const MOBILE_WIDTH = 650;
const TABS_WIDTH = 1180;

class App extends Router {
    constructor(props) {
        super(props);

        const hash = Router.getLocation();
        let language = hash.language || window.localStorage.getItem('iobroker.net.language') || Router.detectLanguage();
        if (!LANGUAGES[language]) {
            language = 'de';
        }
        I18n.setLanguage(language);

        const width = window.innerWidth;

        const themeName = 'light';
        const theme = Theme(themeName);
        const extend = themeExtend(themeName);
        theme.tabs = extend.tabs;
        theme.content = extend.content;
        Object.assign(theme.palette.primary, extend.palette.primary);
        Object.assign(theme.palette.secondary, extend.palette.secondary);
        theme.palette.darkPart = extend.palette.darkPart;
        theme.palette.lightPart = extend.palette.lightPart;

        this.state = {
            errorText: '',
            loaded: true,
            themeType: 'light',
            themeName,
            theme,
            mobile: width < MOBILE_WIDTH,
            menuOpened: [],
            language,
            showTabMenu: false,
            languageMenu: false,
            anchorMenu: null,
            width,
            height: window.innerHeight,
            selectedPage: hash.tab || 'intro',
            search: '',
            searchResults: null,
            searchFocus: false,
            lastSeenBlog: window.localStorage.getItem('iobroker.net.lastSeenBlog')
                ? new Date(window.localStorage.getItem('iobroker.net.lastSeenBlog')).getTime()
                : 0,
        };

        // init Google Analytics
        ReactGA.initialize('UA-86900958-1', {
            debug: window.location.hostname === 'localhost',
        });

        const d = new Date();
        const action = (d.getMonth() === 11 && d.getDate() >= 9) || (d.getMonth() === 0 && d.getDate() <= 7);

        this.logo = action ? LogoBigNY : LogoBig;
        this.logoSmall = action ? LogoSmallNY : LogoSmall;

        this.contentRef = React.createRef();
        this.updateWindowDimensionsBound = this.updateWindowDimensions.bind(this);
        Blog.fetchData().then(json => {
            const data = Object.keys(json.pages).sort().pop().split('_');
            this.setState({
                latestBlog: new Date(parseInt(data[0], 10), parseInt(data[1], 10) - 1, parseInt(data[2], 10)).getTime(),
            });
        });
    }

    componentDidMount() {
        super.componentDidMount();
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensionsBound);
        ReactGA.pageview(window.location.hash.replace(/^#/, '/') || '/');
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        window.removeEventListener('resize', this.updateWindowDimensionsBound);
    }

    updateWindowDimensions() {
        this.resizeTimer && clearTimeout(this.resizeTimer);

        this.resizeTimer = setTimeout(() => {
            this.resizeTimer = null;
            const width = window.innerWidth;
            this.setState({ width, height: window.innerHeight, mobile: width < MOBILE_WIDTH });
        }, 200);
    }

    onHashChange(location) {
        const newState = {};
        let changed = false;
        if (location.tab !== this.state.selectedPage) {
            newState.selectedPage = location.tab;
            changed = true;
        }
        if (location.language !== this.state.language && LANGUAGES[location.language]) {
            newState.language = location.language;
            I18n.setLanguage(newState.language);
            changed = true;
        }

        ReactGA.pageview(window.location.hash.replace(/^#/, '/'));

        changed && this.setState(newState);
    }

    renderError() {
        if (!this.state.errorText) {
            return null;
        }

        return (
            <DialogError
                text={this.state.text}
                onClose={() => this.setState({ errorText: '' })}
            />
        );
    }

    tabName2index(name) {
        return Object.keys(PAGES)
            .filter(page => PAGES[page].tabIndex)
            .indexOf(name || this.state.selectedPage);
    }

    renderLogo() {
        return (
            <img
                src={this.state.mobile ? this.logoSmall : this.logo}
                alt="logo"
                style={this.state.mobile ? styles.logoSmall : styles.logoBig}
                onClick={() => this.onNavigate(this.state.language, 'intro')}
            />
        );
    }

    renderInfoDialog() {
        if (!this.state.info) {
            return null;
        }

        /*
         ioBroker cloud services are required for:
         - Manage adapter licenses (ioBroker.net)
         - Manage Remote or Assistant abonnements (ioBroker.pro)
         - Access your ioBroker.vis(2) runtime remotely (ioBroker.net)
         - Access your ioBroker.vis(2) runtime and editor remotely via high-performance network (ioBroker.pro)
         - Access your ioBroker.admin remotely (ioBroker.pro)
         */

        return (
            <Dialog
                open={!0}
                onClose={() => this.setState({ info: null })}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>{I18n.t('Explanation')}</DialogTitle>
                <DialogContent>
                    <MenuItem onClick={() => Utils.openLink('https://iobroker.net/www/account/licenses', 'this')}>- {I18n.t('Manage adapter licenses')}<Box component="span" style={styles.infoNet}>(ioBroker.net)</Box></MenuItem>
                    <MenuItem onClick={() => Utils.openLink('https://iobroker.pro/www/account/subscriptions', 'this')}>- {I18n.t('Manage Remote or Assistant abonnements')}<Box component="span" style={styles.infoPro}>(ioBroker.pro)</Box></MenuItem>
                    <MenuItem onClick={() => Utils.openLink('https://iobroker.net', 'this')}>- {I18n.t('Access your ioBroker.vis(2) runtime remotely')}<Box component="span" style={styles.infoNet}>(ioBroker.net)</Box></MenuItem>
                    <MenuItem onClick={() => Utils.openLink('https://iobroker.pro', 'this')}>- {I18n.t('Access your ioBroker.vis(2) runtime and editor remotely')}<Box component="span" style={styles.infoPro}>(ioBroker.pro)</Box></MenuItem>
                    <MenuItem onClick={() => Utils.openLink('https://iobroker.pro', 'this')}>- {I18n.t('Access your ioBroker.admin remotely')}<Box component="span" style={styles.infoPro}>(ioBroker.pro)</Box></MenuItem>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => {
                            const item = this.state.info;
                            this.setState({ info: null }, () =>
                                Utils.openLink('https://iobroke.net', 'this'),
                            );
                        }}
                        startIcon={<Public />}
                        sx={{ color: 'white', backgroundColor: this.state.theme.palette.secondary.main }}
                    >
                        {I18n.t('Go to ioBroker.net')}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            const item = this.state.info;
                            this.setState({ info: null }, () =>
                                Utils.openLink('https://iobroke.pro', 'this'),
                            );
                        }}
                        startIcon={<Public />}
                        sx={{ color: 'white', backgroundColor: this.state.theme.palette.primary.main }}
                    >
                        {I18n.t('Go to ioBroker.pro')}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => this.setState({ info: null })}
                        startIcon={<Close />}
                    >
                        {I18n.t('Close')}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    renderLanguage() {
        return [
            <Box
                key="langButton"
                sx={styles.language}
                onClick={e => this.setState({ languageMenu: true, anchorMenu: e.target })}
            >
                <IconLanguage style={styles.languageButton} />
                <span style={styles.languageText}>{LANGUAGES[this.state.language].short}</span>
            </Box>,
            this.state.languageMenu ? (
                <Menu
                    key="langMenu"
                    id="language-menu"
                    transitionDuration={0}
                    anchorEl={this.state.anchorMenu}
                    open
                    onClose={() => this.setState({ languageMenu: false, anchorMenu: null })}
                >
                    {Object.keys(LANGUAGES).map(lang => (
                        <MenuItem
                            key={lang}
                            selected={this.state.language === lang}
                            onClick={() =>
                                this.setState({ languageMenu: false, anchorMenu: null }, () => {
                                    window.localStorage.setItem('iobroker.net.language', lang);
                                    const location = Router.getLocation();
                                    this.onNavigate(lang, location.tab || 'intro', location.page, location.chapter);
                                })
                            }
                        >
                            {LANGUAGES[lang].full}
                        </MenuItem>
                    ))}
                </Menu>
            ) : null,
        ];
    }

    onSearch() {
        if (this.state.search || this.searchValue) {
            window
                .fetch(
                    `search?ln=${this.state.language}&q=${encodeURIComponent(this.state.search || this.searchValue)}`,
                )
                .then(data => data.json())
                .then(searchResults => this.setState({ searchResults }));
        } else {
            this.setState({ searchResults: null });
        }
    }

    renderSearch() {
        return (
            <div style={styles.searchDiv}>
                <Input
                    sx={{
                        ...styles.search,
                        '&.MuiInput-input': styles.searchInput,
                    }}
                    style={this.state.searchFocus ? styles.searchFocus : undefined}
                    // value={this.state.search}
                    placeholder={I18n.t('Search...')}
                    onFocus={() => this.setState({ searchFocus: true })}
                    onBlur={() => setTimeout(() => this.setState({ searchFocus: false }), 100)}
                    onChange={e => {
                        this.searchAnchor = this.searchAnchor || e.target;
                        this.searchValue = e.target.value;

                        // this.setState({search: e.target.value});
                        this.searchTimeout && clearTimeout(this.searchTimeout);
                        this.searchTimeout = setTimeout(() => {
                            this.searchTimeout = null;
                            this.onSearch();
                        }, 300);
                    }}
                    onKeyUp={e => {
                        if (e.key === 'Enter') {
                            this.searchTimeout && clearTimeout(this.searchTimeout);
                            this.searchTimeout = null;
                            this.onSearch();
                        }
                    }}
                />
                <IconSearch style={styles.searchButton} />
            </div>
        );
    }

    renderSearchResult(result, last) {
        const type = result.id.split('/').shift();
        const tab = type === '...' ? type : type === 'adapterref' ? 'adapters' : 'documentation';
        return (
            <div
                style={{ ...styles.sRdiv, ...(!last ? styles.sRdivNotLast : undefined) }}
                onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.setState({ searchResults: null });
                    this.onNavigate(null, tab, result.id);
                }}
            >
                <div style={styles.sRdivType}>{I18n.t(tab)}</div>
                <div style={styles.sRdivText}>
                    {type === '...' ? I18n.t('More %s results', result.title) : result.title}
                </div>
            </div>
        );
    }

    renderSearchResults() {
        const len = this.state.searchResults && this.state.searchResults.length;
        return (
            <Popper
                placement="bottom"
                disablePortal={false}
                anchorEl={this.searchAnchor}
                open={!!this.state.searchResults && this.state.searchFocus}
                modifiers={[
                    {
                        name: 'flip',
                        enabled: true,
                    },
                    {
                        name: 'arrow',
                        enabled: true,
                        options: {
                            element: this.searchAnchor,
                        },
                    },
                ]}
            >
                {this.state.searchResults && this.state.searchResults.length ? (
                    <Paper style={styles.searchResultsDiv}>
                        {this.state.searchResults.map((link, i) => this.renderSearchResult(link, len - 1 === i))}
                    </Paper>
                ) : (
                    <Paper style={styles.searchResultsDiv}>{I18n.t('No results found')}</Paper>
                )}
            </Popper>
        );
    }

    onNavigate = (language, tab, page, chapter) => {
        this.contentRef.current.scrollTop = 0;
        language = language || this.state.language;

        super.onNavigate(language, tab, page, chapter);
    };

    renderMenu(name) {
        if (this.state.menuOpened.includes(name)) {
            return (
                <Menu
                    id="simple-menu"
                    transitionDuration={0}
                    anchorEl={this.state.anchorMenu}
                    open
                    onClose={() => {
                        const menuOpened = JSON.parse(JSON.stringify(this.state.menuOpened));
                        const pos = menuOpened.indexOf(name);
                        if (pos !== -1) {
                            menuOpened.splice(pos, 1);
                            this.setState({ menuOpened, anchorMenu: null });
                        }
                    }}
                >
                    {PAGES[name].menu.map(item => (
                        <MenuItem
                            key={item.name}
                            onClick={() => {
                                if (item.link) {
                                    Utils.openLink(item.link, item.target);
                                } else if (item.tab) {
                                    this.onNavigate(null, item.tab);
                                }
                                const menuOpened = JSON.parse(JSON.stringify(this.state.menuOpened));
                                const pos = menuOpened.indexOf(name);
                                if (pos !== -1) {
                                    menuOpened.splice(pos, 1);
                                    this.setState({ menuOpened, anchorMenu: null });
                                }
                            }}
                        >
                            {item.icon || ''}
                            {I18n.t(item.name)}
                            {item.info ? (
                                <>
                                    <div style={{ flex: 1 }} />
                                    <IconButton
                                        onClick={e => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            this.setState({ info: item });
                                        }}
                                    >
                                        <Info />
                                    </IconButton>
                                </>
                            ) : null}
                            {this.state.last}
                        </MenuItem>
                    ))}
                </Menu>
            );
        }

        return null;
    }

    renderTabs() {
        let selected = this.tabName2index(this.state.selectedPage);
        if (selected === -1) {
            selected = false;
        }

        return (
            <Tabs
                sx={styles.tabs}
                value={selected}
                variant="standard"
                onChange={(e, value) => {
                    const selectedPage = Object.keys(PAGES)[value];
                    if (selectedPage === 'blog') {
                        window.localStorage.setItem('iobroker.net.lastSeenBlog', new Date().toISOString());
                        this.setState({ lastSeenBlog: Date.now() });
                    }
                    if (PAGES[selectedPage].links) {
                        Utils.openLink(
                            PAGES[selectedPage].links[this.state.language] || PAGES[selectedPage].links.en,
                            PAGES[selectedPage].target,
                        );
                    } else if (PAGES[selectedPage].link) {
                        Utils.openLink(PAGES[selectedPage].link, PAGES[selectedPage].target);
                    } else if (PAGES[selectedPage].menu) {
                        const menuOpened = JSON.parse(JSON.stringify(this.state.menuOpened));
                        if (menuOpened.indexOf(selectedPage) === -1) {
                            menuOpened.push(selectedPage);
                        }
                        this.setState({ menuOpened, anchorMenu: e.target });
                    } else {
                        this.onNavigate(this.state.language, selectedPage);
                    }
                }}
            >
                {Object.keys(PAGES).map(tab => {
                    if (!PAGES[tab].tabIndex) {
                        return null;
                    }

                    if (PAGES[tab].menu) {
                        return [
                            <Tab
                                style={styles.tab}
                                key={tab}
                                fullWidth={false}
                                label={
                                    PAGES[tab].icon
                                        ? [<span key="text">{I18n.t(PAGES[tab].name)}</span>, PAGES[tab].icon]
                                        : I18n.t(PAGES[tab].name)
                                }
                            />,
                            this.renderMenu(tab),
                        ];
                    }
                    let star = false;
                    if (tab === 'blog') {
                        if (this.state.latestBlog > this.state.lastSeenBlog) {
                            star = true;
                        }
                    }
                    return (
                        <Tab
                            key={tab}
                            style={styles.tab}
                            sx={star ? styles.tabAction : undefined}
                            fullWidth={false}
                            label={
                                PAGES[tab].icon
                                    ? [<span key="text">{I18n.t(PAGES[tab].name)}</span>, PAGES[tab].icon]
                                    : I18n.t(PAGES[tab].name)
                            }
                        />
                    );
                })}
            </Tabs>
        );
    }

    renderPagesMenu() {
        return (
            <Drawer
                key="drawer"
                open={this.state.showTabMenu}
                anchor="right"
                onClose={() => this.setState({ showTabMenu: false })}
            >
                <List>
                    {Object.keys(PAGES).map(tab => {
                        if (!PAGES[tab].tabIndex) {
                            return null;
                        }

                        if (PAGES[tab].menu) {
                            return [
                                <ListItemButton
                                    key={tab}
                                    onClick={() => {
                                        const menuOpened = JSON.parse(JSON.stringify(this.state.menuOpened));
                                        const pos = menuOpened.indexOf(tab);
                                        if (pos === -1) {
                                            menuOpened.push(tab);
                                        } else {
                                            menuOpened.splice(pos, 1);
                                        }
                                        this.setState({ menuOpened });
                                    }}
                                >
                                    {PAGES[tab].icon ? <ListItemIcon>{PAGES[tab].icon}</ListItemIcon> : null}
                                    <ListItemText primary={I18n.t(PAGES[tab].name)} />
                                </ListItemButton>,

                                this.state.menuOpened.includes(tab) ? (
                                    <List
                                        key="list"
                                        style={styles.subMenu}
                                    >
                                        {PAGES[tab].menu.map(item => (
                                            <ListItemButton
                                                style={styles.subMenuItem}
                                                selected={this.state.selectedPage === tab}
                                                key={item}
                                                onClick={() => {
                                                    if (item.links) {
                                                        Utils.openLink(
                                                            item.links[this.state.language] || item.links.en,
                                                            item.target,
                                                        );
                                                    } else if (item.link) {
                                                        Utils.openLink(item.link, item.target);
                                                    } else if (item.tab) {
                                                        this.onNavigate(null, item.tab);
                                                    }
                                                    this.setState({ showTabMenu: false });
                                                }}
                                            >
                                                {item.icon ? <ListItemIcon>{item.icon}</ListItemIcon> : null}
                                                <ListItemText
                                                    sx={{ '&.MuiListItemText-primary': styles.subMenuItemText }}
                                                    primary={item.name}
                                                />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                ) : null,
                            ];
                        }
                        return (
                            <ListItemButton
                                selected={this.state.selectedPage === tab}
                                key={tab}
                                onClick={() => {
                                    this.setState({ showTabMenu: false }, () => {
                                        if (PAGES[tab].links) {
                                            Utils.openLink(
                                                PAGES[tab].links[this.state.language] || PAGES[tab].links.en,
                                                PAGES[tab].target,
                                            );
                                        } else if (PAGES[tab].link) {
                                            Utils.openLink(PAGES[tab].link, PAGES[tab].target);
                                        } else {
                                            this.onNavigate(null, tab);
                                        }
                                        this.setState({ showTabMenu: false });
                                    });
                                }}
                            >
                                {PAGES[tab].icon ? <ListItemIcon>{PAGES[tab].icon}</ListItemIcon> : null}
                                <ListItemText primary={I18n.t(PAGES[tab].name)} />
                            </ListItemButton>
                        );
                    })}
                </List>
            </Drawer>
        );
    }

    renderAppBar() {
        const noTabs = this.state.width <= TABS_WIDTH;

        return (
            <Toolbar
                position="static"
                variant="dense"
                sx={styles.tabs}
                style={noTabs ? styles.tabsNoTabs : undefined}
            >
                {this.renderLogo()}
                {this.renderLanguage()}
                {this.renderSearch()}
                <div style={{ flex: 1 }} />
                {noTabs ? (
                    <IconButton
                        key="menuButton"
                        onClick={() => this.setState({ showTabMenu: true })}
                    >
                        <IconMenu />
                    </IconButton>
                ) : null}
                {noTabs ? this.renderPagesMenu() : this.renderTabs()}
            </Toolbar>
        );
    }

    render() {
        if (!this.state.loaded) {
            return (
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={this.state.theme}>
                        <Loader theme={this.state.themeType} />
                    </ThemeProvider>
                </StyledEngineProvider>
            );
        }

        const selectedPage = this.state.selectedPage || 'intro';
        const PageComponent = PAGES[selectedPage] && PAGES[selectedPage].component;

        return (
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={this.state.theme}>
                    <div className="App">
                        {this.renderAppBar()}
                        <div
                            style={styles.tabContent}
                            ref={this.contentRef}
                        >
                            {PageComponent ? (
                                <PageComponent
                                    theme={this.state.themeType}
                                    mobile={this.state.mobile}
                                    onNavigate={this.onNavigate}
                                    language={this.state.language}
                                    contentWidth={this.state.width}
                                />
                            ) : null}
                            {PAGES[selectedPage] && PAGES[selectedPage].md ? (
                                <MDPage
                                    path={PAGES[selectedPage].md}
                                    theme={this.state.themeType}
                                    mobile={this.state.mobile}
                                    onNavigate={this.onNavigate}
                                    contentWidth={this.state.width}
                                    language={this.state.language}
                                />
                            ) : null}
                            {PAGES[selectedPage] && PAGES[selectedPage].content ? (
                                <TreePage
                                    contentPath={PAGES[selectedPage].content}
                                    theme={this.state.themeType}
                                    mobile={this.state.mobile}
                                    onNavigate={this.onNavigate}
                                    contentWidth={this.state.width}
                                    language={this.state.language}
                                />
                            ) : null}
                        </div>
                        {this.renderInfoDialog()}
                        {this.renderError()}
                        {this.renderSearchResults()}
                        <Cookies
                            theme={this.state.themeType}
                            mobile={this.state.mobile}
                            onNavigate={this.onNavigate}
                            language={this.state.language}
                            contentWidth={this.state.width}
                        />
                    </div>
                </ThemeProvider>
            </StyledEngineProvider>
        );
    }
}

export default App;
