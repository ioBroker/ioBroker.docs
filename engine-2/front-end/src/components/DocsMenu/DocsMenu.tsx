import { Accordion, AccordionDetails, AccordionSummary, Box, useMediaQuery, useTheme } from '@mui/material';
import type React from 'react';
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import type { Docs } from '../DocsItem/DocsItem';
import { useDocsMenuStyles } from './DocsMenu.styles';
import { Link } from 'react-router-dom';
import openedFolder from '../../assets/img/docsIcons/opened_folder.svg';
import closedFolder from '../../assets/img/docsIcons/closed_folder.svg';
import blueFolder from '../../assets/img/docsIcons/blueFolder.svg';
import whiteArrowUp from '../../assets/img/docsIcons/whiteArrowUp.svg';
import whiteArrowDown from '../../assets/img/docsIcons/whiteArrowDown.svg';
import whiteCross from '../../assets/img/docsIcons/whiteCross.svg'
import { MenuArrowsToggle } from '../../components/MenuArrowsToggle/MenuArrowsToggle';
import { useDocsContent } from '../../api/hooks/useDocsContent';
import { I18n } from '../../utils/i18n';

interface DocsMenuProps {
    expandAllSignal?: number;
    collapseAllSignal?: number;
    onAllExpandedChange?: (isAllExpanded: boolean) => void;
    onExpandAll?: () => void;
    onCollapseAll?: () => void;
    setIsMenuClosed?: Dispatch<SetStateAction<boolean>>;
}

export const DocsMenu = ({ expandAllSignal, collapseAllSignal, onAllExpandedChange, setIsMenuClosed, onExpandAll, onCollapseAll}: DocsMenuProps): React.ReactNode => {
    const { classes } = useDocsMenuStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width:768px)');
    const [language, setLanguage] = useState(I18n.getLanguage());
    useEffect(() => I18n.subscribe(setLanguage), []);
    const { data: fetchedDocs } = useDocsContent();
    const data: Docs = fetchedDocs ?? { pages: {} };
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
    const expandableKeys = useMemo(() => {
        const keys: string[] = [];
        const walk = (pages: Docs['pages'], parentKey: string) => {
            Object.keys(pages).forEach((key) => {
                const item = pages[key];
                const fullKey = parentKey ? `${parentKey}/${key}` : key;
                if (item.pages && Object.keys(item.pages).length > 0) {
                    keys.push(fullKey);
                    walk(item.pages, fullKey);
                }
            });
        };
        walk(data.pages, '');
        return keys;
    }, [data.pages]);
    const totalSections = expandableKeys.length;
    const isAllExpanded = totalSections > 0 && expandedSections.size === totalSections;

    useEffect(() => {
        if (!expandAllSignal) return;
        const allKeys = new Set(expandableKeys);
        setExpandedSections(allKeys);
    }, [expandAllSignal, expandableKeys]);

    useEffect(() => {
        if (!collapseAllSignal) return;
        setExpandedSections(new Set());
    }, [collapseAllSignal]);

    useEffect(() => {
        onAllExpandedChange?.(isAllExpanded);
    }, [isAllExpanded, onAllExpandedChange]);

    const handleSectionToggle = (key: string) => {
        const newExpanded = new Set(expandedSections);
        if (newExpanded.has(key)) {
            newExpanded.delete(key);
        } else {
            newExpanded.add(key);
        }
        setExpandedSections(newExpanded);
    };

    const renderPages = (pages: Docs['pages'], level: number, parentKey: string): React.ReactNode => {
        return Object.keys(pages).map((key) => {
            if (!parentKey && key === firstKey) {
                return null;
            }
            const page = pages[key];
            const fullKey = parentKey ? `${parentKey}/${key}` : key;
            const isExpanded = expandedSections.has(fullKey);
            const hasChildren = !!page.pages && Object.keys(page.pages).length > 0;

            if (hasChildren) {
                return (
                    <Accordion
                        key={fullKey}
                        expanded={isExpanded}
                        onChange={() => handleSectionToggle(fullKey)}
                        classes={{ root: classes.mainLevel }}
                    >
                        <AccordionSummary
                            sx={{
                                backgroundColor: theme.palette.mode === 'dark' ? '#080B1C' : '#FFFFFF',
                            }}
                        >
                            <Box className={classes.sectionTitle}>
                                <Box className={classes.sectionIcon}>
                                    <img
                                        src={isExpanded ? openedFolder : closedFolder}
                                        alt={isExpanded ? "Opened folder" : "Closed folder"}
                                    />
                                </Box>
                                {page.title[language] ?? page.title.en ?? key}
                                <Box className={classes.arrowIcon}>
                                    <img
                                        src={isExpanded ? whiteArrowUp : whiteArrowDown}
                                        alt={isExpanded ? "Collapse" : "Expand"}
                                    />
                                </Box>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails
                            className={classes.childrenLevel}
                            sx={{
                                backgroundColor: theme.palette.mode === 'dark' ? '#080B1C' : '#FFFFFF',
                                paddingLeft: 32 + level * 12,
                            }}
                        >
                            {renderPages(page.pages!, level + 1, fullKey)}
                        </AccordionDetails>
                    </Accordion>
                );
            }

            return (
                <Box key={fullKey}>
                    <Link to={`/docs/${page.content ?? ''}`}>{page.title[language] ?? page.title.en ?? key}</Link>
                </Box>
            );
        });
    };

    const firstKey = Object.keys(data.pages)[0];
    const headerTitle = firstKey
        ? (data.pages[firstKey].title[language] ?? data.pages[firstKey].title.en ?? firstKey)
        : 'Documentation';

    return (
        <Box className={classes.container}>
            {isMobile && <Box className={classes.menuTopBar}>
                <MenuArrowsToggle
                sx={{width: '62px', height: '30px'}}
                value={isAllExpanded ? 'expand' : 'collapse'}
                onExpandAll={onExpandAll}
                onCollapseAll={onCollapseAll}/>
                <img 
                onClick={()=> {
                    setIsMenuClosed?.(true)
                }}
                src={whiteCross}
                 alt="close"/>
            </Box>}
            <Box className={classes.menuInner}>
                <Box className={classes.header}>
                    <Box className={classes.headerIcon}>
                        <img src={blueFolder} alt="Documentation" />
                    </Box>
                    {firstKey ? (
                        <Link to={`/docs/${data.pages[firstKey].content ?? ''}`}>
                            {headerTitle}
                        </Link>
                    ) : (
                        headerTitle
                    )}
                </Box>

                {renderPages(data.pages, 0, '')}
            </Box>
        </Box>
    );
};
