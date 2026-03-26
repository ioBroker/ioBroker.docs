import { Box } from '@mui/material';
import type React from 'react';
import { I18n } from '../../utils/i18n';
import { useDocsTableOfContentsStyles } from './DocsTableOfContents.styles';
import { makeSlug } from '../../utils/markdown';

interface TableOfContentsItem {
    id: string;
    title: string;
    subtitles?: { id: string; title: string }[];
}

interface DocsTableOfContentsProps {
    items: TableOfContentsItem[];
}

export const DocsTableOfContents = ({ items }: DocsTableOfContentsProps): React.ReactNode => {
    const { classes } = useDocsTableOfContentsStyles();

    const handleClick = (id: string, title: string) => {
        let element = document.getElementById(id);
        if (!element) {
            const slug = makeSlug(title);
            element = document.querySelector(`[data-md-heading="${slug}"]`) as HTMLElement | null;
        }
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Box className={classes.container}>
            <Box className={classes.title}>{I18n.t('home.docs.tableOfContents')}</Box>
            <Box className={classes.list}>
                {items.map(item => (
                    <Box key={item.id}>
                        <Box
                            className={classes.subTitle}
                            onClick={() => handleClick(item.id, item.title)}
                        >
                            {item.title}
                        </Box>
                        {item.subtitles && item.subtitles.length > 0 && (
                            <Box className={classes.subtitlesList}>
                                {item.subtitles.map(subtitle => (
                                    <Box
                                        key={subtitle.id}
                                        className={classes.subItem}
                                        onClick={() => handleClick(subtitle.id, subtitle.title)}
                                    >
                                        <Box className={classes.bullet}>•</Box>
                                        <Box className={classes.subItem}>{subtitle.title}</Box>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};
