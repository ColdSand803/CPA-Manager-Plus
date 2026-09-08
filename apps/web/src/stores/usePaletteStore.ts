/**
 * 配色主题包状态管理
 *
 * 与 useThemeStore（明暗）正交：这里只决定用哪一套配色 token。
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Palette } from '@/types';
import { applyPalette, DEFAULT_PALETTE, isPalette } from '@/theme/palettes';
import { STORAGE_KEY_PALETTE } from '@/utils/constants';

interface PaletteState {
  palette: Palette;
  setPalette: (palette: Palette) => void;
  initializePalette: () => void;
}

export const usePaletteStore = create<PaletteState>()(
  persist(
    (set, get) => ({
      palette: DEFAULT_PALETTE,

      setPalette: (palette) => {
        const next = isPalette(palette) ? palette : DEFAULT_PALETTE;
        applyPalette(next);
        set({ palette: next });
      },

      initializePalette: () => {
        const { palette, setPalette } = get();
        setPalette(isPalette(palette) ? palette : DEFAULT_PALETTE);
      },
    }),
    {
      name: STORAGE_KEY_PALETTE,
      merge: (persistedState, currentState) => {
        const nextPalette = (persistedState as Partial<PaletteState>)?.palette;
        if (isPalette(nextPalette)) {
          return {
            ...currentState,
            ...(persistedState as Partial<PaletteState>),
            palette: nextPalette,
          };
        }
        return currentState;
      },
    }
  )
);
