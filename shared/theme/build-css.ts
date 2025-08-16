import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateThemeCSS = async () => {
  try {
    // Import from compiled JavaScript files
    const { generateCompleteCSS } = await import('./dist/cssVariables.js');
    const themeModule = await import('./dist/theme.js');
    const theme = themeModule.default || themeModule.theme;

    const cssContent = generateCompleteCSS(theme);

    // Create output directory in dist
    const outputDir = path.resolve(__dirname, 'dist');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, 'variables.css');
    fs.writeFileSync(outputPath, cssContent, 'utf8');

    console.log('✅ Theme CSS variables generated successfully');
    console.log(`📦 File size: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);
  } catch (error) {
    console.error('❌ Error generating theme CSS:', error);
    process.exit(1);
  }
};

generateThemeCSS();
