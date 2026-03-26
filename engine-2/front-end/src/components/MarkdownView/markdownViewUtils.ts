import type React from 'react';
import { Children, isValidElement } from 'react';
import { removeFrontmatter } from '../../utils/markdown';

export const normalizeText = (node: React.ReactNode): string => {
    return Children.toArray(node)
        .map((child) => {
            if (typeof child === 'string' || typeof child === 'number') {
                return String(child);
            }
            if (isValidElement(child)) {
                return normalizeText((child.props as any).children);
            }
            return '';
        })
        .join('');
};

const fixTableFormat = (markdown: string): string => {
    const lines = markdown.split('\n');
    const processedLines: string[] = [];
    let expectedColumns = 0;
    let inTable = false;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        const isDelimiter = /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(line);

        if (isDelimiter) {
            if (!line.startsWith('|')) line = '|' + line;
            if (!line.endsWith('|')) line = line + '|';

            expectedColumns = line.split('|').length - 2;

            let prevLine = processedLines.pop() || '';

            if (prevLine.trim() === '' && processedLines.length > 0) {
                prevLine = processedLines.pop() || '';
            }

            if (!prevLine.startsWith('|')) prevLine = '| ' + prevLine;
            if (!prevLine.endsWith('|')) prevLine = prevLine + ' |';

            processedLines.push(prevLine);
            processedLines.push(line);
            inTable = true;
            continue;
        }

        if (inTable) {
            if (line === '') {
                inTable = false;
                processedLines.push(lines[i]);
            } else {
                let cells = line.split(/(?<!\\)\|/).map(c => c.trim());

                if (cells[0] === '') cells.shift();
                if (cells[cells.length - 1] === '') cells.pop();

                for (let j = 0; j < cells.length; j += expectedColumns) {
                    const chunk = cells.slice(j, j + expectedColumns);

                    while (chunk.length < expectedColumns) chunk.push('');
                    processedLines.push('| ' + chunk.join(' | ') + ' |');
                }
            }
        } else {
            processedLines.push(lines[i]);
        }
    }

    return processedLines.join('\n');
};

export const normalizeImageTags = (markdown: string): string => {
    let result = markdown;
    result = removeFrontmatter(result);
    result = result.replace(/^\s*<!--.*?-->\s*$/gm, '');
    result = result.replace(/<image\b[^>]*>/gi, '');
    result = result.replace(/<img\b[^>]*>/gi, (tag) => {
        const srcMatch = tag.match(/src=["']([^"']+)["']/i);
        if (!srcMatch) return '';
        const altMatch = tag.match(/alt=["']([^"']*)["']/i);
        const src = srcMatch[1];
        const alt = altMatch ? altMatch[1] : '';
        return `![${alt}](${src})`;
    });
    result = result.replace(/\bimg\s+[^\\r\\n]*?src=["']([^"']+)["'][^\\r\\n]*/gi, (_match, src) => {
        return `![](${src})`;
    });
    result = result.replace(/!\(\s*([^)\\s]+)\s*\)/g, (_match, src) => `![](${src})`);
    result = result.replace(/^\s*\[Image\s*#\d+\]\s*$/gmi, '');
    result = result.replace(/\[Image\s*#\d+\]/gi, '');
    result = result.replace(/^\s*!>\s+/gm, '> ');
    result = result.replace(/^\s*\?>\s+/gm, '> ');
    result = result.replace(/^\s*\*>\s+/gm, '> ');
    result = result.replace(/^\s*[вњ“вњ”]\s+/gm, '> ');

    result = fixTableFormat(result);

    return result;
};

export const resolveMarkdownUrl = (src: string | undefined, baseUrl: string, origin: string): string => {
    if (!src) return '';
    if (/^https?:\/\//i.test(src)) return src;
    if (/^\/\//i.test(src)) return `https:${src}`;
    if (/^(data:|mailto:|tel:)/i.test(src)) return src;
    if (src.startsWith('/')) return `${origin}${src}`;
    if (/^[a-z]{2}(-[a-z]{2})?\//i.test(src)) return `${origin}/${src}`;
    try {
        return new URL(src, baseUrl).toString();
    } catch {
        return src;
    }
};
