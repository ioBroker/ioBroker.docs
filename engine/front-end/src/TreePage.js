import React from 'react';
import { withStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import SplitterLayout from 'react-splitter-layout';

import Drawer from '@mui/material/Drawer';
import Input from '@mui/material/Input';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

import {
    FaFileAlt as IconDocument,
    FaFolder as IconFolder,
    FaFolderOpen as IconFolderOpened,
} from 'react-icons/fa';
import {
    MdExpandMore as IconCollapse,
    MdKeyboardArrowRight as IconExpand,
    MdUnfoldMore as IconExpandAll,
    MdUnfoldLess as IconCollapseAll,
    MdClear as IconClear,
} from 'react-icons/md';

import MDPage from './MDPage';
import Router from './Router';
import I18n from './i18n';

const styles = theme => ({
    expandButton: {
        width: 37,
        height: 37,
    },
    element: {
        cursor: 'pointer',
        padding: 0,
        userSelect: 'none',
    },
    icon: {
        color: '#bdbdbd',
        marginRight: 5,
        maxHeight: 18,
    },
    listItem: {
        padding: 0,
    },
    listExpandIcon: {
        minWidth: 22,
    },
    footer: {
        height: 24,
    },
    footerButtons: {
        '&:hover': {
            backgroundColor: '#dbdbdb',
        },
        color: theme.palette.mode === 'dark' ? '#ffffff' : '#111111',
        cursor: 'pointer',
        marginTop: 1,
        marginRight: 2,
        height: 22,
        width: 22,
    },
    footerButtonsRight: {
        float: 'right',
    },
    list: {
        height: 'calc(100% - 38px - 32px)',
        overflowX: 'hidden',
        overflowY: 'auto',
    },
    drawer: {
        height: '100%',
        overflow: 'hidden',
    },
    selected: {
        background: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
    },
    searchInput: {
        width: 'calc(100% - 20px)',
        marginLeft: 10,
        marginRight: 10,
    },
    searchInputWithClear: {
        width: 'calc(100% - 50px)',
        // transition: 'width 0.5s',
    },
    searchClear: {
        padding: 3,
        marginTop: 5,
        cursor: 'pointer',
        '&:hover': {
            opacitiy: 0.7,
        },
    },
    splitterDivs: {
        /*
        '& .layout-pane': {
            width: '100%',
            height: '100%',
            overflow: 'hidden',
        }
        */
    },
});

class TreePage extends Router {
    constructor(props) {
        super(props);
        let expanded = window.localStorage ? window.localStorage.getItem('Docs.expanded') : '[]';
        try {
            expanded = JSON.parse(expanded) || [];
        } catch (e) {
            expanded = [];
        }
        const location = Router.getLocation();
        let menuOpened = window.localStorage ? window.localStorage.getItem('Docs.menuOpened') !== 'false' : true;

        if (this.props.mobile) {
            menuOpened = false;
        }

        this.state = {
            path: location.page || '',
            content: {},
            menuOpened,
            expanded,
            filter: '',
            editMode: false,
            menuSize: window.localStorage ? parseFloat(window.localStorage.getItem('Docs.menuSize')) || 300 : 300,
        };
        this.menuSize = this.state.menuSize;
        this.load();
    }

    componentWillReceiveProps(nextProps /* , nextContext */) {
        if (this.props.contentPath !== nextProps.contentPath) {
            this.load(nextProps.contentPath);
        }
    }

    static findFirstPage(root) {
        if (root.content) {
            return root.content;
        }
        if (root.pages) {
            for (const attr in root.pages) {
                if (root.pages.hasOwnProperty(attr)) {
                    const result = this.findFirstPage(root.pages[attr]);
                    if (result) {
                        return result;
                    }
                }
            }
        }

        return null;
    }

    load(contentPath) {
        contentPath = contentPath || this.props.contentPath;
        const d = new Date();
        fetch(`${contentPath}?t=${d.getFullYear()}_${d.getMonth()}_${d.getDate()}_${d.getHours()}`)
            .then(res => res.json())
            .then(content => {
                const location = Router.getLocation();
                let path = location.page;
                if (!path && location.tab === 'adapters') {
                    path = 'adapters';
                }
                if (!path) {
                    path = TreePage.findFirstPage(content);
                }

                this.setState({ content, path });
            });
    }

    onHashChange(location) {
        if (location.page !== this.state.path) {
            if (!location.page) {
                if (location.tab === 'adapters') {
                    location.page = 'adapters';
                } else {
                    location.page = TreePage.findFirstPage(this.state.content);
                }
            }
            this.setState({ path: location.page });
        }
    }

    saveExpanded(expanded) {
        window.localStorage.setItem('Docs.expanded', JSON.stringify(expanded || this.state.expanded));
    }

    onExpandAll() {
        const expanded = this.getFolders();
        this.setState({ expanded });
        this.saveExpanded(expanded);
    }

    onCollapseAll() {
        this.setState({ expanded: [] });
        this.saveExpanded([]);
    }

    onExpand(id, e) {
        e && e.stopPropagation();
        if (!this.state.expanded.includes(id)) {
            const expanded = this.state.expanded.concat([id]);
            this.setState({ expanded });
            this.saveExpanded(expanded);
        }
    }

    onCollapse(id, e) {
        e && e.stopPropagation();
        const pos = this.state.expanded.indexOf(id);
        if (pos !== -1) {
            const expanded = this.state.expanded.concat([]);
            expanded.splice(pos, 1);
            this.setState({ expanded });
            this.saveExpanded(expanded);
        }
    }

    getFolders(root, item, result) {
        root = root || this.state.content;
        result = result || [];
        if (root.pages) {
            item && result.push(item);

            Object.keys(root.pages).forEach(_item =>
                this.getFolders(root.pages[_item], _item, result));
        }

        return result;
    }

    renderFolderButtons(item, children, isExpanded) {
        if (children) {
            return <IconButton
                key="expand"
                className={this.props.classes.expandButton}
                onClick={isExpanded ? e => this.onCollapse(item, e) : e => this.onExpand(item, e)}
            >
                {isExpanded ? <IconCollapse fontSize="small" /> : <IconExpand fontSize="small" />}
            </IconButton>;
        }

        return <div key="expand1" className={this.props.classes.expandButton} />;
    }

    onNavigate(item, obj) {
        if (obj.pages && !this.state.expanded.includes(item)) {
            this.onExpand(item);
        }

        if (obj.content) {
            if (this.props.mobile) {
                this.setState({ menuOpened: false });
            }
            super.onNavigate(null, null, obj.content);
        }
    }

    getItemIcon(root) {
        if (root.content) {
            if (root.icon) {
                return <img key="icon1" className={this.props.classes.icon} src={`${this.props.language}/${root.icon}`} alt="logo" />;
            }

            return <IconDocument key="icon" className={this.props.classes.icon} />;
        }

        return null;
    }

    findNotFilteredOut(root) {
        if (root.pages) {
            const found = Object.keys(root.pages).find(attr => this.findNotFilteredOut(root.pages[attr]));
            if (found) {
                return true;
            }
        }
        return root.title &&
            (root.title[this.props.language] || root.title.en).toLowerCase().includes(this.state.filter.toLowerCase());
    }

    renderMenuItem(root, item, level) {
        let isExpanded = true;

        if (root.pages && item) {
            isExpanded = this.state.expanded.includes(item);
        }

        const areChildrenVisible = !this.state.filter || this.findNotFilteredOut(root);

        const style = { paddingLeft: (level - 1) * 15 };

        return [
            root.title && (!this.state.filter || areChildrenVisible || (root.title[this.props.language] || root.title.en).toLowerCase().includes(this.state.filter.toLowerCase())) ?
                <ListItem
                    style={style}
                    key={item}
                    className={`${this.props.classes.element} ${root.content && root.content === this.state.path ? this.props.classes.selected : ''}`}
                    onClick={() => this.onNavigate(item, root)}
                >
                    {this.renderFolderButtons(item, root.pages, isExpanded)}
                    {root.pages ? <ListItemIcon className={this.props.classes.listExpandIcon}>{isExpanded ? <IconFolderOpened /> : <IconFolder />}</ListItemIcon> : null}
                    <ListItemText
                        classes={{ root: this.props.classes.listItem, primary: (root.content && root.content === this.state.path ? this.props.classes.selected : '') }}
                        style={{}}
                        primary={[
                            this.getItemIcon(root),
                            <span key="text">{root.title[this.props.language] || root.title.en}</span>,
                        ]}
                    />
                </ListItem> : null,
            areChildrenVisible && isExpanded && root.pages ? Object.keys(root.pages).map(p =>
                this.renderMenuItem(root.pages[p], p, level + 1)) : null,
        ];
    }

    getBottomButtons() {
        return [
            <IconExpandAll key="expandAll" className={`${this.props.classes.footerButtons} ${this.props.classes.footerButtonsRight}`} title={I18n.t('Expand all')} onClick={() => this.onExpandAll()} />,
            this.state.expanded.length ? <IconCollapseAll key="collapseAll" className={`${this.props.classes.footerButtons} ${this.props.classes.footerButtonsRight}`} title={I18n.t('Collapse all')} onClick={() => this.onCollapseAll()} /> : null,
        ];
    }

    onMenuOpenClose(menuOpened, cb) {
        if (menuOpened === undefined) {
            menuOpened = !this.state.menuOpened;
        }
        window.localStorage && window.localStorage.setItem('Docs.menuOpened', menuOpened.toString());
        this.setState({ menuOpened }, () =>
            cb && cb());
    }

    renderFilterInput() {
        return [
            <Input
                key="filter"
                placeholder={I18n.t('Filter')}
                onChange={e => this.setState({ filter: e.target.value })}
                value={this.state.filter}
                className={`${this.props.classes.searchInput} ${this.state.filter ? this.props.classes.searchInputWithClear : ''}`}
            />,
            this.state.filter ? <IconButton className={this.props.classes.searchClear} onClick={() => this.setState({ filter: '' })}><IconClear fontSize="small" /></IconButton> : null,
        ];
    }

    renderList() {
        return [
            this.renderFilterInput(),
            <List key="list" className={this.props.classes.list}>{this.renderMenuItem(this.state.content, '', 0)}</List>,
            <Divider key="divider" />,
            <div key="footer" className={this.props.classes.footer}>{this.getBottomButtons()}</div>,
        ];
    }

    renderDesktopDrawer() {
        if (this.state.menuOpened && !this.state.editMode) {
            return <div key="drawer" className={this.props.classes.drawer}>
                {this.renderList()}
            </div>;
        }

        return null;
    }

    renderMobileDrawer() {
        return <Drawer
            key="drawer1"
            open={this.state.menuOpened}
            anchor="left"
            onClose={() => this.setState({ menuOpened: false })}
        >
            {this.renderList()}
        </Drawer>;
    }

    onEditMode = (editMode /* , cb */) => this.setState({ editMode });

    renderPage() {
        return <MDPage
            key="mdpage1"
            onMenuOpenClose={!this.state.resizing ? (opened, cb) => this.onMenuOpenClose(opened, cb) : null}
            onEditMode={this.onEditMode}
            editMode={this.state.editMode}
            resizing={this.state.resizing}
            menuWidth={this.state.menuSize}
            contentWidth={this.state.menuOpened ? this.props.contentWidth - this.state.menuSize : this.props.contentWidth}
            menuOpened={this.state.menuOpened}
            onNavigate={this.props.onNavigate}
            language={this.props.language}
            theme={this.props.theme}
            mobile={this.props.mobile}
            path={this.state.path}
        />;
    }

    render() {
        if (this.props.mobile) {
            return [
                this.renderMobileDrawer(),
                this.renderPage(),
            ];
        }

        return <SplitterLayout
            key="splitterLayout"
            vertical={false}
            primaryMinSize={100}
            primaryIndex={1}
            percentage={false}
            secondaryInitialSize={this.state.menuSize}
            onDragStart={() => this.setState({ resizing: true })}
            onSecondaryPaneSizeChange={size => this.menuSize = parseFloat(size)}
            customClassName={`${this.props.classes.splitterDivs} ${!this.state.menuOpened ? this.props.classes.menuDivWithoutMenu : ''}`}
            onDragEnd={() => {
                window.localStorage && window.localStorage.setItem('Docs.menuSize', this.menuSize.toString());
                this.setState({ resizing: false, menuSize: this.menuSize });
            }}
        >
            {this.renderDesktopDrawer()}
            {this.renderPage()}
        </SplitterLayout>;
    }
}

TreePage.propTypes = {
    language: PropTypes.string,
    onNavigate: PropTypes.func,
    theme: PropTypes.string,
    mobile: PropTypes.bool,
    contentPath: PropTypes.string,
    contentWidth: PropTypes.number,
};

export default withStyles(styles)(TreePage);
