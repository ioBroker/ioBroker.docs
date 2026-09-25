/**
 * The addresses of the site that stood on iobroker.com before the relaunch.
 *
 * Until 17.09.2026 every one of them answered with 404. They are still in Google's index and are
 * still linked to from forums, articles and the adapters' own readmes, and a 404 throws all of
 * that away: the reader lands nowhere and the address loses what it had earned. A 301 hands both
 * on to the page that carries the subject today.
 *
 * The list is what a search engine still knows about the old site (17.09.2026), plus the few
 * German addresses a reader types by hand - `/impressum`, `/datenschutz`. Everything is lower
 * case here; the lookup folds the address before it reads this, and a trailing slash is gone by
 * then as well.
 *
 * A page that has no equal today goes to the page that comes closest in subject, never to the
 * start page for the sake of it: a redirect to something unrelated is read as a soft 404 and
 * counts for as little as the 404 did.
 */
export const LEGACY_PAGES: Record<string, string> = {
    /*
     * The start page under the name a file has. The old site was a set of files, so the address
     * that was handed around and bookmarked was `/index.html`, and plenty of links still carry it.
     * `express.static` handed that file out as it lies on disk - the shell, with the head that
     * belongs to no page - and the router, which knows "/" and not "/index.html", then drew its
     * own "not found" over it: a 404 on the start page (25.09.2026). `/index.htm` and
     * `/index.php` never were files here and reached the 404 of the server directly.
     *
     * Redirected before `express.static` sees them, so the file itself is no longer an address of
     * its own - the start page is "/", once, and that is what a search engine gets to keep.
     */
    '/index.html': '/',
    '/index.htm': '/',
    '/index.php': '/',
    // what ioBroker is, and what it is used for - the start page says that now
    '/integrationsplattform': '/',
    '/scope': '/',
    '/partner': '/',
    '/integrationspartner': '/',
    // the company behind it, and the two legal pages, which keep their German names as well
    '/unternehmen': '/imprint',
    '/impressum': '/imprint',
    '/datenschutz': '/policy',
    // what is sold: licenses, remote access, support, hardware, the shop around them
    '/produkte': '/productoverview',
    '/shop': '/productoverview',
    '/product/iob-server': '/productoverview',
    '/product/remote-support': '/productoverview',
    '/services': '/productoverview',
    '/web-services': '/productoverview',
    '/support': '/productoverview',
    '/remotefunktionen': '/productoverview',
    // the terms are part of a purchase and are accepted in the license portal, not on this site;
    // the page that says what there is to buy is as close as it gets
    '/agb': '/productoverview',
    '/allgemeine_geschaeftsbedingungen': '/productoverview',
    // the subjects that are documentation today
    '/administration': '/docs/admin/README.md',
    '/framework': '/docs/dev/adapterdev.md',
    '/visualisierung': '/docs/viz/README.md',
    '/beispiele-fuer-visualisierung': '/docs/viz/README.md',
    '/alexa': '/docs/cloud/alexasmart.md',
    // news of the project, which is what the blog is
    '/veranstaltungen': '/blog',
    /*
     * Not addresses of the old site, but the words a reader types when they guess: the former site
     * carried "#de/download" and "#de/documentation", and both of them are still handed around.
     * The hash forms are rewritten in the browser (`utils/routes.ts`), these are not.
     */
    '/download': '/installation',
    '/documentation': '/docs',
    '/dokumentation': '/docs',
};

/**
 * Where an address of the old site leads today, or nothing if it is not one of them.
 *
 * The query is kept: a reader who arrives with `?lang=de` stays in German, and a parameter a
 * campaign put there is not lost on the way. The hash never reaches the server.
 *
 * @param originalUrl the address as it arrived, query and all
 */
export function legacyTarget(originalUrl: string): string | undefined {
    const [pathname, query] = originalUrl.split('?');
    const key = decodeURIComponent(pathname).toLowerCase().replace(/\/+$/, '') || '/';
    const target = LEGACY_PAGES[key];
    if (!target) {
        return undefined;
    }
    return query ? `${target}${target.includes('?') ? '&' : '?'}${query}` : target;
}
