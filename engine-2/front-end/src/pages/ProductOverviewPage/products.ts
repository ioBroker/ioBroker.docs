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

export function findProduct(products: ApiProduct[], name: string): ApiProduct | undefined {
    return products.find(product => product.name === name);
}

export function findByPrefix(products: ApiProduct[], prefix: string): ApiProduct[] {
    return products.filter(product => product.name.startsWith(prefix)).sort((a, b) => a.months - b.months);
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
