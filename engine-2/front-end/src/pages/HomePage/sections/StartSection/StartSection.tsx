import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useStyles } from './StartSection.styles';
import { CustomButton } from '../../../../components/Button/Button';
import { I18n } from '../../../../utils/i18n';

/** the three steps, in the order in which they are taken */
const STEPS = ['1', '2', '3'] as const;

/**
 * The section that turns reading into doing: three steps to the first automation and the two ways
 * there - the installation guide and the documentation. It deliberately stands after the reasons:
 * first why, then how.
 */
export const StartSection: React.FC = () => {
    const { classes } = useStyles();
    const navigate = useNavigate();

    return (
        <Box
            component="section"
            className={classes.startSection}
        >
            <Box className={classes.container}>
                <Typography
                    component="p"
                    className={classes.label}
                >
                    <span className={classes.labelSlashes}>{'//'}</span>
                    {I18n.t('home.start.label')}
                </Typography>

                <Typography
                    component="h2"
                    className={classes.title}
                >
                    {I18n.t('home.start.title1')}
                    <br />
                    <span className={classes.titleAccent}>{I18n.t('home.start.title2')}</span>
                </Typography>

                <Box className={classes.grid}>
                    <Typography className={classes.lead}>{I18n.t('home.start.lead')}</Typography>

                    <Box className={classes.stepsColumn}>
                        <Box
                            component="ol"
                            className={classes.steps}
                        >
                            {STEPS.map((step, index) => (
                                <Box
                                    component="li"
                                    key={step}
                                    className={classes.step}
                                >
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
                                        {I18n.t(`home.start.steps.${step}.title`)}
                                    </Typography>
                                    <Typography className={classes.stepText}>
                                        {I18n.t(`home.start.steps.${step}.text`)}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                        {/* the buttons stand below the table, that is in the same column */}
                        <Box className={classes.actions}>
                            <CustomButton
                                variant="primary"
                                onClick={() => navigate('/installation')}
                            >
                                {I18n.t('home.start.install')}
                            </CustomButton>
                            <CustomButton
                                variant="secondary"
                                onClick={() => void navigate('/docs/README.md')}
                            >
                                {I18n.t('home.start.docs')}
                            </CustomButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
