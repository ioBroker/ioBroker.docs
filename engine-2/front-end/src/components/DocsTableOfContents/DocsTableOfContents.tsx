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

    const getExplicitScrollContainer = (): HTMLElement | null => {
        return document.querySelector('[data-docs-scroll="true"]');
    };

    const getScrollParent = (element: HTMLElement | null): HTMLElement | Window => {
        let node = element?.parentElement ?? null;
        while (node) {
            const style = window.getComputedStyle(node);
            const canScroll = /(auto|scroll)/.test(style.overflowY || '') && node.scrollHeight > node.clientHeight;
            if (canScroll) {
                return node;
            }
            node = node.parentElement;
        }
        return window;
    };

    const scrollToElement = (element: HTMLElement): void => {
        const explicitContainer = getExplicitScrollContainer();
        if (explicitContainer) {
            const scrollMarginTop = parseFloat(window.getComputedStyle(element).scrollMarginTop || '0') || 0;
            const containerRect = explicitContainer.getBoundingClientRect();
            const targetRect = element.getBoundingClientRect();
            const top = explicitContainer.scrollTop + (targetRect.top - containerRect.top) - scrollMarginTop;
            explicitContainer.scrollTo({ top, behavior: 'smooth' });
            window.setTimeout(() => {
                const freshContainerRect = explicitContainer.getBoundingClientRect();
                const freshTargetRect = element.getBoundingClientRect();
                const correctedTop =
                    explicitContainer.scrollTop + (freshTargetRect.top - freshContainerRect.top) - scrollMarginTop;
                explicitContainer.scrollTo({ top: correctedTop, behavior: 'auto' });
            }, 200);
            return;
        }

        const scrollParent = getScrollParent(element);
        if (scrollParent === window) {
            element.scrollIntoView({ block: 'start', behavior: 'smooth' });
            return;
        }
        const parent = scrollParent as HTMLElement;
        const parentRect = parent.getBoundingClientRect();
        const targetRect = element.getBoundingClientRect();
        const scrollMarginTop = parseFloat(window.getComputedStyle(element).scrollMarginTop || '0') || 0;
        const top = targetRect.top - parentRect.top + parent.scrollTop - scrollMarginTop;
        parent.scrollTo({ top, behavior: 'smooth' });
    };

    const handleClick = (id: string, title: string): void => {
        let element = document.getElementById(id);
        if (!element) {
            const slug = makeSlug(title);
            element = document.querySelector(`[data-md-heading="${slug}"]`);
        }
        if (element) {
            scrollToElement(element);
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
