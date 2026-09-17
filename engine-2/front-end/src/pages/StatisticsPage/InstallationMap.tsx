import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { useStyles } from './StatisticsPage.styles';
import { CustomButton } from '../../components/Button/Button';
import { I18n } from '../../utils/i18n';
import { STATISTICS_MAP_URL } from '../../config/api';

/**
 * The map is drawn here rather than framed.
 *
 * `data/map.html` is a generated page that carries everything the old map needed:
 * the coordinates, the Google loader with its browser key, and the clusterer. It
 * also sends `X-Frame-Options: SAMEORIGIN`, so an iframe of it only works while the
 * app is served from iobroker.net - it stayed blank in development, and nobody would
 * have noticed until it shipped.
 *
 * So the page is fetched and read instead: the loader URL and the points are lifted
 * out of it at runtime. Nothing is copied into this repository - no key to rotate
 * here, no second copy of 41.000 coordinates to go stale - and when the generator
 * rewrites that file, this map follows along.
 */

interface Point {
    lat: number;
    lng: number;
}

interface MapSource {
    /** the Google loader URL exactly as the generated page uses it, key and all */
    loaderUrl: string;
    points: Point[];
}

/** `{"lat":51.1,"lng":10.4}` in whatever whitespace and quoting the generator emits */
const POINT_PATTERN = /\{\s*"?lat"?\s*:\s*(-?\d+(?:\.\d+)?)\s*,\s*"?lng"?\s*:\s*(-?\d+(?:\.\d+)?)\s*\}/g;
const LOADER_PATTERN = /https:\/\/maps\.googleapis\.com\/maps\/api\/js\?[^"'\s<>]+/;

const parseMapSource = (html: string): MapSource | null => {
    const loader = html.match(LOADER_PATTERN);
    if (!loader) {
        return null;
    }
    const points: Point[] = [];
    for (const match of html.matchAll(POINT_PATTERN)) {
        points.push({ lat: Number(match[1]), lng: Number(match[2]) });
    }
    return points.length ? { loaderUrl: loader[0], points } : null;
};

/** the Google loader is a singleton - a second copy on the page throws */
let googleMapsPromise: Promise<void> | null = null;

/** the global function Google calls once the API is ready - see `loadGoogleMaps` */
const READY_CALLBACK = '__iobrokerMapsReady';

/**
 * Load the Maps API and resolve once it can be used - not once its script has arrived.
 *
 * With `loading=async` the script is only a bootstrap. Its `load` event fires as soon as that
 * bootstrap has run, and at that moment `google.maps` holds `modules`, `__gjsload__` and `Load`
 * and nothing else: no `importLibrary`, no `Map`. The rest follows asynchronously, about a second
 * later on iobroker.net. Resolving on `load` therefore sent `resolveMapsApi` into an empty
 * namespace, and the map failed with "Google Maps did not initialise" on every attempt.
 *
 * Google's own signal for "ready" is the `callback` parameter, so that is what this waits for.
 * A callback the generated page may already name is replaced - that function does not exist here.
 */
const loadGoogleMaps = (loaderUrl: string): Promise<void> => {
    if (googleMapsPromise) {
        return googleMapsPromise;
    }
    googleMapsPromise = new Promise<void>((resolve, reject) => {
        const maps = (window as unknown as { google?: { maps?: MapsNamespace } }).google?.maps;
        if (maps?.importLibrary || maps?.Map) {
            // already there - loaded by an earlier visit to this page
            resolve();
            return;
        }

        const url = new URL(loaderUrl);
        url.searchParams.set('callback', READY_CALLBACK);
        // what Google asks for, so its own console stops warning
        url.searchParams.set('loading', 'async');
        (window as unknown as Record<string, () => void>)[READY_CALLBACK] = () => resolve();

        const script = document.createElement('script');
        script.src = url.toString();
        script.async = true;
        script.dataset.iobrokerMaps = 'true';
        script.onerror = () => {
            // a failed script leaves nothing behind that a second attempt could trip over
            script.remove();
            googleMapsPromise = null;
            reject(new Error('Google Maps failed to load'));
        };
        document.head.appendChild(script);
    });
    return googleMapsPromise;
};

/**
 * Only the two entry points this file uses. `@types/google.maps` describes the whole
 * API and would be a dependency taken on for two constructors - and the clusterer
 * below accepts what it is handed, because its own declarations are not type-checked.
 */
interface MapsApi {
    Map: new (element: HTMLElement, options: Record<string, unknown>) => unknown;
    Marker: new (options: { position: Point }) => unknown;
}

/** `google.maps` right after the script loaded - which of these exist depends on how it was loaded */
interface MapsNamespace extends Partial<MapsApi> {
    importLibrary?: (name: string) => Promise<unknown>;
}

/**
 * The two constructors, wherever this loader keeps them.
 *
 * With `loading=async` the script only puts `importLibrary` on `google.maps`: `Map` and
 * `Marker` exist once their libraries are imported, and `new google.maps.Map` straight
 * after `onload` failed with "Map is not a constructor". A loader without it has both
 * right away.
 */
const resolveMapsApi = async (namespace: MapsNamespace): Promise<MapsApi> => {
    if (namespace.importLibrary) {
        const [mapsLibrary, markerLibrary] = (await Promise.all([
            namespace.importLibrary('maps'),
            namespace.importLibrary('marker'),
        ])) as [Pick<MapsApi, 'Map'>, Pick<MapsApi, 'Marker'>];
        return { Map: mapsLibrary.Map, Marker: markerLibrary.Marker };
    }
    if (namespace.Map && namespace.Marker) {
        return { Map: namespace.Map, Marker: namespace.Marker };
    }
    throw new Error('Google Maps did not initialise');
};

type Phase = 'idle' | 'loading' | 'ready' | 'error';

export const InstallationMap = (): React.ReactNode => {
    const { classes } = useStyles();
    const [phase, setPhase] = useState<Phase>('idle');
    const [count, setCount] = useState(0);
    const container = useRef<HTMLDivElement | null>(null);

    /*
     * Whether the map was asked for - true from the click on, whatever phase follows.
     *
     * The effect below used to depend on `phase` itself. Its last step is `setPhase('ready')`, and
     * a changed dependency makes React run the cleanup of the effect before anything else - the
     * cleanup that calls `clearMarkers()`. All 44.517 markers were taken off the clusterer the
     * moment they had been put on it: the map was drawn, the count below it was right, and not a
     * single point was on the map. The build has to be tied to something that stays the same once
     * it has started, so that its cleanup only runs when the component goes away.
     */
    const started = phase !== 'idle';

    useEffect(() => {
        if (!started) {
            return;
        }
        let cancelled = false;
        // the clusterer is created inside the async build below, but has to be reachable
        // from the cleanup - a cleanup returned from inside `build` is thrown away
        let clusterer: { clearMarkers: () => void } | null = null;

        const build = async (): Promise<void> => {
            const response = await fetch(STATISTICS_MAP_URL);
            if (!response.ok) {
                throw new Error(`map.html: ${response.status}`);
            }
            const source = parseMapSource(await response.text());
            if (!source) {
                throw new Error('map.html has no readable points');
            }
            await loadGoogleMaps(source.loaderUrl);
            if (cancelled || !container.current) {
                return;
            }

            const namespace = (window as unknown as { google?: { maps?: MapsNamespace } }).google?.maps;
            if (!namespace) {
                throw new Error('Google Maps did not initialise');
            }
            const maps = await resolveMapsApi(namespace);
            // importing the libraries takes a moment - the page may have been left meanwhile
            if (cancelled || !container.current) {
                return;
            }

            const map = new maps.Map(container.current, {
                // the middle of the distribution, far enough out to show all of Europe
                center: { lat: 48, lng: 12 },
                zoom: 4,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: true,
            });

            const markers = source.points.map(point => new maps.Marker({ position: point }));
            // 41.000 markers are only drawable as clusters
            clusterer = new MarkerClusterer({ map, markers });

            setCount(source.points.length);
            setPhase('ready');
        };

        build().catch(error => {
            console.error('Cannot build the installation map', error);
            if (!cancelled) {
                setPhase('error');
            }
        });

        return () => {
            cancelled = true;
            clusterer?.clearMarkers();
        };
    }, [started]);

    return (
        <Box>
            {phase === 'idle' ? (
                <Box className={classes.mapPlaceholder}>
                    <Typography className={classes.mapNote}>{I18n.t('statistics.map.consent')}</Typography>
                    <CustomButton
                        variant="primary"
                        onClick={() => setPhase('loading')}
                    >
                        {I18n.t('statistics.map.load')}
                    </CustomButton>
                </Box>
            ) : null}

            {phase === 'error' ? (
                <Box className={classes.mapPlaceholder}>
                    <Typography className={classes.mapNote}>{I18n.t('statistics.map.error')}</Typography>
                </Box>
            ) : null}

            {/* The element has to exist before Google draws into it, so it is mounted with
                the loading phase - React attaches the ref before the effect runs. It is
                mounted rather than hidden: toggling `display` from `sx` left the box in
                the layout, because which of the two classes wins is a question of
                stylesheet order, and 520 px of empty page is what that costs. */}
            {phase === 'loading' || phase === 'ready' ? (
                <Box
                    ref={container}
                    className={classes.mapFrame}
                />
            ) : null}

            {phase === 'ready' ? (
                <Typography className={classes.mapCount}>
                    {I18n.t('statistics.map.points').replace('%n', new Intl.NumberFormat('de-DE').format(count))}
                </Typography>
            ) : null}
        </Box>
    );
};
