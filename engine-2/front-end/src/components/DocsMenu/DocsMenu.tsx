import { Box } from '@mui/material';
import type React from 'react';
import type { Docs } from '../DocsItem/DocsItem';

export const DocsMenu = (props: { docsData: Docs }): React.ReactNode => {
    return (
        <Box>
            {Object.keys(props.docsData.pages).map(key => {
                const page = props.docsData.pages[key];
                return (
                    <Box key={key}>
                        <Box>{page.title.en}</Box>
                        {page.pages ? (
                            <Box>
                                {Object.keys(page.pages).map(subKey => {
                                    const subPage = page.pages![subKey];
                                    return <Box key={subKey}>{subPage.title.en}</Box>;
                                })}
                            </Box>
                        ) : null}
                    </Box>
                );
            })}
        </Box>
    );
};
