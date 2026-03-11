import { Box } from '@mui/material';
import type React from 'react';
import { useDocsTableOfContentsStyles } from './DocsTableOfContents.styles';

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

    const handleClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Box className={classes.container}>
            <Box className={classes.title}>Auf dieser Seite</Box>
            <Box className={classes.subTitle}>Mach dein Leben einfacher: Smart Home</Box>
            <Box className={classes.list}>
                {items.map(item => (
                    <Box key={item.id}>
                        <Box
                            className={classes.item}
                            onClick={() => handleClick(item.id)}
                        >
                            {item.title}
                        </Box>
                        {item.subtitles && item.subtitles.length > 0 && (
                            <Box className={classes.subtitlesList}>
                                {item.subtitles.map(subtitle => (
                                    <Box
                                        key={subtitle.id}
                                        className={classes.subItem}
                                        onClick={() => handleClick(subtitle.id)}
                                    >
                                        <Box className={classes.bullet}>•</Box>
                                        {subtitle.title}
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
