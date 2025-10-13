/**
 * Script for å fjerne versjonsnumre fra imports
 * Kjør: node fix-imports.js
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components', 'ui');

// Les alle .tsx filer i components/ui
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fjern versjonsnumre fra imports
  content = content.replace(/@radix-ui\/([^"'@]+)@[\d.]+/g, '@radix-ui/$1');
  content = content.replace(/lucide-react@[\d.]+/g, 'lucide-react');
  content = content.replace(/class-variance-authority@[\d.]+/g, 'class-variance-authority');
  content = content.replace(/embla-carousel-react@[\d.]+/g, 'embla-carousel-react');
  content = content.replace(/recharts@[\d.]+/g, 'recharts');
  content = content.replace(/cmdk@[\d.]+/g, 'cmdk');
  content = content.replace(/vaul@[\d.]+/g, 'vaul');
  content = content.replace(/react-day-picker@[\d.]+/g, 'react-day-picker');
  content = content.replace(/input-otp@[\d.]+/g, 'input-otp');
  content = content.replace(/react-resizable-panels@[\d.]+/g, 'react-resizable-panels');
  content = content.replace(/next-themes@[\d.]+/g, 'next-themes');
  content = content.replace(/sonner@[\d.]+/g, 'sonner');
  
  // Skriv tilbake filen
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Fikset ${file}`);
});

console.log('\n🎉 Alle imports er fikset!');
