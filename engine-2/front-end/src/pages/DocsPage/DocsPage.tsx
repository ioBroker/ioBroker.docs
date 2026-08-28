import { Box, ClickAwayListener, Tooltip, useMediaQuery } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { I18n } from '../../utils/i18n';
import { DocsMenu } from '../../components/DocsMenu/DocsMenu';
import { MenuToggle } from '../../components/MenuToggle/MenuToggle';
import { MenuArrowsToggle } from '../../components/MenuArrowsToggle/MenuArrowsToggle';
import { TopBarSearch } from '../../components/TopBarSearch/TopBarSearch';
import { useStyles } from './DocsPage.styles';
import { DocsTableOfContents } from '../../components/DocsTableOfContents/DocsTableOfContents';
import linkImage from '../../assets/img/docsIcons/blueLink.svg';
import type React from 'react';
import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';
import Divider from '../../components/Divider/Divider';
import { useDocsMarkdown } from '../../api/hooks/useDocsMarkdown';
import { API_CONFIG } from '../../config/api';
import { MarkdownView } from '../../components/MarkdownView/MarkdownView';
import { buildTocItems, makeSlug } from '../../utils/markdown';
import { getAnchorFromHash } from '../../utils/anchor';
import { normalizeImageTags } from '../../components/MarkdownView/markdownViewUtils';

const DocsPage = (): React.ReactNode => {
    const [menuMode, setMenuMode] = useState<'all' | 'installed'>('all');
    const [isTocOpen, setIsTocOpen] = useState(false);
    const tocButtonRef = useRef<HTMLButtonElement>(null);
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
    const [isAllExpanded, setIsAllExpanded] = useState(false);
    const [expandAllSignal, setExpandAllSignal] = useState(0);
    const [collapseAllSignal, setCollapseAllSignal] = useState(0);
    const isMobile = useMediaQuery('(max-width:768px)');
    const [search, setSearch] = useState('');
    const mainBlockRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const handleMainBlockScroll = useCallback(() => {
        const el = mainBlockRef.current;
        if (!el) {
            return;
        }
        const scrollHeight = el.scrollHeight - el.clientHeight;
        const percent = scrollHeight > 0 ? Math.round((el.scrollTop / scrollHeight) * 100) : 0;
        setScrollProgress(Math.min(100, Math.max(0, percent)));
    }, []);
    const { classes } = useStyles({ isMenuCollapsed });
    const [language, setLanguage] = useState(I18n.getLanguage());
    const params = useParams();
    const docPath = (params['*'] ?? 'README.md').replace(/^\/+/, '');
    const markdownUrl = `${API_CONFIG.IOBROKER_BASE_URL}/${language}/${docPath}`;
    const { data: markdown } = useDocsMarkdown(markdownUrl);
    const baseOrigin = /^https?:\/\//i.test(API_CONFIG.IOBROKER_BASE_URL)
        ? API_CONFIG.IOBROKER_BASE_URL
        : 'https://www.iobroker.net';
    const markdownBaseUrl = `${baseOrigin}/${language}/${docPath}`;

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
        setScrollProgress(0);
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

    return (
        <Box className={classes.pageRoot}>
            <SectionTitle
                sx={{
                    marginLeft: { xs: '16px', sm: '24px', lg: '32px' },
                    marginBottom: '20px',
                    flexShrink: 0,
                }}
            >
                {I18n.t('home.docs.title')}
            </SectionTitle>
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
                            <MenuToggle
                                value={menuMode}
                                onChange={setMenuMode}
                                onCollapse={setIsMenuCollapsed}
                            />
                            {!isMobile && !isMenuCollapsed && (
                                <MenuArrowsToggle
                                    value={isAllExpanded ? 'expand' : 'collapse'}
                                    onExpandAll={expandAllSections}
                                    onCollapseAll={collapseAllSections}
                                />
                            )}
                        </Box>
                        {!isMenuCollapsed && (
                            <DocsMenu
                                expandAllSignal={expandAllSignal}
                                collapseAllSignal={collapseAllSignal}
                                onAllExpandedChange={setIsAllExpanded}
                                onExpandAll={expandAllSections}
                                onCollapseAll={collapseAllSections}
                                search={search}
                            />
                        )}
                    </Box>
                    <Box className={classes.rightColumn}>
                        <Box className={classes.topBar}>
                            <TopBarSearch
                                isFluid={isMobile}
                                value={search}
                                onChange={setSearch}
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
                            onScroll={handleMainBlockScroll}
                            data-docs-scroll="true"
                        >
                            <Box className={classes.content}>
                                <MarkdownView
                                    markdown={markdown}
                                    baseUrl={markdownBaseUrl}
                                    origin={baseOrigin}
                                    headingIds={headingIds}
                                    headingIdMap={headingIdMap}
                                    classNames={markdownClassNames}
                                    linkImage={linkImage}
                                />
                            </Box>
                            <Divider
                                position={scrollProgress}
                                parentWidth={mainBlockRef.current?.clientWidth || window.innerWidth}
                            />
                            <Footer />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default DocsPage;
