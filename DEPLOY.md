# 🚀 Deploy na Vercel — jeden projekt

Backend (`api/`) a frontend (`frontend/`) se nasazují jako **jeden Vercel projekt** z kořene repozitáře. Vercel sám postaví Next.js frontend a zaregistruje Python funkci na `/api/*`.

> Předpoklady: účet na [vercel.com](https://vercel.com/) (free stačí), nainstalované Vercel CLI:
> ```bash
> npm install -g vercel
> vercel login   # otevře prohlížeč, přihlaš se
> ```

---

## Deploy (3 kroky)

**1. Nasaď projekt** z kořene repozitáře:

```bash
vercel
```

Při prvním spuštění Vercel položí pár otázek:
- *Set up and deploy?* → **Y**
- *Which scope?* → tvůj účet
- *Link to existing project?* → **N**
- *Project name?* → libovolné, např. `birthday-gift-guardian`
- *In which directory is your code located?* → **`./`** (kořen, stiskni Enter)
- *Want to modify settings?* → **N**

**2. Nastav OpenAI API klíč:**

```bash
vercel env add OPENAI_API_KEY
```
- Vlož svůj klíč (`sk-proj-...`)
- Vyber všechna prostředí: **Production, Preview, Development**

**3. Nasaď do produkce:**

```bash
vercel --prod
```

Vercel ti vypíše veřejnou URL — **tohle pošleš sestře!** 🎂

---

## Jak to funguje

- `vercel.json` říká Vercelu, aby sestavil Next.js z `frontend/` a všechny requesty na `/api/*` přesměroval na `api/index.py`
- Frontend volá `/api/chat` relativně — žádná hardcoded URL, žádné env variables navíc
- Lokálně frontend stále volá `http://localhost:8000` (detekuje se podle `window.location.hostname`)

---

## ⚠️ Důležité

- **`OPENAI_API_KEY` patří jen na backend** — nikdy ji nedávej do kódu ani do `NEXT_PUBLIC_*` proměnných
- **Auto-deploy:** Propoj projekt s GitHubem v Vercel dashboardu — každý push do `main` nasadí automaticky

---

## Rychlý souhrn

```bash
vercel                          # první deploy + nastavení projektu
vercel env add OPENAI_API_KEY   # vlož sk-proj-... klíč
vercel --prod                   # produkční deploy → pošli URL sestře 🎉
```
