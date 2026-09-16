import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useStyles } from './PlatformSection.styles';
import { I18n } from '../../../../utils/i18n';

/**
 * The four steps of the chain, in the order in which they are read, with the place where each step
 * is described in full: adapters bring the devices in, the basics explain the shared structure,
 * the logic describes rules, and the visualisation shows how a dashboard comes about
 * (Denis, 14.09.2026).
 */
const STEPS = [
    { key: '1', to: '/adapters' },
    { key: '2', to: '/docs/basics/README.md' },
    { key: '3', to: '/docs/logic/README.md' },
    { key: '4', to: '/docs/viz/README.md' },
] as const;

/**
 * The second block of the home page: it answers the question that comes after the banner. First
 * the claim in one sentence, then two paragraphs that back it up, and below them the chain
 * Connect - Understand - Automate - Visualise, which shows how foreign devices become one system.
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
                            {/* every tile leads to where its step is described in full */}
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
