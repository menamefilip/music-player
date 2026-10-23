const assert = require('node:assert/strict');
const { readFileSync, existsSync } = require('node:fs');
const { test } = require('node:test');

const read = (path) => readFileSync(new URL(path, `file://${__dirname}/`), 'utf8');
const readme = read('../README.md');
const packageJson = JSON.parse(read('../package.json'));
const main = read('../main.js');
const html = read('../index.html');

test('README gives the real clone, clean install, and launch commands', () => {
  assert.match(readme, /git clone https:\/\/github\.com\/menamefilip\/music-player\.git/);
  assert.match(readme, /cd music-player/);
  assert.match(readme, /npm ci/);
  assert.match(readme, /npm start/);
  assert.match(readme, /Node\.js 22\.12\.0 or newer/i);
  assert.doesNotMatch(readme, /unzip\s+music-buddy\.zip|npm install\b/i);
});

test('README documents local-file frequency visualization and rejects unsupported audio capture', () => {
  assert.match(readme, /local audio files only/i);
  assert.match(readme, /drag(?:\s+and\s+drop|\s*&\s*drop)/i);
  assert.match(readme, /frequency spectrum/i);
  assert.doesNotMatch(readme, /waveform display/i);
  assert.match(readme, /220\s*[×x]\s*340/);
  assert.match(readme, /does not capture microphone or system loopback audio/i);
  assert.doesNotMatch(readme, /160\s*[×x]\s*160|pavucontrol/i);
});

test('file input, Web Audio, window dimensions, and renderer security match documentation', () => {
  assert.match(html, /<input[^>]*type="file"[^>]*accept="audio\/\*"/i);
  assert.match(html, /new Audio\(\)/);
  assert.match(html, /createMediaElementSource\(audio\)/);
  assert.match(html, /analyser\.getByteFrequencyData\(dataArray\)/);
  assert.doesNotMatch(html, /getUserMedia|navigator\.mediaDevices/i);
  assert.match(main, /width:\s*220/);
  assert.match(main, /height:\s*340/);
  assert.match(main, /nodeIntegration:\s*false/);
  assert.match(main, /contextIsolation:\s*true/);
  assert.doesNotMatch(main, /getUserMedia|navigator\.mediaDevices/i);
});

test('renderer uses sandbox without an unused preload or explicit home-directory injection', () => {
  assert.ok(!existsSync(new URL('../preload.js', `file://${__dirname}/`)));
  assert.doesNotMatch(main, /\bpreload\s*:/);
  assert.doesNotMatch(main, /require\(['"]path['"]\)/);
  assert.doesNotMatch(main, /os\.homedir|require\(['"]os['"]\)/);
  assert.match(main, /sandbox:\s*true/);
  assert.match(readme, /no preload bridge.*does not inject `os\.homedir\(\)` into the renderer/i);
});

test('package metadata and chosen MIT license match the project', () => {
  assert.equal(packageJson.scripts.test, 'node --test');
  assert.equal(packageJson.author, 'Filip Duda');
  assert.equal(packageJson.license, 'MIT');
  assert.equal(packageJson.engines.node, '>=22.12.0');
  assert.match(read('../LICENSE'), /^MIT License\n/);
});

test('visible UI copy is English and matches file-based audio behavior', () => {
  assert.match(html, /<html lang="en">/);
  assert.match(html, /<title>Music Buddy<\/title>/);
  assert.match(html, /Drop an audio file<br>or click to browse/);
  assert.match(html, /Change track/);
  assert.match(html, /This is not an audio file/);
  assert.match(html, /Audio decode error/);
  assert.match(html, /Playback failed/);
  assert.doesNotMatch(html, /Presuň MP3|alebo klikni|Nie je to audio súbor|Zmeniť skladbu|Chyba načítania|Zrušené|Sieťová chyba|Chyba dekódovania|Formát nepodporovaný|presuň znova|Play zlyhala/);
});

test('does not auto-fetch an absent background music file', () => {
  assert.doesNotMatch(html, /background_music\.mp3|Auto-load default music/i);
});

test('README links the real no-audio-loaded UI preview', () => {
  assert.match(readme, /empty state.*no audio is loaded/i);
  assert.match(readme, /!\[.*empty state.*\]\(assets\/music-buddy-ui\.png\)/i);
  assert.ok(existsSync(new URL('../assets/music-buddy-ui.png', `file://${__dirname}/`)));
});
