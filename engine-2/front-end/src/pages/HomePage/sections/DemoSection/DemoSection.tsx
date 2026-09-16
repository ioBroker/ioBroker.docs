import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useStyles } from './DemoSection.styles';
import { RulesEditor } from './RulesEditor';
import { BlocklyEditor } from './BlocklyEditor';
import { ScriptEditor } from './ScriptEditor';
import { EditorBadge } from './EditorBadge';
import { I18n } from '../../../../utils/i18n';

/**
 * The three examples, each in one of the three notations the JavaScript adapter offers: clicked
 * together as a rule, assembled with Blockly, written in TypeScript. The views redraw the editor
 * the way it really looks in the adapter.
 */
const SCENES = [
    { key: 'evening', editor: 'rules', View: RulesEditor },
    { key: 'solar', editor: 'blockly', View: BlocklyEditor },
    { key: 'away', editor: 'typescript', View: ScriptEditor },
] as const;

/**
 * The third block: it answers the question that comes after the explanation - what is in it for
 * me? On the left three examples to choose from, on the right the script behind them, as it
 * stands in the editor of the adapter.
 */
export const DemoSection: React.FC = () => {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState(0);

    const scene = SCENES[active];

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
                        <br className={classes.titleBreak} />{' '}
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
                                id={`demo-tab-${item.key}`}
                                role="tab"
                                aria-selected={index === active}
                                aria-controls={`demo-panel-${item.key}`}
                                className={cx(classes.scene, index === active ? classes.sceneActive : undefined)}
                                onClick={() => setActive(index)}
                            >
                                <Box className={classes.sceneBody}>
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
                                        {`${I18n.t(`home.demo.scenes.${item.key}.kind`)} · ${I18n.t(`home.demo.editors.${item.editor}`)}`}
                                    </Typography>
                                </Box>
                                {/* the arrow says the panels are there to be tapped: the chosen one
                                    points at the editor, the others invite a switch */}
                                <ChevronRightIcon
                                    className={cx(
                                        classes.sceneChevron,
                                        'demo-scene-chevron',
                                        index === active ? classes.sceneChevronActive : undefined,
                                    )}
                                    aria-hidden="true"
                                />
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

                        {/* all three lie on top of each other in the same cell: the card is as tall as
                            the tallest view and does not jump when switching */}
                        <Box className={classes.stage}>
                            {SCENES.map((item, index) => {
                                const View = item.View;
                                return (
                                    <Box
                                        key={item.key}
                                        id={`demo-panel-${item.key}`}
                                        role="tabpanel"
                                        aria-labelledby={`demo-tab-${item.key}`}
                                        className={cx(
                                            classes.panel,
                                            index === active ? classes.panelActive : undefined,
                                        )}
                                    >
                                        {/* above the editor: which notation this is */}
                                        <Box className={classes.intro}>
                                            <EditorBadge editor={item.editor} />
                                            <Typography className={classes.introText}>
                                                {I18n.t(`home.demo.explain.${item.editor}`)}
                                            </Typography>
                                        </Box>
                                        <View />
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
