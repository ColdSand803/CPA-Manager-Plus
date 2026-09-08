import { useEffect } from 'react';
import { useLanguageStore, usePaletteStore, useThemeStore, useVisualEffectsStore } from '@/stores';

export function AppLifecycle() {
  const initializeTheme = useThemeStore((state) => state.initializeTheme);
  const initializePalette = usePaletteStore((state) => state.initializePalette);
  const initializeVisualEffects = useVisualEffectsStore((state) => state.initializeVisualEffects);
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  useEffect(() => {
    const cleanupTheme = initializeTheme();
    return cleanupTheme;
  }, [initializeTheme]);

  useEffect(() => {
    initializePalette();
  }, [initializePalette]);

  useEffect(() => {
    initializeVisualEffects();
  }, [initializeVisualEffects]);

  useEffect(() => {
    setLanguage(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 仅用于首屏同步 i18n 语言

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return null;
}
