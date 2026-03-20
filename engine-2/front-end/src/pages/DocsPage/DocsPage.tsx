import { Box, useMediaQuery } from '@mui/material';
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
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDocsMarkdown } from '../../api/hooks/useDocsMarkdown';
import { API_CONFIG } from '../../config/api';
import { MarkdownView } from '../../components/MarkdownView/MarkdownView';
import { buildTocItems, makeSlug } from '../../utils/markdown';

const DocsPage = (): React.ReactNode => {
    const [menuMode, setMenuMode] = useState<'all' | 'installed'>('all');
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
    const [isAllExpanded, setIsAllExpanded] = useState(false);
    const [expandAllSignal, setExpandAllSignal] = useState(0);
    const [collapseAllSignal, setCollapseAllSignal] = useState(0);
    const isTablet = useMediaQuery('(max-width:1181px)');
    const isMobile = useMediaQuery('(max-width:768px)');
    const isMini = useMediaQuery('(max-width:480px)');
    const [search, setSearch] = useState(''); 
    const { classes } = useStyles({ isMenuCollapsed });
    const [language, setLanguage] = useState(I18n.getLanguage());
    useEffect(() => I18n.subscribe(setLanguage), []);
    const params = useParams();
    const docPath = (params['*'] ?? 'README.md').replace(/^\/+/, '');
    const markdownUrl = `${API_CONFIG.IOBROKER_BASE_URL}/${language}/${docPath}`;
    const { data: markdown } = useDocsMarkdown(markdownUrl);
    const baseOrigin = /^https?:\/\//i.test(API_CONFIG.IOBROKER_BASE_URL)
        ? API_CONFIG.IOBROKER_BASE_URL
        : 'https://www.iobroker.net';
    const markdownBaseUrl = `${baseOrigin}/${language}/${docPath}`;
    useEffect(() => {
        if (isMobile) {
            setIsMenuCollapsed(true)
        }
    }, [isMobile])

    const tableOfContentsItems = useMemo(() => {
        return markdown ? buildTocItems(markdown) : [];
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

    const expandAllSections = () => {
        setIsAllExpanded(true);
        setExpandAllSignal((v) => v + 1);
    };
    const collapseAllSections = () => {
        setIsAllExpanded(false);
        setCollapseAllSignal((v) => v + 1);
    };

    return (
        <Box>
            <SectionTitle
                sx={{ marginTop: '30px', marginLeft: '31px', letterSpacing: '-0.03em !important',
                    fontSize: isMini ? '20px !important' : (isMobile ? '28px !important' : '36px')
                 }}
            >{I18n.t('home.docs.title')}</SectionTitle>
            <Box className={classes.pageWrapper}>
                <Box className={classes.topBar}>
                    <Box className={classes.menuToggleContainer}>
                        <MenuToggle
                            sx={{width: isMini ? '55px !important' :(isMobile? '70px !important': '55px'),
                                 height: isMini ? '32px !important':(isMobile? '40px !important': '32px'),
                                '& img': {
                                    width: isMini? '15px !important':(isMobile? '18px': '15px'),
                                    height: isMini? '7px !important':(isMobile? '10px': '7px')
                                }
                            }}
                            buttonSx={{minWidth: isMini ? '27px !important': (isMobile? '35px !important': '27px'),}}
                            value={menuMode}
                            onChange={setMenuMode}
                            onCollapse={setIsMenuCollapsed}
                        />
                        {!isMobile &&
                        <MenuArrowsToggle
                            value={isAllExpanded ? 'expand' : 'collapse'}
                            onExpandAll={expandAllSections}
                            onCollapseAll={collapseAllSections}
                        />}
                    </Box>
                    <Box className={classes.searchContainer}>
                        <TopBarSearch
                            isFluid={isMobile}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    height: isMini ? '32px !important':(isMobile ? '40px !important' : '32px'),
                                },
                            }}
                            value={search}
                            onChange={setSearch}
                        />
                    </Box>
                </Box>
                {!isMenuCollapsed && (
                    <Box className={classes.menuBlockMobile}> 
                        <DocsMenu
                            expandAllSignal={expandAllSignal}
                            collapseAllSignal={collapseAllSignal}
                            onAllExpandedChange={setIsAllExpanded}
                            onExpandAll={expandAllSections}
                            onCollapseAll={collapseAllSections}
                            setIsMenuClosed={setIsMenuCollapsed}
                        />
                    </Box>
                )}
                <Box className={classes.root}>
                    <Box className={classes.menuBlock}>
                        <DocsMenu
                            expandAllSignal={expandAllSignal}
                            collapseAllSignal={collapseAllSignal}
                            onAllExpandedChange={setIsAllExpanded}
                            onExpandAll={expandAllSections}
                            onCollapseAll={collapseAllSections}
                        />
                    </Box>
                    <Box className={classes.mainBlock}>
                        <Box className={classes.content}>
                            <MarkdownView
                                markdown={markdown}
                                baseUrl={markdownBaseUrl}
                                origin={baseOrigin}
                                headingIds={headingIds}
                                headingIdMap={headingIdMap}
                                classNames={{
                                    head: classes.head,
                                    heading: classes.heading,
                                    paragraph: classes.paragraph,
                                    list: classes.list,
                                    listItem: classes.listItem,
                                    image: classes.image,
                                    linkIcon: classes.linkIcon,
                                }}
                                linkImage={linkImage}
                            />
                        </Box>
                    </Box>

                    {!isTablet && <DocsTableOfContents items={tableOfContentsItems} />}
                </Box>
            </Box>
        </Box>
    );
};

export default DocsPage;
