import React from 'react';
import PropTypes from 'prop-types';

import {
    Paper,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Button,
    MenuItem,
    FormHelperText,
    FormControl,
    Input,
    IconButton,
    Snackbar,
    Dialog,
    DialogContent,
    DialogActions,
    Select,
} from '@mui/material';

import {
    MdContentCopy as IconCopy,
    MdClose as IconClose,
} from 'react-icons/md';

import Loader from '../Components/Loader';
import I18n from '../i18n';
import Footer from '../Footer';
import Utils from '../Utils';
import Markdown from '../Markdown';
import Router from '../Router';

const MARGIN = 10;
const styles = {
    formControl: {
        marginLeft: 20,
        marginBottom: 10,
        marginTop: 5,
        minWidth: 100,
    },
    root: {
        width: 'calc(100% - 20px)',
        margin: 'auto',
        minHeight: '100%',
    },
    rootMobile: {
        textAlign: 'center',
    },
    card: {
        margin: MARGIN,
        minWidth: 220,
        maxWidth: 350,
        // minHeight: 300,
        display: 'inline-block',
        verticalAlign: 'top',
    },
    cardMedia: {
        height: 64,
        width: 128,
        marginTop: 40,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 0,
        borderRadius: 3,
    },
    cardTitle: {
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 16,
        zIndex: 1,
        whiteSpace: 'nowrap',
    },
    cardContent: {
        zIndex: 1,
        paddingTop: 64,
        textAlign: 'left',
    },
    cardLine: {
        display: 'flex',
        marginBottom: 3,
    },
    cardLineName: {
        fontWeight: 'bold',
        flex: 1,
        marginRight: 8,
    },
    cardLineValue: {},
    instructionDiv: {
        width: 'calc(100% - 80px)',
        ml: '20px',
        mr: '20px',
        maxWidth: 750,
        mb: '10px',
        mt: '5px',
        minWidth: 100,
        p: '20px',
        overflow: 'hidden',
        '&:before': {
            content: '"⚠"',
            color: '#ff5a5a',
            fontSize: 24,
            pr: '10px',
            // borderRadius: '50%',
            // background: '#008aff',
        },
    },
    instructionCode: {
        position: 'relative',
        background: '#999999',
        padding: 5,
        borderRadius: 3,
        color: '#FFFFFF',
    },
    instructionCopy: {
        position: 'absolute',
        top: -2,
        right: -4,
        color: '#FFFFFF',
        opacity: 0.8,
        cursor: 'pointer',
        zIndex: 1,
    },
};

const IGNORED_ATTRS = ['file', 'date', 'linux', 'picture', 'device', 'info', 'details'];
class Downloads extends Router {
    constructor(props) {
        super(props);

        const location = Router.getLocation();

        this.state = {
            content: null,
            loadTimeout: false,
            filter: 'all',
            tooltip: '',
            info: location.chapter || '',
        };
        this.load();
        // Give 300ms to load the page. After that show the loading indicator.
        setTimeout(() =>
            !this.state.content && this.setState({ loadTimeout: true }), 300);

        this.contentRef = React.createRef();
    }

    load() {
        const d = new Date();

        fetch(`downloads.json?t=${d.getFullYear()}_${d.getMonth()}_${d.getDate()}_${d.getHours()}`)
            .then(res => res.json())
            .then(content => this.setState({ content }));
    }

    /* {
        file: 'ioBroker_Image_OdroidC2_20190209_stretch.zip',
        linux: 'Armbian Stretch',
        date: '20190128',
        device: 'Odroid C2',
        details: 'ioBroker minimal Image<br><ul><li>nodejs 8.15.0</li><li>npm 6.4.1</li></ul>',
        picture: 'c2_img.png',
        user: 'pi',
        password: 'raspberry',
        info: 'http://www.iobroker.net/docu/?page_id=8955&lang=de'
    } */
    static renderLine(name, value) {
        return <div key={name} style={styles.cardLine}>
            <span style={styles.cardLineName}>
                {I18n.t(name)}
                :
            </span>
            <span style={styles.cardLineValue}>
                {value}
            </span>
        </div>;
    }

    static formatDate(date) {
        return `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`;
    }

    static formatDetails(details) {
        const lines = details.split(/<br\/?>|<\/li>/);
        lines.forEach((line, i) =>
            lines[i] = line
                .replace(/<\/?\w+>/g, '')
                .replace(/^ioBroker/, ''));

        return <div>{lines.map(line => [line, <br key="br" />])}</div>;
    }

    closeDialog() {
        this.onNavigate(null, null, null, '');
        this.setState({ info: '' });
    }

    onNavigate(language, tab, page, chapter) {
        this.props.onNavigate(language, tab, page, chapter);
    }

