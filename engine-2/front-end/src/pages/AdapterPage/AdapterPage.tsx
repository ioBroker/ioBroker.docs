import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
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
import { Footer } from '../../components/Footer/Footer';
import Divider from '../../components/Divider/Divider';
import HistoryModal from './HistoryModal';
import { useAdapters } from '../../api/hooks/useAdapters';
import { useAdapterMarkdown } from '../../api/hooks/useAdapterMarkdown';
import { API_CONFIG } from '../../config/api';
import { I18n } from '../../utils/i18n';
import { AdapterMarkdownView } from '../../components/AdapterMarkdownView/AdapterMarkdownView';
import { removeFrontmatter } from '../../utils/markdown';
import {
    buildEditLink,
    formatDate,
    formatNumber,
    getBadge,
    getLocalizedText,
    parseChangelog,
    parseFrontmatter,
    parseLicenseParagraphs,
    resolveAssetUrl,
    stripEmails,
} from './adapterPageUtils';

const AdapterPage = (): React.ReactNode => {
    const { classes } = useStyles();
    const { adapterId = '' } = useParams();
    const navigate = useNavigate();
    const [isLicenseOpen, setIsLicenseOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [language, setLanguage] = useState(I18n.getLanguage());
    const { data: adaptersData } = useAdapters();
    const authorsRef = useRef<HTMLSpanElement>(null);
    const pageGridRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isAuthorsOverflow, setIsAuthorsOverflow] = useState(false);

    const handlePageGridScroll = useCallback(() => {
        const el = pageGridRef.current;
        if (!el) return;
        const scrollHeight = el.scrollHeight - el.clientHeight;
        const percent = scrollHeight > 0 ? Math.round((el.scrollTop / scrollHeight) * 100) : 0;
        setScrollProgress(Math.min(100, Math.max(0, percent)));
    }, []);

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
                        categoryTitle: getLocalizedText(category.title as Record<string, string>, language),
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

    const { data: markdown } = useAdapterMarkdown(markdownUrl);

    const frontmatter = useMemo(() => parseFrontmatter(markdown), [markdown]);

    const adapterTitle =
        frontmatter.title ||
        getLocalizedText(adapterInfo?.adapter?.title as Record<string, string>, language) ||
        adapterId;
    const adapterDescription =
        frontmatter.description ||
        getLocalizedText(adapterInfo?.adapter?.description as Record<string, string>, language);
    const adapterLicense = frontmatter.license || adapterInfo?.adapter?.license || '';
    const adapterAuthors = frontmatter.authors || adapterInfo?.adapter?.authors || '';
    const adapterVersion = frontmatter.version || adapterInfo?.adapter?.version || '';
    const adapterLatestVersion = frontmatter.latestVersion || adapterInfo?.adapter?.latestVersion || '';
    const adapterPublished = frontmatter.published || adapterInfo?.adapter?.published || '';
    const adapterGitHub = frontmatter.readme || adapterInfo?.adapter?.github || '#';
    const adapterEditLink = buildEditLink(frontmatter.editLink, frontmatter.readme, adapterInfo?.adapter?.github);
    const adapterAuthorsDisplay = stripEmails(adapterAuthors);
    const editButtonLabel = useMemo(() => I18n.t('adapters.edit_on_github'), [language]);

    useEffect(() => {
        if (authorsRef.current && !isAuthorsOverflow) {
            const checkOverflow = (): void => {
                const computedStyle = getComputedStyle(authorsRef.current!);
                const lineHeight = parseFloat(computedStyle.lineHeight);
                const maxHeight = lineHeight * 2;
                const scrollHeight = authorsRef.current!.scrollHeight;
                const isOverflow = scrollHeight > maxHeight;
                if (isOverflow) {
                    setIsAuthorsOverflow(true);
                }
            };
            setTimeout(checkOverflow, 0);
        }
    }, [adapterAuthorsDisplay, isAuthorsOverflow]);

    const logoUrl =
        resolveAssetUrl(frontmatter.logo, baseOrigin, language) ||
        resolveAssetUrl(adapterInfo?.adapter?.icon, baseOrigin, language);

    const badgeNpm = getBadge(frontmatter, ['BADGE-NPM', 'BADGE-НПМ'], [/badge-npm$/, /badge-нпм$/]);
    const badgeVersion = getBadge(
        frontmatter,
        ['BADGE-NPM version', 'BADGE-NPM-Version', 'BADGE-версия NPM', 'BADGE-NPM версия'],
        [/badge-.*npm.*version/, /badge-.*верси.*npm/, /badge-.*npm.*верси/],
    );
    const badgeDownloads = getBadge(
        frontmatter,
        ['BADGE-Downloads', 'BADGE-Загрузки'],
        [/badge-.*download/, /badge-.*загруз/],
    );
    const badgeInstalls = getBadge(
        frontmatter,
        [
            'BADGE-Number of Installations',
            'BADGE-Number-of-Installations',
            'BADGE-Anzahl der Installationen',
            'BADGE-Количество установок',
            'BADGE-Кол-во установок',
        ],
        [/badge-.*install/, /badge-.*установ/],
    );
    const badgeBuild = getBadge(
        frontmatter,
        [
            'BADGE-Travis CI Build Status',
            'BADGE-Travis-CI-Build-Status',
            'BADGE-AppVeyor Build Status',
            'BADGE-AppVeyor-Build-Status',
        ],
        [/badge-.*travis.*build/, /badge-.*appveyor.*build/],
    );

    const markdownBaseUrl = adapterInfo?.adapter?.content
        ? `${baseOrigin}/${language}/${adapterInfo.adapter.content}`
        : baseOrigin;

    const changelogItems = useMemo(() => parseChangelog(markdown, removeFrontmatter), [markdown]);
    const licenseParagraphs = useMemo(() => parseLicenseParagraphs(markdown, removeFrontmatter), [markdown]);

    const handleItemClick = (): void => {
        if (!adapterInfo?.categoryKey) {
            void navigate('/adapters');
            return;
        }
        void navigate('/adapters', {
            state: {
                categoryKey: adapterInfo.categoryKey,
                categoryLabel: (adapterInfo?.categoryTitle || '').toUpperCase(),
            },
        });
    };

    return (
        <Box className={classes.pageRoot}>
            <Box className={classes.titleContainer}>
                <Box className={classes.breadcrumbs}>
                    <span className={classes.breadcrumbSlash}>//</span>{' '}
                    <span
                        onClick={() => navigate('/adapters')}
                        style={{ cursor: 'pointer' }}
                    >
                        {I18n.t('adapters.label').toUpperCase()}
                    </span>
                    <span className={classes.breadcrumbSlash}>/</span>
                    <span
                        onClick={handleItemClick}
                        style={{ cursor: 'pointer' }}
                    >
                        {(adapterInfo?.categoryTitle || '').toUpperCase()}
                    </span>
                    <span className={classes.breadcrumbsEnd}> / {(adapterTitle || '').toUpperCase()}</span>
                </Box>
            </Box>
            <Box className={classes.pageGrid} ref={pageGridRef} onScroll={handlePageGridScroll}>
                <Box className={classes.leftColumn}>
                    <Box className={classes.introArea}>
                        <Typography className={classes.subTitle}>{adapterDescription}</Typography>
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
                            copyConfirmation: classes.copyConfirmation,
                        }}
                    />
                    <Typography
                        className={classes.subTitle}
                        sx={{ mt: 4 }}
                    >
                        {I18n.t('adapters.feedback_title')}
                    </Typography>
                    <Typography className={classes.paragraph}>
                        {I18n.t('adapters.feedback_text')
                            .split('\n')
                            .map((line, i) => (
                                <React.Fragment key={i}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                    </Typography>
                    <button
                        className={classes.editButton}
                        onClick={() => {
                            if (adapterEditLink && adapterEditLink !== '#') {
                                window.open(adapterEditLink, '_blank', 'noreferrer');
                            }
                        }}
                    >
                        <img
                            src={EditIcon}
                            alt="Edit Icon"
                        />
                        {editButtonLabel}
                        <img
                            className={classes.arrowIconEdit}
                            style={{ marginLeft: '34px' }}
                            src={ArrowDownIcon}
                            alt="ArrowIconRight"
                        />
                    </button>
                </Box>
            </Box>

            <Box className={classes.sidebarArea}>
                <Box className={classes.sidebarLeft}>
                    <Box className={classes.sidebarCard}>
                        <Box className={classes.logoContainer}>
                            <Box className={classes.logo}>
                                <img
                                    src={logoUrl || SymbolAdapter}
                                    alt={adapterTitle}
                                />
                            </Box>
                        </Box>

                        <Box className={classes.infoRow}>
                            <span className={classes.infoLabel}>{I18n.t('adapters.version')}:</span>
                            <span className={classes.infoValue}>{adapterVersion}</span>
                        </Box>
                        <Box className={classes.infoRow}>
                            <span className={classes.infoLabel}>{I18n.t('adapters.developer')}:</span>
                            <span
                                ref={authorsRef}
                                className={`${classes.infoValue} ${isAuthorsOverflow ? classes.infoValueOverflow : ''}`}
                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}
                            >
                                {adapterAuthorsDisplay.split(',').map((author, i) => (
                                    <span key={i}>{author.trim()}</span>
                                ))}
                            </span>
                        </Box>
                        <Box className={classes.infoRow}>
                            <span className={classes.infoLabel}>{I18n.t('adapters.first_release')}:</span>
                            <span className={classes.infoValue}>{formatDate(adapterPublished)}</span>
                        </Box>
                        <Box className={classes.infoRow}>
                            <span className={classes.infoLabel}>{I18n.t('adapters.current_release')}:</span>
                            <span className={classes.infoValue}>{adapterLatestVersion || adapterVersion}</span>
                        </Box>

                        <Box className={classes.statsContainer}>
                            <Box className={classes.statItem}>
                                <img
                                    src={StarIcon}
                                    alt="Star Icon"
                                />{' '}
                                {formatNumber(adapterInfo?.adapter?.stars)}
                            </Box>
                            <Box className={classes.statItem}>
                                <img
                                    src={DownLoadIcon}
                                    alt="DownLoadIcon"
                                />{' '}
                                {formatNumber(adapterInfo?.adapter?.weekDownloads)}
                            </Box>
                            <Box className={classes.statItem}>
                                <img
                                    src={SaveIcon}
                                    alt="Save Icon"
                                />{' '}
                                {formatNumber(adapterInfo?.adapter?.installs)}
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box className={classes.sidebarRight}>
                    <Box
                        component="a"
                        href={adapterGitHub}
                        className={classes.sidebarLink}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <img
                                className={classes.sidebarLinkIcon}
                                src={GitHubIcon}
                                alt="Github Icon"
                            />
                            GITHUB
                        </Box>
                        <img
                            className={classes.arrowIconRight}
                            src={ArrowDownIcon}
                            alt="ArrowIconRight"
                        />
                    </Box>
                    <Box
                        component="div"
                        className={classes.sidebarLink}
                        onClick={() => setIsLicenseOpen(true)}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <img
                                className={classes.sidebarLinkIcon}
                                src={LicenseIcon}
                                alt="License Icon"
                            />
                            {I18n.t('adapters.license')}: {adapterLicense || '-'}
                        </Box>
                        <img
                            className={classes.arrowIcon}
                            src={ArrowDownIcon}
                            alt="ArrowDownIcon"
                        />
                    </Box>
                    <Box
                        component="div"
                        className={classes.sidebarLink}
                        onClick={() => setIsHistoryOpen(true)}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <img
                                className={classes.sidebarLinkIcon}
                                src={HistoryIcon}
                                alt="History Icon"
                            />
                            {I18n.t('adapters.history')}
                        </Box>
                        <img
                            className={classes.arrowIcon}
                            src={ArrowDownIcon}
                            alt="ArrowDownIcon"
                        />
                    </Box>

                    <Box className={classes.badgesContainer}>
                        <Typography
                            className={classes.badgeInfoLabel}
                            sx={{ textTransform: 'uppercase' }}
                        >
                            {I18n.t('adapters.badges')}:
                        </Typography>
                        {badgeNpm && (
                            <img
                                className={classes.npmImage}
                                src={badgeNpm}
                                alt="npm"
                            />
                        )}
                        {badgeVersion && (
                            <img
                                src={badgeVersion}
                                alt="NPM version"
                                className={classes.badgeImage}
                            />
                        )}
                        {badgeBuild && (
                            <img
                                src={badgeBuild}
                                alt="Build status"
                                className={classes.badgeImage}
                            />
                        )}
                        {badgeDownloads && (
                            <img
                                src={badgeDownloads}
                                alt="Downloads"
                                className={classes.badgeImage}
                            />
                        )}
                        {badgeInstalls && (
                            <img
                                src={badgeInstalls}
                                alt="Installed"
                                className={classes.badgeImage}
                            />
                        )}
                    </Box>
                </Box>
            </Box>

            <Box sx={{ gridColumn: '1 / -1', marginTop: '100px' }}>
                <Divider position={scrollProgress} parentWidth={pageGridRef.current?.clientWidth || window.innerWidth} />
                <Footer />
            </Box>
            <LicenseModal
                open={isLicenseOpen}
                onClose={() => setIsLicenseOpen(false)}
                paragraphs={licenseParagraphs}
            />
            <HistoryModal
                open={isHistoryOpen}
                onClose={() => setIsHistoryOpen(false)}
                items={changelogItems}
            />
            </Box>
        </Box>
    );
};

export default AdapterPage;
