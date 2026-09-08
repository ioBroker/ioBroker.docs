import { makeSlug } from './markdown';

/**
 * The id of the heading the address points at. "#id" is the plain form; "?anchor=<id>" is
 * what the links of the former HashRouter carried, because a hash URL cannot hold a second "#".
 */
export const getAnchorFromHash = (): string | null => {
    const hash = window.location.hash;
    if (hash.length > 1 && !hash.startsWith('#/')) {
        return decodeURIComponent(hash.slice(1));
    }
    return new URLSearchParams(window.location.search).get('anchor');
};

/** href of a heading - the same value the link icon next to the heading carries */
export const buildAnchorHref = (id: string): string => `#${id}`;

/** puts the anchor into the address bar without adding a history entry */
export const updateAnchorInUrl = (id: string): void => {
    if (window.location.hash === `#${id}`) {
        return;
    }
    const url = new URL(window.location.href);
    url.hash = `#${id}`;
    window.history.replaceState(null, '', url.toString());
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

/**
 * Pages that scroll inside a column mark that column with data-docs-scroll.
 * It only counts while it really is the element that scrolls.
 */
const getMarkedScrollContainer = (): HTMLElement | null => {
    const container = document.querySelector<HTMLElement>('[data-docs-scroll="true"]');
    return container && container.scrollHeight > container.clientHeight ? container : null;
};

/** the heading for an id - falls back to the slug of its text for older links */
export const findHeadingElement = (id: string, title?: string): HTMLElement | null => {
    const byId = document.getElementById(id);
    if (byId) {
        return byId;
    }
    if (title) {
        return document.querySelector<HTMLElement>(`[data-md-heading="${makeSlug(title)}"]`);
    }
    return null;
};

export const scrollToElement = (element: HTMLElement, behavior: ScrollBehavior = 'auto'): void => {
    const scrollMarginTop = parseFloat(window.getComputedStyle(element).scrollMarginTop || '0') || 0;
    const container = getMarkedScrollContainer() ?? getScrollParent(element);

    if (container === window) {
        element.scrollIntoView({ block: 'start', behavior });
        return;
    }

    const parent = container as HTMLElement;
    const topFor = (): number => {
        const parentRect = parent.getBoundingClientRect();
        const targetRect = element.getBoundingClientRect();
        return parent.scrollTop + (targetRect.top - parentRect.top) - scrollMarginTop;
    };
    parent.scrollTo({ top: topFor(), behavior });
    // the column keeps growing while images and tables settle - correct once more
    requestAnimationFrame(() => parent.scrollTo({ top: topFor(), behavior: 'auto' }));
};

/** scrolls to a heading by id, used by the link icons and the table of contents */
export const scrollToAnchor = (id: string, title?: string, behavior: ScrollBehavior = 'auto'): boolean => {
    const element = findHeadingElement(id, title);
    if (!element) {
        return false;
    }
    scrollToElement(element, behavior);
    return true;
};
