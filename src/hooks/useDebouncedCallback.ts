import { useCallback, useEffect, useRef } from "react";

 const useDeboucedCallback = <T extends(...argument:any[]) => void>(
    callback: T,
    delay:number,
    dependency:any[] = []):(...argument: Parameters<T>) => void => {
    
const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Memoize callback so it updates only when dependencies change
  const memoizedCallback = useCallback(callback, dependency);

  const debouncedFunction = useCallback(
    (...argument: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        memoizedCallback(...argument);
      }, delay);
    },
    [memoizedCallback, delay]
  );

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedFunction;
}

export default useDeboucedCallback