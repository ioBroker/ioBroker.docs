import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Accordion,
    AccordionSummary,
    AccordionActions,
    IconButton,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Button,
    Input,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
    Snackbar,
} from '@mui/material';

import {
    MdClose as IconClose,
    MdExpandMore as IconExpandMore,
    MdReorder as IconList,
    MdViewModule as IconCards,
    MdUnfoldMore as IconExpandAll,
    MdUnfoldLess as IconCollapseAll,
} from 'react-icons/md';

import Loader from '../Components/Loader';
import I18n from '../i18n';
import Utils from '../Utils';
import AdapterStatistics from '../Components/AdapterStatistics';

const MARGIN = 10;

const styles = {
    root: {
        margin: 10,
        height: 'calc(100% - 55px)',
        overflow: 'hidden',
    },
    card: {
        margin: MARGIN,
        minWidth: 220,
        maxWidth: 350,
        display: 'inline-block',
        verticalAlign: 'top',
        textAlign: 'left',
    },
    cardMedia: {
        height: 64,
        width: 64,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 0,
        borderRadius: 3,
    },
    cardTitle: {
        maxWidth: 'calc(100% - 16px)',
        overflow: 'hidden',
        position: 'absolute',
        top: 16,
        left: 6,
        zIndex: 1,
        whiteSpace: 'nowrap',
        fontSize: 20,
        fontWeight: 'bold',
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 5,
        background: '#FFFFFF80',
    },
    cardContent: {
        zIndex: 1,
    },
    titleExpanded: {
        fontWeight: 'bold',
        borderBottom: '1px solid #DDD',
    },
    details: {
        display: 'inline-block',
    },
    pageHeader: {
        marginLeft: 20,
        display: 'flex',
    },
    pageTitle: {
        fontSize: 32,
    },
    pageTitleNew: {
        fontSize: 14,
        paddingRight: 10,
    },
    pageTitleTotal: {
        marginTop: 5,
        fontSize: 14,
        // paddingRight: 10,
        padding: '6px 8px',
        textTransform: 'uppercase',
    },
    cardValue: {

    },
    cardInfo: {
        borderTop: '1px solid #EEE',
        paddingTop: 10,
    },
    cardName: {
        fontWeight: 'bold',
        paddingRight: 5,
        width: 100,
    },
    cardFilterDiv: {
        position: 'relative',
        marginTop: 5,
    },
    cardFilter: {
        marginLeft: 10,
        position: 'relative',
    },
    filterCloseButton: {
        position: 'absolute',
        top: 0,
        right: -10,
    },
    cardVersionName: {
        background: 'gray',
        borderRadius: '3px 0 0 3px',
        padding: '1px 3px 1px 3px',
        color: 'white',
    },
    cardVersionValue: {
        background: 'green',
        borderRadius: '0 3px 3px 0',
        padding: '1px 3px 1px 3px',
        color: 'white',
    },

    headerGapButtons: {
        display: 'inline-block',
        flex: 1,
    },
    headerDivButtons: {
        display: 'inline-block',
        whiteSpace: 'nowrap',
    },
    headerButtonMode: {
        marginRight: 10,
        marginLeft: 10,
        height: 37,
        marginTop: 6,
    },
    headerButtons: {

    },
    tableRoot: {
        height: 'calc(100% - 55px)',
        width: '100%',
        overflow: 'hidden',
    },
    table: {

    },
    tableLogo: {
        height: 'auto',
        width: 'auto',
        maxWidth: 32,
    },
    tableRow:{
        cursor: 'pointer',
        '&:hover': {
            background: '#DDDDDD',
        },
    },
    tableCell:{
        padding: '0 5px',
        minWidth: 0,
    },
    tableColumnIcon: {
        width: 32,
        borderRadius: 3,
    },
    tableColumnTitle: {
        width: 80,
        fontWeight: 'bold',
    },
    tableColumnDesc: {
    },
    tableColumnType: {
        width: 100,
    },
    tableColumnInstalled: {
        width: 80,
    },
    tableColumnWeekDownloads: {
        width: 80,
    },
    tableColumnGithubStars: {
        width: 80,
    },
    tableColumnGithubScore: {
        width: 80,
    },
    tableColumnLicense: {
        width: 80,
    },
    tableColumnAuthor: {
        width: 100,
    },
    tableColumnCreated: {
        width: 48,
    },
    tableColumnVersions: {
        width: 48,
        whiteSpace: 'nowrap',
        textAlign: 'left',
        paddingRight: '5px !important',
    },
    tableEmail: {
        color: '#00a7ff',
        cursor: 'pointer',
    },
    versionTitle: {
        fontSize: 8,
        paddingRight: 3,
        width: 24,
        display: 'inline-block',
    },
    buttonZoom: {
    },
    buttonGap: {
        flex: 2,
        display: 'inline-block',
    },
};

