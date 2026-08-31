/**
 * Frontmatter of a markdown file - used by the blog posts as well as by the
 * legal pages, therefore it does not live next to the blog any more.
 */
export interface BlogMarkdownHeader {
    title?: string;
    logo?: string;
    author?: string;
    editLink?: string;
    translatedFrom?: string;
    [key: string]: string | undefined;
}

/** Split the frontmatter of a blog markdown file from its body */
export const extractHeader = (markdown: string): { header: BlogMarkdownHeader; body: string } => {
    const match = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]*/.exec(markdown);
    if (!match) {
        return { header: {}, body: markdown };
    }

    const header: BlogMarkdownHeader = {};
    match[1].split(/\r?\n/).forEach(line => {
        const pos = line.indexOf(':');
        if (pos > 0) {
            const key = line.substring(0, pos).trim();
            const value = line.substring(pos + 1).trim();
            if (key) {
                header[key] = value;
                // the files use "Author" as well as "author"
                header[key.charAt(0).toLowerCase() + key.substring(1)] = value;
            }
        }
    });

    return { header, body: markdown.substring(match[0].length) };
};
