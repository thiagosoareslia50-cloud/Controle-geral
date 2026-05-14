const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');

// Looking for basic button definitions without text, with just emojis
const regex = /React\.createElement\("button",\s*\{([^}]+)\},\s*([^)]+)\)/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const props = match[1];
  let children = match[2].trim();
  if (children.includes('? "📂" : "🏢"')) {
      console.log('Found missing aria-label icon-only button at index:', match.index);
      console.log('Props:', props.replace(/\n/g, ' '));
  }
}
