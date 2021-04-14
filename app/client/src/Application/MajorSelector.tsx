import React, { useState, useEffect, useRef } from 'react';
import { Form, Search } from 'semantic-ui-react';
import useFetch, { STATUS } from '../Utils/useFetch';

type Props = {
  onChangeMajor: (school: string) => void;
};

type ReducerState = {
  loading: boolean;
  results: Array<SearchResult>;
  value: string;
};

type SearchResult = {
  title: string;
  description?: string;
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

const initialState: ReducerState = {
  loading: false,
  results: [],
  value: '',
};

function escapeRegex(string: string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

export default function MajorSelector(props: Props) {
  const { status, error, data } = useFetch('/assets/majors.csv');
  const majors = data as string;

  function exampleReducer(state: ReducerState, action: ReducerAction) {
    switch (action.type) {
      case 'CLEAN_QUERY':
        return initialState;
      case 'START_SEARCH':
        return { ...state, loading: true, value: action.query };
      case 'FINISH_SEARCH':
        return { ...state, loading: false, results: action.results };
      case 'UPDATE_SELECTION':
        return { ...state, value: action.selection };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = React.useReducer(exampleReducer, initialState);
  const { loading, results, value } = state;

  const timeoutRef = useRef(null);
  const handleSearchChange = React.useCallback(
    (e, searchData) => {
      clearTimeout(timeoutRef.current);
      dispatch({ type: 'START_SEARCH', query: searchData.value });
      props.onChangeMajor(searchData.value);

      timeoutRef.current = setTimeout(() => {
        if (searchData.value.length === 0) {
          dispatch({ type: 'CLEAN_QUERY' });
          return;
        }

        const re = new RegExp(escapeRegex(searchData.value), 'i');
        const isMatch = (result: string) => re.test(result);
        dispatch({
          type: 'FINISH_SEARCH',
          results: majors
            .split('\n')
            .filter(isMatch)
            .map(datum => {
              return {
                title: datum,
              };
            }),
        });
      }, 300);
    },
    [majors],
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
        onResultSelect={(e, data) => {
          props.onChangeMajor(data.result.title);
          dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title });
        }}
        onSearchChange={handleSearchChange}
        results={results}
        value={value}
      />
    </Form.Field>
  );
}
