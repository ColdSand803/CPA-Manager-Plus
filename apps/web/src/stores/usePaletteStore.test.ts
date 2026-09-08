import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { usePaletteStore } from './usePaletteStore';
import { DEFAULT_PALETTE, isPalette, PALETTES } from '@/theme/palettes';

describe('usePaletteStore', () => {
  const storeMap = new Map<string, string>();
  const docAttrs = new Map<string, string>();

  const originalLocalStorage = globalThis.localStorage;
  const originalDocument = globalThis.document;

  beforeEach(() => {
    storeMap.clear();
    docAttrs.clear();

    const mockLocalStorage = {
      getItem: (key: string) => storeMap.get(key) ?? null,
      setItem: (key: string, value: string) => storeMap.set(key, String(value)),
      removeItem: (key: string) => {
        storeMap.delete(key);
      },
      clear: () => {
        storeMap.clear();
      },
      length: 0,
      key: () => null,
    };

    const mockDocument = {
      documentElement: {
        setAttribute: (key: string, value: string) => {
          docAttrs.set(key, String(value));
        },
        removeAttribute: (key: string) => {
          docAttrs.delete(key);
        },
        getAttribute: (key: string) => docAttrs.get(key) ?? null,
      },
    };

    Object.defineProperty(globalThis, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(globalThis, 'document', {
      value: mockDocument,
      writable: true,
      configurable: true,
    });

    usePaletteStore.setState({ palette: DEFAULT_PALETTE });
  });

  afterEach(() => {
    Object.defineProperty(globalThis, 'localStorage', {
      value: originalLocalStorage,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(globalThis, 'document', {
      value: originalDocument,
      writable: true,
      configurable: true,
    });
  });

  it('initializes with default palette and no data-palette attribute', () => {
    const { palette, initializePalette } = usePaletteStore.getState();
    expect(palette).toBe('default');
    initializePalette();
    expect(docAttrs.get('data-palette')).toBeUndefined();
  });

  it('switches to mono palette and updates data-palette attribute on documentElement', () => {
    const { setPalette } = usePaletteStore.getState();
    setPalette('mono');
    expect(usePaletteStore.getState().palette).toBe('mono');
    expect(docAttrs.get('data-palette')).toBe('mono');
  });

  it('removes data-palette attribute when switching back to default', () => {
    const { setPalette } = usePaletteStore.getState();
    setPalette('mono');
    expect(docAttrs.get('data-palette')).toBe('mono');

    setPalette('default');
    expect(usePaletteStore.getState().palette).toBe('default');
    expect(docAttrs.get('data-palette')).toBeUndefined();
  });

  it('falls back to default palette when given an invalid value', () => {
    const { setPalette } = usePaletteStore.getState();
    // @ts-expect-error invalid palette test
    setPalette('invalid-palette');
    expect(usePaletteStore.getState().palette).toBe('default');
    expect(docAttrs.get('data-palette')).toBeUndefined();
  });

  it('validates palette keys correctly with isPalette', () => {
    expect(isPalette('default')).toBe(true);
    expect(isPalette('mono')).toBe(true);
    expect(isPalette('cyberpunk')).toBe(false);
    expect(isPalette(null)).toBe(false);
    expect(isPalette(undefined)).toBe(false);
    expect(isPalette(123)).toBe(false);
  });

  it('contains expected registered palettes in PALETTES array', () => {
    const keys = PALETTES.map((p) => p.key);
    expect(keys).toContain('default');
    expect(keys).toContain('mono');
  });
});
