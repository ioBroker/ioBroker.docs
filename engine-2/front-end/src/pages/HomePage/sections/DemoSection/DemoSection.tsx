import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ThermostatOutlinedIcon from '@mui/icons-material/ThermostatOutlined';
import BlindsOutlinedIcon from '@mui/icons-material/BlindsOutlined';
import EvStationOutlinedIcon from '@mui/icons-material/EvStationOutlined';
import BatteryChargingFullOutlinedIcon from '@mui/icons-material/BatteryChargingFullOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import DirectionsWalkOutlinedIcon from '@mui/icons-material/DirectionsWalkOutlined';
import SolarPowerOutlinedIcon from '@mui/icons-material/SolarPowerOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { useStyles } from './DemoSection.styles';
import { I18n } from '../../../../utils/i18n';

/**
 * Die drei Beispiele. Der Schluessel steht auch in den Sprachdateien, die Symbole hier:
 * sie gehoeren zur Zeichnung, nicht zum Text.
 */
const SCENES = [
    {
        key: 'evening',
        trigger: DirectionsWalkOutlinedIcon,
        actions: [LightbulbOutlinedIcon, ThermostatOutlinedIcon, BlindsOutlinedIcon],
    },
    {
        key: 'solar',
        trigger: SolarPowerOutlinedIcon,
        actions: [EvStationOutlinedIcon, BatteryChargingFullOutlinedIcon, WaterDropOutlinedIcon],
    },
    {
        key: 'away',
        trigger: ShieldOutlinedIcon,
        actions: [VideocamOutlinedIcon, LightbulbOutlinedIcon, BlindsOutlinedIcon],
    },
] as const;

const ACTION_KEYS = ['1', '2', '3'] as const;

/**
 * Der dritte Block: er beantwortet die Frage, die nach der Erklaerung kommt - was habe
 * ich davon? Links stehen drei Beispiele zur Wahl, rechts liegt die Regel, die dahinter
 * steckt: ein Ausloeser, drei Aktionen. Der Knopf spielt sie einmal durch.
 */
export const DemoSection: React.FC = () => {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState(0);

    const scene = SCENES[active];
    const TriggerIcon = scene.trigger;

    return (
        <Box
            component="section"
            className={classes.demoSection}
        >
            <Box className={classes.container}>
                <Typography
                    component="p"
                    className={classes.label}
                >
                    <span className={classes.labelSlashes}>{'//'}</span>
                    {I18n.t('home.demo.label')}
                </Typography>

                <Box className={classes.head}>
                    <Typography
                        component="h2"
                        className={classes.title}
                    >
                        {I18n.t('home.demo.title1')}
                        <br />
                        <span className={classes.titleAccent}>{I18n.t('home.demo.title2')}</span>
                    </Typography>
                    <Typography className={classes.lead}>{I18n.t('home.demo.lead')}</Typography>
                </Box>

                <Box className={classes.shell}>
                    <Box
                        className={classes.sceneList}
                        role="tablist"
                        aria-label={I18n.t('home.demo.label')}
                    >
                        {SCENES.map((item, index) => (
                            <Box
                                component="button"
                                type="button"
                                key={item.key}
                                role="tab"
                                aria-selected={index === active}
                                className={cx(classes.scene, index === active ? classes.sceneActive : undefined)}
                                onClick={() => setActive(index)}
                            >
                                <Box className={classes.sceneHead}>
                                    <Typography
                                        component="span"
                                        className={classes.sceneNumber}
                                    >
                                        {`0${index + 1} /`}
                                    </Typography>
                                    <Typography
                                        component="span"
                                        className={classes.sceneTitle}
                                    >
                                        {I18n.t(`home.demo.scenes.${item.key}.title`)}
                                    </Typography>
                                </Box>
                                <Typography
                                    component="span"
                                    className={classes.sceneKind}
                                >
                                    {I18n.t(`home.demo.scenes.${item.key}.kind`)}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    <Box className={classes.card}>
                        <Box className={classes.cardTop}>
                            <Box
                                className={classes.statusDot}
                                aria-hidden="true"
                            />
                            <Typography
                                component="span"
                                className={classes.cardTopLabel}
                            >
                                {I18n.t('home.demo.active')}
                            </Typography>
                            <Typography
                                component="span"
                                className={classes.cardTopTitle}
                            >
                                {I18n.t(`home.demo.scenes.${scene.key}.title`)}
                            </Typography>
                        </Box>

                        <Box className={classes.rule}>
                            <Typography
                                component="span"
                                className={classes.ruleLabel}
                            >
                                {I18n.t('home.demo.when')}
                            </Typography>
                            <Box className={classes.device}>
                                <Box
                                    className={classes.deviceIcon}
                                    aria-hidden="true"
                                >
                                    <TriggerIcon fontSize="inherit" />
                                </Box>
                                <Box>
                                    <Typography className={classes.deviceName}>
                                        {I18n.t(`home.demo.scenes.${scene.key}.trigger`)}
                                    </Typography>
                                    <Typography className={classes.deviceDetail}>
                                        {I18n.t(`home.demo.scenes.${scene.key}.triggerDetail`)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box
                            className={classes.connector}
                            aria-hidden="true"
                        >
                            <i />
                            <i />
                            <i />
                        </Box>

                        <Box className={classes.rule}>
                            <Typography
                                component="span"
                                className={classes.ruleLabel}
                            >
                                {I18n.t('home.demo.then')}
                            </Typography>
                            <Box className={classes.actions}>
                                {ACTION_KEYS.map((action, index) => {
                                    const ActionIcon = scene.actions[index];
                                    return (
                                        <Box
                                            key={action}
                                            className={classes.device}
                                        >
                                            <Box
                                                className={classes.deviceIcon}
                                                aria-hidden="true"
                                            >
                                                <ActionIcon fontSize="inherit" />
                                            </Box>
                                            <Box>
                                                <Typography className={classes.deviceName}>
                                                    {I18n.t(`home.demo.scenes.${scene.key}.actions.${action}.name`)}
                                                </Typography>
                                                <Typography className={classes.deviceDetail}>
                                                    {I18n.t(`home.demo.scenes.${scene.key}.actions.${action}.detail`)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
