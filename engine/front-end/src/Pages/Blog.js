import React from 'react';
import PropTypes from 'prop-types';
import MarkdownView from 'react-showdown';
import markdownit from 'markdown-it';

import {
    Paper,
    Button,
    Box,
} from '@mui/material';

import {
    MdEdit as IconEdit,
    MdRssFeed as IconRss,
} from 'react-icons/md';

import Footer from '../Footer';
import Loader from '../Components/Loader';
import I18n from '../i18n';
import Utils from '../Utils';
import Router from '../Router';

const md = new markdownit();

const styles = {
    root: {
        width: '100%',
    },
    header: {
        width: '90%',
        background: '#123456',
        paddingTop: 10,
        paddingBottom: 30,
        paddingLeft: '10%',
    },
    rssIcon: {
        fontSize: 22,
        color: '#ffa30c',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 48,
    },
    headerNotice: {
        color: '#FFFFFF',
        fontSize: 24,
    },
    pages: {
        textAlign: 'center',
    },
    pagePage: {
        maxWidth: 1280,
        width: '80%',
        textAlign: 'left',
        padding: 10,
        margin: 'auto',
        overflowWrap: 'break-word',
        marginTop: 10,
        marginBottom: 10,
    },
    pageLogoDiv:{
        width: '100%',
        height: 250,
        textAlign: 'center',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    pageLogo: {
        height: '100%',
    },
    pageTitle: {
        fontSize: 32,
        // fontFamily: 'Open Sans,sans-serif',
        fontWeight: 400,
        lineHeight: '42px',
    },
    pagePosted: {
        fontSize: 14,
        // fontFamily: 'Open Sans,sans-serif',
    },
    pageDesc: {
        fontWeight: 400,
        // fontFamily: 'Open Sans,sans-serif',
        marginTop: 50,
        '& img': {
            maxWidth: '100%',
        },
    },
    pageTitleNextButton: {
        float: 'left',
    },
    pageTitlePrevButton: {
        float: 'right',
    },
    pageTitleTranslated: {
        borderColor: '#009c4f',
        borderWidth: '0 0 0 3px',
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        borderStyle: 'solid',
        background: '#bdded5',
        '&:before': {
            content: '"🛈"',
            marginRight: 10,
            color: '#000000',
        },
    },
    info: {
        paddingTop: 10,
        paddingBottom: 20,
    },
    infoEdit: {
        float: 'right',
        textDecoration: 'none',
        color: 'gray',
    },
};

const CONVERTER_OPTIONS = {
    emoji: true,
    underline: true,
    strikethrough: true,
    simplifiedAutoLink: true,
    parseImgDimensions: true,
    splitAdjacentBlockquotes: true,
};

let blogPromise;

class Blog extends Router {
    constructor(props) {
        super(props);
        this.state = {
            content: null,
            loadTimeout: false,
            text: '',
        };

        this.load();

        // Give 300ms to load the page. After that show the loading indicator.
        setTimeout(() =>
            !this.state.content && this.setState({ loadTimeout: true }), 300);

        this.contentRef = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.language !== nextProps.language) {
            this.page && this.loadBlog(this.page, nextProps.language);
        }
    }

    onHashChange() {
        const location = Router.getLocation();
        if (location.page !== this.page) {
            this.page = location.page;
            if (location.page) {
                this.loadBlog(location.page);
            } else {
                this.setState({ text: '' });
            }
        }
    }

    static fetchData() {
        blogPromise = blogPromise || new Promise(resolve => {
            const d = new Date();

            fetch(`blog.json?t=${d.getFullYear()}_${d.getMonth()}_${d.getDate()}_${d.getHours()}`)
                .then(res => res.json())
                .then(json => resolve(json));
        });

        return blogPromise;
    }

    load() {
        Blog.fetchData()
            .then(content =>
                this.setState({ content }, () => {
                    const location = Router.getLocation();
                    this.page = location.page;
                    if (location.page) {
                        this.loadBlog(location.page);
                    }
                }));
    }

    loadBlog(page, language) {
        language = language || this.props.language;
        page = page || Router.getLocation().page;

        fetch(`${language}/blog/${page}.md`)
            .then(res => res.text())
            .then(text => this.setState({ text, loadTimeout: false }));
    }

    renderHeader() {
        return <div
            key="header"
            style={{ ...styles.header, cursor: this.page ? 'pointer' : undefined }}
            onClick={() => this.onNavigate(null, null, '')}
        >
            <h1
                style={{
                    ...styles.headerTitle,
                    fontSize: this.props.mobile ? 32 : 48,
                    marginTop: this.props.mobile ? 16 : 32,
                    marginBottom: this.props.mobile ? 10 : 21,
                }}
            >
                {I18n.t('ioBroker Blog')}
                <a href={`./blog_${this.props.language}.xml`} rel="noopener noreferrer" target="_blank" title={I18n.t('RSS Feed')}>
                    <IconRss style={styles.rssIcon} />
                </a>
            </h1>
            <div style={{ ...styles.headerNotice, fontSize: this.props.mobile ? 16 : 24 }}>
                {I18n.t('News, announcements and ideas about ioBroker')}
            </div>
        </div>;
    }

    replaceHref(reactObj, prefix) {
        if (reactObj && reactObj.props && reactObj.props.children) {
            reactObj.props.children.forEach((item, i) => {
                if (item && item.type === 'a') {
                    let link = item.props.href;
                    if (link) {
                        if (!link.match(/^https?:\/\//)) {
                            link = prefix + link;
                        }

                        reactObj.props.children[i] = <div
                            className="md-link"
                            style={styles.mdLink}
                            title={link}
                            onClick={() => this.onNavigate(null, link)}
                        >
                            {item.props.children[0]}
                        </div>;
                    }
                }

                if (typeof item === 'object') {
                    this.replaceHref(item);
                }
            });
        }
    }

    static page2Date(page) {
        let date = page.substring(0, 10).replace(/_/g, '.');
        let d = new Date(date);
        if (Number.isNaN(d.getTime())) {
            date = `${page.substring(0, 10).replace(/_/g, '-').replace(/\./g, '-')}T00:00:00`;
            d = new Date(date);
        }
        return d.toLocaleDateString();
    }

    renderEntry(page) {
        const data = this.state.content.pages[page];

        return <Paper key={page} style={styles.pagePage}>
            {data.logo ? <div style={{ ...styles.pageLogoDiv, backgroundImage: `url(${data.logo})` }} /> : null}
            <h2
                style={{
                    ...styles.pageTitle,
                    cursor: 'pointer',
                    fontSize: this.props.mobile ? '1.5em' : 32,
                }}
                onClick={() => this.props.onNavigate(null, null, page)}
            >
                {data.title[this.props.language] || data.title.en}
            </h2>
            <div style={styles.pagePosted}>
                <span style={{ fontWeight: 'bold', marginRight: 8 }}>
                    {data.author || data.Author}
                </span>
                {I18n.t('posted on %s', Blog.page2Date(page))}
            </div>
            <p style={styles.pageDesc}>
                {data.desc && (data.desc[this.props.language] || data.desc.en || '').replace(/\\n/g, '\n')}
            </p>
            <Button
                variant="contained"
                style={styles.pageButton}
                onClick={() => this.props.onNavigate(null, null, page)}
            >
                {I18n.t('Read')}
            </Button>
        </Paper>;
    }

    renderEntries() {
        if (!this.state.content || !this.state.content.pages) {
            return null;
        }

        return <div style={styles.pages}>
            {Object.keys(this.state.content.pages).map(page => this.renderEntry(page))}
        </div>;
    }

    renderPage() {
        if (!this.state.text) {
            return null;
        }

        const date = this.page.substring(0, 10).replace(/_/g, '.');

        const { body, header } = Utils.extractHeader(this.state.text);

        // const reactElement = <MarkdownView markdown={body} options={CONVERTER_OPTIONS} />;
        const reactElement = <div dangerouslySetInnerHTML={{ __html: md.render(body) }} />;

        this.replaceHref(reactElement, `${this.props.language}/blog/`);

        const pages = Object.keys(this.state.content.pages);
        const pos = pages.indexOf(this.page);

        const next = pos ? Blog.page2Date(pages[pos - 1]) : '';
        const prev = pos + 1 < pages.length ? Blog.page2Date(pages[pos + 1]) : '';

        return <Paper style={styles.pagePage}>
            {header.logo ? <div style={{ ...styles.pageLogoDiv, backgroundImage: `url(${header.logo})` }} /> : null}
            <div style={styles.pageTitleDiv}>
                <h2 style={styles.pageTitle}>{header.title}</h2>
                <div style={styles.pagePosted}>
                    <span style={{ fontWeight: 'bold', marginRight: 8 }}>{header.author || header.Author}</span>
                    {I18n.t('posted on %s', Blog.page2Date(date))}
                </div>
                {next ? <Button variant="contained" style={styles.pageTitleNextButton} onClick={() => this.onNavigate(null, null, pages[pos - 1])}>
                    ←
                    <span style={{ marginLeft: 8 }}>{next}</span>
                </Button> : null}
                {prev ? <Button variant="contained" style={styles.pageTitlePrevButton} onClick={() => this.onNavigate(null, null, pages[pos + 1])}>
                    <span style={{ marginRight: 8 }}>{prev}</span>
                    →
                </Button> : null}
            </div>

            {header.translatedFrom ?
                <Box sx={styles.pageTitleTranslated}>{I18n.t('Translated from %s', header.translatedFrom)}</Box> : null}

            <Box sx={styles.pageDesc}>{reactElement}</Box>

            {header.editLink ?
                <div style={styles.info}>
                    <a style={styles.infoEdit} rel="noopener noreferrer" href={header.editLink} target="_blank">
                        <IconEdit />
                        {I18n.t('Edit on github')}
                    </a>
                </div> : null}
        </Paper>;
    }

    render() {
        if (this.state.loadTimeout && !this.state.content) {
            return <Loader theme={this.props.theme} />;
        }

        return [
            <div key="blog" style={styles.root}>
                {this.renderHeader()}
                {this.state.text ? this.renderPage() : this.renderEntries()}
            </div>,
            <Footer key="footer" theme={this.props.theme} mobile={this.props.mobile} onNavigate={this.props.onNavigate} />,
        ];
    }
}

Blog.propTypes = {
    language: PropTypes.string,
    onNavigate: PropTypes.func,
    theme: PropTypes.string,
    mobile: PropTypes.bool,
};

export default Blog;
