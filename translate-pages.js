/**
 * Script pour aider à traduire automatiquement les pages
 * Usage: node translate-pages.js
 * 
 * Ce script scanne tous les fichiers .tsx dans client/src/pages
 * et détecte les textes en dur qui devraient être traduits
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, 'client', 'src', 'pages');

// Patterns de texte à ignorer (déjà traduits ou pas besoin)
const ignorePatterns = [
  /className=/,
  /import /,
  /export /,
  /const /,
  /\{.*\}/,  // Variables JSX
  /http/,    // URLs
  /\.tsx/,   // Extensions
  /<\/.*>/,  // Balises fermantes
];

// Fonction pour extraire les textes en dur
function extractHardcodedStrings(content) {
  const strings = [];
  
  // Regex pour trouver les chaînes entre guillemets
  const stringPattern = /["']([^"']{3,})["']/g;
  let match;
  
  while ((match = stringPattern.exec(content)) !== null) {
    const text = match[1];
    
    // Ignorer si correspond aux patterns à ignorer
    if (ignorePatterns.some(pattern => pattern.test(text))) {
      continue;
    }
    
    // Ignorer les chemins de fichiers
    if (text.includes('/') || text.includes('.')) {
      continue;
    }
    
    strings.push(text);
  }
  
  return strings;
}

// Scanner tous les fichiers .tsx
function scanPages() {
  console.log('🔍 Scanning pages for hardcoded strings...\n');
  
  const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));
  
  files.forEach(file => {
    const filePath = path.join(pagesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Vérifier si déjà traduit
    const hasTranslation = content.includes('useTranslation');
    
    if (hasTranslation) {
      console.log(`✅ ${file} - Already translated`);
      return;
    }
    
    const strings = extractHardcodedStrings(content);
    
    if (strings.length > 0) {
      console.log(`⚠️  ${file} - Found ${strings.length} hardcoded strings:`);
      strings.slice(0, 5).forEach(s => console.log(`   - "${s}"`));
      if (strings.length > 5) {
        console.log(`   ... and ${strings.length - 5} more`);
      }
      console.log('');
    } else {
      console.log(`✅ ${file} - No hardcoded strings found`);
    }
  });
  
  console.log('\n📋 Summary:');
  console.log('- Check files marked with ⚠️');
  console.log('- Add useTranslation hook');
  console.log('- Replace hardcoded strings with t("key")');
  console.log('- Add translations to i18n.ts\n');
}

// Fonction pour générer un template de traduction
function generateTranslationTemplate() {
  console.log('\n📝 Generating translation template...\n');
  
  const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));
  const allStrings = new Set();
  
  files.forEach(file => {
    const filePath = path.join(pagesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const strings = extractHardcodedStrings(content);
    strings.forEach(s => allStrings.add(s));
  });
  
  console.log('Translation keys to add to i18n.ts:\n');
  console.log('```typescript');
  Array.from(allStrings).forEach((str, index) => {
    const key = `page.text${index + 1}`;
    console.log(`"${key}": "${str}",`);
  });
  console.log('```\n');
}

// Fonction pour modifier automatiquement un fichier
function autoTranslate(filename) {
  const filePath = path.join(pagesDir, filename);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${filename}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Ajouter l'import si manquant
  if (!content.includes('useTranslation')) {
    const importLine = "import { useTranslation } from 'react-i18next';";
    content = content.replace(
      /(import .* from ['"].*['"];)/,
      `$1\n${importLine}`
    );
  }
  
  // Ajouter le hook si manquant
  if (!content.includes('const { t }')) {
    content = content.replace(
      /(export default function \w+\(\) \{)/,
      `$1\n  const { t } = useTranslation();`
    );
  }
  
  // Créer backup
  fs.writeFileSync(filePath + '.backup', content);
  
  console.log(`✅ Modified ${filename}`);
  console.log(`📁 Backup created: ${filename}.backup`);
  console.log('⚠️  Please review changes manually!');
}

// Menu principal
const args = process.argv.slice(2);

if (args.includes('--scan')) {
  scanPages();
} else if (args.includes('--template')) {
  generateTranslationTemplate();
} else if (args.includes('--auto')) {
  const filename = args[args.indexOf('--auto') + 1];
  if (filename) {
    autoTranslate(filename);
  } else {
    console.log('❌ Please specify a filename: node translate-pages.js --auto Admin.tsx');
  }
} else {
  console.log(`
🌐 Translation Helper Script

Usage:
  node translate-pages.js --scan              Scan all pages for hardcoded strings
  node translate-pages.js --template          Generate translation template
  node translate-pages.js --auto <file>       Auto-add translation hooks to a file

Examples:
  node translate-pages.js --scan
  node translate-pages.js --auto Admin.tsx
  `);
}