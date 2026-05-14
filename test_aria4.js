const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');

// match things with emoji as children and no aria-label
const regex = /React\.createElement\("button",\s*\{([^}]*)\},[^)]*?BtnIco[^}]*?emoji:\s*["']([^"']+)["'][^}]*\}[^)]*\)/g;
let match;
let found = false;
while ((match = regex.exec(content)) !== null) {
  const props = match[1];
  const emoji = match[2];
  if (!props.includes('aria-label')) {
      const titleRegex = /title:\s*["']([^"']+)["']/;
      let title = "";
      if (titleRegex.test(props)) title = props.match(titleRegex)[1];
      else if (!props.includes('title')) {
          const textMatch = content.substring(match.index).match(/\}[^)]*\),\s*["']([^"']+)["']/);
          if (textMatch) title = textMatch[1];
      }

      console.log('MATCH:', emoji, 'NO ARIA-LABEL', 'Title/Text:', title);
      found = true;
  }
}
if(!found) console.log("No matches");
