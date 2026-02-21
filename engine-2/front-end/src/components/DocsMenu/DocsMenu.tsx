import { Accordion, AccordionDetails, AccordionSummary, Box } from '@mui/material';
import type React from 'react';
import type { Docs } from '../DocsItem/DocsItem';
import { useDocsMenuStyles } from './DocsMenu.styles';
import { Link } from 'react-router-dom';

export const DocsMenu = (props: { docsData: Docs }): React.ReactNode => {
    const { classes } = useDocsMenuStyles();
    return (
        <Box>
            {Object.keys(props.docsData.pages).map(key => {
                const page = props.docsData.pages[key];
                return (
                    <Accordion
                        key={key}
                        classes={{ root: classes.mainLevel }}
                    >
                        <AccordionSummary>{page.title.en}</AccordionSummary>
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
