import React from 'react';
import PropTypes from 'prop-types';

let index = 0;

const loadDynamicScript = (url, name, callback) => {
    const existingScript = document.getElementById(name);

    if (!existingScript) {
        const script = document.createElement('script');
        script.src = url; // URL for the third-party library being loaded.
        script.id = name; // e.g., googleMaps or stripe
        document.body.appendChild(script);

        script.onload = () =>
            callback && callback();
    }

    if (existingScript && callback) callback();
};

class ScriptEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'current',
            readOnly: props.readOnly || false,
            check: false,
            searchText: this.props.searchText || '',
        };
        this.monacoDiv = null; //ref
        this.editor = null;
        this.monaco = window.monaco;
        this.insert = '';
        this.originalCode = props.code || '';
        this.lastSearch = '';

        this.loaded = false;

        //     <script type="text/javascript" src="vs/loader.js"></script>
        //     <script type="text/javascript" src="vs/configure.js"></script>
        loadDynamicScript('vs/loader.js', 'vsLoader', () => {
            loadDynamicScript('vs/configure.js', 'vsConfigure', () => {
                this.loaded = true;
            });
        });

    }

    waitForMonaco(cb) {
        if (!this.monaco || !this.loaded) {
            this.monaco = window.monaco;
            this.monacoCounter = this.monacoCounter || 0;
            this.monacoCounter++;
            if ((!this.monaco || !this.loaded) && this.monacoCounter < 20) {
                console.log('wait for monaco loaded');
                return setTimeout(() => this.waitForMonaco(cb), 500);
            } else if (this.monacoCounter >= 20) {
                console.error('Cannot load monaco!');
            }
        } else {
            cb && cb();
        }
    }

    componentDidMount() {
        if (!this.monaco || !this.loaded) {
            this.monaco = window.monaco;
            if (!this.monaco || !this.loaded) {
                console.log('wait for monaco loaded');
                return this.waitForMonaco(() => this.componentDidMount());
            }
        }
        if (!this.editor) {
            this.props.onRegisterSelect && this.props.onRegisterSelect(() => this.editor.getModel().getValueInRange(this.editor.getSelection()));
            // For some reason we have to get the original compiler options
            // and assign new properties one by one
            const compilerOptions = this.monaco.languages.typescript.typescriptDefaults['getCompilerOptions']();
            compilerOptions.target = this.monaco.languages.typescript.ScriptTarget.ES2015;
            compilerOptions.allowJs = true;
            compilerOptions.checkJs = false;
            compilerOptions.noLib = true;
            compilerOptions.lib = [];
            compilerOptions.moduleResolution = this.monaco.languages.typescript.ModuleResolutionKind.NodeJs;
            this.monaco.languages.typescript.typescriptDefaults.setCompilerOptions(compilerOptions);

            this.setTypeCheck(false);

            // Create the editor instances
            this.editor = this.monaco.editor.create(this.monacoDiv, {
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true
            });

            this.editor.onDidChangeModelContent(e => {
                this.onChange(this.editor.getValue());
            });

            this.state.searchText && setTimeout(() => this.highlightText(this.state.searchText));
        }
        const options = {
            selectOnLineNumbers: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            language: 'markdown'
        };
        this.setEditorOptions(options);
        this.editor.focus();
        this.editor.setValue(this.originalCode);
    }

    /**
     * Sets some options of the code editor
     * @param {object} options The editor options to change
     * @param {Partial<{readOnly: boolean, lineWrap: boolean, language: EditorLanguage, typeCheck: boolean}>} options
     */
    setEditorOptions(options) {
        if (!options) return;
        if (options.language) this.setEditorLanguage(options.language);
        if (options.readOnly !== undefined) this.editor.updateOptions({readOnly: options.readOnly});
        if (options.lineWrap !== undefined) this.editor.updateOptions({wordWrap: options.lineWrap ? 'on' : 'off'});
        if (options.typeCheck !== undefined) this.setTypeCheck(options.typeCheck);
        if (options.isDark !== undefined) this.monaco.editor.setTheme(this.props.theme === 'dark' ? 'vs-dark' : 'vs');
    }

    componentWillUnmount() {
        if (this.editor) {
            this.props.onRegisterSelect && this.props.onRegisterSelect(null);
            this.editor.dispose();
            this.editor = null;
        }
    }

    /** @typedef {"javascript" | "typescript" | "coffee"} EditorLanguage */

    /**
     * Sets the language of the code editor
     * @param {monaco.editor.IStandaloneCodeEditor} editorInstance The editor instance to change the options for
     * @param {EditorLanguage} language
     */
    setEditorLanguage(language) {
        // we need to recreate the model when changing languages,
        // so remember its settings
        const model = this.editor.getModel();
        const code = model.getValue();
        const uri = model.uri.path;
        const filenameWithoutExtension =
            typeof uri === 'string' && uri.indexOf('.') > -1
                ? uri.substr(0, uri.lastIndexOf('.'))
                : 'index';
        const extension =
            language === 'markdown' ? 'md'
                : language === 'javascript' ? 'js'
                : language === 'typescript' ? 'ts'
                    : language === 'coffee' ? 'coffee'
                        : language;

        // get rid of the original model
        model.dispose();
        // Both JS and TS need the model to work in TypeScript as the script type
        // is inferred from the file extension
        const newLanguage = (language === 'javascript' || language === 'typescript') ? 'typescript' : language;

        const newModel = this.monaco.editor.createModel(
            code, newLanguage, this.monaco.Uri.from({path: `${filenameWithoutExtension}${index++}.${extension}`})
        );
        this.editor.setModel(newModel);
    }

    /**
     * Enables or disables the type checking in the editor
     * @param {boolean} enabled - Whether type checking is enabled or not
     */
    setTypeCheck(enabled) {
        const options = {
            noSemanticValidation: !this.state.alive || !enabled, // toggle the type checking
            noSyntaxValidation: !this.state.alive // always check the syntax
        };
        this.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(options);
    }

    /**
     * Inserts some text into the given editor
     * @param {string} text The text to add
     */
    insertTextIntoEditor(text) {
        const selection = this.editor.getSelection();
        const range = new this.monaco.Range(
            selection.startLineNumber, selection.startColumn,
            selection.endLineNumber, selection.endColumn
        );
        this.editor.executeEdits('', [{range: range, text: text, forceMoveMarkers: true}]);
        this.editor.focus();
    }

    highlightText(text) {
        let range = text && this.editor.getModel().findMatches(text);
        if (range && range.length) {
            range.forEach(r => this.editor.setSelection(r.range));
            this.editor.revealLine(range[0].range.startLineNumber);
        } else {
            const row = this.editor.getPosition().lineNumber;
            const col = this.editor.getPosition().column;
            this.editor.setSelection(new this.monaco.Range(row, col, row, col));
        }
    }

    componentWillReceiveProps(nextProps) {
        const options = {};
        if (this.state.name !== nextProps.name) {
            this.setState({name: nextProps.name});
            this.originalCode = nextProps.code || '';
            this.editor && this.editor.setValue(nextProps.code);
        } else
        if (this.originalCode !== nextProps.code) {
            this.originalCode = nextProps.code || '';
            this.editor && this.editor.setValue(nextProps.code);
        }

        if (nextProps.searchText !== this.lastSearch) {
            this.lastSearch = nextProps.searchText;
            this.highlightText(this.lastSearch);
        }

        if (this.state.language !== (nextProps.language || 'markdown')) {
            this.setState({language: nextProps.language || 'markdown'});
            options.language = nextProps.language || 'markdown';
        } else if (this.state.readOnly !== (nextProps.readOnly || false)) {
            this.setState({readOnly: nextProps.readOnly || false});
            options.readOnly = nextProps.readOnly;
        } else if (this.state.isDark !== (nextProps.isDark || false)) {
            this.setState({isDark: nextProps.isDark || false});
            options.isDark = nextProps.isDark;
        }

        this.setEditorOptions(options);

        if (this.insert !== nextProps.insert) {
            this.insert = nextProps.insert;
            if (nextProps.insert) {
                this.insertTextIntoEditor(nextProps.insert);
                setTimeout(() => this.props.onInserted && this.props.onInserted(), 100);
            }
        }
    }

    onChange(newValue, e) {
        if (!this.props.readOnly) {
            this.props.onChange && this.props.onChange(this.editor.getValue());
        }
    }

    render() {
        if (!this.monaco) {
            setTimeout(() => {
                this.monaco = window.monaco;
                this.forceUpdate();
            }, 200);
            return null;
        }

        return (
            <div ref={el => this.monacoDiv = el} style={{width: '100%', height: '100%', overflow: 'hidden', position: 'relative'}}/>
        );
    }
}

ScriptEditor.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    onForceSave: PropTypes.func,
    onInserted: PropTypes.func,
    theme: PropTypes.string,
    readOnly: PropTypes.bool,
    code: PropTypes.string,
    onRegisterSelect: PropTypes.func,
    searchText: PropTypes.string
};

export default ScriptEditor;
