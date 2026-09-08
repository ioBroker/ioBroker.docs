import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAppPath, legacyHashToPath } from '../../../utils/routes';

/**
 * The header, the footer and above all the links inside the markdown are plain
 * `<a href="/adapters">` - a click on one of them would leave the page and load the whole
 * SPA again. This handler catches the clicks that stay inside the app and hands them to
 * the router, so the same address works as an entry point from the outside and as an
 * internal jump without a reload. The old "#/adapters" spelling is translated on the way.
 */
export function useAppLinks(): void {
    const navigate = useNavigate();

    useEffect(() => {
        const onClick = (event: MouseEvent): void => {
            // a modifier opens a new tab or window - that is the browser's job
            if (
                event.defaultPrevented ||
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
            ) {
                return;
            }
            const anchor = (event.target as Element | null)?.closest?.('a');
            if (!anchor || anchor.hasAttribute('download')) {
                return;
            }
            const target = anchor.getAttribute('target');
            if (target && target !== '_self') {
                return;
            }
            const href = anchor.getAttribute('href');
            if (!href) {
                return;
            }
            const legacy = legacyHashToPath(href);
            if (legacy) {
                event.preventDefault();
                void navigate(legacy);
                return;
            }
            // "#section" stays on the page - MarkdownView scrolls to it
            if (href.startsWith('#')) {
                return;
            }
            let url: URL;
            try {
                url = new URL(href, window.location.href);
            } catch {
                return;
            }
            // another host, and mailto:/tel: with their opaque origin, leave the app
            if (url.origin !== window.location.origin || !isAppPath(url.pathname)) {
                return;
            }
            event.preventDefault();
            void navigate(`${url.pathname}${url.search}${url.hash}`);
        };

        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, [navigate]);
}
