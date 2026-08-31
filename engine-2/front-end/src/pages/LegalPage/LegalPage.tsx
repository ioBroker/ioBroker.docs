import { Box, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { I18n } from '../../utils/i18n';
import { API_CONFIG, buildIoBrokerUrl } from '../../config/api';
import { useDocsMarkdown } from '../../api/hooks/useDocsMarkdown';
import { MarkdownView } from '../../components/MarkdownView/MarkdownView';
import { extractHeader } from '../../utils/markdownHeader';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { useStyles } from './LegalPage.styles';

/**
 * Imprint and privacy policy. The texts are maintained in ioBroker.docs and end
 * up in public/<lang>/imprint.md and privacy.md - this page only renders them.
 */
const LegalPage = ({ document: doc }: { document: 'imprint' | 'privacy' }): React.ReactNode => {
    const { classes } = useStyles();
    const [language, setLanguage] = useState(I18n.getLanguage());

    useEffect(() => I18n.subscribe(setLanguage), []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [doc]);

    const url = buildIoBrokerUrl(`${language}/${doc}.md`);
    const { data: markdown, isLoading, isError } = useDocsMarkdown(url);

    const { header, body } = useMemo(() => extractHeader(markdown || ''), [markdown]);

    // the first "# ..." of the file becomes the page title, the rest stays markdown
    const { title, content } = useMemo(() => {
        const match = /^\s*#\s+(.+?)\s*(?:\r?\n|$)/.exec(body);
        if (!match) {
            return { title: header.title || '', content: body };
        }
        return { title: match[1], content: body.substring(match[0].length) };
    }, [body, header.title]);

    const baseOrigin = /^https?:\/\//i.test(API_CONFIG.IOBROKER_BASE_URL)
        ? API_CONFIG.IOBROKER_BASE_URL
        : window.location.origin;

    const markdownClassNames = useMemo(
        () => ({
            head: classes.head,
            heading: classes.heading,
            subheading: classes.subheading,
            paragraph: classes.paragraph,
            list: classes.list,
            listItem: classes.listItem,
            image: classes.image,
            linkIcon: classes.linkIcon,
            table: classes.table,
            tableHead: classes.tableHead,
            tableRow: classes.tableRow,
            tableHeaderCell: classes.tableHeaderCell,
            tableCell: classes.tableCell,
            codeBlockContainer: classes.codeBlockContainer,
            codeBlockContent: classes.codeBlockContent,
            inlineCode: classes.inlineCode,
            blockquote: classes.blockquote,
        }),
        [classes],
    );

    return (
        <Box className={classes.pageWrapper}>
            <Box className={classes.pageContainer}>
                {isLoading && <Typography className={classes.message}>{I18n.t('blog.loading')}</Typography>}
                {isError && <Typography className={classes.message}>{I18n.t('legal.loadError')}</Typography>}

                {!!markdown && (
                    <>
                        <SectionTitle>{title.toUpperCase()}</SectionTitle>

                        <Box className={classes.body}>
                            <MarkdownView
                                markdown={content}
                                baseUrl={`${baseOrigin}/${language}/${doc}.md`}
                                origin={baseOrigin}
                                classNames={markdownClassNames}
                            />
                        </Box>

                        {!!header.lastChanged && (
                            <Box className={classes.meta}>{I18n.t('legal.lastChanged', header.lastChanged)}</Box>
                        )}

                        {!!header.editLink && (
                            <Box className={classes.editLinkRow}>
                                <a
                                    href={header.editLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={classes.editLink}
                                >
                                    {I18n.t('blog.editOnGithub')}
                                </a>
                            </Box>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
};

export default LegalPage;
