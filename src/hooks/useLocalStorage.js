import { useCallback, useEffect, useState } from 'react';

/**
 * Persist React state in localStorage.
 * Safe against JSON parse errors. Supports functional updates like useState.
 */
export function useLocalStorage(key, initialValue) {
  const readValue = useCallback(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState(readValue);

  const setValue = useCallback((value) => {
    setStoredValue((previous) => {
      try {
        const valueToStore = value instanceof Function ? value(previous) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        return valueToStore;
      } catch (error) {
        console.error(`useLocalStorage: failed to write "${key}"`, error);
        return previous;
      }
    });
  }, [key]);

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === key) setStoredValue(readValue());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key, readValue]);

  return [storedValue, setValue];
}
