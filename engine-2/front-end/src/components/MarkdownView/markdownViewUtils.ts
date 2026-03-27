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
    let pendingEmptyLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        // Проверяем, является ли строка разделителем заголовка таблицы (например, |---|---|)
        const isDelimiter = /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(line);

        if (isDelimiter) {
            // Форматируем разделитель
            if (!line.startsWith('|')) {
                line = `|${line}`;
            }
            if (!line.endsWith('|')) {
                line = `${line}|`;
            }

            expectedColumns = line.split('|').length - 2;

            let prevLine = processedLines.pop() || '';

            // Если перед разделителем были пустые строки (что ошибка), проглатываем их
            while (prevLine.trim() === '' && processedLines.length > 0) {
                prevLine = processedLines.pop() || '';
            }

            // Форматируем заголовок
            if (!prevLine.startsWith('|')) {
                prevLine = `| ${prevLine}`;
            }
            if (!prevLine.endsWith('|')) {
                prevLine = `${prevLine} |`;
            }

            processedLines.push(prevLine);
            processedLines.push(line);

            inTable = true;
            pendingEmptyLines = []; // Сбрасываем пустые строки при начале таблицы
            continue;
        }

        if (inTable) {
            if (line === '') {
                // Если мы в таблице и видим пустую строку - мы её запоминаем,
                // но не добавляем.
                pendingEmptyLines.push(lines[i]);
                continue;
            }

            const hasPipe = line.includes('|');
            const startsWithPipe = line.startsWith('|');

            if (!hasPipe && !startsWithPipe) {
                // Если строка не пустая и в ней нет пайпов - таблица точно закончилась
                inTable = false;
                expectedColumns = 0;

                // Вот теперь мы возвращаем пустые строки, так как они были после таблицы
                processedLines.push(...pendingEmptyLines);
                pendingEmptyLines = [];

                processedLines.push(lines[i]); // Добавляем текущую строку обычного текста
            } else {
                // любые пустые строки до этого были внтури таблицы, убираем их
                pendingEmptyLines = [];

                // Очищаем строку от крайних пайпов для правильного сплита
                let cellString = line;
                if (cellString.startsWith('|')) {
                    cellString = cellString.substring(1);
                }
                if (cellString.endsWith('|')) {
                    cellString = cellString.substring(0, cellString.length - 1);
                }

                // Разбиваем на ячейки
                const cells = cellString.split(/(?<!\\)\|/).map(c => c.trim());

                // Убираем пустые элементы по краям, если они появились из-за двойных ||
                if (cells.length > 0 && cells[0] === '') {
                    cells.shift();
                }
                if (cells.length > 0 && cells[cells.length - 1] === '') {
                    cells.pop();
                }

                // Применяем  логику разбивки
                if (expectedColumns > 0 && cells.length > expectedColumns) {
                    for (let j = 0; j < cells.length; j += expectedColumns) {
                        const chunk = cells.slice(j, j + expectedColumns);
                        while (chunk.length < expectedColumns) {
                            chunk.push('');
                        }
                        processedLines.push(`| ${chunk.join(' | ')} |`);
                    }
                } else if (expectedColumns > 0) {
                    // Дополняем недостающие ячейки
                    while (cells.length < expectedColumns) {
                        cells.push('');
                    }
                    processedLines.push(`| ${cells.join(' | ')} |`);
                } else {
                    processedLines.push(`| ${cells.join(' | ')} |`);
                }
            }
        } else {
            // Если мы не в таблице, просто пробрасываем строку как есть
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
    result = result.replace(/^\s*!>\s*/gm, '> ');
    result = result.replace(/^\s*\?>\s*/gm, '> ');
    result = result.replace(/^\s*\*>\s*/gm, '> ');
    result = result.replace(/^\s*[вњ“вњ”]\s*/gm, '> ');
    result = result.replace(/^\s*\*\*\*\s+/gm, '');

    result = result.replace(/([^\n])\n(```)/g, '$1\n\n$2');

    result = result.replace(/(```\s*\n---\s*\ntitle:[\s\S]*?\n---\s*\n)(?!\s*```)/g, '$1```\n\n');

    result = result.replace(/\n\s*```\s*$/g, '\n');

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
