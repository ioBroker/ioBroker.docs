import type React from 'react';

interface PageMetaProps {
    /** the name of this page, without the site behind it */
    title?: string;
    /** one or two sentences about it - what a search engine shows under the title */
    description?: string;
    /** a picture for a link preview, as a path below the site */
    image?: string;
}

/**
 * What this page calls itself.
 *
 * React 19 lifts a `<title>`, `<meta>` or `<link>` rendered anywhere into the head of the document
 * by itself, so no library is needed for this and no effect has to clean up after it. Exactly one
 * page renders this at a time - a second `<title>` would be lifted as well, and the browser goes
 * by the first one it finds.
 *
 * The server has already put the same values into the page before it was sent (`src/lib/prerender.ts`),
 * which is what a crawler and a link preview read, because neither of them runs this code. What
 * happens here is the other half: when a reader walks from one page to the next, nothing is
 * fetched from the server, so without this the tab would keep the title of the page they started
 * on for the rest of the visit.
 */
export default function PageMeta({ title, description, image }: PageMetaProps): React.JSX.Element {
    const full = !title ? 'ioBroker' : title.includes('ioBroker') ? title : `${title} | ioBroker`;
    const canonical = typeof window === 'undefined' ? '' : `${window.location.origin}${window.location.pathname}`;

    return (
        <>
            <title>{full}</title>
            {!!description && (
                <meta
                    name="description"
                    content={description}
                />
            )}
            {!!canonical && (
                <link
                    rel="canonical"
                    href={canonical}
                />
            )}
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
            {!!image && (
                <meta
                    property="og:image"
                    content={image.startsWith('http') ? image : `${window.location.origin}${image}`}
                />
            )}
        </>
    );
}
