import React, { Component } from 'react';
import { withStyles } from '@mui/styles';
import PropTypes from 'prop-types';

import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

import ReactEchartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';
import {
    TooltipComponent,
    LegendComponent,
    GridComponent,
} from 'echarts/components';

import { MdFullscreen as IconZoom } from 'react-icons/md';

import { Utils as ARUtils } from '@iobroker/adapter-react-v5';

import I18n from '../i18n';
import Utils from '../Utils';
import PieStats from '../Components/PieStats';
import Footer from '../Footer';

echarts.use([LineChart, TooltipComponent, LegendComponent, GridComponent, SVGRenderer]);

const styles = theme => ({
    content: theme.content,
    iframe: {
        border: 0,
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        position: 'relative',
        zIndex: 0,
    },
    iframeButton: {
        position: 'absolute',
        opacity: 0.9,
        top: 10,
        right: 10,
        zIndex: 1,
    },
    root: {
        textAlign: 'center',
    },
    paper: {
        display: 'inline-block',
        verticalAlign: 'top',
        margin: 10,
        padding: 10,
    },
    paperHeader: {
        fontSize: 24,
        paddingBottom: 10,
        width: '100%',
        textAlign: 'center',
    },
    paperMap: {
        width: 'calc(100% - 40px)',
        height: 'calc(100% - 140px)',
    },
    paperCounters: {
        width: 'calc(100% - 400px)',
        height: 400,
    },
    paperMobile: {
        width: 'calc(100% - 40px) !important',
    },
    paperPlatforms: {
        width: 'calc(33% - 40px)',
        height: 400,
    },
    paperLanguages: {
        width: 'calc(33% - 40px)',
        height: 400,
    },
    paperNodes: {
        width: 'calc(33% - 40px)',
        height: 400,
    },
    paperCountries: {
        width: 320,
        height: 400,
        overflowX: 'hidden',
        overflowY: 'auto',
    },
    tableRoot: {
        height: 'calc(100% - 55px)',
        width: '100%',
        overflow: 'hidden',
    },
    table: {

    },
    tableLogo: {
        height: 'auto',
        width: 'auto',
        maxWidth: 32,
    },
    tableRow: {
        cursor: 'pointer',
        height: 24,
        '&:hover': {
            background: '#DDDDDD',
        },
    },
    tableCell: {
        padding: '0 5px',
        minWidth: 0,
    },
    tableColumnVersion: {
        fontWeight: 'bold',
    },
    tableColumnCount: {

    },
    tableColumnPercent: {

    },
});
const MAX_MOBILE_WIDTH = 1000;
class Statistics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            statistics: null,
            date: '',
            mobile: this.props.mobile || this.props.contentWidth < MAX_MOBILE_WIDTH,
        };

        setTimeout(() => Utils.getStatistics()
            .then(statistics =>
                this.setState({
                    statistics,
                    date: `${new Date(statistics.date).toLocaleDateString()} ${new Date(statistics.date).toLocaleTimeString()}`,
                })), 200);
    }

    static getDerivedStateFromProps(props, state) {
        if (state.mobile !== (props.mobile || props.contentWidth < MAX_MOBILE_WIDTH)) {
            return { mobile: (props.mobile || props.contentWidth < MAX_MOBILE_WIDTH) };
        }

        return null;
    }

    renderMap() {
        return <Paper key="map" className={ARUtils.clsx(this.props.classes.paper, this.props.classes.paperMap)}>
            <IconButton
                className={this.props.classes.iframeButton}
                title={I18n.t('Open in new window')}
                onClick={() => Utils.openLink('data/map.html')}
            >
                <IconZoom />
            </IconButton>
            <iframe title="googleMaps" className={this.props.classes.iframe} src="data/map.html" />
        </Paper>;
    }

    renderCountriesTable() {
        const countries = this.state.statistics.countries;
        if (!countries) return null;
        let sum = 0;
        const keys = Object.keys(countries);
        keys.forEach(c => sum += countries[c]);

        return <Table key="table" padding="none" className={this.props.classes.table}>
            <TableHead>
                <TableRow style={{ background: 'grey', color: 'white' }}>
                    <TableCell className={ARUtils.clsx(this.props.classes.tableCell, this.props.classes.tableColumnVersion)} align="left">{I18n.t('Country')}</TableCell>
                    <TableCell className={ARUtils.clsx(this.props.classes.tableCell, this.props.classes.tableColumnCount)} align="left">{I18n.t('Count')}</TableCell>
                    <TableCell className={ARUtils.clsx(this.props.classes.tableCell, this.props.classes.tableColumnPercent)} align="left">%</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {keys.map((c, i) =>
                    <TableRow key={i} className={this.props.classes.tableRow}>
                        <TableCell className={ARUtils.clsx(this.props.classes.tableCell, this.props.classes.tableColumnVersion)}>{c}</TableCell>
                        <TableCell className={ARUtils.clsx(this.props.classes.tableCell, this.props.classes.tableColumnCount)}>{countries[c]}</TableCell>
                        <TableCell className={ARUtils.clsx(this.props.classes.tableCell, this.props.classes.tableColumnPercent)}>
                            {Math.round((countries[c] / sum) * 10000) / 100}
                            %
                        </TableCell>
                    </TableRow>)}
            </TableBody>
        </Table>;
    }

    renderCountries() {
        if (!this.state.statistics) {
            return null;
        }

        return <Paper key="countries" className={ARUtils.clsx(this.props.classes.paper, this.props.classes.paperCountries, this.state.mobile ? this.props.classes.paperMobile : '')}>
            {this.renderCountriesTable()}
        </Paper>;
    }

    renderPlatforms() {
        if (!this.state.statistics || !this.state.statistics.platforms) {
            return null;
        }

        return <Paper key="plattform" className={ARUtils.clsx(this.props.classes.paper, this.props.classes.paperPlatforms, this.state.mobile ? this.props.classes.paperMobile : '')}>
            <div className={this.props.classes.paperHeader} title={this.state.date}>{I18n.t('Platforms')}</div>
            <PieStats
                data={this.state.statistics.platforms}
                height="380px"
                startFromPercent={0}
                series={I18n.t('Platform')}
            />
        </Paper>;
    }

    renderLanguages() {
        if (!this.state.statistics || !this.state.statistics.languages) {
            return null;
        }

        return <Paper key="language" className={ARUtils.clsx(this.props.classes.paper, this.props.classes.paperLanguages, this.state.mobile ? this.props.classes.paperMobile : '')}>
            <div className={this.props.classes.paperHeader} title={this.state.date}>{I18n.t('Languages')}</div>
            <PieStats
                data={this.state.statistics.languages}
                startFromPercent={0}
                height="380px"
                series={I18n.t('Language')}
            />
        </Paper>;
    }

    renderNodes() {
        if (!this.state.statistics || !this.state.statistics.nodes) {
            return null;
        }

        return <Paper key="nodes" className={ARUtils.clsx(this.props.classes.paper, this.props.classes.paperNodes, this.state.mobile ? this.props.classes.paperMobile : '')}>
            <div className={this.props.classes.paperHeader} title={this.state.date}>{I18n.t('Node versions')}</div>
            <PieStats
                data={this.state.statistics.nodes}
                height="380px"
                startFromPercent={0}
                series={I18n.t('Versions')}
            />
        </Paper>;
    }

    renderCounters() {
        if (!this.state.statistics) {
            return null;
        }
        const counts = this.state.statistics.counts;
        if (!counts) {
            return null;
        }
        const labels = Object.keys(counts);
        const data = [];
        let max = 0;
        labels.forEach(date => {
            const now = new Date(date);

            data.push({
                name: date,
                value: [
                    [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                    counts[date],
                ],
            });
            if (max < counts[date]) {
                max = counts[date];
            }
        });

        const option = {
            tooltip: {
                trigger: 'axis',
                formatter: params => {
                    params = params[0];
                    const date = new Date(params.name);
                    return `${date.toLocaleDateString()}: ${params.value[1]}`;
                },
                axisPointer: {
                    animation: false,
                },
            },
            xAxis: {
                type: 'time',
                splitLine: {
                    show: false,
                },
                interval: this.props.mobile ? undefined : 36000000 * 24 * 10,
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                max: Math.floor((max * 1.1) / 1000) * 1000,
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    formatter: v => `${Math.ceil(v / 1000)}k`,
                },
            },
            series: [{
                name: I18n.t('Month count'),
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data,
                areaStyle: {},
            }],
        };

        return <Paper key="counters" className={ARUtils.clsx(this.props.classes.paper, this.props.classes.paperCounters, this.state.mobile ? this.props.classes.paperMobile : '')}>
            <div
                title={this.state.date}
                className={this.props.classes.paperHeader}
            >
                {`${I18n.t('Installations')} ${counts[labels[labels.length - 1]]} - ${labels[labels.length - 1]}`}
            </div>
            <ReactEchartsCore
                echarts={echarts}
                option={option}
                notMerge
                lazyUpdate
                theme="westeros"
                style={{ height: '350px' }}
                opts={{ renderer: 'svg' }}
            />
        </Paper>;
    }

    renderDbStatesTypes() {
        if (!this.state.statistics || !this.state.statistics.dbTypeStates) {
            return null;
        }

        return <Paper key="types" className={ARUtils.clsx(this.props.classes.paper, this.props.classes.paperPlatforms, this.state.mobile ? this.props.classes.paperMobile : '')}>
            <div className={this.props.classes.paperHeader} title={this.state.date}>{I18n.t('State DB Types')}</div>
            <PieStats
                data={this.state.statistics.dbTypeStates}
                height="380px"
                startFromPercent={0}
                series={I18n.t('State DB Types')}
            />
        </Paper>;
    }

    renderDbObjectsTypes() {
        if (!this.state.statistics || !this.state.statistics.dbTypeObjects) {
            return null;
        }

        return <Paper key="dbs" className={ARUtils.clsx(this.props.classes.paper, this.props.classes.paperPlatforms, this.state.mobile ? this.props.classes.paperMobile : '')}>
            <div className={this.props.classes.paperHeader} title={this.state.date}>{I18n.t('Object DB Types')}</div>
            <PieStats
                data={this.state.statistics.dbTypeObjects}
                height="380px"
                startFromPercent={0}
                series={I18n.t('Object DB Types')}
            />
        </Paper>;
    }

    renderDocker() {
        if (!this.state.statistics || !this.state.statistics.docker) {
            return null;
        }

        return <Paper key="plattform" className={ARUtils.clsx(this.props.classes.paper, this.props.classes.paperPlatforms, this.state.mobile ? this.props.classes.paperMobile : '')}>
            <div className={this.props.classes.paperHeader} title={this.state.date}>{I18n.t('Docker vs Normal')}</div>
            <PieStats
                data={this.state.statistics.docker}
                height="380px"
                startFromPercent={0}
                series={I18n.t('Docker vs Normal')}
            />
        </Paper>;
    }

    render() {
        return [
            this.renderMap(),
            <div key="stat" className={this.props.classes.root}>
                {this.renderPlatforms()}
                {this.renderLanguages()}
                {this.renderNodes()}
                {this.renderCounters()}
                {this.renderCountries()}
                {this.renderDbStatesTypes()}
                {this.renderDbObjectsTypes()}
                {this.renderDocker()}
                <Footer key="footer" theme={this.props.theme} mobile={this.props.mobile} onNavigate={this.props.onNavigate} />
            </div>,
        ];
    }
}

Statistics.propTypes = {
    onNavigate: PropTypes.func,
    theme: PropTypes.string,
    mobile: PropTypes.bool,
    contentWidth: PropTypes.number,
};

export default withStyles(styles)(Statistics);
