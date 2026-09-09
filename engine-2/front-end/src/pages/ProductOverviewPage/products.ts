import { PRODUCTS_NET_URL, PRODUCTS_PRO_URL } from '../../config/api';

/** One entry of the public product catalogue, exactly as the two APIs return it. */
export interface ApiProduct {
    name: string;
    type: string;
    datapoints?: number | null;
    price: number;
    best: 0 | 1;
    months: number;
    action_till: string | null;
    vatPercent: number;
    vat: number;
}

/**
 * Prices, running times, data-point tiers and above all *availability* come from
 * the two public catalogues - iobroker.net serves the adapter licenses,
 * iobroker.pro the access licenses. Nothing on this page invents a price: a
 * product the API does not return is not shown at all.
 */
export async function fetchProducts(): Promise<ApiProduct[]> {
    const results = await Promise.all(
        [PRODUCTS_NET_URL, PRODUCTS_PRO_URL].map(url =>
            fetch(url)
                .then(response => (response.ok ? (response.json() as Promise<ApiProduct[]>) : []))
                .catch(() => [] as ApiProduct[]),
        ),
    );
    return results.flat();
}

/** the running times the cards offer, in the order the draft shows them */
export const DURATION_LABEL: Record<number, string> = {
    1: '1 month',
    6: '6 month',
    12: '1 year',
    0: 'Unlimited',
};

/** the API calls the top data-point tier 60000; the cards label it "unlimited" */
export const UNLIMITED_DATAPOINTS = 60000;

/**
 * A name segment that marks a campaign rather than a product of its own.
 *
 * The shop runs its promotions as *extra rows*: `remote.year` is switched off and `remote.promote4`
 * on, `iobroker.knx_1000` is replaced by `iobroker.knx.action_1000`. The same product, a different
 * price, for a while. This page must not show them as separate offers - and must not lose a card
 * when the regular row is the one that is switched off.
 *
 * `iobroker.iot.server` splits the names the same way in `src-web/src/utils/catalogue.ts`; the two
 * lists have to stay in step, which is why the marker is written out here rather than guessed at.
 */
const CAMPAIGN_MARKER = /^(action|promote\d*)$/;

/**
 * The name a product has when the campaign is taken out of it.
 *
 * `iobroker.knx.action_1000` -> `iobroker.knx_1000`, `iobroker.vis.offline.action` ->
 * `iobroker.vis.offline`, `remote.promote4` -> `remote`. The size behind the underscore is part of
 * the product and stays; `year` and `month` are durations, not campaigns, and stay as well.
 */
export function slotName(name: string): string {
    const [base, size] = name.split('_');
    const segments = base.split('.').filter(segment => !CAMPAIGN_MARKER.test(segment));

    return size === undefined ? segments.join('.') : `${segments.join('.')}_${size}`;
}

/**
 * What `action_till` says: the day the campaign ends and the price the product costs again after it.
 *
 * The column is either a plain date or `{"end": "2025-12-31", "normal": 49}`, where `normal` is in
 * euro.
 */
export function parseAction(product: ApiProduct): { end: Date | null; normalPrice: number | null } {
    const raw = product.action_till;
    if (!raw) {
        return { end: null, normalPrice: null };
    }

    let end = raw;
    let normalPrice: number | null = null;

    if (raw.startsWith('{')) {
        try {
            const data = JSON.parse(raw) as { end?: string; normal?: number | string };
            end = data.end || '';
            normalPrice = parseFloat(String(data.normal ?? '')) || null;
        } catch {
            return { end: null, normalPrice: null };
        }
    }

    const date = end ? new Date(end) : null;

    return { end: date && !isNaN(date.getTime()) ? date : null, normalPrice };
}

/** A campaign that has run out is not sold any more, even though the API still delivers the row */
export function isOffered(product: ApiProduct): boolean {
    const { end } = parseAction(product);

    return !end || end.getTime() >= Date.now();
}

