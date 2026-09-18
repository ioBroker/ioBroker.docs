import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Box } from '@mui/material';
import { HomePage } from '../../../pages/HomePage';

/*
 * Every page but the start page is fetched when it is first opened, not with the app.
 *
 * The build wrote one file of 802 kilobytes until 18.09.2026, so a visitor who only ever sees the
 * start page still loaded the documentation viewer, the markdown renderer, the charts of the
 * statistics and the license tables with it. The start page stays in the first file - it is what
 * most visitors come for, and a page that has to fetch itself first would only start later.
 *
 * `vite` makes one file per `import()` below and loads it when the route is opened; the router
 * shows the placeholder underneath while it arrives, which on a normal connection is one frame.
 */
const InstallationPage = lazy(() => import('../../../pages/InstallationPage/InstallationPage'));
const AdaptersPage = lazy(() => import('../../../pages/AdaptersPage/AdaptersPage'));
const DocsPage = lazy(() => import('../../../pages/DocsPage/DocsPage'));
const AdapterPage = lazy(() => import('../../../pages/AdapterPage/AdapterPage'));
const BlogPage = lazy(() => import('../../../pages/BlogPage/BlogPage'));
const BlogPostPage = lazy(() => import('../../../pages/BlogPage/BlogPostPage'));
const LegalPage = lazy(() => import('../../../pages/LegalPage/LegalPage'));
const ProductOverviewPage = lazy(() => import('../../../pages/ProductOverviewPage/ProductOverviewPage'));
const StatisticsPage = lazy(() => import('../../../pages/StatisticsPage/StatisticsPage'));
const SearchPage = lazy(() => import('../../../pages/SearchPage/SearchPage'));
const NotFoundPage = lazy(() => import('../../../pages/NotFoundPage/NotFoundPage'));

/*
 * What stands in the place of the page while its file is on the way: the height the header leaves,
 * and nothing in it. Anything drawn here - a spinner above all - would be seen for a moment and
 * then pushed aside by the page, which is a layout shift of its own.
 */
const PageLoading = (): React.ReactElement => <Box sx={{ minHeight: 'calc(100svh - 64px)' }} />;

export const useRoutes = (): React.ReactElement => {
    return (
        <Suspense fallback={<PageLoading />}>
            <Routes>
                <Route
                    path="/"
                    element={<HomePage />}
                />
                <Route
                    path="/installation"
                    element={<InstallationPage />}
                />
                <Route
                    path="/adapters"
                    element={<AdaptersPage />}
                />
                <Route
                    path="/adapters/:adapterId"
                    element={<AdapterPage />}
                />
                <Route
                    path="/blog"
                    element={<BlogPage />}
                />
                <Route
                    path="/blog/:pageId"
                    element={<BlogPostPage />}
                />
                <Route
                    path="/docs"
                    element={<DocsPage />}
                />
                <Route
                    path="/docs/*"
                    element={<DocsPage />}
                />
                <Route
                    path="/productoverview"
                    element={<ProductOverviewPage />}
                />
                <Route
                    path="/statistics"
                    element={<StatisticsPage />}
                />
                <Route
                    path="/search"
                    element={<SearchPage />}
                />
                <Route
                    path="/imprint"
                    element={<LegalPage document="imprint" />}
                />
                <Route
                    path="/policy"
                    element={<LegalPage document="privacy" />}
                />
                {/*
                 * Everything else. The server answers such an address with 404 and the shell of the
                 * app, so what the reader gets is a page of the site and not the bare line of the
                 * server ("Cannot GET /..."), which is what stood here until 18.09.2026.
                 */}
                <Route
                    path="*"
                    element={<NotFoundPage />}
                />
            </Routes>
        </Suspense>
    );
};
