import * as React from 'react';
import { createContext, useContext, useState, useMemo, ReactNode } from 'react';

/**
 * Tema türleri için temel renk paletini tanımlayan tip
 */
export type ThemeColors = {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  border: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
};

/**
 * Tema yapılandırma tipi
 */
export type ThemeConfig = {
  colors: ThemeColors;
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  fontSizes: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
  };
  spacing: {
    1: string;
    2: string;
    4: string;
    6: string;
    8: string;
  };
  // Kullanıcıların kendi özel değişkenlerini ekleyebilmesi için
  extensions?: Record<string, Record<string, string> | string>;
};

/**
 * Tema hazır şablonları
 */
export type ThemePreset = 'default' | 'modern' | 'rounded' | 'minimal';

/**
 * Varsayılan açık tema
 */
// Modern teması için değerler
const modernTheme: Partial<ThemeConfig> = {
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    full: '9999px',
  },
  colors: {
    primary: 'hsl(250, 95%, 64%)',
    secondary: 'hsl(250, 70%, 80%)',
    success: 'hsl(142, 71%, 45%)',
    warning: 'hsl(38, 92%, 50%)',
    error: 'hsl(0, 84%, 60%)',
    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(221, 39%, 11%)',
    card: 'hsl(0, 0%, 100%)',
    cardForeground: 'hsl(221, 39%, 11%)',
    border: 'hsl(210, 20%, 90%)',
    muted: 'hsl(210, 20%, 96%)',
    mutedForeground: 'hsl(215, 16%, 47%)',
    accent: 'hsl(328, 85%, 70%)',
    accentForeground: 'hsl(210, 20%, 98%)',
  }
};

// Yuvarlak teması için değerler
const roundedTheme = {
  borderRadius: {
    sm: '1rem',
    md: '1.25rem',
    lg: '1.5rem',
    full: '9999px',
  }
};

// Minimal teması için değerler
const minimalTheme: Partial<ThemeConfig> = {
  borderRadius: {
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.375rem',
    full: '9999px',
  },
  colors: {
    primary: 'hsl(220, 14%, 40%)',
    secondary: 'hsl(220, 9%, 60%)',
    success: 'hsl(142, 71%, 45%)',
    warning: 'hsl(38, 92%, 50%)',
    error: 'hsl(0, 84%, 60%)',
    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(221, 39%, 11%)',
    card: 'hsl(0, 0%, 100%)',
    cardForeground: 'hsl(221, 39%, 11%)',
    border: 'hsl(220, 13%, 91%)',
    muted: 'hsl(220, 14%, 96%)',
    mutedForeground: 'hsl(215, 16%, 47%)',
    accent: 'hsl(210, 20%, 96%)',
    accentForeground: 'hsl(221, 39%, 11%)',
  }
};

export const defaultLightTheme: ThemeConfig = {
  colors: {
    primary: 'hsl(221, 83%, 53%)',
    secondary: 'hsl(215, 20%, 65%)',
    success: 'hsl(142, 71%, 45%)',
    warning: 'hsl(38, 92%, 50%)',
    error: 'hsl(0, 84%, 60%)',
    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(221, 39%, 11%)',
    card: 'hsl(0, 0%, 100%)',
    cardForeground: 'hsl(221, 39%, 11%)',
    border: 'hsl(210, 20%, 90%)',
    muted: 'hsl(210, 20%, 96%)',
    mutedForeground: 'hsl(215, 16%, 47%)',
    accent: 'hsl(210, 20%, 96%)',
    accentForeground: 'hsl(221, 39%, 11%)',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
  },
  spacing: {
    1: '0.25rem',
    2: '0.5rem',
    4: '1rem',
    6: '1.5rem',
    8: '2rem',
  },
};

/**
 * Varsayılan koyu tema
 */
export const defaultDarkTheme: ThemeConfig = {
  ...defaultLightTheme,
  colors: {
    primary: 'hsl(221, 83%, 53%)',
    secondary: 'hsl(215, 20%, 65%)',
    success: 'hsl(142, 71%, 45%)',
    warning: 'hsl(38, 92%, 50%)',
    error: 'hsl(0, 84%, 60%)',
    background: 'hsl(221, 39%, 11%)',
    foreground: 'hsl(210, 20%, 98%)',
    card: 'hsl(220, 26%, 14%)',
    cardForeground: 'hsl(210, 20%, 98%)',
    border: 'hsl(215, 28%, 17%)',
    muted: 'hsl(215, 27%, 16%)',
    mutedForeground: 'hsl(215, 16%, 57%)',
    accent: 'hsl(215, 27%, 16%)',
    accentForeground: 'hsl(210, 20%, 98%)',
  },
};

/**
 * Tema bağlamı için tip
 */
export interface ThemeContextType {
  theme: ThemeConfig;
  colorMode: 'light' | 'dark';
  setColorMode: (mode: 'light' | 'dark') => void;
  updateTheme: (config: Partial<ThemeConfig>) => void;
}

// Tema bağlamı
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Tema sağlayıcı props
export interface ThemeProviderProps {
  children: ReactNode;
  defaultColorMode?: 'light' | 'dark';
  preset?: ThemePreset;
  lightTheme?: Partial<ThemeConfig>;
  darkTheme?: Partial<ThemeConfig>;
  extensions?: Record<string, Record<string, string> | string>;
}

