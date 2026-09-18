import { Box, ClickAwayListener, Tooltip, useMediaQuery } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { I18n } from '../../utils/i18n';
import { DocsMenu } from '../../components/DocsMenu/DocsMenu';
import { MenuToggle } from '../../components/MenuToggle/MenuToggle';
import { MenuOpenButton } from '../../components/MenuOpenButton/MenuOpenButton';
import { MenuArrowsToggle } from '../../components/MenuArrowsToggle/MenuArrowsToggle';
import { TopBarSearch } from '../../components/TopBarSearch/TopBarSearch';
import { useStyles } from './DocsPage.styles';
import { DocsTableOfContents } from '../../components/DocsTableOfContents/DocsTableOfContents';
import linkImage from '../../assets/img/docsIcons/blueLink.svg';
import type React from 'react';
import { Fragment, useEffect, useMemo, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageMeta } from '../../components/PageMeta';
import { Footer } from '../../components/Footer/Footer';
import Divider from '../../components/Divider/Divider';
import { useDocsMarkdown } from '../../api/hooks/useDocsMarkdown';
import { API_CONFIG } from '../../config/api';
import { MarkdownView } from '../../components/MarkdownView/MarkdownView';
import { buildTocItems, makeSlug, removeFrontmatter, summariseMarkdown } from '../../utils/markdown';
import { getAnchorFromHash } from '../../utils/anchor';
import { normalizeImageTags } from '../../components/MarkdownView/markdownViewUtils';
import { useDocsContent } from '../../api/hooks/useDocsContent';
import { findDocsTrail, type DocsTrailItem } from '../../components/DocsMenu/DocsMenu.utils';
import { extractHeader } from '../../utils/markdownHeader';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const DocsPage = (): React.ReactNode => {
    const [isTocOpen, setIsTocOpen] = useState(false);
    const tocButtonRef = useRef<HTMLButtonElement>(null);
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
    const [isAllExpanded, setIsAllExpanded] = useState(false);
    const [expandAllSignal, setExpandAllSignal] = useState(0);
    const [collapseAllSignal, setCollapseAllSignal] = useState(0);
    const isMobile = useMediaQuery('(max-width:768px)');
    const [search, setSearch] = useState('');
    const mainBlockRef = useRef<HTMLDivElement>(null);
    const { classes } = useStyles({ isMenuCollapsed });
    const [language, setLanguage] = useState(I18n.getLanguage());
    const params = useParams();
    const navigate = useNavigate();
    const docPath = (params['*'] ?? 'README.md').replace(/^\/+/, '');
    // where the document sits in the tree - the same tree the menu on the left is built from,
    // so the trail can never say something else than the menu
    const { data: docsTree } = useDocsContent();
    const trail = useMemo(() => findDocsTrail(docsTree?.pages ?? {}, docPath, language), [docsTree, docPath, language]);
    const isStartDocument = docPath === 'README.md';
    // On a narrow screen the whole chain does not fit in one line, and the line it would wrap
    // into costs more than it says: only the first and the last step remain.
    const isNarrowTrail = useMediaQuery('(max-width:900px)');
    const markdownUrl = `${API_CONFIG.IOBROKER_BASE_URL}/${language}/${docPath}`;
    const { data: markdown, isFetched: documentSettled, isError: documentFailed } = useDocsMarkdown(markdownUrl);
    // the request is through and brought nothing: the address names no document
    const documentMissing = documentSettled && (documentFailed || !markdown);
    // Pictures and links of a document are resolved against this origin. Under the dev server the
    // base URL is relative - then the own origin is meant and not the live site, otherwise newly
    // added pictures point nowhere although they lie right beside the document (as in LegalPage).
    const baseOrigin = /^https?:\/\//i.test(API_CONFIG.IOBROKER_BASE_URL)
        ? API_CONFIG.IOBROKER_BASE_URL
        : window.location.origin;
    const markdownBaseUrl = `${baseOrigin}/${language}/${docPath}`;

    /**
     * Documents that stand in no chapter - above all the documentation of the individual adapters
     * under `adapterref/iobroker.<name>/...` - could not be found in the tree, and the breadcrumbs
     * showed nothing but "// DOKUMENTATION". Whoever landed there through the search did not know
     * where they were (Denis, 10.09.2026). This trail is therefore built from the path and the title
     * of the document itself: Adapters → name of the adapter → document.
     */
    const fallbackTrail = useMemo<DocsTrailItem[]>(() => {
        if (trail.length || isStartDocument) {
            return [];
        }
        const steps: DocsTrailItem[] = [];
        const adapter = docPath.match(/^adapterref\/iobroker\.([^/]+)\//);
        if (adapter) {
            steps.push({ key: 'adapters', title: I18n.t('home.adapters.title'), route: '/adapters' });
            steps.push({ key: adapter[1], title: adapter[1], route: `/adapters/${adapter[1]}` });
        }
        const title = markdown ? extractHeader(markdown).header.title : undefined;
        const heading = markdown ? /^#\s+(.+)$/m.exec(removeFrontmatter(markdown))?.[1] : undefined;
        const name = (title || heading || docPath.split('/').pop() || '').replace(/^"|"$/g, '');
        if (name) {
            steps.push({ key: docPath, title: name });
        }
        return steps;
    }, [docPath, isStartDocument, markdown, trail.length]);

    const fullTrail = trail.length ? trail : fallbackTrail;
    const shownTrail = isNarrowTrail && fullTrail.length > 1 ? fullTrail.slice(-1) : fullTrail;
    const isTrailShortened = shownTrail.length < fullTrail.length;

    useEffect(() => I18n.subscribe(setLanguage), []);
    useEffect(() => {
        if (isMobile) {
            setIsMenuCollapsed(true);
        }
    }, [isMobile]);

    // a different document starts at its beginning - without this the column keeps
    // the scroll position of the previous page and you land in its footer
    useEffect(() => {
        if (getAnchorFromHash()) {
            return;
        }
        mainBlockRef.current?.scrollTo({ top: 0 });
    }, [docPath]);

    const tableOfContentsItems = useMemo(() => {
        if (!markdown) {
            return [];
        }
        const fixedMarkdown = normalizeImageTags(markdown);
        return buildTocItems(fixedMarkdown);
    }, [markdown]);
    const headingIds = useMemo(() => {
        const ids: string[] = [];
        for (const item of tableOfContentsItems) {
            ids.push(item.id);
            if (item.subtitles) {
                for (const sub of item.subtitles) {
                    ids.push(sub.id);
                }
            }
        }
        return ids;
    }, [tableOfContentsItems]);
    const headingIdMap = useMemo(() => {
        const map: Record<string, string[]> = {};
        for (const item of tableOfContentsItems) {
            const key = makeSlug(item.title);
            map[key] ??= [];
            map[key].push(item.id);
            if (item.subtitles) {
                for (const sub of item.subtitles) {
                    const subKey = makeSlug(sub.title);
                    map[subKey] ??= [];
                    map[subKey].push(sub.id);
                }
            }
        }
        return map;
    }, [tableOfContentsItems]);

    const markdownClassNames = useMemo(
        () => ({
            head: classes.head,
            subhead: classes.subhead,
            heading: classes.heading,
            paragraph: classes.paragraph,
            list: classes.list,
            listItem: classes.listItem,
            image: classes.image,
            linkIcon: classes.linkIcon,
            table: classes.table,
            tableHead: classes.tableHead,
            tableRow: classes.tableRow,
            tableHeaderCell: classes.tableHeaderCell,
            tableCell: classes.tableCell,
            codeBlockContainer: classes.codeBlockContainer,
            codeBlockContent: classes.codeBlockContent,
            inlineCode: classes.inlineCode,
            blockquote: classes.blockquote,
        }),
        [classes],
    );

    const toggleToc = (): void => setIsTocOpen(previous => !previous);

    const expandAllSections = (): void => {
        setIsAllExpanded(true);
        setExpandAllSignal(v => v + 1);
    };
    const collapseAllSections = (): void => {
        setIsAllExpanded(false);
        setCollapseAllSignal(v => v + 1);
    };

    // the name of the document, the same way the breadcrumbs above arrive at it
    const documentTitle = useMemo(() => {
        if (!markdown) {
            return '';
        }
        const fromHeader = extractHeader(markdown).header.title;
        const fromHeading = /^#\s+(.+)$/m.exec(removeFrontmatter(markdown))?.[1];
        return (fromHeader || fromHeading || docPath.split('/').pop() || '').replace(/^"|"$/g, '');
    }, [markdown, docPath]);

    /*
     * What a search engine shows under the title. The start page has words of its own; a document
     * is summarised the way the server summarises it, because the tags the server wrote are gone
     * by the time this renders.
     */
    const documentDescription = useMemo(
        () => (isStartDocument ? I18n.t('seo.docs.description') : summariseMarkdown(markdown)),
        [isStartDocument, markdown],
    );

    /*
     * The address names no document. The menu and the frame around it used to stay, with nothing
     * in the place of the text, which reads as a page that failed to load rather than as one that
     * does not exist. The server answers such an address with 404, and this is the page for it.
     */
    if (documentMissing) {
        return <NotFoundPage />;
    }

    return (
        <Box className={classes.pageRoot}>
            <PageMeta
                title={documentTitle}
                description={documentDescription}
            />
            {isStartDocument ? (
                <SectionTitle
                    component="h1"
                    sx={{
                        marginLeft: { xs: '16px', sm: '24px', lg: '32px' },
                        marginBottom: '12px',
                        flexShrink: 0,
                    }}
                >
                    {I18n.t('home.docs.title')}
                </SectionTitle>
            ) : (
                <Box className={classes.breadcrumbs}>
                    <span className={classes.breadcrumbSlash}>{'//'}</span>
                    <span
                        className={classes.breadcrumbLink}
                        onClick={() => void navigate('/docs')}
                    >
                        {I18n.t('home.docs.title')}
                    </span>
                    {isTrailShortened ? (
                        <>
                            <span className={classes.breadcrumbSlash}>/</span>
                            <span className={classes.breadcrumbFolder}>…</span>
                        </>
                    ) : null}
                    {shownTrail.map((item, index) => {
                        const isLast = index === shownTrail.length - 1;
                        return (
                            <Fragment key={item.key}>
                                <span className={classes.breadcrumbSlash}>/</span>
                                {isLast ? (
                                    <span className={classes.breadcrumbCurrent}>{item.title}</span>
                                ) : item.route ? (
                                    <span
                                        className={classes.breadcrumbLink}
                                        onClick={() => void navigate(item.route!)}
                                    >
                                        {item.title}
                                    </span>
                                ) : item.content ? (
                                    <span
                                        className={classes.breadcrumbLink}
                                        onClick={() => void navigate(`/docs/${item.content}`)}
                                    >
                                        {item.title}
                                    </span>
                                ) : (
                                    <span className={classes.breadcrumbFolder}>{item.title}</span>
                                )}
                            </Fragment>
                        );
                    })}
                </Box>
            )}
            <Box className={classes.pageWrapper}>
                {!isMenuCollapsed && (
                    <Box className={classes.menuBlockMobile}>
                        <DocsMenu
                            expandAllSignal={expandAllSignal}
                            collapseAllSignal={collapseAllSignal}
                            onAllExpandedChange={setIsAllExpanded}
                            onExpandAll={expandAllSections}
                            onCollapseAll={collapseAllSections}
                            setIsMenuClosed={setIsMenuCollapsed}
                            search={search}
                        />
                    </Box>
                )}
                <Box className={classes.root}>
                    <Box className={classes.menuBlock}>
                        <Box className={classes.menuToggleContainer}>
                            {/* On a phone the tree is an overlay that closes with its own
                                cross, so the collapsing half of the toggle has nothing to do -
                                one button opens it, like the account menu in the profile. */}
                            {isMobile ? (
                                <MenuOpenButton
                                    title={I18n.t('adapters.tooltip.menu_expand')}
                                    onClick={() => setIsMenuCollapsed(false)}
                                />
                            ) : (
                                <MenuToggle
                                    /* The two halves mean "tree open" and "tree collapsed",
                                       so which one is lit is read off that one state. It used
                                       to follow a `menuMode` of its own, and the two drifted
                                       apart as soon as anything else collapsed the tree -
                                       crossing the phone width, or the cross inside the tree
                                       itself. The open half then stayed lit over a tree that
                                       was not there. */
                                    value={isMenuCollapsed ? 'installed' : 'all'}
                                    onChange={mode => setIsMenuCollapsed(mode === 'installed')}
                                    onCollapse={setIsMenuCollapsed}
                                />
                            )}
                            {!isMobile && !isMenuCollapsed && (
                                <MenuArrowsToggle
                                    value={isAllExpanded ? 'expand' : 'collapse'}
                                    onExpandAll={expandAllSections}
                                    onCollapseAll={collapseAllSections}
                                />
                            )}
                        </Box>
                        {!isMenuCollapsed && (
                            <Box className={classes.menuList}>
                                <DocsMenu
                                    expandAllSignal={expandAllSignal}
                                    collapseAllSignal={collapseAllSignal}
                                    onAllExpandedChange={setIsAllExpanded}
                                    onExpandAll={expandAllSections}
                                    onCollapseAll={collapseAllSections}
                                    search={search}
                                />
                            </Box>
                        )}
                    </Box>
                    <Box className={classes.rightColumn}>
                        <Box className={classes.topBar}>
                            <TopBarSearch
                                isFluid={isMobile}
                                value={search}
                                onChange={setSearch}
                                variant="filter"
                                ariaLabel={I18n.t('docs.menu.filter_label')}
                                /*
                                 * On the phone the field is narrow and the long sentence was cut
                                 * off in the middle of a word. The short form names the filter,
                                 * the hint about the Enter key stays on the wide screens
                                 * (Denis, 16.09.2026).
                                 */
                                placeholder={I18n.t(
                                    isMobile ? 'docs.menu.filter_placeholder_short' : 'docs.menu.filter_placeholder',
                                )}
                                onSubmit={term => {
                                    const query = term.trim();
                                    if (query.length >= 2) {
                                        void navigate(`/search?q=${encodeURIComponent(query)}`);
                                    }
                                }}
                            />
                            {!isMobile && tableOfContentsItems.length > 0 && (
                                <ClickAwayListener
                                    onClickAway={event => {
                                        if (tocButtonRef.current?.contains(event.target as Node)) {
                                            return;
                                        }
                                        setIsTocOpen(false);
                                    }}
                                >
                                    <Box className={classes.tocAnchor}>
                                        <Tooltip
                                            title={I18n.t(
                                                isTocOpen ? 'docs.tooltip.toc_collapse' : 'docs.tooltip.toc_expand',
                                            )}
                                        >
                                            <Box
                                                component="button"
                                                type="button"
                                                ref={tocButtonRef}
                                                className={`${classes.tocToggle} ${isTocOpen ? classes.tocToggleOpen : ''}`}
                                                onClick={toggleToc}
                                                aria-expanded={isTocOpen}
                                            >
                                                <Box component="span">{I18n.t('home.docs.tableOfContents')}</Box>
                                                <KeyboardArrowDownIcon
                                                    className={`${classes.tocChevron} ${isTocOpen ? classes.tocChevronOpen : ''}`}
                                                />
                                            </Box>
                                        </Tooltip>
                                        {isTocOpen && (
                                            <Box className={classes.tocDropdown}>
                                                <DocsTableOfContents
                                                    items={tableOfContentsItems}
                                                    onSelect={() => setIsTocOpen(false)}
                                                />
                                            </Box>
                                        )}
                                    </Box>
                                </ClickAwayListener>
                            )}
                        </Box>
                        <Box
                            className={classes.mainBlock}
                            ref={mainBlockRef}
                            data-docs-scroll="true"
                        >
                            <Box className={classes.content}>
                                {/* the page's title is its own H1 already, so on the start page
                                    the document below it begins at h2 */}
                                <MarkdownView
                                    demoteHeadings={isStartDocument}
                                    markdown={markdown}
                                    baseUrl={markdownBaseUrl}
                                    origin={baseOrigin}
                                    headingIds={headingIds}
                                    headingIdMap={headingIdMap}
                                    classNames={markdownClassNames}
                                    linkImage={linkImage}
                                />
                            </Box>
                            {/* Without `position`, the line measures itself; see Divider. */}
                            <Divider beforeFooter />
                            <Footer />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default DocsPage;