let adaptersLastScroll = 0;
let adapterList = null;

class Adapters extends Component {
    constructor(props) {
        super(props);

        let expanded = window.localStorage ? window.localStorage.getItem('Docs.AExpanden') : '[]';
        try {
            expanded = JSON.parse(expanded) || [];
        } catch (e) {
            expanded = [];
        }

        const filter = window.localStorage ? window.localStorage.getItem('Docs.afilter') || '' : '';

        // load page
        this.state = {
            content: '',
            adapters: {},
            expanded,
            stats: '',
            showNew: false,
            filter,
            total: '-',
            tableView: window.localStorage ? window.localStorage.getItem('Docs.aTableView') === 'true' : false,
            newMonth: window.localStorage ? window.localStorage.getItem('Docs.anew') === 'true' : false,
            loadTimeout: false,
            statistics: {},
            orderBy: window.localStorage ? window.localStorage.getItem('Docs.aOrderBy') || 'Title' : 'Title',
            order: window.localStorage ? window.localStorage.getItem('Docs.aOrder') || 'asc' : 'asc',
        };

        this.myFilterRef = React.createRef();

        this.load();

        // Give 300ms to load the page. After that show the loading indicator.
        setTimeout(() => !this.state.content && this.setState({ loadTimeout: true }), 300);

        this.contentRef = React.createRef();
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.myFilterRef.current) {
                this.myFilterRef.current.value = this.state.filter;
            }
        }, 1000);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.language !== nextProps.language) {
            this.load(null, nextProps.language);
        }
    }

    getCounters(content) {
        const result = { total: 0, newMonth: 0, adapters: {} };
        this.forMonth = new Date();
        this.forMonth.setDate(this.forMonth.getDate() - 30);

        Object.keys(content.pages).forEach(type => {
            if (content.pages[type].pages) {
                Object.keys(content.pages[type].pages).forEach(adapter => {
                    const obj = content.pages[type].pages[adapter];
                    result.total++;
                    obj.type = type;
                    if (obj.published && typeof obj.published !== 'object') {
                        obj.published = new Date(obj.published);
                    }
                    obj.date = Adapters.formatDate(obj.published);
                    if (obj.published && this.forMonth < obj.published) {
                        result.newMonth++;
                    }
                    if (typeof obj.authors !== 'object') {
                        obj.authors = (obj.authors || '').split(',').map(item => {
                            const m = item.match(/([^<]*)<([^>]+)>/);
                            if (m) {
                                return { name: m[1].trim(), email: (m[2] || '').trim() };
                            }
                            return { name: item.trim(), email: '' };
                        });
                    }
                    obj.installs = obj.installs || 0;
                    obj.weekDownloads = parseInt(obj.weekDownloads || 0, 10);
                    obj.stars = obj.stars <= 0 ? 0 : parseInt(obj.stars, 10);
                    obj.score = parseFloat(obj.score || 0);
                    obj.keywords = obj.keywords || '';
                    obj.keywords += obj.title;
                    obj.keywords = obj.keywords.toLowerCase();
                    result.adapters[adapter] = obj;
                });
            }
        });
        return result;
    }

    load(/* path, language */) {
        const d = new Date();
        adapterList = adapterList || fetch(`adapters.json?t=${d.getFullYear()}_${d.getMonth()}_${d.getDate()}`).then(res => res.json());
        const adapterStatistics = Utils.getStatistics();

        Promise.all([adapterList, adapterStatistics])
            .then(results => {
                const stats = this.getCounters(results[0]);

                this.setState({
                    content: results[0],
                    loadTimeout: false,
                    statistics: results[1],
                    total: stats.total,
                    newMonth: stats.newMonth,
                    adapters: stats.adapters,
                });

                if (adaptersLastScroll) {
                    setTimeout(() => {
                        this.props.scrollPosition(adaptersLastScroll);
                        adaptersLastScroll = 0;
                    }, 100);
                }
            });
    }

    onNavigate(link) {
        adaptersLastScroll = this.props.scrollPosition();
        this.props.onNavigate(null, null, link);
    }

    renderAdapterStatistics() {
        return this.state.stats ? <AdapterStatistics
            key="statistics"
            onClose={() => this.setState({ stats: '' })}
            mobile={this.props.mobile}
            theme={this.props.theme}
            width={this.props.contentWidth}
            language={this.props.language}
            adapter={this.state.stats}
            statistics={this.state.statistics}
        /> : null;
    }

    renderAdapterMain(adapter, obj) {
        return [
            <CardActionArea key="main" onClick={() => this.onNavigate(obj.content)}>
                <div
                    style={{ ...styles.cardMedia, backgroundImage: `url(${this.props.language}/${obj.icon})` }}
                />
                <div style={styles.cardTitle}>{adapter}</div>
                <CardContent style={styles.cardContent}>
                    <h2>&nbsp;</h2>
                    <p>
                        {obj.titleFull ? obj.titleFull[this.props.language] || obj.titleFull.en || obj.titleFull : obj.title[this.props.language] || obj.title.en || obj.title}
                    </p>
                    <p>{obj.description ? obj.description[this.props.language] || obj.description.en : ''}</p>
                    <div style={styles.cardInfo}>
                        {obj.authors ? <div>
                            <span style={styles.cardName}>{this.words.authors}</span>
                            <span style={styles.cardValue}>{obj.authors.map(item => item.name).join(', ')}</span>
                        </div> : null}
                        {obj.version ? <div>
                            <span style={styles.cardName}>{this.words.stable}</span>
                            <span style={styles.cardValue}>{obj.version}</span>
                        </div> : null}
                        {this.state.statistics.adapters[adapter] ? <div>
                            <span style={styles.cardName}>{this.words.installs}</span>
                            <span style={styles.cardValue}>{this.state.statistics.adapters[adapter]}</span>
                        </div> : null}
                        {obj.stars > 0 ? <div>
                            <span style={styles.cardName}>{this.words.githubStars}</span>
                            <span style={styles.cardValue} title={`Score: ${Math.floor(obj.score * 10) / 10}`}>{obj.stars}</span>
                        </div> : null}
                        {obj.weekDownloads ? <div>
                            <span style={styles.cardName}>{this.words.weekDownloads}</span>
                            <span style={styles.cardValue}>{obj.weekDownloads}</span>
                        </div> : null}
                    </div>
                </CardContent>
            </CardActionArea>,
            <CardActions key="actions">
                <Button size="small" color="primary" onClick={() => this.onNavigate(obj.content)}>{this.words.read}</Button>
                <Button size="small" color="primary" onClick={() => Utils.openLink(obj.github)}>{this.words.github}</Button>
                <Button size="small" color="primary" onClick={() => this.setState({ stats: adapter })}>{this.words.stats}</Button>
            </CardActions>,
        ];
    }

    renderAdapterCard(type, adapter, obj) {
        this.words = this.words || {};
        this.words.authors = this.words.authors || I18n.t('Authors:');
        this.words.stable = this.words.stable || I18n.t('Stable:');
        this.words.installs = this.words.installs || I18n.t('Installs:');
        this.words.read = this.words.read || I18n.t('Read');
        this.words.github = this.words.github || I18n.t('Github');
        this.words.stats = this.words.stats || I18n.t('Info');
        this.words.close = this.words.close || I18n.t('Close');
        this.words.githubStars = this.words.githubStars || I18n.t('Github stars:');
        this.words.githubScore = this.words.githubScore || I18n.t('Github score:');
        this.words.weekDownloads = this.words.weekDownloads || `${I18n.t('Week downloads')}:`;

        return <Card key={adapter} style={{ ...styles.card, width: this.cardWidth }}>
            {this.renderAdapterMain(adapter, obj)}
        </Card>;
    }

    static getWidthOfCard() {
        const width = window.innerWidth;
        if (width < 600) {
            return `calc(50% - ${MARGIN * 2}px)`;
        }
        if (width < 1200) {
            return `calc(30% - ${MARGIN * 2}px)`;
        }
        if (width < 1600) {
            return `calc(25% - ${MARGIN * 2}px)`;
        }
        if (width < 1980) {
            return `calc(20% - ${MARGIN * 2}px)`;
        }
        return `calc(10% - ${MARGIN * 2}px)`;
    }

    saveExpanded(expanded) {
        window.localStorage.setItem('Docs.AExpanden', JSON.stringify(expanded || this.state.expanded));
    }

    onExpandAll() {
        const expanded = Object.keys(this.state.content.pages);
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

    onToggle(id, e) {
        e && e.stopPropagation();
        if (!this.state.expanded.includes(id)) {
            this.onExpand(id, e);
        } else {
            this.onCollapse(id, e);
        }
    }

    onFilter(value, immediate) {
        this.filter = value;
        this.filterTimeout && clearTimeout(this.filterTimeout);
        this.filterTimeout = setTimeout(() => {
            this.filterTimeout = null;
            this.setState({ filter: this.filter });
            window.localStorage && window.localStorage.setItem('Docs.afilter', this.filter);
        }, immediate ? 0 : 300);
    }

    renderHeader() {
        return <div style={styles.pageHeader} key="header">
            <span style={styles.pageTitle}>{this.props.mobile ? I18n.t('Adapters') : I18n.t('List of adapters')}</span>
            {!this.props.mobile ? <IconButton
                style={styles.headerButtonMode}
                title={this.state.tableView ? I18n.t('Switch to tile view') : I18n.t('Switch to table view')}
                onClick={() => {
                    window.localStorage && window.localStorage.setItem('Docs.aTableView', this.state.tableView ? 'false' : 'true');
                    this.setState({ tableView: !this.state.tableView });
                }}
            >
                {this.state.tableView ? <IconCards fontSize="small" /> : <IconList fontSize="small" />}
            </IconButton> : null}
            <div style={styles.cardFilterDiv}>
                <Input
                    placeholder={I18n.t('Filter')}
                    inputRef={this.myFilterRef}
                    style={styles.cardFilter}
                    onChange={e => this.onFilter(e.target.value)}
                />
                {this.state.filter ?
                    <IconButton style={styles.filterCloseButton} onClick={() => this.onFilter('', true)}>
                        <IconClose fontSize="small" />
                    </IconButton> : null}
            </div>
            <div style={styles.headerGapButtons} />
            <div style={styles.headerDivButtons}>
                {this.props.mobile || !this.state.tableView ? <IconButton key="expandAll" style={styles.headerButtons} title={I18n.t('Expand all')} onClick={() => this.onExpandAll()}>
                    <IconExpandAll fontSize="small" />
                </IconButton> : null}
                {(this.props.mobile || !this.state.tableView) && this.state.expanded.length ?
                    <IconButton key="collapseAll" style={styles.headerButtons} title={I18n.t('Collapse all')} onClick={() => this.onCollapseAll()}>
                        <IconCollapseAll fontSize="small" />
                    </IconButton> : null}
            </div>

            {this.props.mobile || !this.state.tableView ? <Button
                style={styles.pageTitleNew}
                color={this.state.showNew ? 'secondary' : 'grey'}
                onClick={() => {
                    this.setState({ showNew: !this.state.showNew });
                    window.localStorage && window.localStorage.setItem('Docs.anew', this.state.showNew ? 'false' : 'true');
                }}
            >
                {`${this.props.mobile ? I18n.t('New:') : I18n.t('New in last month:')} ${this.state.newMonth}`}
            </Button> : null}
            <span style={styles.pageTitleTotal}>
                {`${I18n.t('Total:')} ${this.state.total}`}
                {this.props.mobile || this.state.tableView ? '' : ', '}
            </span>
        </div>;
    }

    isAdapterVisible(obj, adapter, filter) {
        if (this.state.showNew && (!obj.published || this.forMonth >= obj.published)) {
            return false;
        }
        if (this.state.filter && !obj.keywords.includes(filter) && !adapter.includes(filter)) {
            return false;
        }
        return true;
    }

    isSomeVisible(type) {
        if (!this.state.filter && !this.state.showNew) {
            return true;
        }
        const filter = this.state.filter.toLowerCase();
        const items = this.state.content.pages[type];
        return Object.keys(items.pages).find(adapter =>
            this.isAdapterVisible(items.pages[adapter], adapter, filter));
    }

    renderType(type) {
        const items = this.state.content.pages[type];
        if (!items || !items.pages) {
            return null;
        }

        const isExpanded = this.state.expanded.includes(type);

        const isSomeVisible = this.isSomeVisible(type);

        if (!isSomeVisible) {
            return null;
        }
        const filter = this.state.filter.toLowerCase();

        return <Accordion key={type} expanded={isExpanded} onChange={e => this.onToggle(type, e)}>
            <AccordionSummary
                expandIcon={<IconExpandMore />}
                style={{ width: 'calc(100% - 48px)', ...(isExpanded ? styles.titleExpanded : undefined) }} // workaround because of the bug. On mobile devices the first element is broken
            >
                {this.state.content.pages[type].title[this.props.language] || this.state.content.pages[type].title.en || type}
            </AccordionSummary>
            <AccordionActions style={{ ...styles.details, textAlign: this.props.mobile ? 'center' : undefined }}>
                {isExpanded && Object.keys(items.pages).map(adapter => this.isAdapterVisible(items.pages[adapter], adapter, filter) && this.renderAdapterCard(type, adapter, items.pages[adapter]))}
            </AccordionActions>
        </Accordion>;
    }

    static formatDate(date) {
        if (!date) {
            return '';
        }
        if (date.getFullYear().toString() === 'NaN') {
            return '';
        }
        return `${date.getFullYear()}.${Utils.padding(date.getMonth() + 1)}.${Utils.padding(date.getDate())}`;
    }

    formatAuthor(author, email) {
        if (email) {
            return <span
                key={email}
                style={styles.tableEmail}
                title={I18n.t('Click to copy %s', email)}
                onClick={e => {
                    Utils.onCopy(e, email);
                    this.setState({ tooltip: I18n.t('Copied') });
                }}
            >
                {author}
            </span>;
        }
        return <span key={author} style={styles.tableAuthor}>{author}</span>;
    }

    renderVersion(obj) {
        if (obj.version !== obj.latestVersion) {
            return [
                <div key="stable" style={styles.versionTitle}>stable</div>,
                obj.version,
                <br key="br" />,
                <div key="latest" style={styles.versionTitle}>latest</div>,
                obj.latestVersion,
            ];
        }
        return [<div key="version" style={styles.versionTitle}>&nbsp;</div>, obj.version];
    }

    renderTableLine(name, obj, width) {
        return <TableRow
            style={styles.tableRow}
            key={name}
            onClick={() => this.onNavigate(`adapterref/iobroker.${name}/README.md`)}
        >
            <TableCell style={{ ...styles.tableCell, ...styles.tableColumnIcon }} align="left" padding="none"><img style={styles.tableLogo} alt="logo" src={`${this.props.language}/${obj.icon}`} /></TableCell>
            <TableCell style={{ ...styles.tableCell, ...styles.tableColumnTitle }} align="left" padding="none">{name}</TableCell>
            <TableCell style={{ ...styles.tableCell, ...styles.tableColumnDesc }} padding="none">{typeof obj.description === 'object' ? obj.description[this.props.language] || obj.description.en : obj.description || ''}</TableCell>
            <TableCell style={{ ...styles.tableCell, ...styles.tableColumnType }} align="right" padding="none">{obj.type}</TableCell>
            <TableCell style={{ ...styles.tableCell, ...styles.tableColumnInstalled }} align="right" padding="none">{obj.installs}</TableCell>
            {width > 2 ? (<TableCell style={{ ...styles.tableCell, ...styles.tableColumnGithubScore }} align="right" padding="none">{obj.score ? Math.floor(obj.score * 10) / 10 : ''}</TableCell>) : null}
            {width > 1 ? (<TableCell style={{ ...styles.tableCell, ...styles.tableColumnGithubStars }} align="right" padding="none">{obj.stars > 0 ? obj.stars : ''}</TableCell>) : null}
            {width > 0 ? (<TableCell style={{ ...styles.tableCell, ...styles.tableColumnWeekDownloads }} align="right" padding="none">{obj.weekDownloads}</TableCell>) : null}
            <TableCell style={{ ...styles.tableCell, ...styles.tableColumnLicense }} align="right" padding="none">{obj.license}</TableCell>
            <TableCell style={{ ...styles.tableCell, ...styles.tableColumnAuthor }} align="right" padding="none">{obj.authors ? obj.authors.map(item => [this.formatAuthor(item.name, item.email), <br key="br" />]) : ''}</TableCell>
            <TableCell style={{ ...styles.tableCell, ...styles.tableColumnCreated }} align="right" padding="none">{Adapters.formatDate(obj.published)}</TableCell>
            <TableCell style={{ ...styles.tableCell, ...styles.tableColumnVersions }} align="right" padding="none">{this.renderVersion(obj)}</TableCell>
        </TableRow>;
    }

    sortHandler(col) {
        if (this.state.orderBy === col) {
            const order = this.state.order === 'asc' ? 'desc' : 'asc';
            this.setState({ order });
            window.localStorage && window.localStorage.setItem('Docs.aOrder', order);
        } else {
            const order = col === 'Installed' || col === 'Created' || col === 'Github stars' || col === 'Github score' || col === 'Week downloads'  ? 'desc' : 'asc';
            window.localStorage && window.localStorage.setItem('Docs.aOrder', order);
            window.localStorage && window.localStorage.setItem('Docs.aOrderBy', col);
            this.setState({ order, orderBy: col });
        }
    }

    renderHeaderCell(style, type, align) {
        return <TableCell
            style={{ ...styles.tableCell, ...style }}
            align={align}
            sortDirection={this.state.orderBy === type ? this.state.order : false}
        >
            <Tooltip
                title={I18n.t('Sort')}
                placement="bottom-end"
                enterDelay={300}
            >
                <TableSortLabel
                    active={this.state.orderBy === type}
                    direction={this.state.order}
                    onClick={() => this.sortHandler(type)}
                >
                    {I18n.t(type)}
                </TableSortLabel>
            </Tooltip>
        </TableCell>;
    }

    renderSnackbar() {
        return <Snackbar
            key="snackbar"
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={!!this.state.tooltip}
            autoHideDuration={6000}
            onClose={() => this.setState({ tooltip: '', errorTooltip: false })}
            message={<span id="message-id">{this.state.tooltip}</span>}
            style={this.state.errorTooltip ? styles.tooltipError : undefined}
            action={[
                <IconButton
                    key="close"
                    color="inherit"
                    style={styles.close}
                    onClick={() => this.setState({ tooltip: '', errorTooltip: false })}
                >
                    <IconClose />
                </IconButton>,
            ]}
        />;
    }

    renderTable() {
        let names = Object.keys(this.state.adapters);
        const width = this.props.contentWidth > 1900 ? 3 : (this.props.contentWidth > 1700 ? 2 : (this.props.contentWidth > 1500 ? 1 : 0));
        if (this.state.filter) {
            const filter = this.state.filter.toLowerCase();
            names = names.filter(adapter =>
                this.state.adapters[adapter].keywords.includes(filter) || adapter.includes(filter));
        }
        if (this.state.orderBy === 'Title') {
            if (this.state.order === 'asc') {
                names.sort();
            } else {
                names.sort((a, b) => Utils.compareStrings(a, b, true));
            }
        } else if (this.state.orderBy === 'Installed') {
            const ad = this.state.adapters;
            if (this.state.order === 'asc') {
                names.sort((a, b) => ad[a].installs - ad[b].installs);
            } else {
                names.sort((a, b) => ad[b].installs - ad[a].installs);
            }
        } else if (this.state.orderBy === 'Github score') {
            const ad = this.state.adapters;
            if (this.state.order === 'asc') {
                names.sort((a, b) => ad[a].score - ad[b].score);
            } else {
                names.sort((a, b) => ad[b].score - ad[a].score);
            }
        } else if (this.state.orderBy === 'Github stars') {
            const ad = this.state.adapters;
            if (this.state.order === 'asc') {
                names.sort((a, b) => ad[a].stars - ad[b].stars);
            } else {
                names.sort((a, b) => ad[b].stars - ad[a].stars);
            }
        } else if (this.state.orderBy === 'Week downloads') {
            const ad = this.state.adapters;
            if (this.state.order === 'asc') {
                names.sort((a, b) => ad[a].weekDownloads - ad[b].weekDownloads);
            } else {
                names.sort((a, b) => ad[b].weekDownloads - ad[a].weekDownloads);
            }
        } else if (this.state.orderBy === 'License') {
            const ad = this.state.adapters;
            if (this.state.order === 'asc') {
                names.sort((a, b) => (ad[a].license === ad[b].license ? (Utils.compareStrings(a, b)) : Utils.compareStrings(ad[a].license, ad[b].license)));
            } else {
                names.sort((a, b) => (ad[a].license === ad[b].license ? (Utils.compareStrings(a, b, true)) : Utils.compareStrings(ad[a].license, ad[b].license, true)));
            }
        } else if (this.state.orderBy === 'Created') {
            const ad = this.state.adapters;
            if (this.state.order === 'asc') {
                names.sort((a, b) => (ad[a].date === ad[b].date ? (Utils.compareStrings(a, b)) : Utils.compareStrings(ad[a].date, ad[b].date)));
            } else {
                names.sort((a, b) => (ad[a].date === ad[b].date ? (Utils.compareStrings(a, b, true)) : Utils.compareStrings(ad[a].date, ad[b].date, true)));
            }
        } else if (this.state.orderBy === 'Type') {
            const ad = this.state.adapters;
            if (this.state.order === 'asc') {
                names.sort((a, b) => (ad[a].type === ad[b].type ? (Utils.compareStrings(a, b)) : Utils.compareStrings(ad[a].type, ad[b].type)));
            } else {
                names.sort((a, b) => (ad[a].type === ad[b].type ? (Utils.compareStrings(a, b, true)) : Utils.compareStrings(ad[a].type, ad[b].type, true)));
            }
        }

        return <div style={styles.tableRoot} key="table">
            <Table key="table" padding="none" style={styles.table}>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ ...styles.tableCell, ...styles.tableColumnIcon }} align="left">{I18n.t('Icon')}</TableCell>
                        {this.renderHeaderCell(styles.tableColumnTitle, 'Title', 'left')}
                        <TableCell style={{ ...styles.tableCell, ...styles.tableColumnDesc }}>{I18n.t('Description')}</TableCell>
                        {this.renderHeaderCell(styles.tableColumnType, 'Type', 'right')}
                        {this.renderHeaderCell(styles.tableColumnInstalled, 'Installed', 'right')}
                        {width > 2 ? this.renderHeaderCell(styles.tableColumnGithubScore, 'Github score', 'right') : null}
                        {width > 1 ? this.renderHeaderCell(styles.tableColumnGithubStars, 'Github stars', 'right') : null}
                        {width > 0 ? this.renderHeaderCell(styles.tableColumnWeekDownloads, 'Week downloads', 'right') : null}
                        {this.renderHeaderCell(styles.tableColumnLicense, 'License', 'right')}
                        <TableCell style={{ ...styles.tableCell, ...styles.tableColumnAuthor }} align="right">{I18n.t('Maintainer')}</TableCell>
                        {this.renderHeaderCell(styles.tableColumnCreated, 'Created', 'right')}
                        <TableCell style={{ ...styles.tableCell, ...styles.tableColumnVersions }} align="right">{I18n.t('Versions')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {names.map(a => this.renderTableLine(a, this.state.adapters[a], width))}
                </TableBody>
            </Table>
        </div>;
    }

    render() {
        if (this.state.loadTimeout && !this.state.content) {
            return <Loader theme={this.props.theme} />;
        }

        this.cardWidth = Adapters.getWidthOfCard();

        return [
            this.renderHeader(),
            !this.props.mobile && this.state.tableView ? this.renderTable() :
                <div key="body" style={styles.root} ref={this.contentRef}>
                    {this.state.content && Object.keys(this.state.content.pages).map(type => this.renderType(type))}
                </div>,
            this.renderAdapterStatistics(),
            this.renderSnackbar(),
        ];
    }
}

Adapters.propTypes = {
    scrollPosition: PropTypes.func,
    language: PropTypes.string,
    onNavigate: PropTypes.func,
    theme: PropTypes.string,
    mobile: PropTypes.bool,
    contentWidth: PropTypes.number,
};

export default Adapters;
