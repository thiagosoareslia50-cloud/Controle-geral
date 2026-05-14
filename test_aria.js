const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');

const regex = /React\.createElement\("button",\s*\{[^}]*onClick/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const snippet = content.substring(match.index, match.index + 100);
  console.log(snippet.replace(/\n/g, ' '));
}
