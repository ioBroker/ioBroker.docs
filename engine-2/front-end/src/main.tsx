import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './App.tsx';
import { normalizeEntryUrl } from './utils/routes';
import { consumeConsentFromUrl } from './utils/consent';
import { consumeCloudFromUrl } from './utils/cloud';

// A visitor coming over from iobroker.pro brings the cookie decision along on the address. It is
// read and kept before anything else, so that the banner does not ask about it a second time - and
// before `normalizeEntryUrl`, which rewrites the rest of the address.
consumeConsentFromUrl();

// On the same address they bring which cloud they came from, so that the profile link leads back
// to the session they already have instead of asking them to sign in here a second time. Same
// reason to stand here: the header is built from it, and the parameter has to be gone before
// `normalizeEntryUrl` writes the address the visitor gets to keep.
consumeCloudFromUrl();

// Old addresses still arrive as hashes - "/#/adapters" from the app's own former spelling,
// "#de/adapters/..." from the site before it. Both become the plain path before the router reads
// the location, so that it finds a route and the address bar shows what the page really is.
normalizeEntryUrl();

// The server describes the page in the head before it sends it, so that a crawler and a link
// preview - neither of which gets this far - find a title and a description. React writes those
// tags itself as soon as the page has its data, and does not see the ones already standing there;
// two titles in one document leave the browser to pick, and it picks the first. They go here,
// right before the app takes over.
//
// Everything taken out here has to be written again by `PageMeta`, and with the same values: a
// search engine that runs the app - Google does - reads what stands in the document afterwards,
// not what was sent. Until 17.09.2026 the canonical lost the `?lang=` of the page and the
// `hreflang` links were not written at all, so every German and Russian page called itself the
// English one.
document.head.querySelectorAll('[data-prerender]').forEach(element => element.remove());

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 60 * 1000,
        },
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </StrictMode>,
);
