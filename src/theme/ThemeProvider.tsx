import React, { createContext, useContext, useMemo } from 'react';
import { buildTokens, fonts, TokenSet } from '../tokens';

type ThemeContextValue = { mode: 'light' | 'dark'; tokens: TokenSet; fonts: typeof fonts };

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: React.FC<{ mode?: 'light' | 'dark'; children: React.ReactNode }> = ({
  mode = 'light', children,
}) => {
  const value = useMemo<ThemeContextValue>(() => ({ mode, tokens: buildTokens(mode), fonts }), [mode]);
  return (
    <ThemeContext.Provider value={value}>
      <div style={{ backgroundColor: value.tokens.bg.canvas, color: value.tokens.text.primary, fontFamily: fonts.sans, minHeight: '100%' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

/** tokens だけ取り出すショートカット */
export const useTokens = () => useTheme().tokens;
