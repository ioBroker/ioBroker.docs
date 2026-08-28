import { Box } from '@mui/material';
import type React from 'react';
import { useDocsTableOfContentsStyles } from './DocsTableOfContents.styles';
import { buildAnchorHref, findHeadingElement, scrollToElement, updateAnchorInUrl } from '../../utils/anchor';

interface TableOfContentsItem {
    id: string;
    title: string;
    subtitles?: { id: string; title: string }[];
}

interface DocsTableOfContentsProps {
    items: TableOfContentsItem[];
    /** called after a jump, so the panel can close itself */
    onSelect?: () => void;
}

export const DocsTableOfContents = ({ items, onSelect }: DocsTableOfContentsProps): React.ReactNode => {
    const { classes } = useDocsTableOfContentsStyles();

    // The entries are the same anchors the link icons next to the headings carry:
    // a real link, so it can be copied and opened in a new tab, and the address
    // bar shows the section after the jump.
    const handleClick =
        (id: string, title: string) =>
        (event: React.MouseEvent<HTMLAnchorElement>): void => {
            const element = findHeadingElement(id, title);
            if (!element) {
                return;
            }
            event.preventDefault();
            scrollToElement(element);
            updateAnchorInUrl(element.id || id);
            onSelect?.();
        };

    return (
        <Box className={classes.container}>
            <Box className={classes.list}>
                {items.map(item => (
                    <Box key={item.id}>
                        <Box
                            component="a"
                            href={buildAnchorHref(item.id)}
                            className={classes.subTitle}
                            onClick={handleClick(item.id, item.title)}
                        >
                            {item.title}
                        </Box>
                        {item.subtitles && item.subtitles.length > 0 && (
                            <Box className={classes.subtitlesList}>
                                {item.subtitles.map(subtitle => (
                                    <Box
                                        component="a"
                                        key={subtitle.id}
                                        href={buildAnchorHref(subtitle.id)}
                                        className={classes.subItem}
                                        onClick={handleClick(subtitle.id, subtitle.title)}
                                    >
                                        <Box className={classes.bullet}>•</Box>
                                        <Box component="span">{subtitle.title}</Box>
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
