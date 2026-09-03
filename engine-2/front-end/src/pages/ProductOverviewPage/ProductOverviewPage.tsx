import React, { useEffect, useMemo, useState } from 'react';
import { Box, MenuItem, Select, useTheme } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowIconSvg from '../../assets/img/arrowIcon.svg';
import { sectionHeadingSx, useStyles } from './ProductOverviewPage.styles';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { I18n } from '../../utils/i18n';
import ProductCard, { type CardFeature, type CardOption } from './ProductCard';
import FaqSection, { type FaqGroup } from './FaqSection';
import {
    DURATION_LABEL,
    UNLIMITED_DATAPOINTS,
    type ApiProduct,
    fetchProducts,
    findByPrefix,
    findProduct,
    formatAmount,
    formatPrice,
    productIcon,
} from './products';

const SECTIONS = ['remote', 'assistant', 'vis', 'jaeger', 'knx'] as const;
type SectionId = (typeof SECTIONS)[number];

const CATEGORIES = ['remote', 'voice', 'services', 'vis', 'licenses'] as const;

/** which section a category teaser jumps to */
const CATEGORY_TARGET: Record<(typeof CATEGORIES)[number], SectionId> = {
    voice: 'assistant',
    remote: 'remote',
    vis: 'vis',
    services: 'assistant',
    licenses: 'knx',
};

const t = (key: string, ...args: unknown[]): string => I18n.t(`productOverview.${key}`, ...args);

/**
 * Where a line has a page in the documentation, the "i" beside it goes there. Keys are the
 * translation keys of the lines themselves - a key that is not listed here simply shows no icon,
 * so the pages that are still to be written can be filled in one line at a time.
 */
const DOCS_LINKS: Record<string, string> = {
    'assistant.services': '#/docs/cloud/services.md',
    'assistant.setup.step2': '#/docs/cloud/iot.md',
    'assistant.setup.alexa1': '#/docs/cloud/iot.md',
    'assistant.setup.alexa2': '#/docs/cloud/alexacustom.md',
};

/** The "i" beside a line - rendered only for lines that have a page. */
const DocsLink = ({ target, className }: { target: string; className: string }): React.ReactNode => {
    const href = DOCS_LINKS[target];
    if (!href) {
        return null;
    }
    return (
        <Box
            component="a"
            href={href}
            // a new tab: the page keeps its scroll position and the durations that were chosen
            target="_blank"
            rel="noopener noreferrer"
            className={className}
            aria-label={t('docsLink')}
            title={t('docsLink')}
        >
            <InfoOutlinedIcon fontSize="inherit" />
        </Box>
    );
};

/**
 * The questions the FAQ answers. Only questions that belong to no single product are listed here -
 * what a data point is or when a commercial license is needed stays next to its card.
 */
/**
 * Check-list lines that have a long answer in the FAQ. The key is the translation key of the line,
 * the value the id of the question - the group it sits in is looked up in FAQ_GROUPS.
 */
const FAQ_FOR_FEATURE: Record<string, string> = {
    // "bound to a UUID" raises the question what that means for a second server - the answer sits
    // in the FAQ, with "where do I find my UUID" and the hardware move right beside it
    'vis.privateCard.f3': 'servers',
    'vis.commercialCard.f3': 'servers',
    'vis.offlineCard.f3': 'servers',
    'jaeger.card.f2': 'servers',
    'knx.card.f1': 'servers',
};

const FAQ_GROUPS: FaqGroup[] = [
    { id: 'purchase', items: ['payment', 'invoice', 'activation', 'price', 'country'] },
    { id: 'license', items: ['uuid', 'servers', 'transfer'] },
    { id: 'term', items: ['renewal'] },
    { id: 'account', items: ['registration', 'included'] },
    { id: 'help', items: ['support'] },
];

