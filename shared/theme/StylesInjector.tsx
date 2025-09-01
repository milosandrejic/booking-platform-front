import { getGlobalRegistry } from "./styleRegistry";
import { generateCSSVariables } from "./cssVariables";
import { theme } from "./theme";

export default function StylesInjector() {
  const registry = getGlobalRegistry();
  
  // Get theme variables
  const themeVars = generateCSSVariables(theme);
  
  // Get sx styles
  const sxStyles = registry ? registry.getStyles() : '';
  if (registry) registry.flush();

  const combinedCSS = `${themeVars}\n${sxStyles}`;

  return (
    <style
      dangerouslySetInnerHTML={{ __html: combinedCSS }}
      data-styles-injected="true"
    />
  );
}
