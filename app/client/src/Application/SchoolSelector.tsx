import React, { useState, useEffect, useRef } from 'react';
import { Form, Search } from 'semantic-ui-react';
import { ProgressPlugin } from 'webpack';
import useFetch, { STATUS } from '../Utils/useFetch';

type Props = {
  onChangeSchool: (school: string) => void;
  school: string;
};

type ReducerState = {
  loading: boolean;
  results: Array<SearchResult>;
};

type SearchResult = {
  title: string;
  description: string;
};

type ReducerActionType =
  | 'CLEAN_QUERY'
  | 'START_SEARCH'
  | 'FINISH_SEARCH'
  | 'UPDATE_SELECTION';
type ReducerAction = {
  type: ReducerActionType;
  query?: string;
  results?: Array<SearchResult>;
  selection?: string;
};
type SchoolMetadata = {
  school: string;
  state: string;
};
type SchoolsJSONType = {
  [school: string]: SchoolMetadata;
};

const initialState: ReducerState = {
  loading: false,
  results: [],
};

function escapeRegex(string: string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

export default function SchoolSelector(props: Props) {
  const [school, setSchool] = useState<string>('');
  const { status, error, data } = useFetch('/assets/schools.json');
  const schoolData = data as SchoolsJSONType;

  function exampleReducer(
    state: ReducerState,
    action: ReducerAction,
  ): ReducerState {
    switch (action.type) {
      case 'CLEAN_QUERY':
        return initialState;
      case 'START_SEARCH':
        return { ...state, loading: true  };
      case 'FINISH_SEARCH':
        return { ...state, loading: false, results: action.results };
      case 'UPDATE_SELECTION':
        props.onChangeSchool(action.selection);
        return { ...state };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = React.useReducer(exampleReducer, initialState);
  const { loading, results } = state;

  const timeoutRef = useRef(null);
  const handleSearchChange = React.useCallback(
    (e, searchData) => {
      clearTimeout(timeoutRef.current);
      dispatch({ type: 'START_SEARCH', query: searchData.value });
      props.onChangeSchool(searchData.value );

      timeoutRef.current = setTimeout(() => {
        if (searchData.value.length === 0) {
          dispatch({ type: 'CLEAN_QUERY' });
          return;
        }

        const re = new RegExp(escapeRegex(searchData.value), 'i');
        const isMatch = (result: SchoolMetadata) => re.test(result.school);
        dispatch({
          type: 'FINISH_SEARCH',
          results: [...new Set(Object.values(schoolData))]
            .filter(isMatch)
            .map(datum => {
              return {
                title: datum.school,
                description: datum.state,
              };
            }),
        });
      }, 300);
    },
    [schoolData],
  );

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Form.Field>
      <Search
        loading={status != STATUS.FETCHED || loading}
        onResultSelect={(e, data) =>
          dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
        }
        onSearchChange={handleSearchChange}
        results={results}
        value={props.school}
      />
    </Form.Field>
  );
}
