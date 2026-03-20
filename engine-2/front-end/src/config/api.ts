const isDev = import.meta.env.DEV;

export const API_CONFIG = {
    IOBROKER_BASE_URL: isDev ? '/api/iobroker' : 'https://www.iobroker.net',
} as const;

export const API_ENDPOINTS = {
    FORUM_STATS: `${API_CONFIG.IOBROKER_BASE_URL}/data/forum.json`,
    ADAPTERS: `${API_CONFIG.IOBROKER_BASE_URL}/adapters.json`,
    DOCS_README_EN: `${API_CONFIG.IOBROKER_BASE_URL}/en/README.md`,
    DOCS_CONTENT: `${API_CONFIG.IOBROKER_BASE_URL}/content.json`,
} as const;
