# 🔧 Instruksjoner for å fikse T-mood

## Steg 1: Fjern versjonsnumre fra imports

Kjør dette scriptet for å automatisk fikse alle imports:

```bash
node fix-imports.js
```

## Steg 2: Installer alle avhengigheter

```bash
npm install
```

## Steg 3: Test at alt fungerer

```bash
npm run dev
```

## Steg 4: Deploy til Vercel

### Alternativ A: Via Vercel CLI (Raskest)

```bash
# Installer Vercel CLI
npm install -g vercel

# Deploy
vercel

# For produksjon
vercel --prod
```

### Alternativ B: Via Vercel nettside

1. Gå til [vercel.com/new](https://vercel.com/new)
2. Dra og slipp prosjektmappen din
3. Eller koble til GitHub repository

---

## Hvis du fortsatt får feil:

### Feil: "Cannot find module"
- Sjekk at `npm install` kjørte uten feil
- Prøv: `rm -rf node_modules package-lock.json && npm install`

### TypeScript feil
- Disse kan ofte ignoreres ved bygging
- Kjør `npm run build` for å sjekke om bygget fungerer

### Vercel deployment feil
- Sjekk at `dist` mappen opprettes når du kjører `npm run build`
- Vercel bruker automatisk Node.js 18+, så det skal fungere

---

## 🎯 Kort versjon (Quick Fix)

```bash
# 1. Fikse imports
node fix-imports.js

# 2. Installere pakker  
npm install

# 3. Teste lokalt
npm run dev

# 4. Deploy til Vercel
vercel --prod
```

Ferdig! 🚀
