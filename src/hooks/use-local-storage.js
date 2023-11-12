import { useEffect, useState } from "react";

const useLocalStorage = (
  key,
  initialValue
  // eslint-disable-next-line no-unused-vars
) => {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    // Retrieve from localStorage
    const item = window.localStorage.getItem(key);
    if (item) {
      setStoredValue(item);
    }
  }, [key]);

  const setValue = (value) => {
    // Save state
    setStoredValue(value);
    // Save to localStorage
    window.localStorage.setItem(key, value);
  };
  return [storedValue, setValue];
};

export default useLocalStorage;
