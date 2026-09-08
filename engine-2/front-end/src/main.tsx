import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './App.tsx';
import { normalizeEntryUrl } from './utils/routes';
import { consumeConsentFromUrl } from './utils/consent';

// A visitor coming over from iobroker.pro brings the cookie decision along on the address. It is
// read and kept before anything else, so that the banner does not ask about it a second time - and
// before `normalizeEntryUrl`, which moves the rest of the address behind the hash.
consumeConsentFromUrl();

// The pages are linked from outside as "/adapters". That becomes "/#/adapters" before the
// router reads the location - otherwise it would see an empty hash and show the start page.
normalizeEntryUrl();

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
