#!/bin/bash

# Bash script for å fjerne versjonsnumre fra alle imports
# Kjør: bash fix-all-imports.sh

echo "🔧 Fikser alle imports..."

# Gå gjennom alle .tsx filer i components/ui
for file in components/ui/*.tsx; do
  if [ -f "$file" ]; then
    # Fjern versjonsnumre fra imports
    sed -i '' 's/@radix-ui\/\([^"@]*\)@[0-9.]*/@radix-ui\/\1/g' "$file"
    sed -i '' 's/lucide-react@[0-9.]*/lucide-react/g' "$file"
    sed -i '' 's/class-variance-authority@[0-9.]*/class-variance-authority/g' "$file"
    sed -i '' 's/embla-carousel-react@[0-9.]*/embla-carousel-react/g' "$file"
    sed -i '' 's/recharts@[0-9.]*/recharts/g' "$file"
    sed -i '' 's/cmdk@[0-9.]*/cmdk/g' "$file"
    sed -i '' 's/vaul@[0-9.]*/vaul/g' "$file"
    sed -i '' 's/react-day-picker@[0-9.]*/react-day-picker/g' "$file"
    sed -i '' 's/input-otp@[0-9.]*/input-otp/g' "$file"
    sed -i '' 's/react-resizable-panels@[0-9.]*/react-resizable-panels/g' "$file"
    sed -i '' 's/react-hook-form@[0-9.]*/react-hook-form@7.55.0/g' "$file"
    
    echo "✅ Fikset $file"
  fi
done

echo ""
echo "🎉 Alle imports er fikset!"
echo ""
echo "Neste steg:"
echo "1. Kjør: npm install"
echo "2. Kjør: npm run dev (for å teste)"
echo "3. Kjør: npx vercel --prod (for å deploye)"
