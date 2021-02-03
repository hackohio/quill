import axios from 'axios';
import { useEffect, useReducer } from 'React';

const initialState = {
    status: 'idle',
    error: null,
    data: [],
};

export default function useFetch(url) {
    const cache = useRef({});
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'FETCHING':
                return { ...initialState, status: 'fetching' };
            case 'FETCHED':
                return { ...initialState, status: 'fetched', data: action.payload };
            case 'FETCH_ERROR':
                return { ...initialState, status: 'error', error: action.payload };
            default:
                return state;
        }
    }, initialState);

    useEffect(() => {
        let cancelRequest = false;
        if (!url) return;

        const fetchData = async () => {
            dispatch({ type: 'FETCHING' });
            if (cache.current[url]) {
                const data = cache.current[url];
                dispatch({ type: 'FETCHED', payload: data });
            } else {
                try {
                    const data = await axios.get(url);
                    cache.current[url] = data;
                    if (cancelRequest) return;
                    dispatch({ type: 'FETCHED', payload: data });
                } catch (error) {
                    if (cancelRequest) return;
                    dispatch({ type: 'FETCH_ERROR', payload: error.message });
                }
            }
        };

        fetchData();

        return function cleanup() {
            cancelRequest = true;
        };
    }, [url]);


    return state;
}