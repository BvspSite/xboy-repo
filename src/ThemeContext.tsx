import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'custom';

export interface RGBTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

export interface ThemePreset {
  name: string;
  colors: RGBTheme;
  gradient: string;
}

export const themePresets: ThemePreset[] = [
  {
    name: 'Ocean',
    colors: {
      primary: '#0ea5e9', // Sky blue
      secondary: '#06b6d4', // Cyan
      accent: '#3b82f6', // Blue
      background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #3b82f6 100%)'
    },
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #3b82f6 100%)'
  },
  {
    name: 'Sunset',
    colors: {
      primary: '#f59e0b', // Amber
      secondary: '#ef4444', // Red
      accent: '#ec4899', // Pink
      background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)'
    },
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)'
  },
  {
    name: 'Forest',
    colors: {
      primary: '#10b981', // Emerald
      secondary: '#14b8a6', // Teal
      accent: '#22c55e', // Green
      background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #22c55e 100%)'
    },
    gradient: 'linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #22c55e 100%)'
  },
  {
    name: 'Purple Dream',
    colors: {
      primary: '#8b5cf6', // Violet
      secondary: '#a855f7', // Purple
      accent: '#d946ef', // Fuchsia
      background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #d946ef 100%)'
    },
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #d946ef 100%)'
  },
  {
    name: 'Midnight',
    colors: {
      primary: '#6366f1', // Indigo
      secondary: '#4f46e5', // Indigo-dark
      accent: '#818cf8', // Indigo-light
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4f46e5 100%)'
    },
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4f46e5 100%)'
  },
  {
    name: 'Cherry Blossom',
    colors: {
      primary: '#ec4899', // Pink
      secondary: '#f472b6', // Pink-light
      accent: '#db2777', // Pink-dark
      background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 50%, #f9a8d4 100%)'
    },
    gradient: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 50%, #f9a8d4 100%)'
  }
];

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  customTheme: RGBTheme | null;
  setCustomTheme: (colors: RGBTheme) => void;
  applyPreset: (preset: ThemePreset) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) return savedTheme;
    
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const [customTheme, setCustomThemeState] = useState<RGBTheme | null>(() => {
    const saved = localStorage.getItem('customTheme');
    return saved ? JSON.parse(saved) : null;
  });

  const applyCustomColors = (colors: RGBTheme) => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-background', colors.background);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'custom');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);

    if (theme === 'custom' && customTheme) {
      applyCustomColors(customTheme);
    }
  }, [theme, customTheme]);

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'dark') return 'light';
      if (prev === 'light' && customTheme) return 'custom';
      return 'dark';
    });
  };

  const setCustomTheme = (colors: RGBTheme) => {
    setCustomThemeState(colors);
    localStorage.setItem('customTheme', JSON.stringify(colors));
    setTheme('custom');
    applyCustomColors(colors);
  };

  const applyPreset = (preset: ThemePreset) => {
    setCustomTheme(preset.colors);
  };

  const resetTheme = () => {
    setCustomThemeState(null);
    localStorage.removeItem('customTheme');
    setTheme('dark');
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      customTheme,
      setCustomTheme,
      applyPreset,
      resetTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

