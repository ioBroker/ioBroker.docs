/**
 * Which of the two clouds a visitor belongs to, and how that travels between the sites.
 *
 * The documentation lies on `www.iobroker.net` alone. Somebody signed in on `iobroker.pro` who
 * opens it therefore leaves their cloud, and the profile link - built from the host of the page it
 * stands on - pointed at `iobroker.net` afterwards, where they have no session and are asked to
 * sign in a second time. Sending them back to `iobroker.pro` instead costs them nothing: the
 * session they already have is waiting there.
 *
 * `iobroker.net` and `iobroker.pro` are different registrable domains, and no cookie spans two of
 * those; that is the browser's rule and no attribute changes it. The origin therefore travels on
 * the address, exactly the way the cookie decision does in `consent.ts`, and the arriving page
 * keeps it for as long as the visitor stays.
 *
 * The other half of this belongs to the profile app on iobroker.pro, whose own `config/api.ts`
 * has to put `?cloud=pro` on the links that leave for the documentation - `withCloud()` does it,
 * and this file is meant to be copied over beside the header. Until that happens the referrer
 * carries it (see `consumeCloudFromUrl`), so nothing here waits on that change.
 */

import { registrableDomain } from './consent';

export type Cloud = 'net' | 'pro';

/** name of the parameter that hands the origin over, and of the cookie it lives in afterwards */
export const CLOUD_KEY = 'cloud';

/**
 * What may be kept. Anything else is dropped - the address is written by whoever sends the link,
 * so what arrives on it is a proposal and not a decision.
 */
const VALID_CLOUDS: string[] = ['net', 'pro'];

/**
 * The host of each cloud. No address is ever built out of what arrives on the parameter: the
 * parameter picks one of these two and nothing else, so no link of ours can be aimed anywhere
 * a stranger chooses.
 */
export const CLOUD_HOSTS: Record<Cloud, string> = {
    net: 'iobroker.net',
    pro: 'iobroker.pro',
};

/** The cloud a host belongs to, or an empty string for everything that is neither */
function cloudOfHost(hostname: string): Cloud | '' {
    const domain = registrableDomain(hostname);
    return (Object.keys(CLOUD_HOSTS) as Cloud[]).find(cloud => CLOUD_HOSTS[cloud] === domain) || '';
}

/**
 * The cloud this page itself lies on. Everything that is neither of the two - a developer machine,
 * a preview host - counts as `net`, which is what this app is served from.
 */
export function currentCloud(): Cloud {
    return cloudOfHost(window.location.hostname) || 'net';
}

/** Where the visitor came from, or an empty string while nothing is known about it */
export function readCloud(): Cloud | '' {
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${CLOUD_KEY}=([^;]*)`));
    const stored = match ? decodeURIComponent(match[1]) : '';
    return VALID_CLOUDS.includes(stored) ? (stored as Cloud) : '';
}

/**
 * Keeps the origin for every host of this cloud.
 *
 * Without a `max-age`, so that it goes when the browser does: this is a hint for the next click and
 * not a decision like the consent. Whoever comes back tomorrow through the address bar is where
 * they asked to be, and nothing carries them off to the other cloud months later.
 *
 * @param value the cloud the visitor came from
 */
export function writeCloud(value: Cloud): void {
    const domain = registrableDomain(window.location.hostname);
    const attributes = [`${CLOUD_KEY}=${encodeURIComponent(value)}`, 'path=/', 'SameSite=Lax'];
    if (domain) {
        attributes.push(`domain=.${domain}`);
    }
    if (window.location.protocol === 'https:') {
        attributes.push('Secure');
    }
    document.cookie = attributes.join('; ');
}

/**
 * An address with the origin written onto it, for a link that leaves for the other cloud.
 *
 * Everything staying on this cloud is given back untouched - the page over there knows its own
 * host, and an address is no place for something that does not have to be on it.
 *
 * @param url where the link points, absolute or relative to the current page
 */
export function withCloud(url: string): string {
    let target: URL;
    try {
        target = new URL(url, window.location.href);
    } catch {
        return url;
    }
    if (registrableDomain(target.hostname) === registrableDomain(window.location.hostname)) {
        return url;
    }
    target.searchParams.set(CLOUD_KEY, currentCloud());
    return target.toString();
}

/**
 * Takes the origin off the address - or, failing that, reads it off the referrer - and keeps it.
 *
 * Belongs before the app starts, so that the very first header the visitor sees already points
 * home. The parameter wins over what is stored, because it says where the visitor is coming from
 * at this moment; that is the other way round from the consent, where the answer given on this
 * cloud wins.
 * The parameter leaves the address in any case - a reload must not bring it back, and the history
 * has no use for it.
 *
 * The referrer is the fallback, and it is what makes this work before the profile app on the other
 * cloud appends anything: the default `strict-origin-when-cross-origin` still hands over the bare
 * origin from one https site to another, and that is all this needs. Only a foreign cloud is worth
 * keeping - a referrer from our own says nothing that the host does not already say.
 */
export function consumeCloudFromUrl(): void {
    const url = new URL(window.location.href);
    const incoming = url.searchParams.get(CLOUD_KEY);
    if (incoming !== null) {
        url.searchParams.delete(CLOUD_KEY);
        window.history.replaceState(null, '', url.toString());
        if (VALID_CLOUDS.includes(incoming)) {
            writeCloud(incoming as Cloud);
        }
        return;
    }

    try {
        const from = document.referrer ? cloudOfHost(new URL(document.referrer).hostname) : '';
        if (from && from !== currentCloud()) {
            writeCloud(from);
        }
    } catch {
        // a referrer that is not an address - then there is nothing to read out of it
    }
}
