import de from '../i18n/de.json';
import en from '../i18n/en.json';
import ru from '../i18n/ru.json';

export type Language = 'en' | 'de' | 'ru';

const languages: Record<Language, Record<string, string>> = {
    de,
    en,
    ru,
};

let lang: Language;
// Detect the language
void getLang();

const problems: string[] = [];
const subscribers: Array<(lng: Language) => void> = [];

export default function __(text: string, ...args: any): string {
    let t;
    if (languages[lang]) {
        t = languages[lang][text] || languages.en[text];
        if (!t) {
            if (!problems.includes(text)) {
                problems.push(text);
                // eslint-disable-next-line no-console
                console.log(`Translate: ${text}`);
            }
            t = text;
        }
    } else {
        if (!problems.includes(text)) {
            problems.push(text);
            // eslint-disable-next-line no-console
            console.log(`Translate1: ${text}`);
        }
        t = text;
    }

    if (args[0] !== undefined) {
        t = t.replace('%s', args[0]);
        if (args[1] !== undefined) {
            t = t.replace('%s', args[1]);
            if (args[2] !== undefined) {
                t = t.replace('%s', args[2]);
                if (args[3] !== undefined) {
                    t = t.replace('%s', args[3]);
                }
            }
        }
    }

    return t;
}

export function getLang(): Language {
    if (!lang) {
        if (window.localStorage.getItem('lang')) {
            lang = window.localStorage.getItem('lang') as Language;
        } else {
            lang = navigator.language ? (navigator.language.substring(0, 2) as Language) : 'en';
        }
        if (!languages[lang]) {
            lang = 'en';
        }
        // eslint-disable-next-line no-console
        console.log(`Use auto-language: ${lang}`);
    }
    return lang;
}

export function setLang(newLang: Language): void {
    // eslint-disable-next-line no-console
    console.log(`Use language: ${newLang}`);
    window.localStorage.setItem('lang', newLang);
    lang = newLang;
    // notify subscribers
    subscribers.forEach(cb => {
        try {
            cb(newLang);
        } catch (e) {
            // ignore
        }
    });
}

export class I18n {
    static t(text: string, ...args: any): string {
        return __(text, ...args);
    }
    static getLanguage(): Language {
        return getLang();
    }
    static setLanguage(newLang: Language): void {
        setLang(newLang);
    }
    static subscribe(cb: (lng: Language) => void): () => void {
        subscribers.push(cb);
        return () => {
            const i = subscribers.indexOf(cb);
            if (i !== -1) {
                subscribers.splice(i, 1);
            }
        };
    }
    static addTranslations(words: Record<Language, Record<string, string>>): void {
        (Object.keys(words) as Language[]).forEach((l: Language): void => {
            if (!languages[l]) {
                languages[l] = {} as Record<string, string>;
            }
            Object.assign(languages[l], words[l]);
        });
    }
}
