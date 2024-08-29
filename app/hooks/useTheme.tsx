import { useState, useEffect, useCallback } from 'react';
import {
  getTheme,
  setTheme as setSystemTheme,
} from '@/components/theme-switcher';

function useTheme() {
  const [, rerender] = useState({});
  const setTheme = useCallback((theme: string) => {
    setSystemTheme(theme);
    rerender({});
  }, []);
  const theme = getTheme();
  useEffect(() => setTheme(theme), []);

  return { theme, setTheme };
}

export default useTheme;
