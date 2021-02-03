import axios from "axios";
import { useEffect, useReducer, useRef } from "React";

/**
 * =============================== ENUMS ========================================
 */
export enum STATUS {
  IDLE,
  FETCHING,
  FETCHED,
  ERROR,
}

enum ACTION_TYPE {
  FETCHING,
  FETCHED,
  FETCH_ERROR,
}

/**
 * =============================== TYPES ========================================
 */

/**
 * This is the state of fetching the data.
 *
 * Status is a enum indicating if the hook is currently fetching data, idle or
 * has an error. The data and error data points contain more information if the
 * data has been fetched, or if it has error out.
 */
type State = {
  status: STATUS;
  error: any;
  data: any;
};

type Action = {
  type: ACTION_TYPE;
  payload?: any;
};

/**
 * ============================ CONSTANTS ======================================
 */

const initialState: State = {
  status: STATUS.IDLE,
  error: null,
  data: [],
};

/**
 * This hook fetches data from the provided URL. It runs a GET request against
 * the specified URL. If it has sent a request to that URL in the past, it will
 * return the cached response.
 *
 * @param url The URL to get data from.
 */
export default function useFetch(url: string) {
  const cache = useRef<{ [key: string]: any }>({});
  const [state, dispatch] = useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case ACTION_TYPE.FETCHING:
          return {
            ...initialState,
            status: STATUS.FETCHING,
          };
        case ACTION_TYPE.FETCHED:
          return {
            ...initialState,
            status: STATUS.FETCHED,
            data: action.payload,
          };
        case ACTION_TYPE.FETCH_ERROR:
          return {
            ...initialState,
            status: STATUS.ERROR,
            error: action.payload,
          };
        default:
          return state;
      }
    },
    initialState
  );

  useEffect(() => {
    let cancelRequest = false;
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: ACTION_TYPE.FETCHING });
      if (cache.current[url] != null) {
        const data = cache.current[url];
        dispatch({ type: ACTION_TYPE.FETCHED, payload: data });
      } else {
        try {
          const data = await axios.get(url);
          cache.current[url] = data;
          if (cancelRequest) return;
          dispatch({ type: ACTION_TYPE.FETCHED, payload: data });
        } catch (error) {
          if (cancelRequest) return;
          dispatch({ type: ACTION_TYPE.FETCH_ERROR, payload: error.message });
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
