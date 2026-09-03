import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { I18n } from '../../utils/i18n';
import ArrowIconSvg from '../../assets/img/arrowIcon.svg';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { sectionHeadingSx } from './ProductOverviewPage.styles';

/**
 * The questions that belong to no single product: how paying works, what a license is bound to, what
 * happens when a term runs out. Product questions stay next to their card - this is the place for
 * everything that would otherwise be repeated in every section.
 *
 * Each question carries an id, so a short text next to a card can point at the long answer here
 * instead of repeating it.
 */
export interface FaqGroup {
    /** id of the group, used for the translation keys */
    id: string;
    /** ids of the questions, in the order they are shown */
    items: string[];
}

const t = (key: string): string => I18n.t(`productOverview.faq.${key}`);

const FaqSection = ({ groups, openKey }: { groups: FaqGroup[]; openKey?: string | null }): React.JSX.Element => {
    const theme = useTheme();
    const [open, setOpen] = useState<string | null>(null);

    // a card line elsewhere on the page can point at one of these answers - it opens here
    useEffect(() => {
        if (openKey) {
            setOpen(openKey);
        }
    }, [openKey]);

    const question = (groupId: string, itemId: string): React.JSX.Element => {
        const key = `${groupId}.${itemId}`;
        const isOpen = open === key;

        return (
            <Box
                key={key}
                id={`faq-${itemId}`}
                sx={{
                    scrollMarginTop: '96px',
                    borderBottom: `1px solid ${theme.custom.hairline}`,
                }}
            >
                <Box
                    component="button"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : key)}
                    sx={{
                        all: 'unset',
                        boxSizing: 'border-box',
                        cursor: 'pointer',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                        // the separator belongs to its question - it sits close under the line of text
                        padding: '12px 0',
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '16px',
                        lineHeight: 1.4,
                        color: theme.palette.text.primary,
                        transition: 'color 0.15s ease',
                        '&:hover': { color: theme.palette.primary.main },
                        '&:focus-visible': { boxShadow: theme.custom.focusRing, borderRadius: '4px' },
                    }}
                >
                    {t(`${key}.q`)}
                    {/* the same arrow the panels on the home page use, in the small size */}
                    <Box
                        component="img"
                        src={ArrowIconSvg}
                        alt=""
                        sx={{
                            flexShrink: 0,
                            width: '16px',
                            height: '16px',
                            transform: isOpen ? 'rotate(180deg) scaleX(-1)' : 'none',
                            transition: 'transform 0.3s ease',
                        }}
                    />
                </Box>
                {isOpen ? (
                    <Box
                        sx={{
                            fontFamily: theme.typography.fontFamily,
                            fontSize: '15px',
                            lineHeight: 1.6,
                            color: theme.custom.textMuted,
                            paddingBottom: '20px',
                            maxWidth: '760px',
                        }}
                    >
                        {t(`${key}.a`)}
                    </Box>
                ) : null}
            </Box>
        );
    };

    return (
        <Box
            id="section-faq"
            sx={{ marginBottom: '96px', scrollMarginTop: '96px' }}
        >
            <SectionTitle sx={sectionHeadingSx}>{t('title').toUpperCase()}</SectionTitle>
            {groups.map(group => (
                <Box
                    key={group.id}
                    sx={{ marginBottom: '40px' }}
                >
                    <Box
                        sx={{
                            fontFamily: theme.typography.h1.fontFamily,
                            fontSize: '17px',
                            fontWeight: 400,
                            letterSpacing: '0.01em',
                            textTransform: 'uppercase',
                            lineHeight: 1.3,
                            color: theme.palette.text.primary,
                            marginBottom: '8px',
                        }}
                    >
                        {t(`${group.id}.title`)}
                    </Box>
                    {/* no rule under the group heading - the first separator is the one below the
                        first question */}
                    <Box>{group.items.map(item => question(group.id, item))}</Box>
                </Box>
            ))}
        </Box>
    );
};

export default FaqSection;
