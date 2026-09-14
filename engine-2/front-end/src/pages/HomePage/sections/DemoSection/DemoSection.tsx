import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './DemoSection.styles';
import { RulesEditor } from './RulesEditor';
import { BlocklyEditor } from './BlocklyEditor';
import { ScriptEditor } from './ScriptEditor';
import { EditorBadge } from './EditorBadge';
import { I18n } from '../../../../utils/i18n';

/**
 * Die drei Beispiele, jedes in einer der drei Schreibweisen, die der JavaScript-Adapter
 * anbietet: als Regel zusammengeklickt, mit Blockly gesteckt, in TypeScript geschrieben.
 * Die Ansichten zeichnen den Editor so nach, wie er im Adapter wirklich aussieht.
 */
const SCENES = [
    { key: 'evening', editor: 'rules', View: RulesEditor },
    { key: 'solar', editor: 'blockly', View: BlocklyEditor },
    { key: 'away', editor: 'typescript', View: ScriptEditor },
] as const;

/**
 * Der dritte Block: er beantwortet die Frage, die nach der Erklaerung kommt - was habe
 * ich davon? Links stehen drei Beispiele zur Wahl, rechts liegt das Skript, das dahinter
 * steckt, so wie es im Editor des Adapters steht.
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
                                id={`demo-tab-${item.key}`}
                                role="tab"
                                aria-selected={index === active}
                                aria-controls={`demo-panel-${item.key}`}
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
                                    {`${I18n.t(`home.demo.scenes.${item.key}.kind`)} · ${I18n.t(`home.demo.editors.${item.editor}`)}`}
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

                        {/* alle drei liegen im selben Feld uebereinander: die Karte ist so hoch wie
                            die hoechste Ansicht und springt beim Umschalten nicht */}
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
                                        {/* ueber dem Editor: was fuer eine Schreibweise das ist */}
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
