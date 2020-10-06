import { useMemo } from 'react';
import { useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import qs from 'qs';

const parts = {
    origin: window.location.origin,
    protocol: window.location.protocol,
    host: window.location.host,
    hostname: window.location.hostname,
    port: window.location.port
};

function useLocationState({ path } = {}) {
    const location = useLocation(),
        query = useMemo(() => qs.parse(location.search.replace(/^\?/, '')), [location.search]),
        history = useHistory(),
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