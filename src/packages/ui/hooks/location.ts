import { useMemo } from 'react';
import { useLocation, useNavigate, matchPath, RouteProps } from 'react-router-dom';
import qs from 'qs';

const parts = {
    origin: window.location.origin,
    protocol: window.location.protocol,
    host: window.location.host,
    hostname: window.location.hostname,
    port: window.location.port
};

type UseLocationStateType = () => [
    state: any,
    push: (path: string, state?: unknown) => void
];

const useLocationState: UseLocationStateType = () => {
    const location = useLocation(),
        query = useMemo(() => qs.parse(location.search.replace(/^\?/, '')), [location.search]),
        history = useNavigate(),
        // @ts-ignore
        match = matchPath(location.pathname);

    return [
        {
            ...parts,
            ...location,
            query,
            params: match?.params || {},
            match: !!match
        },
        history
    ];
}

export default useLocationState;