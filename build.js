const fs = require('fs');
const SRC = process.argv[2];
const OUT = process.argv[3];
const FONT_DIR = process.argv[4];

let content = fs.readFileSync(SRC, 'utf8');
const fonts = {
  __AS_HEB__: fs.readFileSync(FONT_DIR + '/as-heb.b64', 'utf8').trim(),
  __AS_LAT__: fs.readFileSync(FONT_DIR + '/as-lat.b64', 'utf8').trim(),
  __FRL_HEB__: fs.readFileSync(FONT_DIR + '/frl-heb.b64', 'utf8').trim(),
  __FRL_LAT__: fs.readFileSync(FONT_DIR + '/frl-lat.b64', 'utf8').trim(),
};
for (const [key, val] of Object.entries(fonts)) {
  if (!content.includes(key)) throw new Error('missing placeholder ' + key);
  content = content.split(key).join(val);
}

const head = `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>משפחת ונקרט — שמות המשפחה</title>
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#142720">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="משפחת ונקרט">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="192x192" href="icon-192.png">
</head>
<body>
`;
const tail = `
</body>
</html>`;

fs.writeFileSync(OUT, head + content + tail, 'utf8');
console.log('wrote', OUT, (head + content + tail).length, 'chars');
