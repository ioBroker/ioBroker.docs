import React, { useEffect, useState } from 'react';
import { Box, Collapse, useTheme } from '@mui/material';
import { I18n } from '../../utils/i18n';
import ArrowIconSvg from '../../assets/img/arrowIcon.svg';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { sectionHeadingSx } from './ProductOverviewPage.styles';
import LinkedText from './LinkedText';

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
                    /*
                     * An open question becomes a panel of its own - with the answer in the same
                     * type as the questions around it, it was not clear what had just opened.
                     * The panel reaches 16 px beyond the text, so the text does not move when it
                     * opens; on a phone there is no room beside the column for that.
                     */
                    mx: { xs: 0, sm: '-16px' },
                    px: '16px',
                    borderRadius: `${theme.custom.radius.control}px`,
                    backgroundColor: isOpen ? theme.custom.surfaces.surface : 'transparent',
                    // marked at its edge, like a quote in the documentation
                    boxShadow: isOpen ? `inset 3px 0 0 ${theme.palette.primary.main}` : 'none',
                    // the separator is drawn as a background, as wide as the text and not as the
                    // panel - an open panel needs no line, its surface already sets it apart
                    backgroundImage: isOpen
                        ? 'none'
                        : `linear-gradient(${theme.custom.hairline}, ${theme.custom.hairline})`,
                    backgroundSize: 'calc(100% - 32px) 1px',
                    backgroundPosition: 'bottom center',
                    backgroundRepeat: 'no-repeat',
                    marginBlock: isOpen ? '8px' : 0,
                    transition: 'background-color 0.2s ease, box-shadow 0.2s ease, margin 0.2s ease',
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
                        // the open question takes the accent - the one readable on the panel
                        color: isOpen ? theme.custom.textAccent : theme.palette.text.primary,
                        fontWeight: isOpen ? 500 : 400,
                        transition: 'color 0.15s ease',
                        '&:hover': { color: isOpen ? theme.custom.textAccent : theme.palette.primary.main },
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
                {/* the answer slides open instead of just appearing - the movement shows what was added */}
                <Collapse
                    in={isOpen}
                    timeout={200}
                    unmountOnExit
                >
                    <Box
                        sx={{
                            fontFamily: theme.typography.fontFamily,
                            fontSize: '15px',
                            lineHeight: 1.6,
                            color: theme.custom.textMuted,
                            paddingBottom: '16px',
                            maxWidth: '760px',
                        }}
                    >
                        <LinkedText text={t(`${key}.a`)} />
                    </Box>
                </Collapse>
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
