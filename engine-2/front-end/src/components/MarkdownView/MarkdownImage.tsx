import type React from 'react';
import { useRef, useState } from 'react';

/**
 * A picture inside a document, with the click that opens it large.
 *
 * Not every picture earns that click. It is worth something exactly when the document shows the
 * picture smaller than the file is - a diagram capped at 600 px, a screenshot in a narrow column.
 * A 90 px widget preview shown at 90 px would only turn blurry, and a picture that is already a
 * link has its own job. Both are left alone, and then there is no pointer either: the cursor is
 * the only thing that tells a reader beforehand whether the click leads anywhere.
 */

export interface MarkdownImageProps {
    src: string;
    alt: string;
    className?: string;
    style?: React.CSSProperties;
    /** opens the picture large - handed down by the view, which carries the overlay */
    onZoom: (src: string, alt: string) => void;
}

export function MarkdownImage({ src, alt, className, style, onZoom }: MarkdownImageProps): React.JSX.Element {
    const ref = useRef<HTMLImageElement>(null);
    const [zoomable, setZoomable] = useState(false);

    /** Asked again at the moment of the click: a column changes its width, a loaded picture does not */
    const canZoom = (): boolean => {
        const image = ref.current;
        return !!image && !image.closest('a') && image.naturalWidth > image.clientWidth + 8;
    };

    const open = (): void => {
        if (canZoom()) {
            onZoom(src, alt);
        }
    };

    return (
        <img
            ref={ref}
            src={src}
            alt={alt}
            className={className}
            style={zoomable ? { ...style, cursor: 'zoom-in' } : style}
            onLoad={() => setZoomable(canZoom())}
            onClick={open}
            onKeyDown={event => {
                if (zoomable && (event.key === 'Enter' || event.key === ' ')) {
                    event.preventDefault();
                    open();
                }
            }}
            role={zoomable ? 'button' : undefined}
            tabIndex={zoomable ? 0 : undefined}
        />
    );
}

export default MarkdownImage;
