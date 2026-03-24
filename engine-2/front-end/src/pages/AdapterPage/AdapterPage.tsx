import React, { useEffect, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useStyles } from './AdapterPage.styles';
import ArrowDownIcon from '../../assets/img/arrowIcon.svg';
import SymbolAdapter from '../../assets/img/adapterPageIcons/SymbolAdapter.png';
import SaveIcon from '../../assets/img/adapterPageIcons/IconDownload.svg';
import DownLoadIcon from '../../assets/img/adapterPageIcons/download.svg';
import StarIcon from '../../assets/img/adapterPageIcons/star.svg';
import GitHubIcon from '../../assets/img/adapterPageIcons/github.svg';
import HistoryIcon from '../../assets/img/adapterPageIcons/history.svg';
import LicenseIcon from '../../assets/img/adapterPageIcons/license.svg';
import EditIcon from '../../assets/img/adapterPageIcons/edit-fill.svg';
import LicenseModal from './LicenseModal';
import HistoryModal from './HistoryModal';
import { useAdapters } from '../../api/hooks/useAdapters';
import { API_CONFIG } from '../../config/api';
import { I18n } from '../../utils/i18n';
import { AdapterMarkdownView } from '../../components/AdapterMarkdownView';
import { removeFrontmatter } from '../../utils/markdown';

const normalizeKey = (key: string): string => key.trim().toLowerCase();

const parseFrontmatter = (markdown: string | undefined): Record<string, string> => {
    if (!markdown) {
        return {};
    }
    const cleaned = markdown.replace(/^\uFEFF/, '').trimStart();
    const match = cleaned.match(/^---\s*[\r\n]+([\s\S]*?)\r?\n---\s*/);
    if (!match) {
        return {};
    }
    const block = match[1]?.trim() ?? '';
    const data: Record<string, string> = {};
    for (const rawLine of block.split('\n')) {
        const line = rawLine.trim();
        if (!line) continue;
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) continue;
        const key = line.slice(0, colonIndex).trim();
        const value = line.slice(colonIndex + 1).trim();
        if (key) {
            data[key] = value;
            data[normalizeKey(key)] = value;
        }
    }
    return data;
};

const extractSection = (markdown: string | undefined, heading: string): string => {
    if (!markdown) return '';
    const cleaned = removeFrontmatter(markdown);
    const headingRegex = new RegExp(`^##\\s+${heading}\\s*$`, 'im');
    const match = headingRegex.exec(cleaned);
    if (!match) return '';
    const start = match.index + match[0].length;
    const rest = cleaned.slice(start);
    const nextHeading = rest.search(/^##\s+/m);
    if (nextHeading === -1) {
        return rest.trim();
    }
    return rest.slice(0, nextHeading).trim();
};

type ChangelogItem = {
    version: string;
    date?: string;
    changes: string[];
};

const parseChangelog = (markdown: string | undefined): ChangelogItem[] => {
    const section = extractSection(markdown, 'Changelog');
    if (!section) return [];
    const lines = section.split('\n');
    const items: ChangelogItem[] = [];
    let current: ChangelogItem | null = null;

    for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line) continue;
        if (line.startsWith('###')) {
            const title = line.replace(/^###\s*/, '').replace(/\*\*/g, '').trim();
            const match = title.match(/^(.*)\(([^)]+)\)\s*$/);
            if (current) items.push(current);
            current = {
                version: (match?.[1] || title).trim(),
                date: match?.[2]?.trim(),
                changes: [],
            };
            continue;
        }
        if (line.startsWith('- ') || line.startsWith('* ')) {
            if (!current) {
                current = { version: 'Changelog', changes: [] };
            }
            current.changes.push(line.slice(2).trim());
        }
    }
    if (current) items.push(current);
    return items;
};

const parseLicenseParagraphs = (markdown: string | undefined): string[] => {
    const section = extractSection(markdown, 'License');
    if (!section) return [];
    return section
        .split(/\n\s*\n+/)
        .map(p => p.trim())
        .filter(Boolean);
};

const getLocalizedText = (value: Record<string, string> | undefined, language: string): string => {
    if (!value) {
        return '';
    }
    return value[language] || value.en || value.de || value.ru || Object.values(value)[0] || '';
};

