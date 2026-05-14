const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');

// Looking for basic button definitions
const regex = /React\.createElement\("button",\s*\{([^}]*)\}/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const props = match[1];
  if (!props.includes('aria-label')) {
      const fullCall = content.substring(match.index, match.index + 200);
      // check if it has any text content
      if (fullCall.includes('BtnIco') || /,\s*["'][^"']+["']\s*\)/.test(fullCall)) {
          // ignore, has text or icon
      } else {
        console.log('Button missing aria-label:', fullCall.replace(/\n/g, ' '));
      }
  }
}
