/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://unistyl.es), etc.
 */

import "@/global.css";

import { Platform } from "react-native";

export const Colors = {
  light: {
    primary: "#6B4EFF",
    background: "#F8F8FA",
    white: "#FFFFFF", // В темной теме это будет цветом поверхностей (surface)
    textDark: "#1A1A1A",
    textGray: "#8E8E93",
    darkButton: "#2C2C2E",
    lightPurple: "#F0EBFF",
    cardBg: "#EEE9FF",
  },
  dark: {
    // Чуть более светлый фиолетовый, чтобы лучше читался на черном фоне
    primary: "#8C75FF",
    // Глубокий серый фон, чтобы не было эффекта "выжженных глаз"
    background: "#121212",
    // Темно-серый для карточек, кнопок и полей ввода
    white: "#1E1E22",
    // Мягкий белый для заголовков и основного текста
    textDark: "#F5F5F7",
    // Светло-серый для второстепенного текста
    textGray: "#9E9EA7",
    // Темный элемент для активных кнопок (напр. "Я заказчик")
    darkButton: "#3A3A3C",
    // Темно-фиолетовый фон для иконок кафе/магазинов
    lightPurple: "#2C2445",
    // Фон для чипсов категорий и внутренних карточек
    cardBg: "#292541",
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
