import React from 'react';
import { Box, Button, Tab, Tabs, useTheme, type SxProps } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { I18n } from '../../utils/i18n';
import { LICENSES_MARKETPLACE_LINK } from '../../config/api';
import { isMonochromeProductImage } from './products';

export interface CardOption {
    /** value of the segmented control */
    value: number;
    /** already translated label */
    label: string;
}

/**
 * A line in the check list. A plain string is the usual case; the object form adds an "i" that
 * opens the long answer in the FAQ, for statements that need more than one line to explain.
 */
export type CardFeature = string | { text: string; onInfo: () => void; infoLabel: string };

export interface ProductCardProps {
    title: string;
    subtitle?: string;
    icon?: string;
    features: CardFeature[];
    /** the price the API reports for the current selection, or 0 for a free product */
    price: number;
    /** formatted price string, built by the page from the API value */
    priceLabel: string;
    /** the "only x per month" line, if the running time makes one meaningful */
    perMonth?: string;
    /** first selector, e.g. the running time */
    duration?: { label: string; options: CardOption[]; value: number; onChange: (_value: number) => void };
    /** second selector, e.g. the KNX data points */
    datapoints?: { label: string; options: CardOption[]; value: number; onChange: (_value: number) => void };
}

/**
 * Same recipe as the marketplace cards in the profile app: one surface step,
 * hairline and shadow as the edge, Audiowide on title, price and button.
 */
const getStyles = (theme: any): Record<string, SxProps> => ({
    card: {
        width: '368px',
        maxWidth: '100%',
        minHeight: '440px',
        backgroundColor: theme.custom.surfaces.surface,
        borderRadius: `${theme.custom.radius.card}px`,
        // no shadow at rest - the surface alone carries the card; the shadow marks the one under
        // the pointer, like the rows and cards in the profile area
        boxShadow: 'none',
        padding: '32px',
        display: 'grid',
        gridTemplateRows: 'min-content auto min-content min-content',
        textAlign: 'left',
        boxSizing: 'border-box',
        transition: 'box-shadow 0.2s ease',
        '&:hover': {
            boxShadow: theme.custom.elevation.card,
        },
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '16px',
    },
    title: {
        fontFamily: theme.typography.h1.fontFamily,
        fontWeight: 400,
        fontSize: '20px',
        lineHeight: 1.3,
        letterSpacing: '0.01em',
        // the product name is set in capitals, like the headings of the kit
        textTransform: 'uppercase',
        color: theme.palette.text.primary,
    },
    type: {
        display: 'inline-flex',
        alignItems: 'center',
        marginTop: '8px',
        padding: '3px 10px',
        borderRadius: `${theme.custom.radius.pill}px`,
        backgroundColor: theme.custom.surfaces.raised,
        boxShadow: `inset 0 0 0 1px ${theme.custom.hairline}`,
        fontFamily: theme.typography.fontFamily,
        fontWeight: 600,
        fontSize: '12px',
        lineHeight: 1.4,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: theme.palette.primary.main,
    },
    features: {
        fontFamily: theme.typography.fontFamily,
        fontWeight: 400,
        fontSize: '15px',
        lineHeight: 1.4,
        color: theme.custom.textMuted,
        paddingTop: '28px',
        display: 'flex',
        flexDirection: 'column',
        // the list reads as one block, so the lines stay closer together than the sections do
        gap: '8px',
    },
    featureInfo: {
        all: 'unset',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        verticalAlign: 'middle',
        marginLeft: '6px',
        fontSize: '15px',
        color: theme.palette.primary.main,
        opacity: 0.75,
        '&:hover': { opacity: 1 },
        '&:focus-visible': { boxShadow: theme.custom.focusRing, borderRadius: '50%' },
    },
    feature: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        '& img': {
            width: 14,
            height: 14,
            marginTop: '3px',
            flexShrink: 0,
            opacity: 0.7,
            filter:
                theme.palette.mode === 'dark'
                    ? 'none'
                    : 'brightness(0) saturate(100%) invert(23%) sepia(89%) saturate(1247%) hue-rotate(175deg) brightness(95%) contrast(101%)',
        },
    },
    // price and tax note sit on one line - the per-month price belongs to them, not to the button
    priceRow: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        gap: '10px',
        marginTop: '36px',
    },
    price: {
        fontFamily: theme.typography.h1.fontFamily,
        fontWeight: 400,
        fontSize: '30px',
        lineHeight: 1.2,
        letterSpacing: '0.01em',
        color: theme.palette.text.primary,
    },
    priceFree: {
        fontFamily: theme.typography.h1.fontFamily,
        fontWeight: 400,
        fontSize: '22px',
        lineHeight: 1.3,
        letterSpacing: '0.01em',
        color: theme.palette.text.primary,
        textAlign: 'center',
        marginTop: '36px',
        marginBottom: '32px',
    },
    priceHint: {
        fontFamily: theme.typography.fontFamily,
        fontWeight: 400,
        fontSize: '13px',
        lineHeight: 1.4,
        color: theme.custom.textSubtle,
        textAlign: 'center',
    },
    button: {
        width: '100%',
        minHeight: theme.custom.control.height,
        padding: '8px 24px',
        borderRadius: `${theme.custom.radius.control}px`,
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '15px',
        fontWeight: 400,
        lineHeight: 1.25,
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
        boxShadow: 'none',
        backgroundColor: theme.palette.secondary.main,
        color: '#FFFFFF',
        '&:hover': {
            boxShadow: 'none',
            backgroundColor: theme.palette.secondary.light,
        },
    },
    selectorLabel: {
        fontFamily: theme.typography.fontFamily,
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: 1.4,
        color: theme.custom.textMuted,
        opacity: 0.7,
        // the label belongs to the selector below it, not to what stands above
        paddingTop: '14px',
        paddingBottom: '6px',
    },
    tabs: {
        width: '100%',
        // the selectors are a group of their own - the compact height keeps them together
        minHeight: `${theme.custom.control.compactHeight}px !important`,
        height: theme.custom.control.compactHeight,
        borderRadius: `${theme.custom.radius.control}px`,
        backgroundColor: theme.custom.surfaces.raised,
        boxShadow: `inset 0 0 0 1px ${theme.custom.hairlineStrong}`,
        padding: '4px',
        boxSizing: 'border-box',
        '& .MuiTabs-indicator': { display: 'none' },
        '& .MuiTabs-list': { height: '100%', gap: '4px' },
    },
    tab: {
        flex: '1 1 auto',
        minWidth: 0,
        minHeight: 'unset !important',
        height: '100%',
        padding: '0 10px',
        borderRadius: `${theme.custom.radius.chip}px`,
        fontFamily: theme.typography.fontFamily,
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: 1.3,
        whiteSpace: 'nowrap',
        textTransform: 'none',
        color: theme.custom.textMuted,
        transition: 'background-color 0.15s ease, color 0.15s ease',
        '&:hover': { color: theme.palette.text.primary },
        '&.Mui-selected': {
            backgroundColor: theme.palette.secondary.main,
            color: '#FFFFFF',
            fontWeight: 700,
        },
    },
});

