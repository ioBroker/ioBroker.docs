import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Converter} from 'react-showdown';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Snackbar from '@material-ui/core/Snackbar';

import {MdEdit as IconEdit} from 'react-icons/md';
import {MdClose as IconClose} from 'react-icons/md';
import {MdMenu as IconMenu} from 'react-icons/md';
import {MdExpandMore as IconExpandMore} from 'react-icons/md';
import {FaGithub as IconGithub} from 'react-icons/fa';
import IconGlobe from './assets/globe.svg';
import IconLink from './assets/link.svg';

import Router from './Router';
import Loader from './Components/Loader';
import I18n from './i18n';
import Utils from './Utils';
import Page404 from './Pages/404';
import Editor from './Pages/Editor';
import Affiliates from './Components/Affiliates';

const styles = theme => ({
    root: {
        width: 'calc(100% - 40px)',
        maxWidth: 1000,
        margin: 20,
        '& .md-link': {
            display: 'inline-block'
        },
        '& h2': {
            width: '100%',
            textAlign: 'left',
            paddingBottom: 10,
            borderBottom: '1px solid lightgray'
        },
        '& hr': {
            borderWidth: '0 0 1px 0'
        },
        '& a': {
            color: 'inherit'
        },
        '& pre': {
            background: '#e3e3e3',
        },
        '& code': {
            margin: '0 0.15em',
            padding: '0.125em 0.4em',
            borderRadius: 2,
            background: '#e3e3e3',
            color: '#000000',
            whiteSpace: 'pre',
        },
        '& img': {
            maxWidth: '100%'
        }
    },
    logoImage: {
        width: 64,
        verticalAlign: 'middle',
    },
    infoEdit: {
        float: 'right',
        textDecoration: 'none',
        color: 'gray'
    },
    infoEditLocal: {
        float: 'right',
        textDecoration: 'none',
        marginRight: 15,
        cursor: 'pointer',
        display: 'inline-block'
    },
    adapterCard: {
        marginBottom: 0,
        marginTop: 0,
    },
    badgesDetails: {
        display: 'block',
        '& img': {
            marginRight: 5,
        }
    },
    titleText: {
        display: 'inline-block',
        marginLeft: 10,
    },
    adapterCardAttr:{
        fontWeight: 'bold',
        width: 150,
        display: 'inline-block'
    },
    adapterCardListItem: {
        paddingTop: 3,
        paddingBottom: 3,
    },
    description: {
        fontStyle: 'italic'
    },
    contentDiv: {
        position: 'fixed',
        width: '20%',
        minWidth: 200,
        overflowX: 'hidden',
        opacity: 0.8,
        top: 60,
        right: 20,
        background: '#EEEEEE',
        maxHeight: 'calc(100% - 70px)',
    },
    contentDivClosed: {
        position: 'fixed',
        opacity: 0.8,
        top: 60,
        right: 20,
        width: 25,
        height: 25,
        cursor: 'pointer'
    },
    contentClose: {
        position: 'fixed',
        top: 60 + 5,
        right: 20 + 5,
        cursor: 'pointer',

        '&:hover': {
            color: '#111111'
        }
    },
    contentLinks: {
        cursor: 'pointer',
        '&:hover': {
            color: '#111111'
        }
    },
    headerTranslated: {
        borderColor: '#009c4f',
        borderWidth: '0 0 0 3px',
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        borderStyle: 'solid',
        background: '#bdded5',
        cursor: 'pointer',
        '&:before': {
            content: 'url(' + IconGlobe + ')',
            marginRight: 10,
            color: '#000000',
            height: 20,
            width: 20,
        }
    },
    license: {
        paddingLeft: 10,
        fontWeight: 'bold',
        marginTop: 0,
        paddingTop: 1,
    },
    mdLink: {
        cursor: 'pointer',
        textDecoration: 'underline',
        '&:after': {
            //content: '"🔗"',
            content: 'url(' + IconLink + ')',
            width: 16,
            height: 16,
            opacity: 0.7,
            fontSize: 14,
            //marginLeft: 5
        }
    },
    mdHeaderLink: {
        textDecoration: 'none',
        '&:after': {
            content: '"🔗"',
            width: 16,
            height: 16,
            opacity: 0,
            fontSize: 14,
            //marginLeft: 5
        },
        '&:hover:after': {
            opacity: 0.7,
        }
    },
    info: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    email: {
        fontStyle: 'italic',
        cursor: 'pointer',
        textDecoration: 'underline'
    },
    name: {
        fontStyle: 'italic'
    },

    table: {
        width: 'auto',
    },
    tableHead: {
        background: '#555555',
    },
    tableRowHead: {
        height: 24,
    },
    tableCellHead: {
        color: '#FFFFFF',
        padding: '3px 10px',
        border: '1px solid rgba(224, 224, 224, 1)',
        margin: 0,
        '&>p': {
            margin: 0,
        }
    },
    tableBody: {

    },
    tableRow: {
        height: 24,
    },
    tableCell: {
        padding: '3px 10px',
        margin: 0,
        border: '1px solid rgba(224, 224, 224, 1)',
        '&>p': {
            margin: 0,
        }
    },

    summary: {
        transition: 'background 0.5s, color: 0.5s',
    },
    summaryExpanded: {
        fontWeight: 'bold',
        //color: '#FFFFFF',
        background: '#DDDDDD'
    },


    warn: {
        borderColor: '#0b87da',
        borderWidth: '0 0 0 3px',
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        borderStyle: 'solid',
        background: '#eff6fb',
        '&:before': {
            content: '"⚠"',
            //borderRadius: '50%',
            //background: '#008aff',
        }
    },
    alarm: {
        borderColor: '#da0b50',
        borderWidth: '0 0 0 3px',
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        borderStyle: 'solid',
        background: '#fbeff3',
        '&:before': {
            content: '"⚠"',
            //borderRadius: '50%',
            //background: '#008aff',
        }
    },
    notice: {
        borderColor: '#9c989b',
        borderWidth: '0 0 0 3px',
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        borderStyle: 'solid',
        background: '#dedede',
        '&:before': {
            content: '"✋"',
            //borderRadius: '50%',
            //background: '#dedede',
        }
    },
    todo: {
        borderColor: '#00769c',
        borderWidth: '0 0 0 3px',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 5,
        marginBottom: 5,
        borderStyle: 'solid',
        background: '#c4d2de',
        /*&:before': {
            content: '"✋"',
            //borderRadius: '50%',
            //background: '#dedede',
        }*/
    },
    paragraph: {

    }
});

