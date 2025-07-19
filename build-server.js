// Alternative build script for Railway that handles import.meta.dirname properly
const esbuild = require('esbuild');

async function build() {
  try {
    console.log('Building server with custom configuration...');
    
    await esbuild.build({
      entryPoints: ['server/index.ts'],
      bundle: true,
      outfile: 'dist/index.js',
      platform: 'node',
      format: 'esm',
      packages: 'external',
      define: {
        'import.meta.dirname': '__dirname',
        'import.meta.url': 'import.meta.url'
      },
      banner: {
        js: `
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
`
      }
    });
    
    console.log('Server build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();