const ProductOverviewPage = (): React.ReactNode => {
    const { classes } = useStyles();
    const theme = useTheme();

    const [products, setProducts] = useState<ApiProduct[] | null>(null);
    const [failed, setFailed] = useState(false);

    /** the running time / data-point selections of the cards that have one */
    const [assistantMonths, setAssistantMonths] = useState(12);
    const [remoteMonths, setRemoteMonths] = useState(12);
    const [knxMonths, setKnxMonths] = useState(12);
    const [knxPoints, setKnxPoints] = useState(1000);
    /** the FAQ question a card line has just pointed at, as `group.item` */
    const [faqOpen, setFaqOpen] = useState<string | null>(null);

    /** open the long answer in the FAQ and go there */
    const openFaq = (question: string): void => {
        const group = FAQ_GROUPS.find(item => item.items.includes(question));
        if (group) {
            setFaqOpen(`${group.id}.${question}`);
        }
        document.getElementById(`faq-${question}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    useEffect(() => {
        let cancelled = false;
        void fetchProducts().then(list => {
            if (cancelled) {
                return;
            }
            if (list.length) {
                setProducts(list);
            } else {
                setFailed(true);
            }
        });
        return () => {
            cancelled = true;
        };
    }, []);

    const language = I18n.getLanguage();
    const price = (value: number): string => formatPrice(value, language);

    /** "only x per month" - only meaningful for a running time of whole months */
    const perMonth = (product?: ApiProduct): string | undefined =>
        product && product.months > 1
            ? t('perMonth', formatAmount(product.price / product.months, language))
            : undefined;

    const durationOptions = (list: ApiProduct[]): CardOption[] =>
        list.map(item => ({
            value: item.months,
            label: I18n.t(DURATION_LABEL[item.months] ?? `${item.months} months`),
        }));

    const assistant = useMemo(() => findByPrefix(products ?? [], 'assistant.'), [products]);
    const remote = useMemo(() => findByPrefix(products ?? [], 'remote.'), [products]);
    const knxYear = useMemo(() => (products ?? []).filter(p => p.name.startsWith('iobroker.knx.year_')), [products]);
    const knxLifetime = useMemo(() => (products ?? []).filter(p => p.name.startsWith('iobroker.knx_')), [products]);

    const visCommercial = useMemo(
        () => (products ?? []).find(p => p.name === 'iobroker.vis' && p.price > 0),
        [products],
    );
    const visPrivate = useMemo(() => (products ?? []).find(p => p.name === 'iobroker.vis' && !p.price), [products]);
    const visOffline = useMemo(() => findProduct(products ?? [], 'iobroker.vis.offline'), [products]);
    const jaeger = useMemo(() => findProduct(products ?? [], 'iobroker.vis-2-widgets-jaeger-design'), [products]);

    /** the KNX data-point tiers the API actually offers for the chosen running time */
    const knxList = knxMonths === 0 ? knxLifetime : knxYear;
    const knxTiers = useMemo(
        () =>
            knxList
                .map(item => item.datapoints ?? Number(item.name.split('_').pop()))
                .filter((value): value is number => Number.isFinite(value))
                .sort((a, b) => a - b),
        [knxList],
    );
    const knxSelected = knxList.find(item => (item.datapoints ?? Number(item.name.split('_').pop())) === knxPoints);

    const features = (key: string, count: number): CardFeature[] =>
        Array.from({ length: count }, (_unused, index) => `${key}.f${index + 1}`)
            .filter(itemKey => !t(itemKey).startsWith('productOverview.'))
            .map(itemKey => {
                const question = FAQ_FOR_FEATURE[itemKey];
                if (!question) {
                    return t(itemKey);
                }
                return { text: t(itemKey), onInfo: () => openFaq(question), infoLabel: t('faqLink') };
            });

    const sectionTitle = (id: SectionId): React.ReactNode => (
        <SectionTitle sx={sectionHeadingSx}>{t(`${id}.title`).toUpperCase()}</SectionTitle>
    );

    const featureList = (id: SectionId, keys: string[]): React.ReactNode => (
        <Box className={classes.sectionFeatures}>
            {keys.map(key => {
                // a heading without a second line is fine - what must not show is the bare key that
                // an empty translation falls back to
                const text = t(`${id}.features.${key}.text`);
                const hasText = text && !text.startsWith('productOverview.');
                return (
                    <Box key={key}>
                        <Box className={classes.featureTitle}>{t(`${id}.features.${key}.title`)}</Box>
                        {hasText ? <Box className={classes.featureText}>{text}</Box> : null}
                    </Box>
                );
            })}
        </Box>
    );

    /** what the purchase needs, right in the section - the steps used to hide behind a button */
    const setupBlock = (
        id: 'assistant' | 'remote',
        steps: string[],
        groups?: { key: string; items: string[] }[],
    ): React.ReactNode => (
        <Box className={classes.setupInline}>
            <Box className={classes.proseTitle}>{t(`${id}.setup.title`)}</Box>
            <Box
                component="ol"
                className={classes.setupSteps}
            >
                {steps.map((step, index) => (
                    <li key={step}>
                        <Box
                            component="span"
                            className={classes.setupStepNumber}
                        >
                            {`0${index + 1} /`}
                        </Box>
                        <span>
                            {t(`${id}.setup.${step}`)}
                            <DocsLink
                                target={`${id}.setup.${step}`}
                                className={classes.docsLink}
                            />
                        </span>
                    </li>
                ))}
            </Box>
            {groups ? (
                <Box className={classes.setupServices}>
                    {groups.map(group => (
                        <Box key={group.key}>
                            <Box className={classes.setupServiceTitle}>{t(`${id}.setup.${group.key}`)}</Box>
                            <Box
                                component="ul"
                                className={classes.setupServiceItems}
                            >
                                {group.items.map(item => (
                                    <li key={item}>
                                        {t(`${id}.setup.${item}`)}
                                        <DocsLink
                                            target={`${id}.setup.${item}`}
                                            className={classes.docsLink}
                                        />
                                    </li>
                                ))}
                            </Box>
                        </Box>
                    ))}
                </Box>
            ) : null}
        </Box>
    );

    if (failed) {
        return (
            <Box className={classes.pageWrapper}>
                <Box className={classes.pageContainer}>
                    <SectionTitle>{t('title').toUpperCase()}</SectionTitle>
                    <Box className={classes.state}>{t('loadError')}</Box>
                </Box>
            </Box>
        );
    }

    const assistantSelected = assistant.find(item => item.months === assistantMonths) ?? assistant[0];
    const remoteSelected = remote.find(item => item.months === remoteMonths) ?? remote[0];

    return (
        <Box className={classes.pageWrapper}>
            <Box className={classes.pageContainer}>
                {/* the page title needs more air than a section heading before the welcome */}
                <SectionTitle sx={{ marginBottom: '56px !important' }}>{t('title').toUpperCase()}</SectionTitle>

                <Box className={classes.hero}>
                    <Box className={classes.heroContent}>
                        <Box className={classes.introRow}>
                            <Box>
                                <Box className={classes.welcome}>{t('welcome')}</Box>
                                <Box className={classes.introText}>{t('intro')}</Box>
                            </Box>
                            <Select
                                className={classes.quickSelect}
                                displayEmpty
                                value=""
                                onChange={event => {
                                    const target = document.getElementById(`section-${event.target.value}`);
                                    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }}
                                renderValue={() => t('quickSelect')}
                                // the arrow of the kit instead of the MUI triangle - the same one the
                                // FAQ and the panels on the home page use
                                IconComponent={iconProps => (
                                    <Box
                                        component="img"
                                        src={ArrowIconSvg}
                                        alt=""
                                        className={iconProps.className}
                                        sx={{ width: '16px', height: '16px', right: '16px' }}
                                    />
                                )}
                                MenuProps={{
                                    slotProps: {
                                        paper: {
                                            sx: {
                                                backgroundColor: theme.custom.surfaces.overlay,
                                                backgroundImage: 'none',
                                                borderRadius: `${theme.custom.radius.card}px`,
                                                boxShadow: theme.custom.elevation.overlay,
                                                marginTop: '4px',
                                            },
                                        },
                                    },
                                }}
                            >
                                {SECTIONS.map(id => (
                                    <MenuItem
                                        key={id}
                                        value={id}
                                    >
                                        {t(`${id}.title`)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>

                        <Box className={classes.categories}>
                            {CATEGORIES.map(key => (
                                <Box
                                    key={key}
                                    onClick={() =>
                                        document
                                            .getElementById(`section-${CATEGORY_TARGET[key]}`)
                                            ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                    }
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <Box className={classes.categoryTitle}>{t(`categories.${key}.title`)}</Box>
                                    <Box className={classes.categoryText}>{t(`categories.${key}.text`)}</Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>

                {/* one statement instead of two notes: what is free, what a license adds, and what
                    buying one does for the project */}
                <Box className={classes.support}>
                    <Box className={classes.supportLead}>{t('support.lead')}</Box>
                    <Box className={classes.supportText}>{t('support.text')}</Box>
                    <Box className={classes.supportAccent}>{t('support.accent')}</Box>
                    <Box className={classes.supportThanks}>{t('support.thanks')}</Box>
                </Box>

                {!products ? (
                    <Box className={classes.state}>{t('loading')}</Box>
                ) : (
                    <>
                        {/* ---------------------------------------------- remote */}
                        <Box
                            id="section-remote"
                            className={classes.section}
                        >
                            {sectionTitle('remote')}
                            {featureList('remote', ['access', 'assistant'])}

                            {/* first what it is and what it takes, then the choice - the cards are
                                the answer to the questions above them, not the other way round */}
                            <Box className={classes.prose}>
                                {['security', 'accounts', 'expiry'].map(key => (
                                    <Box key={key}>
                                        <Box className={classes.proseTitle}>
                                            {t(`remote.${key}.title`)}
                                            <DocsLink
                                                target={`remote.${key}`}
                                                className={classes.docsLink}
                                            />
                                        </Box>
                                        <Box className={classes.proseText}>{t(`remote.${key}.text`)}</Box>
                                    </Box>
                                ))}
                            </Box>

                            {setupBlock('remote', ['step1', 'step2', 'step3'])}

                            <Box className={classes.cardRow}>
                                <ProductCard
                                    title={t('remote.cardTitle')}
                                    icon={productIcon('remote', theme.palette.mode)}
                                    features={features('remote.freeCard', 3)}
                                    price={0}
                                    priceLabel={price(0)}
                                />
                                {remoteSelected ? (
                                    <ProductCard
                                        title={t('remote.cardTitle')}
                                        icon={productIcon('remote', theme.palette.mode)}
                                        features={features('remote.card', 4)}
                                        price={remoteSelected.price}
                                        priceLabel={price(remoteSelected.price)}
                                        perMonth={perMonth(remoteSelected)}
                                        duration={{
                                            label: t('duration'),
                                            options: durationOptions(remote),
                                            value: remoteMonths,
                                            onChange: setRemoteMonths,
                                        }}
                                    />
                                ) : null}
                            </Box>
                        </Box>

                        {/* ------------------------------------------- assistant */}
                        <Box
                            id="section-assistant"
                            className={classes.section}
                        >
                            {sectionTitle('assistant')}
                            {featureList('assistant', ['voice', 'services', 'matter'])}

                            {/* what the licence covers - voice, services and the Matter bridge are
                                three questions, and they are answered before the price is shown */}
                            <Box className={classes.prose}>
                                {['what', 'services', 'matter'].map(key => (
                                    <Box key={key}>
                                        <Box className={classes.proseTitle}>
                                            {t(`assistant.${key}.title`)}
                                            <DocsLink
                                                target={`assistant.${key}`}
                                                className={classes.docsLink}
                                            />
                                        </Box>
                                        <Box className={classes.proseText}>{t(`assistant.${key}.text`)}</Box>
                                    </Box>
                                ))}
                            </Box>

                            {setupBlock(
                                'assistant',
                                ['step1', 'step2', 'step3', 'step4'],
                                [
                                    { key: 'alexa', items: ['alexa1', 'alexa2'] },
                                    { key: 'google', items: ['google1'] },
                                ],
                            )}

                            <Box className={classes.cardRow}>
                                <ProductCard
                                    title={t('assistant.cardTitle')}
                                    icon={productIcon('assistant', theme.palette.mode)}
                                    features={features('assistant.freeCard', 4)}
                                    price={0}
                                    priceLabel={price(0)}
                                />
                                {assistantSelected ? (
                                    <ProductCard
                                        title={t('assistant.cardTitle')}
                                        icon={productIcon('assistant', theme.palette.mode)}
                                        features={features('assistant.card', 4)}
                                        price={assistantSelected.price}
                                        priceLabel={price(assistantSelected.price)}
                                        perMonth={perMonth(assistantSelected)}
                                        duration={{
                                            label: t('duration'),
                                            options: durationOptions(assistant),
                                            value: assistantMonths,
                                            onChange: setAssistantMonths,
                                        }}
                                    />
                                ) : null}
                            </Box>
                        </Box>

                        {/* ------------------------------------------------- vis */}
                        <Box
                            id="section-vis"
                            className={classes.section}
                        >
                            {sectionTitle('vis')}
                            {featureList('vis', ['tool', 'offline', 'lifetime'])}
                            <Box className={classes.prose}>
                                <Box>
                                    <Box className={classes.proseTitle}>{t('vis.which.title')}</Box>
                                    <Box className={classes.proseText}>{t('vis.which.text')}</Box>
                                </Box>
                                <Box>
                                    <Box className={classes.proseTitle}>{t('vis.commercial.title')}</Box>
                                    <Box className={classes.proseText}>{t('vis.commercial.text')}</Box>
                                    <Box
                                        component="ul"
                                        className={classes.proseList}
                                    >
                                        <li>{t('vis.commercial.item1')}</li>
                                        <li>{t('vis.commercial.item2')}</li>
                                        <li>{t('vis.commercial.item3')}</li>
                                    </Box>
                                    <Box className={classes.proseText}>{t('vis.commercial.footer')}</Box>
                                </Box>
                                <Box>
                                    <Box className={classes.proseTitle}>{t('vis.offline.title')}</Box>
                                    <Box className={classes.proseText}>{t('vis.offline.text')}</Box>
                                    <Box
                                        component="ul"
                                        className={classes.proseList}
                                    >
                                        <li>{t('vis.offline.item1')}</li>
                                        <li>{t('vis.offline.item2')}</li>
                                    </Box>
                                    <Box className={classes.proseText}>{t('vis.offline.footer')}</Box>
                                </Box>
                            </Box>

                            <Box className={classes.cardRow}>
                                {visPrivate ? (
                                    <ProductCard
                                        title="ioBroker vis-2"
                                        subtitle={t('vis.private')}
                                        icon={productIcon('vis', theme.palette.mode)}
                                        features={features('vis.privateCard', 5)}
                                        price={0}
                                        priceLabel={price(0)}
                                    />
                                ) : null}
                                {visCommercial ? (
                                    <ProductCard
                                        title="ioBroker vis-2"
                                        subtitle={t('vis.commercialLabel')}
                                        icon={productIcon('vis', theme.palette.mode)}
                                        features={features('vis.commercialCard', 4)}
                                        price={visCommercial.price}
                                        priceLabel={price(visCommercial.price)}
                                    />
                                ) : null}
                                {visOffline ? (
                                    <ProductCard
                                        title="ioBroker vis-2"
                                        subtitle={t('vis.offlineLabel')}
                                        icon={productIcon('vis', theme.palette.mode)}
                                        features={features('vis.offlineCard', 3)}
                                        price={visOffline.price}
                                        priceLabel={price(visOffline.price)}
                                    />
                                ) : null}
                            </Box>
                        </Box>

                        {/* ---------------------------------------------- jaeger */}
                        <Box
                            id="section-jaeger"
                            className={classes.section}
                        >
                            {sectionTitle('jaeger')}
                            {featureList('jaeger', ['widgets', 'license', 'test'])}

                            {/* one card only - it stands beside its explanations, the way KNX does,
                                instead of sitting alone under a three column text */}
                            <Box className={classes.proseSplit}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                    {['what', 'origin', 'license'].map(key => (
                                        <Box key={key}>
                                            <Box className={classes.proseTitle}>
                                                {t(`jaeger.${key}.title`)}
                                                <DocsLink
                                                    target={`jaeger.${key}`}
                                                    className={classes.docsLink}
                                                />
                                            </Box>
                                            <Box className={classes.proseText}>{t(`jaeger.${key}.text`)}</Box>
                                        </Box>
                                    ))}
                                </Box>
                                {jaeger ? (
                                    <ProductCard
                                        title={t('jaeger.cardTitle')}
                                        subtitle={t('jaeger.cardSubtitle')}
                                        icon={productIcon('jaeger', theme.palette.mode)}
                                        features={features('jaeger.card', 2)}
                                        price={jaeger.price}
                                        priceLabel={price(jaeger.price)}
                                    />
                                ) : null}
                            </Box>
                        </Box>

                        {/* ------------------------------------------------- knx */}
                        <Box
                            id="section-knx"
                            className={classes.section}
                        >
                            {sectionTitle('knx')}
                            {featureList('knx', ['import', 'gaTools', 'directLink'])}
                            <Box className={classes.proseSplit}>
                                {/* the licence questions come first - they decide what to pick on the
                                    card next to them; what the adapter can do follows below */}
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                    {['license', 'point', 'count'].map(key => (
                                        <Box key={key}>
                                            <Box className={classes.proseTitle}>{t(`knx.${key}.title`)}</Box>
                                            <Box className={classes.proseText}>{t(`knx.${key}.text`)}</Box>
                                        </Box>
                                    ))}
                                    <Box>
                                        <Box className={classes.proseTitle}>{t('knx.adapter.title')}</Box>
                                        <Box className={classes.proseText}>{t('knx.text')}</Box>
                                    </Box>
                                </Box>
                                {knxSelected ? (
                                    <ProductCard
                                        title={t('knx.cardTitle')}
                                        icon={productIcon('knx', theme.palette.mode)}
                                        features={features('knx.card', 1)}
                                        price={knxSelected.price}
                                        priceLabel={price(knxSelected.price)}
                                        duration={{
                                            label: t('duration'),
                                            options: [
                                                { value: 12, label: I18n.t('1 year') },
                                                { value: 0, label: t('unlimited') },
                                            ],
                                            value: knxMonths,
                                            onChange: setKnxMonths,
                                        }}
                                        datapoints={{
                                            label: t('datapoints'),
                                            options: knxTiers.map(value => ({
                                                value,
                                                label: value === UNLIMITED_DATAPOINTS ? t('unlimited') : String(value),
                                            })),
                                            value: knxPoints,
                                            onChange: setKnxPoints,
                                        }}
                                    />
                                ) : null}
                            </Box>
                        </Box>
                        <FaqSection
                            groups={FAQ_GROUPS}
                            openKey={faqOpen}
                        />
                    </>
                )}
            </Box>
        </Box>
    );
};

export default ProductOverviewPage;
