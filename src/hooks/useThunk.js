import { useDispatch } from "react-redux";
import { useState, useCallback } from "react";
function useThunk(thunk) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const doThunk = useCallback(
    function (arg) {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    },
    [thunk, dispatch]
  );
  return [doThunk, isLoading, error];
  //
}
export { useThunk };
