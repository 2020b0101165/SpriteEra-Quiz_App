import { useEffect, useReducer } from "react";

export function usePersistentReducer(reducer, initialState, storageKey) {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    const persisted = localStorage.getItem(storageKey);
    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [storageKey, state]);

  const resetState = () => {
    dispatch({ type: "RESET_STATE", payload: initialState });
  };

  return [state, dispatch, resetState];
}
