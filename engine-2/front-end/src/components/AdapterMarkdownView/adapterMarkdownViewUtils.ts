import type React from 'react';
import { Children, isValidElement } from 'react';
import { removeFrontmatter } from '../../utils/markdown';

export const normalizeText = (node: React.ReactNode): string => {
    return Children.toArray(node)
        .map(child => {
            if (typeof child === 'string' || typeof child === 'number') {
                return String(child);
            }
            if (isValidElement<{ children?: React.ReactNode }>(child)) {
                return normalizeText(child.props.children);
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
        const line = lines[i];
        let trimmedLine = line.trim();

        // Проверяем, является ли строка разделителем таблицы (содержит только -, :, |)
        const isDelimiter = /^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(trimmedLine);

        // Проверяем, выглядит ли строка как заголовок таблицы (содержит |)
        const looksLikeTableHeader = trimmedLine.includes('|') && !isDelimiter && trimmedLine.split('|').length >= 2;

        if (isDelimiter) {
            // Это разделитель таблицы
            if (!trimmedLine.startsWith('|')) {
                trimmedLine = `|${trimmedLine}`;
            }
            if (!trimmedLine.endsWith('|')) {
                trimmedLine = `${trimmedLine}|`;
            }

            expectedColumns = trimmedLine.split('|').filter((c, idx) => idx > 0 || c !== '').length - 1;
            if (expectedColumns < 1) {
                expectedColumns = trimmedLine.split('|').length - 2;
            }

            // Получаем предыдущую строку (заголовок)
            let prevLine = processedLines.length > 0 ? processedLines[processedLines.length - 1].trim() : '';

            // Если предыдущая строка пустая, пропускаем её
            if (prevLine === '' && processedLines.length > 1) {
                processedLines.pop();
                prevLine = processedLines[processedLines.length - 1].trim();
            }

            // Форматируем заголовок
            if (prevLine && !prevLine.startsWith('|')) {
                const headerCells = prevLine
                    .split('|')
                    .map(c => c.trim())
                    .filter(c => c !== '');
                while (headerCells.length < expectedColumns) {
                    headerCells.push('');
                }
                prevLine = `| ${headerCells.join(' | ')} |`;
                processedLines[processedLines.length - 1] = prevLine;
            }

            processedLines.push(trimmedLine);
            inTable = true;
            continue;
        }

        if (inTable) {
            if (trimmedLine === '' || (!trimmedLine.includes('|') && !/^\s*\|/.test(trimmedLine))) {
                // Конец таблицы
                inTable = false;
                expectedColumns = 0;
                processedLines.push(line);
            } else {
                // Это строка таблицы
                const cells = trimmedLine.split(/(?<!\\)\|/).map(c => c.trim());

                // Удаляем пустые ячейки в начале и конце
                if (cells[0] === '') {
                    cells.shift();
                }
                if (cells.length > 0 && cells[cells.length - 1] === '') {
                    cells.pop();
                }

                // Если это первая строка после разделителя и у неё нет expectedColumns
                if (expectedColumns > 0 && cells.length !== expectedColumns) {
                    // Пытаемся разбить на нужное количество колонок
                    for (let j = 0; j < cells.length; j += expectedColumns) {
                        const chunk = cells.slice(j, j + expectedColumns);
                        while (chunk.length < expectedColumns) {
                            chunk.push('');
                        }
                        processedLines.push(`| ${chunk.join(' | ')} |`);
                    }
                } else if (expectedColumns > 0) {
                    while (cells.length < expectedColumns) {
                        cells.push('');
                    }
                    processedLines.push(`| ${cells.join(' | ')} |`);
                } else {
                    processedLines.push(`| ${cells.join(' | ')} |`);
                }
            }
        } else {
            // Проверяем, не начинается ли таблица без правильного заголовка
            if (looksLikeTableHeader && i + 1 < lines.length) {
                const nextLine = lines[i + 1].trim();
                const nextIsDelimiter = /^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(nextLine);
                if (nextIsDelimiter) {
                    // Это начало таблицы, форматируем заголовок
                    const headerCells = trimmedLine.split('|').map(c => c.trim());
                    if (headerCells[0] === '') {
                        headerCells.shift();
                    }
                    if (headerCells.length > 0 && headerCells[headerCells.length - 1] === '') {
                        headerCells.pop();
                    }
                    processedLines.push(`| ${headerCells.join(' | ')} |`);
                } else {
                    processedLines.push(line);
                }
            } else {
                processedLines.push(line);
            }
        }
    }

    return processedLines.join('\n');
};

const removeSections = (markdown: string, headings: string[]): string => {
    if (!headings.length) {
        return markdown;
    }
    const lines = markdown.split('\n');
    const removeSet = new Set(headings.map(h => h.trim().toLowerCase()));
    const result: string[] = [];
    let skipping = false;

    for (const line of lines) {
        const match = line.match(/^##\s+(.+)$/);
        if (match) {
            const headingText = match[1].trim().toLowerCase();
            skipping = removeSet.has(headingText);
            if (!skipping) {
                result.push(line);
            }
            continue;
        }
        if (skipping) {
            continue;
        }
        result.push(line);
    }
    return result.join('\n');
};

export const normalizeImageTags = (markdown: string, excludeHeadings: string[]): string => {
    let result = markdown;
    result = removeSections(result, excludeHeadings);
    result = removeFrontmatter(result);
    result = result.replace(/^\s*<!--.*?-->\s*$/gm, '');
    result = result.replace(/<image\b[^>]*>/gi, '');
    result = result.replace(/!\[([^\]]*)\]\s+\(([^)]+)\)/g, '![$1]($2)');
    result = result.replace(/\]\s+\(/g, '](');
    result = result.replace(/^(#{1,6})([^#\s])/gm, '$1 $2');
    result = result.replace(/<img\b[^>]*>/gi, tag => {
        const srcMatch = tag.match(/src=["']([^"']+)["']/i);
        if (!srcMatch) {
            return '';
        }
        const altMatch = tag.match(/alt=["']([^"']*)["']/i);
        const src = srcMatch[1];
        const alt = altMatch ? altMatch[1] : '';
        return `![${alt}](${src})`;
    });
    result = result.replace(/\bimg\s+[^\\r\\n]*?src=["']([^"']+)["'][^\\r\\n]*/gi, (_match, src) => {
        return `![](${src})`;
    });
    result = result.replace(/!\(\s*([^)\\s]+)\s*\)/g, (_match, src) => `![](${src})`);
    result = result.replace(/^\s*\[Image\s*#\d+\]\s*$/gim, '');
    result = result.replace(/\[Image\s*#\d+\]/gi, '');
    result = result.replace(/^\s*!>\s+/gm, '> ');
    result = result.replace(/^\s*\?>\s+/gm, '> ');
    result = result.replace(/^\s*\*>\s+/gm, '> ');
    result = result.replace(/^\s*[вњ"вњ"]\s+/gm, '> ');

    result = fixTableFormat(result);

    return result;
};

export const resolveMarkdownUrl = (src: string | undefined, baseUrl: string, origin: string): string => {
    if (!src) {
        return '';
    }
    if (/^https?:\/\//i.test(src)) {
        return src;
    }
    if (/^\/\//i.test(src)) {
        return `https:${src}`;
    }
    if (/^(data:|mailto:|tel:)/i.test(src)) {
        return src;
    }
    if (src.startsWith('/')) {
        return `${origin}${src}`;
    }
    if (/^[a-z]{2}(-[a-z]{2})?\//i.test(src)) {
        return `${origin}/${src}`;
    }
    try {
        return new URL(src, baseUrl).toString();
    } catch {
        return src;
    }
};

export const getCodeLanguage = (className: string | undefined): string => {
    if (!className) {
        return 'code';
    }
    const match = className.match(/language-([^\s]+)/);
    return match?.[1] ?? 'code';
};

export const isBadgeImage = (src: string | undefined): boolean => {
    if (!src) {
        return false;
    }
    return /shields\.io|badge|badges|travis|appveyor|nodei\.co\/npm|github\.com\/.*\/badge|donate|paypal/i.test(src);
};

export const isPaypalButton = (src: string | undefined): boolean => {
    if (!src) {
        return false;
    }
    return /paypalobjects\.com/i.test(src);
};
