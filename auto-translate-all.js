import fs from 'fs';
import path from 'path';

const pages = [
  'client/src/pages/Home.tsx',
  'client/src/pages/Composer.tsx',
  'client/src/pages/Cafes.tsx',
  'client/src/pages/Assiette.tsx',
  'client/src/pages/Blog.tsx',
  'client/src/pages/Panier.tsx',
  'client/src/pages/Eau.tsx',
  'client/src/pages/NotreHistoire.tsx',
  'client/src/pages/TheBoissons.tsx',
  'client/src/pages/Menu.tsx',
  'client/src/pages/ComponentShowcase.tsx',

];

pages.forEach(pagePath => {
  let content = fs.readFileSync(pagePath, 'utf-8');
  
  // Ajouter l'import si manquant
  if (!content.includes("useTranslation")) {
    content = content.replace(
      /(import.*from ['"]lucide-react['"];)/,
      `$1\nimport { useTranslation } from 'react-i18next';`
    );
  }
  
  // Ajouter le hook au début de la fonction
  if (!content.includes("const { t }")) {
    content = content.replace(
      /(export default function \w+\(\) \{)/,
      `$1\n  const { t } = useTranslation();`
    );
  }
  
  // Backup
  fs.writeFileSync(pagePath, content);
  fs.writeFileSync(pagePath, content);
  
  console.log(`✅ Modified ${pagePath}`);
});

console.log('\n🎉 All pages prepared for translation!');
console.log('⚠️  Now manually replace text strings with t("key") in each file');