/**
 * A trailing segment that names the running time rather than the product.
 *
 * A campaign does not always *add* a segment: `remote.year` is replaced by `remote.promote4`, so the
 * regular row carries a duration where the campaign row carries the campaign. Taking both out is what
 * makes the two meet - the running time is then read from the `months` column, which both of them
 * have. Numbers are deliberately not in here: `link.50` and `link.100` are two products, not one.
 */
const DURATION_MARKER = /^(month|months|year|years)$/;

/**
 * What two rows have in common when they are the same offer.
 *
 * `remote.year` and `remote.promote4` both become `remote`, `iobroker.knx.action_1000` and
 * `iobroker.knx_1000` both become `iobroker.knx_1000`. The running time is not in the name here, so
 * `iobroker.knx.year_2000` lands on the same name as `iobroker.knx_2000` - the `months` of the slot
 * below keeps those two apart.
 */
function familyName(name: string): string {
    const [base, size] = name.split('_');
    const segments = base
        .split('.')
        .filter(segment => !CAMPAIGN_MARKER.test(segment) && !DURATION_MARKER.test(segment));

    return size === undefined ? segments.join('.') : `${segments.join('.')}_${size}`;
}

/**
 * What is really on sale: campaigns that have run out are dropped, and where a campaign row and the
 * regular row stand for the same thing, the cheaper of the two wins.
 *
 * "The same thing" is the product without its running time, plus the running time from the `months`
 * column. The free and the paid variant are *not* the same thing - `iobroker.vis` is delivered twice,
 * for 0 EUR and for 119 EUR, and the page shows both - so the price decides the slot as well.
 */
export function offeredProducts(products: ApiProduct[]): ApiProduct[] {
    const bySlot = new Map<string, ApiProduct>();

    products.filter(isOffered).forEach(product => {
        const slot = `${familyName(product.name)}|${product.months}|${product.price > 0 ? 'paid' : 'free'}`;
        const known = bySlot.get(slot);
        if (!known || product.price < known.price) {
            bySlot.set(slot, product);
        }
    });

    return [...bySlot.values()];
}

/** Finds a product by the name it has outside of a campaign */
export function findProduct(products: ApiProduct[], name: string): ApiProduct | undefined {
    return products.find(product => slotName(product.name) === name);
}

/** Every product whose campaign free name starts with the prefix, shortest running time first */
export function findByPrefix(products: ApiProduct[], prefix: string): ApiProduct[] {
    return products
        .filter(product => slotName(product.name).startsWith(prefix) || product.name.startsWith(prefix))
        .sort((a, b) => a.months - b.months);
}

/**
 * Price of a product on a card. A trailing `,00` is only noise there - `119` stays `119`, a crooked
 * price keeps its cents. An invoice would use two decimals throughout; a card does not.
 */
export function formatPrice(price: number, language: string): string {
    return `${price.toLocaleString(language === 'en' ? 'en-GB' : language, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    })} €`;
}

/** An amount inside a sentence - "only 4,50 € per month" - keeps both decimals */
export function formatAmount(price: number, language: string): string {
    return `${price.toLocaleString(language === 'en' ? 'en-GB' : language, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })} €`;
}

/** the product art the cards show - the same files the marketplace uses */
export type ProductArt = 'assistant' | 'remote' | 'vis' | 'jaeger' | 'knx';

/**
 * Product art for the current theme. White line work is recoloured by a filter (see
 * {@link isMonochromeProductImage}); art that carries colour of its own - the cloud with the
 * ioBroker mark, the vis screen - comes as a second file for the light canvas.
 */
export function productIcon(art: ProductArt, mode: 'light' | 'dark'): string {
    if (art === 'remote') {
        return mode === 'light' ? './products/remote-access-light.svg' : './products/remote-access.svg';
    }
    if (art === 'vis') {
        return mode === 'light' ? './products/vis1.png' : './products/vis2.png';
    }
    if (art === 'jaeger') {
        return './products/jaeger-design.png';
    }
    if (art === 'knx') {
        return './products/knx.png';
    }

    return './products/voice-assistant.svg';
}

/** True for the art that is pure white line work - that one needs the brand colour on a light canvas */
export function isMonochromeProductImage(src: string): boolean {
    return src.endsWith('.svg') && !src.includes('-light.');
}
