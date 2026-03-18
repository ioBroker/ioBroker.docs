import { Accordion, AccordionDetails, AccordionSummary, Box, useMediaQuery, useTheme } from '@mui/material';
import type React from 'react';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
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

interface DocsMenuProps {
    docsData: Docs;
    expandAllSignal?: number;
    collapseAllSignal?: number;
    onAllExpandedChange?: (isAllExpanded: boolean) => void;
    onExpandAll?: () => void;
    onCollapseAll?: () => void;
    setIsMenuClosed?: Dispatch<SetStateAction<boolean>>;
}

export const DocsMenu = ({ docsData, expandAllSignal, collapseAllSignal, onAllExpandedChange, setIsMenuClosed, onExpandAll, onCollapseAll}: DocsMenuProps): React.ReactNode => {
    const { classes } = useDocsMenuStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width:768px)');
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
    const totalSections = Object.keys(docsData.pages).length;
    const isAllExpanded = totalSections > 0 && expandedSections.size === totalSections;

    useEffect(() => {
        if (!expandAllSignal) return;
        const allKeys = new Set(Object.keys(docsData.pages));
        setExpandedSections(allKeys);
    }, [expandAllSignal, docsData.pages]);

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
                    Documentation
                </Box>

                {Object.keys(docsData.pages).map(key => {
                    const page = docsData.pages[key];
                    const isExpanded = expandedSections.has(key);

                    return (
                        <Accordion
                            key={key}
                            expanded={isExpanded}
                            onChange={() => handleSectionToggle(key)}
                            classes={{ root: classes.mainLevel }}
                        >
                            <AccordionSummary
                                sx={{
                                    backgroundColor: theme.palette.mode === 'dark' ? '#080B1C' : '#FFFFFF',
                                }}>
                                <Box className={classes.sectionTitle}>
                                    <Box className={classes.sectionIcon}>
                                        <img
                                            src={isExpanded ? openedFolder : closedFolder}
                                            alt={isExpanded ? "Opened folder" : "Closed folder"}
                                        />
                                    </Box>
                                    {page.title.en}
                                    <Box className={classes.arrowIcon}>
                                        <img
                                            src={isExpanded ? whiteArrowUp : whiteArrowDown}
                                            alt={isExpanded ? "Collapse" : "Expand"}
                                        />
                                    </Box>
                                </Box>
                            </AccordionSummary>
                            {page.pages ? (
                                <AccordionDetails className={classes.childrenLevel}
                                    sx={{
                                        backgroundColor: theme.palette.mode === 'dark' ? '#080B1C' : '#FFFFFF',
                                    }}
                                >
                                    {Object.keys(page.pages).map(subKey => {
                                        const subPage = page.pages![subKey];
                                        return (
                                            <Box key={subKey}>
                                                <Link to={`/docs/${subPage.content}`}>{subPage.title.en}</Link>
                                            </Box>
                                        );
                                    })}
                                </AccordionDetails>
                            ) : null}
                        </Accordion>
                    );
                })}
            </Box>
        </Box>
    );
};
