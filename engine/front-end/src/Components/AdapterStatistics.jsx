import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
    Button,
} from '@mui/material';

import I18n from '../i18n';
import Utils from '../Utils';
import PieStats from './PieStats';

const styles = {
    dialogContent: {
        textAlign: 'center',
    },
    dialogContentMobile: {
        padding: 5,
    },
    paper: {
        display: 'inline-block',
        verticalAlign: 'top',
        margin: 10,
    },
    paperPie: {
        width: 400,
        height: 380,
        padding: 10,
    },
    paperTable: {
        height: 400,
        overflowY: 'auto',
        overflowX: 'hidden',
    },
    paperMobile: {
        width: 'calc(100% - 40px) !important',
        margin: '5px !important',
        padding: '3px !important',
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
    tableRow:{
        cursor: 'pointer',
        height: 24,
        '&:hover': {
            background: '#DDDDDD',
        },
    },
    tableCell:{
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
};
const MAX_MOBILE_WIDTH = 1000;

class AdapterStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderBy: window.localStorage ? window.localStorage.getItem('Docs.asOrderBy') || 'Count' : 'Count',
            order: window.localStorage ? window.localStorage.getItem('Docs.asOrder') || 'desc' : 'desc',
            mobile: this.props.mobile || this.props.width < MAX_MOBILE_WIDTH,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.mobile !== (nextProps.mobile || nextProps.width < MAX_MOBILE_WIDTH)) {
            this.setState({ mobile: (nextProps.mobile || nextProps.width < MAX_MOBILE_WIDTH) });
        }
    }

    sortHandler(col) {
        if (this.state.orderBy === col) {
            const order = this.state.order === 'asc' ? 'desc' : 'asc';
            this.setState({ order });
            window.localStorage && window.localStorage.setItem('Docs.asOrder', order);
        } else {
            const order = 'desc';
            window.localStorage && window.localStorage.setItem('Docs.asOrder', order);
            window.localStorage && window.localStorage.setItem('Docs.asOrderBy', col);
            this.setState({ order, orderBy: col });
        }
    }

    renderHeaderCell(style, type, align) {
        return (<TableCell
            styles={{ ...styles.tableCell, ...style }}
            align={align}
            sortDirection={this.state.orderBy === type ? this.state.order : false}
        >
            <Tooltip
                title={I18n.t('Sort')}
                placement="bottom-end"
                enterDelay={300}
            >
                <TableSortLabel
                    active={this.state.orderBy === type}
                    direction={this.state.order}
                    onClick={() => this.sortHandler(type)}
                >
                    {I18n.t(type)}
                </TableSortLabel>
            </Tooltip>
        </TableCell>);
    }

    renderTable() {
        let versions;
        const stats = this.props.statistics.versions[this.props.adapter];

        if (this.state.orderBy === 'Version') {
            if (this.state.order === 'asc') {
                versions = Object.keys(stats).sort((a, b) => Utils.compareStrings(a, b));
            } else {
                versions = Object.keys(stats).sort((a, b) => Utils.compareStrings(a, b, true));
            }
        } else {
            versions = Object.keys(stats);
            if (this.state.order === 'asc') {
                versions.sort((a, b) => stats[a] - stats[b]);
            } else {
                versions.sort((a, b) => stats[b] - stats[a]);
            }
        }
        let sum = 0;
        versions.forEach(v => sum += stats[v]);

        return <Table key="table" padding="dense" style={styles.table}>
            <TableHead>
                <TableRow>
                    {this.renderHeaderCell(styles.tableColumnVersion, 'Version', 'right')}
                    {this.renderHeaderCell(styles.tableColumnCount, 'Count', 'left')}
                    <TableCell style={{ ...styles.tableCell, ...styles.tableColumnPercent }} align="left">%</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {versions.map(v => <TableRow sx={styles.tableRow}>
                    <TableCell style={{ ...styles.tableCell, ...styles.tableColumnVersion }}>{v}</TableCell>
                    <TableCell style={{ ...styles.tableCell, ...styles.tableColumnCount }}>{stats[v]}</TableCell>
                    <TableCell style={{ ...styles.tableCell, ...styles.tableColumnPercent }}>
                        {Math.round((stats[v] / sum) * 10000) / 100}
                        %
                    </TableCell>
                </TableRow>)}
            </TableBody>
        </Table>;
    }

    renderContent() {
        return [
            <h2>
                <span style={{ marginRight: 8 }}>{I18n.t('Total count: ')}</span>
                {this.props.statistics.adapters[this.props.adapter]}
            </h2>,
            <Paper style={{ ...styles.paper, ...styles.paperPie, ...(this.state.mobile ? styles.paperMobile : undefined) }}>
                <PieStats
                    data={this.props.statistics.versions[this.props.adapter]}
                    size="45%"
                    height={400}
                    hideNumbersInLegend
                    startFromPercent={3}
                    series={I18n.t('Count')}
                />
            </Paper>,
            <Paper style={{ ...styles.paper, ...styles.paperTable, ...(this.state.mobile ? styles.paperMobile : undefined) }}>{this.renderTable()}</Paper>,
        ];
    }

    render() {
        return <Dialog
            style={styles.dialog}
            fullWidth={this.state.mobile}
            maxWidth="xl"
            open={!0}
            onClose={() => this.props.onClose()}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle id="max-width-dialog-title">{I18n.t('Adapter %s statistics', this.props.adapter)}</DialogTitle>
            <DialogContent style={{ ...styles.dialogContent, ...(this.state.mobile ? styles.dialogContentMobile : undefined) }}>
                {
                    !this.props.statistics ||
                    !this.props.statistics.versions ||
                    !this.props.statistics.versions[this.props.adapter] ? <Paper>No info</Paper> :
                        this.renderContent()
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={() => this.props.onClose()} color="primary">{I18n.t('Close')}</Button>
            </DialogActions>
        </Dialog>;
    }
}

AdapterStatistics.propTypes = {
    mobile: PropTypes.bool,
    width: PropTypes.number,
    adapter: PropTypes.string,
    statistics: PropTypes.object,
    onClose: PropTypes.func,
};

export default AdapterStatistics;
