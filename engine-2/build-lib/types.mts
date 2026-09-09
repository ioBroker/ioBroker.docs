/*!
 * Copyright 2019-2026, bluefox <dogafox@gmail.com>
 * Shared types of the documentation build scripts
 */

/** Language code, that is used in the documentation and in the UI */
export type LanguageCode = 'en' | 'de' | 'ru' | 'pt' | 'nl' | 'fr' | 'it' | 'es' | 'pl' | 'uk' | 'zh-cn';

/** One text in many languages: language => text */
export type Translated = Record<string, string>;

/** All words of one language: word => translated text */
export type LanguageWords = Record<string, string>;

/** All words of all languages: word => language => translated text */
export type MultiLanguageWords = Record<string, LanguageWords>;

/** YAML like header of a markdown file */
export interface MarkdownHeader {
    title?: string;
    /** Link to the source file on GitHub */
    editLink?: string;
    /** Language, this document was translated from */
    translatedFrom?: string;
    translatedWarning?: string;
    /** Hash of the source document, to detect changes */
    hash?: string;
    /** The document is maintained here and not in the adapter repository */
    local?: boolean;
    /** The document is only a template and must not be listed in the content */
    template?: boolean;
    adapter?: boolean;
    logo?: string;
    type?: string;
    chapters?: string;
    affiliate?: string;
    license?: string;
    authors?: string;
    description?: string;
    keywords?: string;
    readme?: string;
    mode?: string;
    materialize?: boolean;
    compact?: boolean;
    published?: string;
    version?: string;
    latestVersion?: string;
    versionDate?: string;
    latestVersionDate?: string;
    /** BADGE-* attributes and everything else, that is written in the header */
    [attr: string]: string | boolean | number | undefined;
}

/** Result of `utils.extractHeader` */
export interface MarkdownFile {
    header: MarkdownHeader;
    body: string;
}

/** Translation task: translate every document from one language into another */
export interface SyncTask {
    fromLang: LanguageCode;
    toLang: LanguageCode;
}

// --------------------------------------------------------------------------------------------- markdown parts

/** Link or image, that was extracted from a markdown line before the translation */
export interface MarkdownLink {
    text: string;
    link: string;
    title?: string;
    /** Original text before the translation */
    original?: string;
    translated?: boolean;
    /** Original title before the translation */
    originalTitle?: string;
    translatedTitle?: boolean;
}

/** Inline code, that was extracted from a markdown line before the translation */
export interface MarkdownCode {
    code: string;
    /** True for `code` and false for ```code``` */
    single: boolean;
}

export type MarkdownPartType = 'decoration' | 'list' | 'code' | 'table' | 'header' | 'p';

/** One logical block of a markdown document, that is translated at once */
export interface MarkdownPart {
    type: MarkdownPartType;
    lines: string[];
    /** Random ID, that is used to find this part again in the translated document */
    id?: number;
    /** Original lines, stored in the translated document as "<!-- SOURCE: ... -->" */
    source?: string[];
    /** The user modified the translation by hand, so do not translate it again */
    doNotTranslate?: boolean;
    images?: MarkdownLink[];
    links?: MarkdownLink[];
    codes?: MarkdownCode[];
    /** Translated text */
    text?: string;
    /** Original text before the translation */
    original?: string;
    translated?: boolean;
}

/** Result of `translation.translateMD` */
export interface TranslatedMarkdown {
    /** Translated document */
    result: string;
    /** Source document, normalized in the same way as the translation */
    source: string;
}

// --------------------------------------------------------------------------------------------- content files

/** One entry of docs/content.md, blog.json or adapters.json */
export interface ContentPage {
    title: Translated;
    /** Relative path to the markdown file */
    content?: string;
    pages?: Record<string, ContentPage>;
}

export interface Content {
    pages: Record<string, ContentPage>;
}

/** One blog post in blog.json */
export interface BlogPage {
    date: string;
    title: Translated;
    logo: string;
    type: string;
    /** Name of the source file in the blog directory */
    originalName: string;
    desc: Translated;
}

export interface BlogContent {
    pages: Record<string, BlogPage>;
}

// --------------------------------------------------------------------------------------------- adapter repository

export interface RepoAuthor {
    name: string;
    email: string;
}

/** One adapter entry of https://iobroker.live/repo/sources-dist-latest.json */
export interface RepoAdapter {
    name: string;
    type: string;
    /** Link to io-package.json */
    meta: string;
    /** Link to README.md */
    readme: string;
    /** Link to the logo */
    extIcon?: string;
    license?: string;
    author?: RepoAuthor | string;
    authors?: (RepoAuthor | string)[];
    desc?: Translated;
    title?: string;
    titleLang?: Translated;
    keywords?: string[];
    mode?: string;
    materialize?: boolean;
    compact?: boolean;
    published?: string;
    created?: string;
    version?: string;
    latestVersion?: string;
    versionDate?: string;
    latestVersionDate?: string;
    /** Additional documents in the adapter repository: language => file name(s) */
    docs?: Record<string, string | string[]>;
    weekDownloads?: number;
    stars?: number;
    issues?: number;
    score?: number;
}

export type Repository = Record<string, RepoAdapter>;

/** https://iobroker.live/statistics.json */
export interface Statistics {
    adapters: Record<string, number>;
}

/** One adapter in adapters.json */
export interface AdapterPage {
    title: Translated;
    content: string;
    icon?: string;
    keywords?: string;
    authors?: string;
    license?: string;
    published?: string;
    version?: string;
    latestVersion?: string;
    versionDate?: string;
    latestVersionDate?: string;
    materialize?: boolean;
    compact?: boolean;
    description?: Translated;
    titleFull?: Translated | string;
    created?: string;
    branch?: string;
    github?: string;
    installs?: number;
    weekDownloads?: number;
    stars?: number;
    issues?: number;
    score?: number;
}

/** One adapter type ("climate-control", "overview", ...) in adapters.json */
export interface AdapterTypePage {
    title: Translated;
    content?: string;
    pages?: Record<string, AdapterPage>;
}

export interface AdapterContent {
    pages: Record<string, AdapterTypePage>;
}

/** One downloaded or locally stored README of an adapter */
export interface AdapterReadme {
    body: string;
    /** URL, the document was downloaded from */
    link?: string;
    /** Common part of all `link`s of one adapter */
    relative?: string;
    /** Link to edit this document on GitHub */
    editLink?: string;
    downloaded?: boolean;
}

/** Prepared README, that is ready to be written into the documentation */
export interface PreparedReadme {
    body: string;
    /** File name relative to the adapter directory */
    name: string;
    logo?: string;
}
