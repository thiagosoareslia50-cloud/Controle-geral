const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');

// match things with emoji as children but no aria-label
const regex = /React\.createElement\("button",\s*\{[^}]*onClick[^}]*\},([^)]*?["'][^a-zA-Z0-9<>]*[\uD800-\uDBFF][\uDC00-\uDFFF].*?["'])/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const snippet = content.substring(match.index - 50, match.index + 150);
  console.log('MATCH:', snippet.replace(/\n/g, ' '));
}
