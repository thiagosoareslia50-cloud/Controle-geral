const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');

// The react create element structure:
// React.createElement("button", { props... }, child1, child2...)
// We want to see buttons where the text child is an emoji or icon, or no text child.
// Let's print out all buttons with their string child (if any)
const regex = /React\.createElement\("button",\s*\{([^}]*)\}([^<]*)/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const afterProps = match[2];
  const stringMatch = afterProps.match(/,\s*(["'][^"']+["'])/);
  if (stringMatch) {
     const str = stringMatch[1].replace(/['"]/g, '').trim();
     if (str.length > 0 && str.length <= 4 && !/^[a-zA-Z0-9]+$/.test(str)) {
         console.log('Short non-alphanumeric button child:', str, 'at index', match.index);
     }
  }
}
