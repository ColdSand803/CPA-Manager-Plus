/**
 * 通用类型定义
 */

export type Theme = 'white' | 'dark' | 'auto';

/**
 * 配色主题包。与 Theme（明暗）正交：明暗决定亮/暗，配色包决定用哪套中性色与主色。
 * 状态色不随配色包变化，详见 styles/palettes/README.md。
 */
export type Palette = 'default' | 'mono';

export type VisualEffectsMode = 'full' | 'reduced';

export type Language = 'zh-CN' | 'zh-TW' | 'en' | 'ru';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems?: number;
}

export interface LoadingState {
  isLoading: boolean;
  error: Error | null;
}

// 泛型异步状态
export interface AsyncState<T> extends LoadingState {
  data: T | null;
}
