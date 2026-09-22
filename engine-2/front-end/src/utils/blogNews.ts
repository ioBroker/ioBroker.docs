import { useEffect, useState } from 'react';

/**
 * The dot beside `Blog` in the header: is there a post this reader has not been to yet?
 *
 * There is no login here, so there is nobody to ask. What is kept is one single value: the id of
 * the newest post at the moment the reader last opened the blog overview. As long as the newest
 * post carries a different id, something has appeared since, and the dot is shown.
 *
 * One value, not a list of everything read: the header only asks whether there is news at all, and
 * a reader who goes to the overview has seen what is on offer there.
 *
 * The comparison needs the id of the newest post, and the header sits on every page - it must not
 * pull the whole `blog.json` for that. The build therefore writes `blog-latest.json` beside it,
 * which holds nothing but that id.
 *
 * Everything around `localStorage` is wrapped: in a private window, with site data blocked or a
 * full quota the accessor throws. Without it the dot simply stays away, which is the quieter of
 * the two mistakes.
 */

const STORAGE_KEY = 'blogSeen';

/** The id of the newest post at the reader's last visit to the overview, empty if never */
function getSeenBlogPost(): string {
    try {
        return window.localStorage.getItem(STORAGE_KEY) || '';
    } catch {
        return '';
    }
}

/** Called by the overview: everything up to this post has been offered to the reader */
export function markBlogPostsSeen(newestId: string): void {
    if (!newestId) {
        return;
    }
    try {
        window.localStorage.setItem(STORAGE_KEY, newestId);
    } catch {
        // then the dot comes back on the next page, and that is all that happens
    }
}

/**
 * Whether a post has appeared since the reader was last on the overview.
 *
 * @param url where the id of the newest post lies, or nothing at all - an app that has no blog of
 * its own passes nothing and never gets a dot
 */
export function useNewBlogPost(url?: string): boolean {
    const [hasNews, setHasNews] = useState(false);

    useEffect(() => {
        if (!url) {
            return;
        }
        let obsolete = false;

        fetch(url)
            .then(response => (response.ok ? response.json() : null))
            .then((latest: { id?: string } | null) => {
                if (obsolete || !latest?.id) {
                    return;
                }
                setHasNews(latest.id !== getSeenBlogPost());
            })
            .catch(() => {
                // no answer, no dot - this is a decoration, not a function
            });

        return () => {
            obsolete = true;
        };
    }, [url]);

    return hasNews;
}
