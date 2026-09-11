import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useStyles } from './BenefitsSection.styles';
import { StyledButton } from '../../../../components/StyledButton/StyledButton';
import { I18n } from '../../../../utils/i18n';

/** die vier Gruende, in der Reihenfolge, in der sie gelesen werden */
const BENEFITS = ['1', '2', '3', '4'] as const;

/**
 * Der Abschnitt, der die Frage nach dem Warum beantwortet: vier Gruende, je einer pro
 * Feld. Sie stehen nebeneinander und nicht als Kette - anders als die vier Schritte
 * weiter oben sind sie keine Reihenfolge, sondern vier Seiten derselben Sache.
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
                    // die lange Fassung steht im Kapitel "Staerken von ioBroker" auf der
                    // Seite "Was ist ioBroker?"
                    onClick={() => void navigate('/docs/README.md')}
                    /*
                     * Die Masse kommen ueber `sx`, nicht ueber `className`: das Bauteil
                     * setzt seine eigene Klasse, und ein eigenes `className` von aussen
                     * ersetzt sie - der Knopf stand dann ohne Rahmen da.
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
