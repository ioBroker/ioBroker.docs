import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseLegacyHash, pathToRoute } from '../../../utils/routes';
import { setLang } from '../../../utils/i18n';

/**
 * The app addresses its own pages as plain paths - "/adapters" - and so does the markdown and
 * everything linking here from outside. A click on such a link would leave the page and load the
 * whole SPA again, only to land on the same place. This handler catches the clicks that stay
 * inside the app and hands them to the router.
 *
 * Two older spellings still turn up and are translated on the way: "#de/adapters/..." from the
 * site before this one, and "#/adapters" from this app before it lost its hash.
 */
export function useAppLinks(): void {
    const navigate = useNavigate();

    useEffect(() => {
        /** an address of the former site - "#de/adapters/adapterref/iobroker.midea/README.md" */
        const goLegacy = (hash: string, replace = false): boolean => {
            const legacy = parseLegacyHash(hash);
            if (!legacy) {
                return false;
            }
            if (legacy.language) {
                setLang(legacy.language);
            }
            void navigate(legacy.route, { replace });
            return true;
        };

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
            // "#section" is an anchor on the page the reader is on - the browser jumps to it and
            // nothing else has to happen. "#de/adapters/..." is an address of the former site and
            // has to be translated first.
            if (href.startsWith('#')) {
                if (goLegacy(href)) {
                    event.preventDefault();
                }
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
            if (goLegacy(url.hash)) {
                event.preventDefault();
                return;
            }
            // "https://www.iobroker.net/#/adapters" - the app's own former spelling, which still
            // sits in old links and bookmarks. What follows the hash is the route.
            if (url.hash.startsWith('#/')) {
                event.preventDefault();
                void navigate(url.hash.slice(1));
                return;
            }
            const route = pathToRoute(url.pathname, url.search, url.hash);
            if (!route) {
                return;
            }
            event.preventDefault();
            void navigate(route);
        };

        // the safety net: an old address typed into the address bar, or one this handler
        // did not see, still changes the hash - and lands here
        const onHashChange = (): void => {
            goLegacy(window.location.hash, true);
        };

        document.addEventListener('click', onClick);
        window.addEventListener('hashchange', onHashChange);
        return () => {
            document.removeEventListener('click', onClick);
            window.removeEventListener('hashchange', onHashChange);
        };
    }, [navigate]);
}