const converter = new Converter({
    emoji: true,
    underline: true,
    strikethrough: true,
    simplifiedAutoLink: true,
    parseImgDimensions: true,
    splitAdjacentBlockquotes: true
});
let title;

const ADAPTER_CARD = ['version', 'authors', 'keywords', 'mode', 'materialize', 'compact'];

const EXPAND_LANGUAGE = {
    en: 'english',
    de: 'german',
    ru: 'russian',
    'zh-cn': 'chinese (simplified)'
};

class Markdown extends Router {
    constructor(props) {
        super(props);
        // load page
        this.state = {
            parts: [],
            title: '',
            loadTimeout: false,
            header: {},
            content: {},
            license: '',
            changeLog: '',
            tooltip: '',
            text: this.props.text || '',
            notFound: false,
            affiliate: null,
            hideContent: window.localStorage ? window.localStorage.getItem('Docs.hideContent') === 'true' : false,
        };

        if (!title) {
            title = window.title;
        }

        this.mounted = false;

        if (!this.state.text) {
            this.load();

            // Give 300ms to load the page. After that show the loading indicator.
            setTimeout(() => !this.state.parts.length && this.setState({loadTimeout: true}), 300);
        } else {
            this.parseText();
        }

        this.contentRef = React.createRef();
    }

