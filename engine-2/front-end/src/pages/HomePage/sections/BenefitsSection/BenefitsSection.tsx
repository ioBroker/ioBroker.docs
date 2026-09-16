import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useStyles } from './BenefitsSection.styles';
import { StyledButton } from '../../../../components/StyledButton/StyledButton';
import { I18n } from '../../../../utils/i18n';

/** the four reasons, in the order in which they are read */
const BENEFITS = ['1', '2', '3', '4'] as const;

/**
 * The section that answers the question of why: four reasons, one per tile. They stand side by
 * side and not as a chain - unlike the four steps further up they are no sequence, but four sides
 * of the same thing.
 */
export const BenefitsSection: React.FC = () => {
    const { classes } = useStyles();
    const navigate = useNavigate();

    return (
        <Box
            component="section"
            className={classes.benefitsSection}
        >
            <Box className={classes.container}>
                <Typography
                    component="p"
                    className={classes.label}
                >
                    <span className={classes.labelSlashes}>{'//'}</span>
                    {I18n.t('home.benefits.label')}
                </Typography>

                <Box className={classes.grid}>
                    {BENEFITS.map((benefit, index) => (
                        <Box
                            component="article"
                            key={benefit}
                            className={classes.item}
                        >
                            <Box className={classes.itemHead}>
                                <Typography
                                    component="span"
                                    className={classes.itemNumber}
                                >
                                    {`0${index + 1} /`}
                                </Typography>
                                <Typography
                                    component="h3"
                                    className={classes.itemTitle}
                                >
                                    {I18n.t(`home.benefits.items.${benefit}.title`)}
                                </Typography>
                            </Box>
                            <Typography className={classes.itemText}>
                                {I18n.t(`home.benefits.items.${benefit}.text`)}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                <StyledButton
                    arrow="right"
                    /*
                     * The long version is the chapter "Strengths of ioBroker" on the page
                     * "What is ioBroker?". The anchor is the slug of that heading and it
                     * differs per language, so it comes from the translations; without one
                     * the page opens at the top, which is where the button used to land
                     * (Denis, 16.09.2026).
                     */
                    onClick={() => {
                        const anchor = I18n.t('home.benefits.moreAnchor');
                        void navigate(
                            anchor && anchor !== 'home.benefits.moreAnchor'
                                ? `/docs/README.md#${anchor}`
                                : '/docs/README.md',
                        );
                    }}
                    /*
                     * The dimensions come through `sx`, not through `className`: the component
                     * sets a class of its own, and an own `className` from outside
                     * replaces it - the button then stood there without its border.
                     */
                    sx={{
                        marginTop: '32px',
                        width: '100%',
                        maxWidth: { xs: '100%', sm: '420px' },
                        height: { xs: '44px', md: '60px' },
                        padding: '10px 24px',
                        borderRadius: '10px',
                    }}
                >
                    {I18n.t('home.benefits.more')}
                </StyledButton>
            </Box>
        </Box>
    );
};
