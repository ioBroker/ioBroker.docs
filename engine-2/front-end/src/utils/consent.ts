/**
 * Where the decision about the cookies is kept, and how it travels between the sites.
 *
 * It is a cookie and no longer `localStorage`, because one cloud is served from more than one host:
 * the site from `www.iobroker.net`, the cloud and the profile app from `iobroker.net`. `localStorage`
 * belongs to the exact host, so those three would each ask again - a cookie on `.iobroker.net` is
 * read by all of them.
 *
 * `iobroker.net` and `iobroker.pro` are different registrable domains, and no cookie spans two of
 * those; that is the browser's rule and no attribute changes it. A link that leaves for the other
 * cloud therefore carries the decision on the address, the way `handover.ts` carries the login
 * ticket, and the arriving page keeps it as its own.
 */

/** m - minimal, c - commercial, s - statistics, "-" - all declined */
export type PossibleSettings = '' | '-' | 'cms' | 'ms' | 'cm' | 'm';

/** name of the cookie, and of the parameter that hands it over to the other cloud */
export const STORAGE_KEY = 'cookieUsage';

/**
 * What may be kept. Anything else is dropped - the address is written by whoever sends the link, so
 * what arrives on it is a proposal and not a decision. The old site wrote `acknowledged` here, which
 * is not among them either: those visitors are asked once more, this time about the two switches
 * that value never had.
 */
const VALID_SETTINGS: string[] = ['-', 'cms', 'ms', 'cm', 'm'];

/** a year - longer than that a consent is not worth anything anyway */
const MAX_AGE = 365 * 24 * 60 * 60;

/**
 * The domain a cookie has to be written on so that every host of this cloud reads it:
 * `iobroker.net` for `www.iobroker.net`. Empty where an explicit domain would only get the cookie
 * thrown away - on a developer machine and behind a bare IP address.
 *
 * @param hostname the host to ask about, usually the one of the current page
 */
function registrableDomain(hostname: string): string {
    if (!hostname.includes('.') || /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
        return '';
    }
    return hostname.split('.').slice(-2).join('.');
}

/** What was decided on this cloud, or an empty string while nothing was */
export function readConsent(): PossibleSettings {
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${STORAGE_KEY}=([^;]*)`));
    const stored = match ? decodeURIComponent(match[1]) : '';
    if (VALID_SETTINGS.includes(stored)) {
        return stored as PossibleSettings;
    }

    // What the previous version kept, back when it was one decision per host. Taken over once, so
    // that nobody is asked again for something they have already answered here.
    try {
        const legacy = window.localStorage.getItem(STORAGE_KEY);
        window.localStorage.removeItem(STORAGE_KEY);
        if (legacy && VALID_SETTINGS.includes(legacy)) {
            writeConsent(legacy as PossibleSettings);
            return legacy as PossibleSettings;
        }
    } catch {
        // a browser that refuses storage altogether - then there is nothing to take over
    }

    return '';
}

/**
 * Keeps a decision for every host of this cloud.
 *
 * @param value what was decided
 */
export function writeConsent(value: PossibleSettings): void {
    const domain = registrableDomain(window.location.hostname);
    const attributes = [`${STORAGE_KEY}=${encodeURIComponent(value)}`, 'path=/', `max-age=${MAX_AGE}`, 'SameSite=Lax'];
    if (domain) {
        attributes.push(`domain=.${domain}`);
    }
    if (window.location.protocol === 'https:') {
        attributes.push('Secure');
    }
    document.cookie = attributes.join('; ');
}

/**
 * An address with the decision written onto it, for a link that leaves for the other cloud.
 *
 * Everything staying on this cloud is given back untouched - the cookie is already there, and an
 * address is no place for something that does not have to be on it. The parameter goes in front of
 * the `#`: behind it stands the route of a hash router, which is none of our business.
 *
 * @param url where the link points, absolute or relative to the current page
 */
export function withConsent(url: string): string {
    const value = readConsent();
    if (!value) {
        return url;
    }
    let target: URL;
    try {
        target = new URL(url, window.location.href);
    } catch {
        return url;
    }
    if (registrableDomain(target.hostname) === registrableDomain(window.location.hostname)) {
        return url;
    }
    target.searchParams.set(STORAGE_KEY, value);
    return target.toString();
}

/**
 * Takes a decision handed over by the other cloud off the address and keeps it here.
 *
 * Belongs before the app starts: an arriving visitor is not to be asked again about something they
 * have just answered next door. What was decided on this cloud wins, and the parameter leaves the
 * address in any case - a reload must not bring it back, and the history has no use for it.
 */
export function consumeConsentFromUrl(): void {
    const url = new URL(window.location.href);
    const incoming = url.searchParams.get(STORAGE_KEY);
    if (incoming === null) {
        return;
    }
    url.searchParams.delete(STORAGE_KEY);
    window.history.replaceState(null, '', url.toString());
    if (VALID_SETTINGS.includes(incoming) && !readConsent()) {
        writeConsent(incoming as PossibleSettings);
    }
}
