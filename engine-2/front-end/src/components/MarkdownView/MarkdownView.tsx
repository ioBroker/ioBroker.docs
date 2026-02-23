import { Box } from '@mui/material';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export const MarkdownView = (props: { url: string }): ReactNode => {
    const [markdown, setMarkdown] = useState<string>('');
    useEffect(() => {
        fetch(props.url)
            .then(res => res.text())
            .then(setMarkdown);
    }, [props.url]);

    return markdown ? (
        <Box>
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </Box>
    ) : null;
};
