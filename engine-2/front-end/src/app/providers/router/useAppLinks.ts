import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pathToRoute } from '../../../utils/routes';

/**
 * The app addresses its own pages as "/#/adapters", but the same pages are linked from
 * outside - and from the markdown - as plain "/adapters". A click on such a link would
 * leave the page and load the whole SPA again, only to land on the same place. This
 * handler catches the clicks that stay inside the app and hands them to the router.
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
            // "#/adapters" and "#section" are the app's own spellings - the browser
            // changes the hash and the router follows, no page load involved
            if (!href || href.startsWith('#')) {
                return;
            }
            let url: URL;
            try {
                url = new URL(href, window.location.href);
            } catch {
                return;
            }
            // another host, and mailto:/tel: with their opaque origin, leave the app
            if (url.origin !== window.location.origin) {
                return;
            }
            // "https://www.iobroker.net/#/adapters" - same page, only the hash moves,
            // unless the address bar still carries a path from an entry from outside
            if (url.hash.startsWith('#/')) {
                if (url.pathname !== window.location.pathname) {
                    event.preventDefault();
                    void navigate(url.hash.slice(1));
                }
                return;
            }
            const route = pathToRoute(url.pathname, url.search, url.hash);
            if (!route) {
                return;
            }
            event.preventDefault();
            void navigate(route);
        };

        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, [navigate]);
}
