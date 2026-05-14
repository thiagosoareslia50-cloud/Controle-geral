const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');

// Looking for basic button definitions
const regex = /React\.createElement\("button",\s*\{([^}]*)\}/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const props = match[1];
  if (!props.includes('aria-label')) {
      const fullCall = content.substring(match.index, match.index + 250);
      // Try to find if the children is ONLY a BtnIco with no text following it
      if (fullCall.includes('BtnIco')) {
          const afterBtnIco = fullCall.substring(fullCall.indexOf('BtnIco') + 6);
          // if it closes the createElement soon after the BtnIco's properties, it might be icon-only
          if (afterBtnIco.indexOf(')') < afterBtnIco.indexOf('",') || afterBtnIco.match(/\}\)\)/)) {
             console.log('Possible Icon-Only Button (BtnIco):', fullCall.substring(0, 150).replace(/\n/g, ' '));
          }
      } else {
          // No BtnIco, but maybe an emoji directly inside?
          const textMatch = fullCall.match(/\}[^)]*\),\s*["']([^"']+)["']/);
          if (textMatch && /^[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(textMatch[1].trim())) {
             console.log('Possible Icon-Only Button (Emoji Text):', fullCall.substring(0, 150).replace(/\n/g, ' '));
          }
          else if (textMatch && /^[^\w\s]+$/.test(textMatch[1].trim())) {
             console.log('Possible Icon-Only Button (Symbol):', fullCall.substring(0, 150).replace(/\n/g, ' '));
          }
      }
  }
}
