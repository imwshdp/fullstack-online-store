import { useCallback, useRef } from "react";

interface Targs {
  callback: (value: any) => void,
  delay?: number,
}

const useDebounce = (
  callback: (value: any) => void,
  delay?: number,
) => {

  // const timer = useRef<ReturnType<typeof setTimeout>>();

  // const debouncedCallback = useCallback((...args: any) => {
  //   if (timer.current) {
  //     clearTimeout(timer.current);
  //   }

  //   timer.current = setTimeout(() => {
  //     callback(...(args: any[]));
  //   }, delay);

  // }, [callback, delay || 500]);

  // return debouncedCallback;
};

export default useDebounce;