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

export const getFontFaceDeclarations = (): string => {
  const fontWeights = [
    { weight: 100, file: 'Roboto-Thin.ttf' },
    { weight: 200, file: 'Roboto-ExtraLight.ttf' },
    { weight: 300, file: 'Roboto-Light.ttf' },
    { weight: 400, file: 'Roboto-Regular.ttf' },
    { weight: 500, file: 'Roboto-Medium.ttf' },
    { weight: 600, file: 'Roboto-SemiBold.ttf' },
    { weight: 700, file: 'Roboto-Bold.ttf' },
    { weight: 800, file: 'Roboto-ExtraBold.ttf' },
    { weight: 900, file: 'Roboto-Black.ttf' }
  ];

  return fontWeights
    .map(
      ({ weight, file }) => `
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: ${weight};
  src: url('./fonts/${file}') format('truetype');
}`
    )
    .join('\n');
};

export const generateCompleteCSS = (themeObject: any): string => {
  const fontFaces = getFontFaceDeclarations();
  const cssVariables = generateCSSVariables(themeObject);

  return `${fontFaces}

${cssVariables}

body {
  font-family: var(--font-family);
}`;
};
