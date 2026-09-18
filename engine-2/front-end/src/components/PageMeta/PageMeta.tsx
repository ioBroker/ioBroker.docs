import React, { useEffect, useState } from 'react';
import { I18n, type Language } from '../../utils/i18n';

interface PageMetaProps {
    /** the name of this page, without the site behind it */
    title?: string;
    /** one or two sentences about it - what a search engine shows under the title */
    description?: string;
    /** a picture for a link preview, as a path below the site */
    image?: string;
    /** the picture is already a wide card, 1200 by 630, and not a square logo */
    imageWide?: boolean;
    /** a page that is of no use in a search index - the search results above all */
    noindex?: boolean;
}

/**
 * The languages the site is published in, and the one an address without `?lang=` is in.
 *
 * The same list as `LANGUAGES` and `DEFAULT_LANGUAGE` in `src/lib/siteData.ts`: the addresses
 * written below have to be the ones the server writes, or the two contradict each other.
 */
const LANGUAGES: Language[] = ['de', 'en', 'ru'];
const DEFAULT_LANGUAGE: Language = 'en';
const OG_LOCALES: Record<Language, string> = { de: 'de_DE', en: 'en_GB', ru: 'ru_RU' };

/**
 * The picture a link preview shows when the page brings none of its own - 1200 by 630, the size
 * Facebook, WhatsApp and the forum ask for. The same file the server names (`src/lib/prerender.ts`).
 * An SVG falls back to it too: none of those services renders one.
 */
const DEFAULT_IMAGE = '/og-default.png';

/**
 * A description as long as a search engine shows it: 160 characters, cut at a word.
 *
 * The same rule the server applies (`shorten` in `src/lib/prerender.ts`). Without it the two
 * disagree about the same page: the description of a blog post comes from the post itself and
 * is a whole paragraph, and the server sends the short form while this wrote the long one.
 */
function shorten(text: string | undefined): string {
    // the descriptions in blog.json carry a literal "\n" here and there - two characters, not a break
    const plain = (text ?? '')
        .replace(/\\[rn]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    return plain.length > 160 ? `${plain.slice(0, 157).replace(/\s+\S*$/, '')}…` : plain;
}

/** The address of a page in one language - `?lang=` for all of them but the default one */
function withLanguage(route: string, language: Language): string {
    if (language === DEFAULT_LANGUAGE) {
        return route;
    }
    return `${route}${route.includes('?') ? '&' : '?'}lang=${language}`;
}

/**
 * What this page calls itself.
 *
 * React 19 lifts a `<title>`, `<meta>` or `<link>` rendered anywhere into the head of the document
 * by itself, so no library is needed for this and no effect has to clean up after it. Exactly one
 * page renders this at a time - a second `<title>` would be lifted as well, and the browser goes
 * by the first one it finds.
 *
 * The server writes the same head before it sends the page (`src/lib/prerender.ts`), and
 * `main.tsx` takes those tags out again the moment the app starts. Everything the server wrote
 * therefore has to be written here as well, and with the same values:
 *
 * Until 17.09.2026 this wrote the title, the description and a canonical built from the path
 * alone. The parameter that names the language was missing from it and the `hreflang` links were
 * not written at all, so `/?lang=de` told a search engine that renders JavaScript - Google does -
 * that it was the English page, and the German and the Russian version could be dropped from the
 * index as a duplicate of it.
 */
export default function PageMeta({
    title,
    description: text,
    image,
    imageWide,
    noindex,
}: PageMetaProps): React.JSX.Element {
    const description = shorten(text);
    // the language belongs to the head as much as to the text: it decides the canonical
    const [language, setLanguage] = useState<Language>(I18n.getLanguage());
    useEffect(() => I18n.subscribe(setLanguage), []);

    const full = !title ? 'ioBroker' : title.includes('ioBroker') ? title : `${title} | ioBroker`;
    const origin = typeof window === 'undefined' ? '' : window.location.origin;
    const route = typeof window === 'undefined' ? '' : window.location.pathname.replace(/\/+$/, '') || '/';
    const canonical = origin && !noindex ? `${origin}${withLanguage(route, language)}` : '';
    const ownPicture = !!image && !/\.svg$/i.test(image);
    const source = ownPicture ? image : DEFAULT_IMAGE;
    const picture = source.startsWith('http') ? source : `${origin}${source}`;
    /*
     * The logo of an adapter is a square and stands beside the text, so that page gets the small
     * card. A blog post brings a card drawn for this purpose, and the fallback is one too, so both
     * get the large one with their size written out - some readers draw nothing without it.
     */
    const widePicture = !ownPicture || !!imageWide;

    return (
        <>
            <title>{full}</title>
            {!!description && (
                <meta
                    name="description"
                    content={description}
                />
            )}
            {noindex ? (
                <meta
                    name="robots"
                    content="noindex, follow"
                />
            ) : null}
            {!!canonical && (
                <link
                    rel="canonical"
                    href={canonical}
                />
            )}
            {/* the same page in the other languages, and the one to take when none of them fits */}
            {!!canonical &&
                LANGUAGES.map(other => (
                    <link
                        key={other}
                        rel="alternate"
                        hrefLang={other}
                        href={`${origin}${withLanguage(route, other)}`}
                    />
                ))}
            {!!canonical && (
                <link
                    rel="alternate"
                    hrefLang="x-default"
                    href={`${origin}${route}`}
                />
            )}
            <meta
                property="og:type"
                content={route === '/' ? 'website' : 'article'}
            />
            <meta
                property="og:locale"
                content={OG_LOCALES[language]}
            />
            <meta
                property="og:title"
                content={full}
            />
            {!!description && (
                <meta
                    property="og:description"
                    content={description}
                />
            )}
            {!!canonical && (
                <meta
                    property="og:url"
                    content={canonical}
                />
            )}
            {!!picture && (
                <meta
                    property="og:image"
                    content={picture}
                />
            )}
            {widePicture && (
                <meta
                    property="og:image:width"
                    content="1200"
                />
            )}
            {widePicture && (
                <meta
                    property="og:image:height"
                    content="630"
                />
            )}
            <meta
                name="twitter:card"
                content={widePicture ? 'summary_large_image' : 'summary'}
            />
        </>
    );
}