    componentWillMount() {
        this.mounted = true;
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.path !== nextProps.path) {
            this.mounted && this.setState({notFound: false, parts :[]});
            this.load(nextProps.path);
        } else if (this.props.text !== nextProps.text) {
            this.setState({text: nextProps.text});
            if (!nextProps.text) {
                if (this.props.path !== nextProps.path) {
                    this.mounted && this.setState({notFound: false, parts :[]});
                    this.load(nextProps.path);
                }
            } else {
                this.mounted && this.setState({text: nextProps.text}, () =>
                    this.parseText());
            }
        } else
        if (this.props.language !== nextProps.language) {
            this.mounted && this.setState({notFound: false, parts :[]});
            this.load(null, nextProps.language);
        }
    }

    onHashChange(location) {
        location = location || Router.getLocation();
        if (location.chapter) {
            const el = window.document.getElementById(location.chapter);
            el && el.scrollIntoView(true);
        }
    }

    onNavigate(id, link) {
        if (link && link.match(/^https?:\/\//)) {
            Utils.openLink(link);
        } else if (id) {
            const el = window.document.getElementById(id) || window.document.getElementById(id.replace('nbsp', ''));
            if (el) {
                el.scrollIntoView(true);
            }
        } else if (link) {
            // if relative path
            if (!link.startsWith('#')) {
                // ../../download
                const ppp = link.replace(this.props.path + '/', '').split('#');
                let _link = ppp[1];
                let _path = ppp[0].replace(/\.MD$/, '.md');
                if (!_path.endsWith('.md')) {
                    _path += '.md';
                }
                const location = Router.getLocation();

                if (_path.startsWith('.')) {
                    const parts = _path.split('/');
                    const locParts = location.page.split('/');
                    locParts.pop();
                    parts.forEach(part => {
                        if (part === '.') return;
                        if (part === '..') {
                            locParts.pop();
                            return;
                        }
                        locParts.push(part);
                    });
                    _path = locParts.join('/')
                }

                this.props.onNavigate(null, this.props.rootPath || location.tab, _path, _link);
            } else {
                this.props.onNavigate(null, null, link);
            }
        }
    }

    parseText(text) {
        text = text || this.state.text || '';
        if (this.props.editEnabled) {
            this.editText = text;
        }
        if (!text || text.startsWith('<!DOCTYPE html>')) {
            // page not found
            return this.setState({notFound: true});
        }

        const {header, parts, content, license, changeLog, title} = this.format(text);
        let _title = header.title || title || Utils.getTitle(text);
        if (_title) {
            window.document.title = _title;
        } else if (title) {
            _title = title;
            window.document.title = title;
        }
        let affiliate = null;
        if (header.affiliate) {
            try {
                affiliate = JSON.parse(header.affiliate);
            } catch (e) {
                console.error('Cannot parse affiliate: ' + header.affiliate);
            }
        }

        this.mounted && this.setState({
            affiliate,
            notFound: false,
            parts,
            header,
            loadTimeout: false,
            content,
            license,
            changeLog,
            title: _title
        });

        setTimeout(() => this.onHashChange(), 200);
    }

    load(path, language) {
        path = path || this.props.path;
        language = language || this.props.language;
        if (path && language) {
            fetch(`${language}${path[0] === '/' ? path : '/' + path}`)
                .then(res => res.text())
                .then(text => this.parseText(text));
        }
    }

    format(text) {
        text = (text || '').trim();
        let {header, body} = Utils.extractHeader(text);

        body = Utils.removeDocsify(body);
        let {parts, content, license, changeLog, title} = Utils.decorateText(body, header, `${this.props.path && (this.props.path[0] === '/' ? this.props.path : '/' + this.props.path)}`);

        return {header, parts, content, license, changeLog, title};
    }

    formatAuthors(text) {
        const parts = text.split(',').map(t => t.trim()).filter(t => t);

        const authors = [];
        for (let i = 0; i < parts.length; i++) {
            const m = parts[i].trim().match(/<([-.\w\d_@]+)>$/);
            if (m) {
                const email = m[1];
                authors.push((<span key={parts[i]} className={this.props.classes.email} title={I18n.t('Click to copy %s', email)} onClick={e => {
                    Utils.onCopy(e, email);
                    this.setState({tooltip: I18n.t('Copied')});
                }}>{parts[i].replace(m[0], '').trim() + (parts.length - 1 === i ? '' : ', ')}</span>));
            } else {
                authors.push((<span key={parts[i]} className={this.props.classes.name}>{parts[i] + (parts.length - 1 === i ? '' : ', ')}</span>));
            }
        }

        return authors;
    }

    renderHeader() {
        const data = [];

        if (this.state.header.translatedFrom) {
            let translatedFrom = EXPAND_LANGUAGE[this.state.header.translatedFrom] || this.state.header.translatedFrom;
            // Translate language from english to actual language
            translatedFrom = I18n.t(translatedFrom);

            data.push((<div key="translatedFrom" className={this.props.classes.headerTranslated} onClick={() => this.props.onNavigate(this.state.header.translatedFrom)} title={I18n.t('Go to original')}>{I18n.t('Translated from %s', translatedFrom)}</div>));
        }

        if (this.state.header.adapter) {
            data.push((<h1 key="h1">{[
                this.state.header.logo ? (<img key="logo" src={this.state.header.logo} alt="logo" className={this.props.classes.logoImage}/>) : null,
                (<div key="title" className={this.props.classes.titleText}>{this.state.header.title}</div>)
            ]}</h1>));
            if (this.state.header.readme) {
                const link = this.state.header.readme.replace(/blob\/master\/README.md$/, '');
                data.push((<IconButton key="github" title={I18n.t('Open repository')} onClick={() => Utils.openLink(link)}><IconGithub/></IconButton>));
            }
        }

        if (this.state.header.description) {
            data.push((<span key="description" className={this.props.classes.description}>{this.state.header.description}</span>));
        }

        if (Object.keys(this.state.header).find(attr => ADAPTER_CARD.indexOf(attr) !== -1)) {
            data.push((<ExpansionPanel key="header" className={this.props.classes.adapterCard}>
                <ExpansionPanelSummary className={this.props.classes.summary} classes={{expanded: this.props.classes.summaryExpanded}} expandIcon={<IconExpandMore />}>{I18n.t('Information')}</ExpansionPanelSummary>
                <ExpansionPanelDetails><List>{
                    ADAPTER_CARD
                        .filter(attr => this.state.header.hasOwnProperty(attr))
                        .map(attr => (
                            <ListItem key={attr} className={this.props.classes.adapterCardListItem}>
                                <div className={this.props.classes.adapterCardAttr}>{I18n.t(attr)}: </div>
                                <span>{attr === 'authors' ? this.formatAuthors(this.state.header[attr]) : this.state.header[attr].toString()}</span>
                            </ListItem>))}
                </List></ExpansionPanelDetails>
                </ExpansionPanel>));
        }

        if (Object.keys(this.state.header).find(attr => attr.startsWith('BADGE-'))) {
            data.push((<ExpansionPanel key="header_badges" className={this.props.classes.adapterCard}>
                <ExpansionPanelSummary className={this.props.classes.summary} classes={{expanded: this.props.classes.summaryExpanded}} expandIcon={<IconExpandMore />}>{I18n.t('Badges')}</ExpansionPanelSummary>
                <ExpansionPanelDetails classes={{root: this.props.classes.badgesDetails}}>{
                    Object.keys(this.state.header).filter(attr => attr.startsWith('BADGE-'))
                        .map((attr, i) => [
                                this.state.header[attr].indexOf('nodei.co') !== -1 ? (<br key={'br' + i}/>) : null,
                                (<img key={'img' + i} src={this.state.header[attr]} alt={attr.substring(6)}/>)
                            ])}
                </ExpansionPanelDetails>
            </ExpansionPanel>));
        }

        return data;
    }

    renderInfo() {
        return (<div className={this.props.classes.info}>
            {this.state.header.lastChanged ? [
                (<span key="lastChangedTitle" className={this.props.classes.infoTitle}>{I18n.t('Last changed:')} </span>),
                (<span key="lastChangedValue" className={this.props.classes.infoValue}>{this.state.header.lastChanged}</span>),
                ] : null}
            {this.state.header.editLink ?
                (<a className={this.props.classes.infoEdit}
                    href={this.state.header.editLink}
                    rel="noopener noreferrer"
                    target="_blank"><IconGithub />{I18n.t('Edit on github')}
                    </a>) : null}
            {this.props.editEnabled && this.editText ?
                (<div className={this.props.classes.infoEditLocal} onClick={() => {
                    this.props.onEditMode && this.props.onEditMode(true);
                }}><IconEdit />{I18n.t('Edit local')}</div>) : null}

        </div>);
    }

    _renderSubContent(menu) {
        return (<ul>{
            menu.children.map(item => {
                const ch = this.state.content[item].children;
                const link = this.state.content[item].external && this.state.content[item].link;
                return (
                    <li><span onClick={() => this.onNavigate(item, link)} className={this.props.classes.contentLinks}>{this.state.content[item].title}</span>
                        {ch ? this._renderSubContent(this.state.content[item]) : null}
                    </li>
                );
            }).filter(e => e)
        }</ul>);
    }

    renderAffiliates() {
        if (!this.state.affiliate) return null;

        return (<Affiliates
            key="affiliates"
            language={this.props.language}
            mobile={this.props.mobile}
            theme={this.props.theme}
            data={this.state.affiliate}
        />);
    }

    onToggleContentButton() {
        this.setState({hideContent: !this.state.hideContent});
        window.localStorage && window.localStorage.setItem('Docs.hideContent', this.state.hideContent ? 'false' : 'true');
    }

    renderContentCloseButton() {
        if (this.state.hideContent) {
            return (<IconMenu className={this.props.classes.contentClose}/>);
        } else {
            return (<IconClose className={this.props.classes.contentClose} onClick={() => this.onToggleContentButton()}/>);
        }
    }

    renderContent() {
        const links = Object.keys(this.state.content);
        if (!links.length) {
            return null;
        }
        if (this.state.hideContent) {
            return (<Paper className={this.props.classes.contentDivClosed} onClick={() => this.onToggleContentButton()}>
                {this.renderContentCloseButton()}
            </Paper>);
        } else {
            return (<Paper className={this.props.classes.contentDiv}>
                {this.renderContentCloseButton()}
                <ul>{
                    links.map(item => {
                        const link = this.state.content[item].external && this.state.content[item].link;
                        const level = this.state.content[item].level;
                        let title = this.state.content[item].title.replace('&gt;', '>').replace('&lt;', '<').replace('&amp;', '&');

                        return (
                            <li style={{fontSize: 16 - level * 2, paddingLeft: level * 8, fontWeight: !level ? 'bold' : 'normal'}}>
                                <span onClick={() => this.onNavigate(item, link)} className={this.props.classes.contentLinks}>{title}</span>
                                {this.state.content[item].children ? this._renderSubContent(this.state.content[item]) : null}
                            </li>
                        );
                    }).filter(e => e)
                }</ul>
            </Paper>);
        }
    }

    renderLicense() {
        if (!this.state.license) {
            return null;
        } else {
            return (<ExpansionPanel>
                <ExpansionPanelSummary
                    className={this.props.classes.summary}
                    classes={{expanded: this.props.classes.summaryExpanded}}
                    expandIcon={<IconExpandMore />}>{I18n.t('License')} <span className={this.props.classes.license}> {this.state.header.license}</span></ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {converter.convert(this.state.license)}
                </ExpansionPanelDetails>
            </ExpansionPanel>);
        }
    }

    renderChangeLog() {
        if (!this.state.changeLog) {
            return null;
        } else {
            return (<ExpansionPanel>
                <ExpansionPanelSummary className={this.props.classes.summary} classes={{expanded: this.props.classes.summaryExpanded}} expandIcon={<IconExpandMore />}>{I18n.t('Changelog')}</ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {converter.convert(this.state.changeLog)}
                </ExpansionPanelDetails>
            </ExpansionPanel>);
        }
    }

    renderSnackbar() {
        return (<Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            open={!!this.state.tooltip}
            autoHideDuration={6000}
            onClose={() => this.setState({tooltip: ''})}
            message={<span id="message-id">{this.state.tooltip}</span>}
            action={[
                <IconButton
                    key="close"
                    color="inherit"
                    className={this.props.classes.close}
                    onClick={() => this.setState({tooltip: ''})}
                >
                    <IconClose />
                </IconButton>,
            ]}
        />)
    }

    replaceHref(reactObj) {
        const parts = (this.props.path || '').split('/');
        // const fileName = parts.pop();
        const prefix = parts.join('/') + '/';

        if (reactObj && reactObj.props && reactObj.props.children) {
            reactObj.props.children.forEach((item, i) => {
                if (item && item.type === 'a') {
                    let link = item.props.href;
                    if (link) {
                        if (link.startsWith('#')) {
                            link = Utils.text2link(link.substring(1));
                            reactObj.props.children[i] = (<div
                                key={'link' + i}
                                className={this.props.classes.mdLink + ' md-link'}
                                title={link}
                                onClick={() => this.onNavigate(link)}>
                                {item.props.children ? item.props.children[0] : ''}
                            </div>);
                        } else {
                            const oldLink = link;
                            if (!link.match(/^https?:\/\//)) {
                                link = prefix + link;
                            }

                            reactObj.props.children[i] = (<div
                                key={'link' + i}
                                className={this.props.classes.mdLink + ' md-link'}
                                title={oldLink}
                                onClick={() => this.onNavigate(null, link)}>
                                {item.props.children ? item.props.children[0] : ''}
                            </div>);
                        }
                    }
                }

                if (typeof item === 'object') {
                    this.replaceHref(item);
                }
            });
        }
    }

    makeHeadersAsLink(reactObj, prefix) {
        if (reactObj && (reactObj.type === 'h1' || reactObj.type === 'h2' || reactObj.type === 'h3' || reactObj.type === 'h3')) {
            reactObj.props.children[0] = (<span>{reactObj.props.children[0]}<a
                href={prefix + '?' + reactObj.props.id}
                className={this.props.classes.mdHeaderLink + ' md-h-link'}>
            </a></span>);
        }
    }

    renderTable(lines) {
        const header = lines[0].replace(/^\||\|$/g, '').split('|').map(h => h.trim());

        const rows = [];
        for (let i = 2; i < lines.length; i++) {
            const parts = lines[i].replace(/^\||\|$/g, '').split('|').map(a => a.trim());

            const cells = [];
            for (let j = 0; j < header.length; j++) {
                const crt = converter.convert(parts[j] || '');
                this.replaceHref(crt);
                cells.push((<TableCell className={this.props.classes.tableCell} key={'cell' + i + '_' + j}>{crt}</TableCell>));
            }

            rows.push((<TableRow className={this.props.classes.tableRow} key={'row' + i}>{cells}</TableRow>));
        }
        return (
            <Table padding="dense" className={this.props.classes.table}>
                <TableHead className={this.props.classes.tableHead}>
                    <TableRow className={this.props.classes.tableRowHead}>{header.map((h, i) => (<TableCell className={this.props.classes.tableCellHead} key={'header' + i}>{converter.convert(h)}</TableCell>))}</TableRow>
                </TableHead>
                <TableBody className={this.props.classes.tableBody}>{rows}</TableBody>
            </Table>);

        /*<Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Fat (g)</TableCell>
                    <TableCell align="right">Carbs (g)</TableCell>
                    <TableCell align="right">Protein (g)</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map(row => (
                    <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>*/
    }

    render() {
        if (this.state.notFound) {
            return (<Page404 className={this.props.classes.root} language={this.props.language}/>);
        }
        if (this.props.editMode) {
            return (<Editor
                language={this.props.language}
                mobile={this.props.mobile}
                theme={this.props.theme}
                path={this.state.header.editLink}
                onClose={() => {
                    this.props.onEditMode && this.props.onEditMode(false);
                }}
            />);
        }
        if (this.state.loadTimeout && !this.state.parts.length) {
            return (<Loader theme={this.props.theme}/>);
        }

        const prefix = window.location.hash.split('?')[0];

        const reactElements = this.state.parts.map((part, i) => {
            if (part.type === 'table') {
                return this.renderTable(part.lines);
            } else {
                let line = part.lines.join('\n');
                if (part.type === 'code') {
                    line = line.trim().replace(/^```javascript/, '```');
                }
                if (line.indexOf('*Number value') !== -1) {
                    console.log('AAA');
                }
                const trimmed = line.trim();
                if (trimmed.match(/^\*[^\s]/) && trimmed.match(/[^\s]\*$/)) {
                    line = trimmed;
                }
                const rct = converter.convert(line);

                this.replaceHref(rct);
                this.makeHeadersAsLink(rct, prefix);

                if (part.type === 'warn') {
                    return (<div key={'parts' + i} className={this.props.classes.warn}>{rct}</div>);
                } else if (part.type === 'alarm') {
                    return (<div key={'parts' + i} className={this.props.classes.alarm}>{rct}</div>);
                } else if (part.type === 'notice') {
                    return (<div key={'parts' + i} className={this.props.classes.notice}>{rct}</div>);
                }  else if (part.type === '@@@') {
                    return (<div key={'parts' + i} className={this.props.classes.todo}>{rct}</div>);
                } else {
                    return <div key={'parts' + i} className={this.props.classes.paragraph}>{rct}</div>;
                }
            }
        });

        return (<div className={this.props.classes.root} ref={this.contentRef}>
            {this.renderHeader()}
            {this.state.title && !this.state.header.adapter ? (<h1>{this.state.title}</h1>) : null}
            {this.renderAffiliates()}
            {reactElements}
            <hr/>
            {this.renderLicense()}
            {this.renderChangeLog()}
            {this.renderInfo()}
            {this.renderContent()}
            {this.renderSnackbar()}
        </div>);
    }
}

Markdown.propTypes = {
    language: PropTypes.string,
    onNavigate: PropTypes.func,
    theme: PropTypes.string,
    mobile: PropTypes.bool,
    rootPath:  PropTypes.string,
    path:  PropTypes.string,
    text:  PropTypes.string,
    editMode: PropTypes.bool,
    onEditMode: PropTypes.func,
    editEnabled:  PropTypes.bool,
};

export default withStyles(styles)(Markdown);
