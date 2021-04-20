import { useReducer, Reducer } from 'react';

const toggleReducer = (state: boolean, nextValue: any) =>
  typeof nextValue === 'boolean' ? nextValue : !state;

const useToggle = (initialValue: boolean) => {
  return useReducer(toggleReducer, initialValue);
};

export default useToggle;
