import { useMemo } from 'react';
import { useLocation, useHistory, useRouteMatch, RouteProps, match } from 'react-router-dom';
import qs from 'qs';

const parts = {
    origin: window.location.origin,
    protocol: window.location.protocol,
    host: window.location.host,
    hostname: window.location.hostname,
    port: window.location.port
};

type PartsType = {
    origin: string
    protocol: string
    host: string
    hostname: string
    port: string
}

type StateType = {
    parts: PartsType
    location: Location
    query: qs.ParsedQs
    params: {} | match<{}> 
    match: boolean
}

type UseLocationStateType = (
    path?: RouteProps
) => [
    state: any,
    push: (path: string, state?: unknown) => void,
    replace: (path: string, state?: unknown) => void
];

const useLocationState: UseLocationStateType = ({ path } = {}) => {
    const location = useLocation(),
        query = useMemo(() => qs.parse(location.search.replace(/^\?/, '')), [location.search]),
        history = useHistory(),
        // @ts-ignore
        match = useRouteMatch(path);

    return [
        {
            ...parts,
            ...location,
            query,
            params: match?.params || {},
            match: !!match
        },
        history.push,
        history.replace
    ];
}

export default useLocationState;