const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');

const regex = /React\.createElement\("button",\s*\{[^}]*onClick[\s\S]*?\},([^)]*)/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const children = match[1];
  if (children.includes('u2328') || children.includes('u2715') || children.includes('BtnIco')) {
    const snippet = content.substring(match.index - 20, match.index + 100);
    console.log('MATCH:', snippet.replace(/\n/g, ' '));
  }
}
