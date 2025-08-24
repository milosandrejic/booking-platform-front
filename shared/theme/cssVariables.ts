export const flattenTheme = (
  obj: any,
  prefix = '--',
  separator = '-'
): Record<string, string | number> => {
  const result: Record<string, string | number> = {};

  for (const [key, value] of Object.entries(obj)) {
    const cssKey = `${prefix}${key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}`;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenTheme(value, `${cssKey}${separator}`, separator));
    } else if (typeof value === 'string' || typeof value === 'number') {
      result[cssKey] = value;
    }
  }

  return result;
};

export const generateCSSVariables = (themeObject: any): string => {
  const cssVariables = flattenTheme(themeObject);

  const cssText = Object.entries(cssVariables)
    .map(([property, value]) => `  ${property}: ${value};`)
    .join('\n');

  return `:root {\n${cssText}\n}`;
};