const ProductCard = (props: ProductCardProps): React.JSX.Element => {
    const theme = useTheme();
    const styles = getStyles(theme);

    // white line work needs the brand colour on the light canvas - coloured art stays untouched
    const iconFilter =
        theme.palette.mode === 'light' && props.icon && isMonochromeProductImage(props.icon)
            ? 'brightness(0) saturate(100%) invert(23%) sepia(89%) saturate(1247%) hue-rotate(175deg) brightness(95%) contrast(101%)'
            : undefined;

    const selector = (selector: NonNullable<ProductCardProps['duration']>, key: string): React.JSX.Element | null =>
        selector.options.length > 1 ? (
            <div key={key}>
                <Box sx={styles.selectorLabel}>{selector.label}</Box>
                <Tabs
                    value={selector.value}
                    onChange={(_e, value) => selector.onChange(value as number)}
                    sx={styles.tabs}
                >
                    {selector.options.map(option => (
                        <Tab
                            key={option.value}
                            label={option.label}
                            value={option.value}
                            sx={styles.tab}
                        />
                    ))}
                </Tabs>
            </div>
        ) : null;

    return (
        <Box sx={styles.card}>
            <div>
                <Box sx={styles.cardHeader}>
                    <Box sx={styles.title}>{props.title}</Box>
                    {props.icon ? (
                        <img
                            src={props.icon}
                            alt=""
                            style={{ width: 38, height: 38, objectFit: 'contain', filter: iconFilter }}
                        />
                    ) : null}
                </Box>
                {props.subtitle ? <Box sx={styles.type}>{props.subtitle}</Box> : null}
            </div>

            <Box sx={styles.features}>
                {props.duration ? selector(props.duration, 'duration') : null}
                {props.datapoints ? selector(props.datapoints, 'datapoints') : null}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        marginTop: props.duration ? '18px' : 0,
                    }}
                >
                    {props.features.map((feature, index) => (
                        <Box
                            key={index}
                            sx={styles.feature}
                        >
                            <img src="./icons/checks.svg" />
                            {typeof feature === 'string' ? (
                                feature
                            ) : (
                                <span>
                                    {feature.text}
                                    <Box
                                        component="button"
                                        type="button"
                                        onClick={feature.onInfo}
                                        aria-label={feature.infoLabel}
                                        title={feature.infoLabel}
                                        sx={styles.featureInfo}
                                    >
                                        <InfoOutlinedIcon fontSize="inherit" />
                                    </Box>
                                </span>
                            )}
                        </Box>
                    ))}
                </Box>
            </Box>

            {props.price ? (
                <div>
                    <Box sx={{ ...(styles.priceRow as object), marginBottom: props.perMonth ? '6px' : '28px' }}>
                        <Box sx={styles.price}>{props.priceLabel}</Box>
                        <Box sx={styles.priceHint}>{I18n.t('productOverview.inclVat')}</Box>
                    </Box>
                    {props.perMonth ? (
                        <Box sx={{ ...(styles.priceHint as object), marginBottom: '24px' }}>{props.perMonth}</Box>
                    ) : null}
                </div>
            ) : (
                <Box sx={styles.priceFree}>{I18n.t('productOverview.free')}</Box>
            )}

            <Button
                variant="contained"
                component="a"
                href={LICENSES_MARKETPLACE_LINK}
                sx={styles.button}
            >
                {I18n.t('productOverview.order')}
            </Button>
        </Box>
    );
};

export default ProductCard;