    renderInfo() {
        if (!this.state.info) {
            return null;
        }

        return <Dialog
            style={styles.dialog}
            fullWidth={this.state.mobile}
            maxWidth="xl"
            open={!0}
            onClose={() => this.closeDialog()}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogContent
                style={{ ...styles.dialogContent, ...(this.state.mobile ? styles.dialogContentMobile : undefined) }}>
                {this.state.info.endsWith('.md') ?
                    <Markdown
                        path={`downloads/${this.state.info}`}
                        rootPath="documentation"
                        language={this.props.language}
                        theme={this.props.theme}
                        mobile={this.props.mobile}
                        editMode={false}
                        editEnabled={false}
                        onNavigate={(language, tab, page, chapter) => this.onNavigate(language, tab, page, chapter)}
                    />
                    :
                    <div dangerouslySetInnerHTML={{ __html: this.state.info }} />}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => this.closeDialog()} color="primary">{I18n.t('Close')}</Button>
            </DialogActions>
        </Dialog>;
    }

    onLink(link) {
        if (link.match(/^https?:/i)) {
            Utils.openLink(link);
        } else {
            link.endsWith('.md') && this.onNavigate(null, null, null, link);
            this.setState({ info: link });
        }
    }

    renderImage(image) {
        // if (this.state.filter && this.state.filter !== 'all' && this.state.filter !== image.device) {
        //     return null;
        // }

        return <Card
            key={image.file}
            style={{
                ...styles.card,
                width: this.props.mobile ? '100%' : this.cardWidth,
            }}
        >
            <CardActionArea>
                <div
                    style={{ ...styles.cardMedia, backgroundImage: `url(img/${image.picture})` }}
                />
                <div style={styles.cardTitle}>
                    <h2>{image.device}</h2>
                </div>
                <CardContent style={styles.cardContent}>
                    <h2>&nbsp;</h2>
                    <div style={styles.cardInfo}>
                        <div>
                            {image.date ? Downloads.renderLine('Date', Downloads.formatDate(image.date)) : null}
                            {image.linux === 'Windows' ? Downloads.renderLine('OS', image.linux) : Downloads.renderLine('Linux', image.linux)}

                            {Object.keys(image)
                                .filter(attr => IGNORED_ATTRS.indexOf(attr) === -1)
                                .map(attr => {
                                    if (image[attr].match(/^https?:/)) {
                                        return Downloads.renderLine(attr, <a href={image[attr]} target="_blank" rel="noopener noreferrer">{I18n.t('link')}</a>);
                                    }

                                    return Downloads.renderLine(attr, image[attr]);
                                })}

                            {image.details && Downloads.renderLine('Details', Downloads.formatDetails(image.details))}
                        </div>
                    </div>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => Utils.openLink(image.file.startsWith('http') ? image.file : `https://iobroker.live/images/${image.file}`)}>{I18n.t('Download')}</Button>
                {image.info && <Button size="small" color="primary" onClick={() => this.onLink(image.info)}>{I18n.t('Info')}</Button>}
            </CardActions>
        </Card>;
    }

    renderSnackbar() {
        return <Snackbar
            key="snackbar"
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={!!this.state.tooltip}
            autoHideDuration={6000}
            onClose={() => this.setState({ tooltip: '' })}
            message={<span id="message-id">{this.state.tooltip}</span>}
            action={[
                <IconButton
                    key="close"
                    color="inherit"
                    style={styles.close}
                    onClick={() => this.setState({ tooltip: '' })}
                >
                    <IconClose />
                </IconButton>,
            ]}
        />;
    }

    renderInfoAboutInstall() {
        return <Paper key="instruction" sx={styles.instructionDiv}>
            {I18n.t('instruction1')}
            <br />
            <br />
            {I18n.t('instruction2')}
            <br />
            <br />
            <pre style={styles.instructionCode}>
                curl -sLf https://iobroker.net/install.sh | bash -
                <br />
                <IconButton
                    style={styles.instructionCopy}
                    title={I18n.t('copy to clipboard')}
                    onClick={e => {
                        Utils.onCopy(e, 'curl -sLf https://iobroker.net/install.sh | bash -');
                        this.setState({ tooltip: I18n.t('Copied') });
                    }}
                >
                    <IconCopy fontSize="small" />
                </IconButton>
            </pre>
            {I18n.t('instruction3')}
        </Paper>;
    }

    renderSelector() {
        if (!this.state.content) {
            return null;
        }
        const types = [];
        this.state.content.forEach(item => !types.includes(item.device) && types.push(item.device));

        return <FormControl key="selector" style={styles.formControl}>
            <Select
                variant="standard"
                value={this.state.filter}
                onChange={e => this.setState({ filter: e.target.value })}
                input={<Input name="type" id="type-helper" />}
            >
                <MenuItem value="all"><em>{I18n.t('All')}</em></MenuItem>
                {types.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
            </Select>
            <FormHelperText>
                {I18n.t('Platform')}
            </FormHelperText>
        </FormControl>;
    }

    render() {
        if (this.state.loadTimeout && !this.state.content) {
            return <Loader theme={this.props.theme} />;
        }

        return [
            this.renderInfoAboutInstall(),
            // this.renderSelector(),
            <div key="table" style={{ ...styles.root, ...(this.props.mobile ? styles.rootMobile : undefined) }}>
                {this.state.content?.map(image => this.renderImage(image))}
            </div>,
            <Footer key="footer" theme={this.props.theme} mobile={this.props.mobile} onNavigate={this.props.onNavigate} />,
            this.renderSnackbar(),
            this.renderInfo(),
        ];
    }
}

Downloads.propTypes = {
    language: PropTypes.string,
    onNavigate: PropTypes.func,
    theme: PropTypes.string,
    mobile: PropTypes.bool,
};

export default Downloads;
