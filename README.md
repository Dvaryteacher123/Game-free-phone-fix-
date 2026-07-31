# GameHub — Tovuti ya Michezo (Next.js + Tailwind + Firebase)

Mradi huu ni tovuti ya michezo yenye:
- Ukurasa wa mbele (`/`) wenye Navbar, Notifications banner, na Games grid — vyote vinasoma moja kwa moja kutoka Firebase Firestore.
- Ukurasa wa siri wa Admin (`/admin`) wenye fomu mbili: kuongeza mchezo mpya, na kutuma notisi.
- Rangi za Cream/Pastel theme.
- Umewekwa tayari kwa **Static Export** (`output: "export"`) ili uweze ku-deploy kwenye Render kama Static Site.

---

## 1. Anzisha Firebase (kama hujafanya)

1. Nenda https://console.firebase.google.com → **Add project**.
2. Ndani ya project, bofya **Build → Firestore Database → Create database** (chagua "test mode" kwa mwanzo, kisha baadaye weka rules zako mwenyewe).
3. Nenda **Project settings → General → Your apps → Web app (</>)** ili upate config yako (apiKey, authDomain, n.k).
4. Tengeneza collections mbili kwa mkono (au ziache; zitatengenezwa zenyewe pale utakapo-save data ya kwanza kupitia `/admin`):
   - `games` — nyaraka zenye fields: `title` (string), `link` (string), `createdAt` (timestamp)
   - `notifications` — nyaraka zenye fields: `message` (string), `createdAt` (timestamp)

### Firestore Security Rules (mfano rahisi — badilisha kadri unavyohitaji)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /games/{gameId} {
      allow read: if true;
      allow write: if true; // ⚠️ badilisha hii uwe na auth kabla ya production
    }
    match /notifications/{notifId} {
      allow read: if true;
      allow write: if true; // ⚠️ badilisha hii uwe na auth kabla ya production
    }
  }
}
```

> ⚠️ Muhimu: Kwa sasa `/admin` haina password/login — yeyote anayejua URL anaweza kuongeza data. Kwa production halisi, ongeza Firebase Authentication (email/password) kabla ya kuruhusu maandishi (`write`) kwenye rules.

---

## 2. Endesha kwenye kompyuta yako (local)

```bash
npm install
cp .env.local.example .env.local
# fungua .env.local na jaza thamani za Firebase zako
npm run dev
```

Fungua http://localhost:3000

---

## 3. Panda GitHub

Kwenye terminal, ndani ya folder ya mradi:

```bash
git init
git add .
git commit -m "Initial commit - GameHub website"
git branch -M main
git remote add origin https://github.com/USERNAME_WAKO/JINA_LA_REPO.git
git push -u origin main
```

Badilisha `USERNAME_WAKO` na `JINA_LA_REPO` na taarifa zako halisi za GitHub (tengeneza repo tupu kwanza kwenye github.com/new).

---

## 4. Deploy kwenye Render (Static Site)

1. Nenda https://dashboard.render.com → **New → Static Site**.
2. Unganisha GitHub account yako, chagua repo uliyopandisha.
3. Jaza settings hizi:
   - **Build Command:** `npm install && npm run build`
   - **Publish directory:** `out`
4. Nenda sehemu ya **Environment** kwenye Render, ongeza Environment Variables zifuatazo (thamani halisi kutoka Firebase console):
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
5. Bofya **Create Static Site**. Render itafanya build na kukupa URL ya live site (mfano `https://gamehub.onrender.com`).

Ukibadilisha env variables baadaye, lazima ufanye **Manual Deploy → Clear build cache & deploy** kwa sababu Next static export inachoma (bake) env variables za `NEXT_PUBLIC_*` wakati wa `build`, si wakati wa run-time.

---

## Muundo wa Faili

```
game-website/
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── .env.local.example
└── src/
    ├── lib/
    │   └── firebase.js
    └── app/
        ├── layout.jsx
        ├── globals.css
        ├── page.jsx          (Ukurasa wa Nyumbani)
        └── admin/
            └── page.jsx      (Ukurasa wa Admin - /admin)
```
