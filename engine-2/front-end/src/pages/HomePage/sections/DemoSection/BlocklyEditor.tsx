import React from 'react';
import { Box } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import SolarPowerOutlinedIcon from '@mui/icons-material/SolarPowerOutlined';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import EvStationOutlinedIcon from '@mui/icons-material/EvStationOutlined';
import { useStyles } from './BlocklyEditor.styles';
import { I18n } from '../../../../utils/i18n';

const WORDS = 'home.demo.blockly';
const SCENE = 'home.demo.scenes.solar';

const ACTIONS = [
    { key: '1', icon: BatteryChargingFullIcon },
    { key: '2', icon: WaterDropOutlinedIcon },
    { key: '3', icon: EvStationOutlinedIcon },
] as const;

/**
 * The Blockly view of the JavaScript adapter: the pink trigger block encloses the blue "if"
 * block, which holds the three control commands. The blocks are built from boxes rather than
 * drawn, so that the texts fit into them in every language.
 */
export const BlocklyEditor: React.FC = () => {
    const { classes, cx } = useStyles();

    const caret = <span className={classes.caret}>▾</span>;
    const gear = (
        <span className={classes.gear}>
            <SettingsIcon fontSize="inherit" />
        </span>
    );

    return (
        <Box className={classes.workspace}>
            <Box className={classes.event}>
                <Box className={classes.eventHead}>
                    <Box className={classes.row}>
                        {gear}
                        <span>{I18n.t(`${WORDS}.trigger`)}</span>
                    </Box>
                    <Box className={classes.row}>
                        <span className={cx(classes.field, classes.fieldEvent)}>
                            {I18n.t(`${WORDS}.changed`)}
                            {caret}
                        </span>
                    </Box>
                    <Box className={classes.row}>
                        <span>{I18n.t(`${WORDS}.triggeredBy`)}</span>
                        <span className={cx(classes.field, classes.fieldEvent)}>
                            {I18n.t(`${WORDS}.any`)}
                            {caret}
                        </span>
                    </Box>
                </Box>

                <Box className={classes.eventSlot}>
                    <Box className={cx(classes.value, classes.objectBlock)}>
                        <span>{I18n.t(`${WORDS}.objectId`)}</span>
                        <span className={cx(classes.field, classes.objectField)}>
                            <SolarPowerOutlinedIcon className={classes.objectIcon} />
                            {I18n.t(`${SCENE}.trigger`)}
                            <span className={classes.equals}>=</span>
                        </span>
                    </Box>
                </Box>

                <Box className={classes.eventArm} />

                <Box className={classes.eventBody}>
                    <Box className={classes.comment}>
                        <span className={classes.commentText}>{I18n.t(`${SCENE}.comment`)}</span>
                    </Box>

                    <Box className={classes.ifBlock}>
                        <Box className={cx(classes.row, classes.ifLabel)}>
                            {gear}
                            <span>{I18n.t(`${WORDS}.if`)}</span>
                        </Box>
                        <Box className={classes.ifSlot}>
                            <Box className={cx(classes.value, classes.compareBlock)}>
                                <Box className={cx(classes.value, classes.eventValue)}>
                                    <SubdirectoryArrowRightIcon className={classes.valueIcon} />
                                    <span className={cx(classes.field, classes.fieldEvent)}>
                                        {I18n.t(`${WORDS}.value`)}
                                        {caret}
                                    </span>
                                </Box>
                                <span className={cx(classes.field, classes.fieldLogic)}>
                                    {'>'}
                                    {caret}
                                </span>
                                <Box className={cx(classes.value, classes.numberBlock)}>
                                    <span className={cx(classes.field, classes.fieldNumber)}>2500</span>
                                </Box>
                            </Box>
                        </Box>
                        <Box className={classes.doLabel}>{I18n.t(`${WORDS}.do`)}</Box>
                        <Box className={classes.ifBody}>
                            {ACTIONS.map(action => {
                                const ActionIcon = action.icon;
                                return (
                                    <Box
                                        key={action.key}
                                        className={classes.control}
                                    >
                                        <span>{I18n.t(`${WORDS}.control`)}</span>
                                        <span className={cx(classes.field, classes.fieldLogic)}>
                                            <ActionIcon className={classes.objectIcon} />
                                            {I18n.t(`${SCENE}.actions.${action.key}.name`)}
                                            <span className={classes.equals}>=</span>
                                        </span>
                                        <span>{I18n.t(`${WORDS}.with`)}</span>
                                        <Box className={cx(classes.value, classes.booleanBlock)}>
                                            <span className={cx(classes.field, classes.fieldLogic)}>
                                                {I18n.t(`${WORDS}.true`)}
                                                {caret}
                                            </span>
                                        </Box>
                                        <span>{I18n.t(`${WORDS}.delay`)}</span>
                                        <span className={classes.checkbox} />
                                    </Box>
                                );
                            })}
                        </Box>
                        <Box className={classes.ifFoot} />
                    </Box>
                </Box>

                <Box className={classes.eventFoot} />
            </Box>
        </Box>
    );
};
