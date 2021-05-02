import { useEffect, useState } from "react";

type ValueType<T> = T extends infer U ? U : T;

// https://usehooks.com/useDebounce
export default function useDebounce<T>(value: ValueType<T>, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  function forceUpdate() {
    return setDebouncedValue(value);
  }

  return [debouncedValue, forceUpdate] as [ValueType<T>, () => void];
}
