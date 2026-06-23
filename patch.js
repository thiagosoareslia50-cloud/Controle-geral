const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// The lines we want to add aria-label to
// 1. modMode
// title: modMode === "forn" ? "Ver todas" : "Filtrar por fornecedor",
code = code.replace(
  'title: modMode === "forn" ? "Ver todas" : "Filtrar por fornecedor",\n    style: {',
  'title: modMode === "forn" ? "Ver todas" : "Filtrar por fornecedor",\n    "aria-label": modMode === "forn" ? "Ver todas as licitações" : "Filtrar licitações por fornecedor",\n    style: {'
);

// 2. contMode
// title: contMode === "forn" ? "Ver todas" : "Filtrar por fornecedor",
code = code.replace(
  'title: contMode === "forn" ? "Ver todas" : "Filtrar por fornecedor",\n    style: {',
  'title: contMode === "forn" ? "Ver todas" : "Filtrar por fornecedor",\n    "aria-label": contMode === "forn" ? "Ver todos os contratos" : "Filtrar contratos por fornecedor",\n    style: {'
);

// 3. objMode
// Notice this one doesn't have a title yet!
code = code.replace(
  'onClick: () => setObjMode(m => m === "historico" ? "todos" : "historico"),\n    style: {',
  'onClick: () => setObjMode(m => m === "historico" ? "todos" : "historico"),\n    title: objMode === "historico" ? "Ver todos os objetos" : "Filtrar por histórico",\n    "aria-label": objMode === "historico" ? "Ver todos os objetos" : "Filtrar por histórico",\n    style: {'
);

fs.writeFileSync('app.js', code);
