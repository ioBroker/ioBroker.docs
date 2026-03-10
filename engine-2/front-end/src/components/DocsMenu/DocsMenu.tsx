import { Accordion, AccordionDetails, AccordionSummary, Box } from '@mui/material';
import type React from 'react';
import { useState } from 'react';
import type { Docs } from '../DocsItem/DocsItem';
import { useDocsMenuStyles } from './DocsMenu.styles';
import { Link } from 'react-router-dom';
import openedFolder from '../../assets/img/docsIcons/opened_folder.svg'
import closedFolder from '../../assets/img/docsIcons/closed_folder.svg'
import blueFolder from '../../assets/img/docsIcons/blueFolder.svg'
import whiteArrowUp from '../../assets/img/docsIcons/whiteArrowUp.svg'
import whiteArrowDown from '../../assets/img/docsIcons/whiteArrowDown.svg'

export const DocsMenu = (props: { docsData: Docs }): React.ReactNode => {
    const { classes } = useDocsMenuStyles();
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

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
            <Box className={classes.header}>
                <Box className={classes.headerIcon}>
                    <img src={blueFolder} alt="Documentation" />
                </Box>
                Documentation
            </Box>

            {Object.keys(props.docsData.pages).map(key => {
                const page = props.docsData.pages[key];
                const isExpanded = expandedSections.has(key);

                return (
                    <Accordion
                        key={key}
                        expanded={isExpanded}
                        onChange={() => handleSectionToggle(key)}
                        classes={{ root: classes.mainLevel }}
                    >
                        <AccordionSummary>
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
                            <AccordionDetails className={classes.childrenLevel}>
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
    );
};