/**
 * Tema önayarını getir
 */
const getPresetTheme = (preset: ThemePreset): Partial<ThemeConfig> => {
  switch (preset) {
    case 'modern':
      return modernTheme;
    case 'rounded':
      return roundedTheme;
    case 'minimal':
      return minimalTheme;
    default:
      return {};
  }
};

/**
 * MoonUI tema sağlayıcısı
 */
export const ThemeProvider = ({
  children,
  defaultColorMode = 'light',
  preset = 'default',
  lightTheme = {},
  darkTheme = {},
  extensions = {},
}: ThemeProviderProps) => {
  // Renk modu state'i
  const [colorMode, setColorMode] = useState<'light' | 'dark'>(defaultColorMode);
  
  // Preset tema değerlerini al
  const presetThemeValues = getPresetTheme(preset);

  // Özelleştirilmiş temalar
  const [customLightTheme, setCustomLightTheme] = useState<ThemeConfig>({
    ...defaultLightTheme,
    ...presetThemeValues,
    ...lightTheme,
    colors: {
      ...defaultLightTheme.colors,
      ...(presetThemeValues.colors || {}),
      ...(lightTheme.colors || {}),
    },
    extensions: extensions,
  });
  
  const [customDarkTheme, setCustomDarkTheme] = useState<ThemeConfig>({
    ...defaultDarkTheme,
    ...presetThemeValues,
    ...darkTheme,
    colors: {
      ...defaultDarkTheme.colors,
      ...(presetThemeValues.colors || {}),
      ...(darkTheme.colors || {}),
    },
    extensions: extensions,
  });

  // Aktif tema
  const theme = useMemo(() => {
    return colorMode === 'light' ? customLightTheme : customDarkTheme;
  }, [colorMode, customLightTheme, customDarkTheme]);

  // Tema güncelleme fonksiyonu
  const updateTheme = (config: Partial<ThemeConfig>) => {
    if (colorMode === 'light') {
      setCustomLightTheme(prev => ({
        ...prev,
        ...config,
        colors: {
          ...prev.colors,
          ...(config.colors || {}),
        },
        extensions: {
          ...(prev.extensions || {}),
          ...(config.extensions || {}),
        },
      }));
    } else {
      setCustomDarkTheme(prev => ({
        ...prev,
        ...config,
        colors: {
          ...prev.colors,
          ...(config.colors || {}),
        },
        extensions: {
          ...(prev.extensions || {}),
          ...(config.extensions || {}),
        },
      }));
    }
  };
  
  // Tema değiştirme fonksiyonu
  const setThemePreset = (preset: ThemePreset) => {
    const presetValues = getPresetTheme(preset);
    
    updateTheme({
      ...presetValues,
      colors: presetValues.colors as ThemeColors,
    });
  };

  const value = {
    theme,
    colorMode,
    setColorMode,
    updateTheme,
    setThemePreset,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

/**
 * Tema bağlamı için tip
 */
export interface ThemeContextType {
  theme: ThemeConfig;
  colorMode: 'light' | 'dark';
  setColorMode: (mode: 'light' | 'dark') => void;
  updateTheme: (config: Partial<ThemeConfig>) => void;
  setThemePreset: (preset: ThemePreset) => void;
}

/**
 * Tema kullanma kancası
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

/**
 * CSS değişkenlerini tema konfigürasyonundan oluşturma fonksiyonu
 */
export const createCssVariables = (theme: ThemeConfig): Record<string, string> => {
  const variables: Record<string, string> = {};
  
  // Renkleri CSS değişkenlerine dönüştür
  Object.entries(theme.colors).forEach(([key, value]) => {
    variables[`--color-${key}`] = value;
  });
  
  // Border radius değerlerini CSS değişkenlerine dönüştür
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    variables[`--radius-${key}`] = value;
  });
  
  // Font boyutlarını CSS değişkenlerine dönüştür
  Object.entries(theme.fontSizes).forEach(([key, value]) => {
    variables[`--font-size-${key}`] = value;
  });
  
  // Boşluk değerlerini CSS değişkenlerine dönüştür
  Object.entries(theme.spacing).forEach(([key, value]) => {
    variables[`--space-${key}`] = value;
  });
  
  // Özel uzantı değişkenlerini CSS'e dönüştür
  if (theme.extensions) {
    Object.entries(theme.extensions).forEach(([categoryKey, categoryValue]) => {
      if (typeof categoryValue === 'object' && categoryValue !== null) {
        Object.entries(categoryValue as Record<string, string>).forEach(([key, value]) => {
          variables[`--${categoryKey}-${key}`] = value;
        });
      } else if (typeof categoryValue === 'string') {
        variables[`--${categoryKey}`] = categoryValue;
      }
    });
  }
  
  return variables;
};

/**
 * CSS sınıflarını tema değerlerine göre üretme yardımcı fonksiyonu
 */
export const getCssClass = (themeKey: keyof ThemeConfig, value: string): string => {
  return `var(--${themeKey}-${value})`;
};
