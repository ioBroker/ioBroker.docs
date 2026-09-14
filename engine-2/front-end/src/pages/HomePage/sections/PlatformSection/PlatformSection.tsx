import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useStyles } from './PlatformSection.styles';
import { I18n } from '../../../../utils/i18n';

/**
 * Die vier Schritte der Kette, in der Reihenfolge, in der sie gelesen werden, mit dem
 * Ort, an dem der jeweilige Schritt ausfuehrlich steht: Adapter holen die Geraete herein,
 * die Grundlagen erklaeren die gemeinsame Struktur, die Logik beschreibt Regeln, und die
 * Visualisierung zeigt, wie ein Dashboard entsteht (Denis, 14.09.2026).
 */
const STEPS = [
    { key: '1', to: '/adapters' },
    { key: '2', to: '/docs/basics/README.md' },
    { key: '3', to: '/docs/logic/README.md' },
    { key: '4', to: '/docs/viz/README.md' },
] as const;

/**
 * Der zweite Block der Startseite: er beantwortet die Frage, die nach dem Banner kommt.
 * Erst die Behauptung in einem Satz, dann zwei Absaetze, die sie belegen, und darunter
 * die Kette Verbinden - Verstehen - Automatisieren - Visualisieren, die zeigt, wie aus
 * fremden Geraeten ein System wird.
 */
export const PlatformSection: React.FC = () => {
    const { classes } = useStyles();

    return (
        <Box
            component="section"
            className={classes.platformSection}
        >
            <Box className={classes.container}>
                <Typography
                    component="p"
                    className={classes.label}
                >
                    <span className={classes.labelSlashes}>{'//'}</span>
                    {I18n.t('home.platform.label')}
                </Typography>

                <Box className={classes.intro}>
                    <Box className={classes.copy}>
                        <Typography
                            component="h2"
                            className={classes.title}
                        >
                            {I18n.t('home.platform.title1')}
                            <br />
                            <span className={classes.titleAccent}>{I18n.t('home.platform.title2')}</span>
                        </Typography>
                        <Box className={classes.prose}>
                            <Typography className={classes.paragraph}>{I18n.t('home.platform.p1')}</Typography>
                            <Typography className={classes.paragraph}>{I18n.t('home.platform.p2')}</Typography>
                        </Box>
                    </Box>
                </Box>

                <Box className={classes.flow}>
                    {STEPS.map((step, index) => (
                        <React.Fragment key={step.key}>
                            {index > 0 ? (
                                <Box
                                    className={classes.flowLine}
                                    aria-hidden="true"
                                />
                            ) : null}
                            {/* jede Kachel fuehrt dorthin, wo ihr Schritt ausfuehrlich steht */}
                            <Box
                                component={RouterLink}
                                to={step.to}
                                className={classes.step}
                            >
                                <Box className={classes.stepHead}>
                                    <Typography
                                        component="span"
                                        className={classes.stepNumber}
                                    >
                                        {`0${index + 1} /`}
                                    </Typography>
                                    <Typography
                                        component="h3"
                                        className={classes.stepTitle}
                                    >
                                        {I18n.t(`home.platform.steps.${step.key}.title`)}
                                    </Typography>
                                </Box>
                                <Typography className={classes.stepText}>
                                    {I18n.t(`home.platform.steps.${step.key}.text`)}
                                </Typography>
                            </Box>
                        </React.Fragment>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};
