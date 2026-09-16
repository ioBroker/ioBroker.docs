import React from 'react';
import { Box } from '@mui/material';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import HelpIcon from '@mui/icons-material/Help';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from '@mui/icons-material/Add';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import BlindsIcon from '@mui/icons-material/Blinds';
import { useStyles } from './RulesEditor.styles';
import { I18n } from '../../../../utils/i18n';

const WORDS = 'home.demo.rules';
const SCENE = 'home.demo.scenes.evening';

const ACTIONS = [
    { key: '1', icon: LightbulbOutlinedIcon },
    { key: '2', icon: ThermostatIcon },
    { key: '3', icon: BlindsIcon },
] as const;

interface RuleCardProps {
    trigger?: boolean;
    icon: typeof DirectionsWalkIcon;
    name: string;
    id: string;
    kind: string;
}

/** one line in the rules editor: a trigger or an action, with its data point */
const RuleCard: React.FC<RuleCardProps> = ({ trigger, icon: DeviceIcon, name, id, kind }) => {
    const { classes, cx } = useStyles();
    const KindIcon = trigger ? FlashOnIcon : SaveAltIcon;

    return (
        <Box className={cx(classes.card, trigger ? classes.cardTrigger : classes.cardAction)}>
            <KindIcon className={classes.kindIcon} />
            <Box className={classes.device}>
                <DeviceIcon className={classes.deviceIcon} />
                <ArrowRightIcon className={classes.expand} />
            </Box>
            <Box className={classes.text}>
                <span className={classes.caption}>{kind}</span>
                <span className={classes.name}>{name}</span>
                <span className={classes.id}>{id}</span>
            </Box>
            <span className={classes.chip}>{kind}</span>
            {trigger ? null : <HelpIcon className={classes.help} />}
        </Box>
    );
};

/**
 * The rules editor of the JavaScript adapter: "if" carries the trigger, "and" the condition,
 * "then" the actions. The colours are those of the editor and therefore do not follow the theme
 * of the page.
 */
export const RulesEditor: React.FC = () => {
    const { classes, cx } = useStyles();

    return (
        <Box className={classes.root}>
            <Box className={classes.section}>
                <Box className={cx(classes.sectionTitle, classes.titleIf)}>
                    <FlashOnIcon className={classes.sectionIcon} />
                    {I18n.t(`${WORDS}.if`)}
                </Box>
                <Box className={classes.cards}>
                    <RuleCard
                        trigger
                        icon={DirectionsWalkIcon}
                        name={I18n.t(`${SCENE}.trigger`)}
                        id={I18n.t(`${SCENE}.triggerId`)}
                        kind={I18n.t(`${WORDS}.onChange`)}
                    />
                </Box>
            </Box>

            <Box className={classes.band}>
                <HelpIcon className={classes.bandIcon} />
                <span className={classes.bandTitle}>{I18n.t(`${WORDS}.and`)}</span>
                <ChevronRightIcon className={classes.chevron} />
                <span className={classes.bandText}>{I18n.t(`${WORDS}.noCondition`)}</span>
            </Box>

            <Box className={cx(classes.section, classes.sectionThen)}>
                <Box className={cx(classes.sectionTitle, classes.titleThen)}>
                    <SaveAltIcon className={classes.sectionIcon} />
                    {I18n.t(`${WORDS}.then`)}
                </Box>
                <Box className={classes.cards}>
                    {ACTIONS.map(action => (
                        <RuleCard
                            key={action.key}
                            icon={action.icon}
                            name={`${I18n.t(`${SCENE}.actions.${action.key}.name`)} ← ${I18n.t(`${SCENE}.actions.${action.key}.value`)}`}
                            id={I18n.t(`${SCENE}.actions.${action.key}.id`)}
                            kind={I18n.t(`${WORDS}.control`)}
                        />
                    ))}
                </Box>
                <Box className={classes.otherwise}>
                    <AddIcon className={classes.otherwiseIcon} />
                    <span className={classes.otherwiseLine} />
                    <span>{I18n.t(`${WORDS}.else`)}</span>
                </Box>
            </Box>
        </Box>
    );
};
