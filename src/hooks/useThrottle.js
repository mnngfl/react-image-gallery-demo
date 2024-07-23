import { useEffect, useMemo, useRef } from "react";
import { throttle } from "lodash";

export const useThrottle = (callback, delay = 500) => {
  const callbackRef = useRef();

  const throttledCallback = useMemo(() => {
    return throttle(() => callbackRef.current(), delay);
  }, [delay]);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return throttledCallback;
};
