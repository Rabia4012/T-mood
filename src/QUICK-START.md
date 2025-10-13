# ⚡ Quick Start - T-mood

## 🚀 3 enkle steg til Vercel:

### 1️⃣ Fikse imports (10 sekunder)
```bash
node fix-imports.js
```

### 2️⃣ Installere pakker (1-2 minutter)
```bash
npm install
```

### 3️⃣ Deploy til Vercel (30 sekunder)
```bash
npx vercel
```

---

## 📝 Detaljert forklaring:

### Hva gjør fix-imports.js?
Den fjerner versjonsnumre fra alle imports i shadcn komponentene.
F.eks: `@radix-ui/react-avatar@1.1.3` → `@radix-ui/react-avatar`

### Hva gjør npm install?
Installerer alle React, Radix UI, Lucide icons, Recharts, osv.

### Hva gjør vercel?
- Første gang: Setter opp nytt prosjekt på Vercel
- Efterpå: Deployer oppdateringer

---

## 🎯 Full kommandoliste:

```bash
# Start her (i prosjektmappen)
cd t-mood

# 1. Fikse imports
node fix-imports.js

# 2. Installer pakker
npm install

# 3. Test lokalt (valgfritt)
npm run dev
# Åpne http://localhost:5173

# 4. Deploy til Vercel
npx vercel

# For produksjon:
npx vercel --prod
```

---

## ❓ Troubleshooting:

### "npm: command not found"
- Installer Node.js fra nodejs.org

### "Cannot find module" feil etter npm install
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript advarsler i VS Code
- Dette er normalt og stopper ikke byggingen
- Prøv `npm run build` - hvis det fungerer er alt OK

### Vercel spør om settings
- Framework: **Vite**
- Build Command: `npm run build` (default)
- Output Directory: `dist` (default)
- Install Command: `npm install` (default)

---

## ✅ Sjekkliste:

- [ ] Kjør `node fix-imports.js`
- [ ] Kjør `npm install`
- [ ] (Valgfritt) Test med `npm run dev`
- [ ] Deploy med `npx vercel` eller `npx vercel --prod`
- [ ] Åpne URL-en Vercel gir deg
- [ ] 🎉 T-mood er live!
