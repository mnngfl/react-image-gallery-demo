import { useEffect, useMemo, useRef } from "react";
import { debounce } from "lodash";

export const useDebounce = (callback, delay = 500) => {
  const callbackRef = useRef();

  const debouncedCallback = useMemo(() => {
    return debounce(() => callbackRef.current(), delay);
  }, [delay]);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return debouncedCallback;
};