const formatDate = (value: string | undefined): string => {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd}`;
};

const formatNumber = (value: number | undefined): string => {
    if (value === undefined || value === null) return '';
    return new Intl.NumberFormat('de-DE').format(value);
};

const resolveAssetUrl = (path: string | undefined, baseOrigin: string, language: string): string => {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    if (path.startsWith('/')) return `${baseOrigin}${path}`;
    if (/^[a-z]{2}(-[a-z]{2})?\//i.test(path)) return `${baseOrigin}/${path}`;
    return `${baseOrigin}/${language}/${path}`;
};

const AdapterPage = (): React.ReactNode => {
    const { classes } = useStyles();
    const { adapterId = '' } = useParams();
    const [isLicenseOpen, setIsLicenseOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [language, setLanguage] = useState(I18n.getLanguage());
    const { data: adaptersData } = useAdapters();

    useEffect(() => I18n.subscribe(setLanguage), []);

    const adapterInfo = useMemo(() => {
        if (!adaptersData?.pages || !adapterId) {
            return null;
        }
        for (const [categoryKey, category] of Object.entries(adaptersData.pages)) {
            for (const adapter of Object.values(category.pages || {})) {
                if (adapter?.title?.en === adapterId) {
                    return {
                        adapter,
                        categoryKey,
                        categoryTitle: getLocalizedText(category.title, language),
                    };
                }
            }
        }
        return null;
    }, [adaptersData, adapterId, language]);

    const baseOrigin = /^https?:\/\//i.test(API_CONFIG.IOBROKER_BASE_URL)
        ? API_CONFIG.IOBROKER_BASE_URL
        : 'https://www.iobroker.net';

    const markdownUrl = adapterInfo?.adapter?.content
        ? `${API_CONFIG.IOBROKER_BASE_URL}/${language}/${adapterInfo.adapter.content}`
        : '';

    const { data: markdown } = useQuery<string>({
        queryKey: ['adapter-markdown', markdownUrl],
        queryFn: async () => {
            const response = await fetch(markdownUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch adapter markdown');
            }
            return response.text();
        },
        enabled: Boolean(markdownUrl),
        staleTime: Infinity,
    });

    const frontmatter = useMemo(() => parseFrontmatter(markdown), [markdown]);

    const adapterTitle =
        frontmatter.title ||
        getLocalizedText(adapterInfo?.adapter?.title, language) ||
        adapterId;
    const adapterDescription =
        frontmatter.description ||
        getLocalizedText(adapterInfo?.adapter?.description, language);
    const adapterLicense = frontmatter.license || adapterInfo?.adapter?.license || '';
    const adapterAuthors = frontmatter.authors || adapterInfo?.adapter?.authors || '';
    const adapterVersion = frontmatter.version || adapterInfo?.adapter?.version || '';
    const adapterLatestVersion = frontmatter.latestVersion || adapterInfo?.adapter?.latestVersion || '';
    const adapterPublished = frontmatter.published || adapterInfo?.adapter?.published || '';
    const adapterGitHub = frontmatter.readme || adapterInfo?.adapter?.github || '#';
    const adapterEditLink = frontmatter.editLink || adapterGitHub;

    const logoUrl =
        resolveAssetUrl(frontmatter.logo, baseOrigin, language) ||
        resolveAssetUrl(adapterInfo?.adapter?.icon, baseOrigin, language);

    const getBadge = (keys: string[], patterns: RegExp[] = []): string => {
        for (const key of keys) {
            const value = frontmatter[key] || frontmatter[normalizeKey(key)];
            if (value) return value;
        }
        if (patterns.length > 0) {
            for (const [rawKey, value] of Object.entries(frontmatter)) {
                const key = normalizeKey(rawKey);
                if (!key.startsWith('badge-')) continue;
                if (patterns.some((pattern) => pattern.test(key))) {
                    return value;
                }
            }
        }
        return '';
    };

    const badgeNpm = getBadge(['BADGE-NPM'], [/badge-npm$/]);
    const badgeVersion = getBadge(
        ['BADGE-NPM version', 'BADGE-NPM-Version'],
        [/badge-.*npm.*version/]
    );
    const badgeDownloads = getBadge(['BADGE-Downloads'], [/badge-.*download/]);
    const badgeInstalls = getBadge(
        ['BADGE-Number of Installations', 'BADGE-Number-of-Installations', 'BADGE-Anzahl der Installationen'],
        [/badge-.*install/]
    );
    const badgeBuild = getBadge(
        ['BADGE-Travis CI Build Status', 'BADGE-Travis-CI-Build-Status', 'BADGE-AppVeyor Build Status', 'BADGE-AppVeyor-Build-Status'],
        [/badge-.*travis.*build/, /badge-.*appveyor.*build/]
    );

    const markdownBaseUrl = adapterInfo?.adapter?.content
        ? `${baseOrigin}/${language}/${adapterInfo.adapter.content}`
        : baseOrigin;

    const changelogItems = useMemo(() => parseChangelog(markdown), [markdown]);
    const licenseParagraphs = useMemo(() => parseLicenseParagraphs(markdown), [markdown]);

    return (
        <Box className={classes.pageGrid}>
            <Box className={classes.introArea}>
                <Box className={classes.breadcrumbs}>
                    <span className={classes.breadcrumbSlash}>//</span> ADAPTER
                    <span className={classes.breadcrumbSlash}>/</span> {(adapterInfo?.categoryTitle || '').toUpperCase()}
                    <span className={classes.breadcrumbsEnd}> / {(adapterTitle || '').toUpperCase()}</span>
                </Box>
                <Typography className={classes.subTitle}>
                    {adapterDescription}
                </Typography>
            </Box>

            <Box className={classes.sidebarArea}>
                <Box className={classes.sidebarLeft}>
                    <Box className={classes.sidebarCard}>
                        <Box className={classes.logoContainer}>
                            <Box className={classes.logo}>
                                <img src={logoUrl || SymbolAdapter} alt={adapterTitle} />
                            </Box>
                        </Box>

                        <Box className={classes.infoRow}>
                            <span className={classes.infoLabel}>Version:</span>
                            <span className={classes.infoValue}>{adapterVersion}</span>
                        </Box>
                        <Box className={classes.infoRow}>
                            <span className={classes.infoLabel}>Entwickler:</span>
                            <span className={classes.infoValue}>{adapterAuthors}</span>
                        </Box>
                        <Box className={classes.infoRow}>
                            <span className={classes.infoLabel}>Erster Release:</span>
                            <span className={classes.infoValue}>{formatDate(adapterPublished)}</span>
                        </Box>
                        <Box className={classes.infoRow}>
                            <span className={classes.infoLabel}>Aktueller Release:</span>
                            <span className={classes.infoValue}>{adapterLatestVersion || adapterVersion}</span>
                        </Box>

                        <Box className={classes.statsContainer}>
                            <Box className={classes.statItem}>
                                <img src={StarIcon} alt="Star Icon" /> {formatNumber(adapterInfo?.adapter?.stars)}
                            </Box>
                            <Box className={classes.statItem}>
                                <img src={DownLoadIcon} alt="DownLoadIcon" /> {formatNumber(adapterInfo?.adapter?.weekDownloads)}
                            </Box>
                            <Box className={classes.statItem}>
                                <img src={SaveIcon} alt="Save Icon" /> {formatNumber(adapterInfo?.adapter?.installs)}
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box className={classes.sidebarRight}>
                    <Box component="a" href={adapterGitHub} className={classes.sidebarLink} target="_blank" rel="noreferrer">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <img className={classes.sidebarLinkIcon} src={GitHubIcon} alt="Github Icon" />
                            GITHUB
                        </Box>
                        <img className={classes.arrowIconRight} src={ArrowDownIcon} alt="ArrowIconRight" />
                    </Box>
                    <Box component="div" className={classes.sidebarLink} onClick={() => setIsLicenseOpen(true)}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <img className={classes.sidebarLinkIcon} src={LicenseIcon} alt="License Icon" />
                            LIZENZ: {adapterLicense || '-'}
                        </Box>
                        <img className={classes.arrowIcon} src={ArrowDownIcon} alt="ArrowDownIcon" />
                    </Box>
                    <Box component="div" className={classes.sidebarLink} onClick={() => setIsHistoryOpen(true)} >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <img className={classes.sidebarLinkIcon} src={HistoryIcon} alt="History Icon" />
                            HISTORY
                        </Box>
                        <img className={classes.arrowIcon} src={ArrowDownIcon} alt="ArrowDownIcon" />
                    </Box>

                    <Box className={classes.badgesContainer}>
                        <Typography className={classes.badgeInfoLabel} sx={{ textTransform: 'uppercase' }}>Abzeichen:</Typography>
                        {badgeNpm && <img className={classes.npmImage} src={badgeNpm} alt="npm" />}
                        {badgeVersion && <img src={badgeVersion} alt="NPM version" className={classes.badgeImage} />}
                        {badgeBuild && <img src={badgeBuild} alt="Build status" className={classes.badgeImage} />}
                        {badgeDownloads && <img src={badgeDownloads} alt="Downloads" className={classes.badgeImage} />}
                        {badgeInstalls && <img src={badgeInstalls} alt="Installed" className={classes.badgeImage} />}
                    </Box>
                </Box>
            </Box>

            <Box className={classes.mainContentArea}>
                <AdapterMarkdownView
                    markdown={markdown}
                    baseUrl={markdownBaseUrl}
                    origin={baseOrigin}
                    excludeHeadings={['Changelog', 'License']}
                    classNames={{
                        head: classes.sectionTitle,
                        heading: classes.subTitle,
                        paragraph: classes.paragraph,
                        list: classes.list,
                        listItem: classes.listItem,
                        image: classes.image,
                        table: classes.table,
                        tableHead: classes.tableHead,
                        tableRow: classes.tableRow,
                        tableHeaderCell: classes.tableHeaderCell,
                        tableCell: classes.tableCell,
                        codeBlockContainer: classes.codeBlockContainer,
                        codeBlockHeader: classes.codeBlockHeader,
                        codeBlockContent: classes.codeBlockContent,
                        inlineCode: classes.inlineCode,
                        blockquote: classes.blockquote,
                    }}
                />
                <button
                    className={classes.editButton}
                    onClick={() => {
                        if (adapterEditLink && adapterEditLink !== '#') {
                            window.open(adapterEditLink, '_blank', 'noreferrer');
                        }
                    }}
                >
                    <img src={EditIcon} alt="Edit Icon" />
                    BEARBEITEN AUF GITHUB
                    <img className={classes.arrowIconEdit} style={{ marginLeft: '34px' }} src={ArrowDownIcon} alt="ArrowIconRight" />
                </button>
            </Box>
            <LicenseModal open={isLicenseOpen} onClose={() => setIsLicenseOpen(false)} paragraphs={licenseParagraphs} />
            <HistoryModal open={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} items={changelogItems} />
        </Box>
    );
};

export default AdapterPage;
