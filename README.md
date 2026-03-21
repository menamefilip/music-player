# 🎧 Music Buddy — widget

Malý floating widget v rohu obrazovky so smajlíkom, ktorý tancuje na hudbu.

---

## Inštalácia (Pop!_OS / Ubuntu)

### 1. Rozbaliť ZIP
```bash
unzip music-buddy.zip
cd music-buddy
```

### 2. Nainštalovať Node.js (ak ešte nemáš)
```bash
sudo apt install nodejs npm
```

### 3. Nainštalovať Electron
```bash
npm install
```

### 4. Spustiť widget
```bash
npm start
```

---

## Ako to funguje

- Widget sa zobrazí v **pravom dolnom rohu** obrazovky (160×160 px, vždy navrchu)
- Počúva **mikrofón** (alebo loopback audio) a vizualizuje zvuk:
  - 7 EQ tyčiniek dole
  - Smajlík skáče na basy
  - Zelenou halo ring na basy
  - Emoji sa mení podľa hlasitosti: 😴 → 🎧 → 😎 → 🤩 → 🥳
- **Drag** — okno sa dá presunúť kliknutím a ťahaním
- **✕** tlačidlo sa zobrazí po hover (vpravo hore)

---

## 🔊 Tip: systémový zvuk miesto mikrofónu (PipeWire)

Na Pop!_OS s PipeWire môžeš nastaviť **loopback** — widget bude počúvať čo hrá (Spotify, YouTube...):

```bash
# Inštaluj pavucontrol
sudo apt install pavucontrol

# Spusti widget, potom v pavucontrol:
# záložka "Recording" → Music Buddy → nastav zdroj na "Monitor of [tvoja zvuková karta]"
```

---

## Automatické spustenie pri štarte

```bash
# Vytvor .desktop súbor
mkdir -p ~/.config/autostart
cat > ~/.config/autostart/music-buddy.desktop << EOF
[Desktop Entry]
Type=Application
Name=Music Buddy
Exec=bash -c "cd $HOME/music-buddy && npm start"
Hidden=false
NoDisplay=false
X-GNOME-Autostart-enabled=true
EOF
```

---

## Štruktúra projektu
```
music-buddy/
├── main.js       ← Electron hlavný proces (okno, pozícia)
├── preload.js    ← bezpečnostný bridge
├── index.html    ← UI widget (CSS + Web Audio API)
├── package.json  ← npm config
└── README.md     ← tento súbor
```
