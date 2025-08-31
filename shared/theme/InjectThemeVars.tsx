import { generateCSSVariables } from './cssVariables';
import { theme as defaultTheme } from './theme';
import type { Theme } from './types';

interface InjectThemeVarsProps {
  theme?: Theme;
  id?: string;
  selector?: string;
}

export default function InjectThemeVars({ 
  theme = defaultTheme,
  id = "bp-theme-vars",
  selector 
}: InjectThemeVarsProps = {}) {
  // Generate CSS variables using the same logic as useThemeVariables
  const baseCss = generateCSSVariables(theme);
  const css = selector ? baseCss.replace(/^:root/, selector) : baseCss;

  return (
    <style
      id={id}
      dangerouslySetInnerHTML={{ __html: css }}
      data-theme-vars="true"
    />
  );
}
