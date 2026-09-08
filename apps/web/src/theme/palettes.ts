/**
 * 配色主题包注册表
 *
 * 新增配色包时：先在 styles/palettes/ 下加 scss 并在其 index.scss 引入，
 * 再来这里登记 key 与文案 key，最后补四个语言包的 palette.<key>。
 */

import type { Palette } from '@/types';

export const DEFAULT_PALETTE: Palette = 'default';

export interface PaletteOption {
  key: Palette;
  labelKey: string;
}

export const PALETTES: readonly PaletteOption[] = [
  { key: 'default', labelKey: 'palette.default' },
  { key: 'mono', labelKey: 'palette.mono' },
] as const;

const PALETTE_KEYS: readonly Palette[] = PALETTES.map((option) => option.key);

export const isPalette = (value: unknown): value is Palette => {
  return typeof value === 'string' && (PALETTE_KEYS as readonly string[]).includes(value);
};

/**
 * 默认包不写 data-palette，保持 DOM 与旧行为一致，也让 themes.scss 直接生效。
 */
export const applyPalette = (palette: Palette) => {
  if (palette === DEFAULT_PALETTE) {
    document.documentElement.removeAttribute('data-palette');
    return;
  }
  document.documentElement.setAttribute('data-palette', palette);
};
