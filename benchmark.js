const fs = require('fs');
const code = fs.readFileSync('app.js', 'utf8');

// Use app.js directly instead of Function creation to avoid parsing issues
const processos = [];
for (let i = 0; i < 10000; i++) {
  processos.push({
    "ORGÃO": "Org" + (i % 10),
    "SECRETARIO": "Sec" + (i % 5),
    "CONTRATO": "Cont" + (i % 20),
    "MODALIDADE": "Mod" + (i % 3),
    "FORNECEDOR": "Forn" + (i % 50),
    "CNPJ": "CNPJ" + (i % 50),
    "OBJETO": "Obj" + (i % 100),
    "Nº": "N" + i,
    "DOCUMENTO FISCAL": "Doc" + (i % 5),
    "TIPO": "Tipo" + (i % 2),
    "PERÍODO DE REFERÊNCIA": "Per" + (i % 12),
    "N° ORDEM DE COMPRA": "Ord" + i
  });
}

function buildMapDataOld(processos) {
  const dct = (kC, vC) => {
    const m = {};
    for (const p of processos) {
      const k = String(p[kC] || "").trim(),
        v = String(p[vC] || "").trim();
      if (k && v) m[k] = v;
    }
    return m;
  };
  const lst = col => {
    const s = new Set();
    for (const p of processos) {
      const v = String(p[col] || "").trim();
      if (v) s.add(v);
    }
    return [...s].sort();
  };
  const multi = (kC, vC) => {
    const m = {};
    for (const p of processos) {
      const k = String(p[kC] || "").trim(),
        v = String(p[vC] || "").trim();
      if (!k || !v) continue;
      if (!m[k]) m[k] = new Set();
      m[k].add(v);
    }
    const out = {};
    for (const k in m) out[k] = [...m[k]].sort();
    return out;
  };
  return {
    orgaoSecretario: dct("ORGÃO", "SECRETARIO"),
    orgaoContrato: dct("ORGÃO", "CONTRATO"),
    orgaoModalidade: dct("ORGÃO", "MODALIDADE"),
    fornCnpj: dct("FORNECEDOR", "CNPJ"),
    fornObjeto: dct("FORNECEDOR", "OBJETO"),
    fornModalidade: dct("FORNECEDOR", "MODALIDADE"),
    fornContrato: dct("FORNECEDOR", "CONTRATO"),
    fornNf: dct("FORNECEDOR", "Nº"),
    fornTipDoc: dct("FORNECEDOR", "DOCUMENTO FISCAL"),
    fornTipNf: dct("FORNECEDOR", "TIPO"),
    fornPeriodo: dct("FORNECEDOR", "PERÍODO DE REFERÊNCIA"),
    fornOrdemCompra: dct("FORNECEDOR", "N° ORDEM DE COMPRA"),
    fornObjetosList: multi("FORNECEDOR", "OBJETO"),
    fornContratosList: multi("FORNECEDOR", "CONTRATO"),
    fornModalidadesList: multi("FORNECEDOR", "MODALIDADE"),
    cnpjForn: dct("CNPJ", "FORNECEDOR"),
    modalContrato: dct("MODALIDADE", "CONTRATO"),
    modalContratosList: multi("MODALIDADE", "CONTRATO"),
    objModalidade: dct("OBJETO", "MODALIDADE"),
    objContrato: dct("OBJETO", "CONTRATO"),
    allSecretarios: lst("SECRETARIO"),
    allCnpjs: lst("CNPJ"),
    allContratos: lst("CONTRATO"),
    allObjsHist: lst("OBJETO"),
    allDocFiscais: lst("DOCUMENTO FISCAL"),
    allTiposNf: lst("TIPO"),
    allModalidades: lst("MODALIDADE"),
    allOrgaos: lst("ORGÃO"),
    allFornecedores: lst("FORNECEDOR"),
    orgaoContratosList: multi("ORGÃO", "CONTRATO"),
    orgaoModalidadesList: multi("ORGÃO", "MODALIDADE"),
    orgaoContrato: dct("ORGÃO", "CONTRATO"),
    orgaoModalidade: dct("ORGÃO", "MODALIDADE")
  };
}

function buildMapDataNew(processos) {
  const out = {
    orgaoSecretario: {},
    orgaoContrato: {},
    orgaoModalidade: {},
    fornCnpj: {},
    fornObjeto: {},
    fornModalidade: {},
    fornContrato: {},
    fornNf: {},
    fornTipDoc: {},
    fornTipNf: {},
    fornPeriodo: {},
    fornOrdemCompra: {},
    fornObjetosList: {},
    fornContratosList: {},
    fornModalidadesList: {},
    cnpjForn: {},
    modalContrato: {},
    modalContratosList: {},
    objModalidade: {},
    objContrato: {},
    allSecretarios: new Set(),
    allCnpjs: new Set(),
    allContratos: new Set(),
    allObjsHist: new Set(),
    allDocFiscais: new Set(),
    allTiposNf: new Set(),
    allModalidades: new Set(),
    allOrgaos: new Set(),
    allFornecedores: new Set(),
    orgaoContratosList: {},
    orgaoModalidadesList: {},
  };

  for (let i = 0; i < processos.length; i++) {
    const p = processos[i];
    const orgao = p["ORGÃO"] ? String(p["ORGÃO"]).trim() : "";
    const secretario = p["SECRETARIO"] ? String(p["SECRETARIO"]).trim() : "";
    const contrato = p["CONTRATO"] ? String(p["CONTRATO"]).trim() : "";
    const modalidade = p["MODALIDADE"] ? String(p["MODALIDADE"]).trim() : "";
    const forn = p["FORNECEDOR"] ? String(p["FORNECEDOR"]).trim() : "";
    const cnpj = p["CNPJ"] ? String(p["CNPJ"]).trim() : "";
    const objeto = p["OBJETO"] ? String(p["OBJETO"]).trim() : "";
    const nf = p["Nº"] ? String(p["Nº"]).trim() : "";
    const docFiscal = p["DOCUMENTO FISCAL"] ? String(p["DOCUMENTO FISCAL"]).trim() : "";
    const tipo = p["TIPO"] ? String(p["TIPO"]).trim() : "";
    const periodo = p["PERÍODO DE REFERÊNCIA"] ? String(p["PERÍODO DE REFERÊNCIA"]).trim() : "";
    const ordemCompra = p["N° ORDEM DE COMPRA"] ? String(p["N° ORDEM DE COMPRA"]).trim() : "";

    if (orgao && secretario) out.orgaoSecretario[orgao] = secretario;
    if (orgao && contrato) {
        out.orgaoContrato[orgao] = contrato;
        if (!out.orgaoContratosList[orgao]) out.orgaoContratosList[orgao] = new Set();
        out.orgaoContratosList[orgao].add(contrato);
    }
    if (orgao && modalidade) {
        out.orgaoModalidade[orgao] = modalidade;
        if (!out.orgaoModalidadesList[orgao]) out.orgaoModalidadesList[orgao] = new Set();
        out.orgaoModalidadesList[orgao].add(modalidade);
    }

    if (forn && cnpj) out.fornCnpj[forn] = cnpj;
    if (forn && objeto) {
        out.fornObjeto[forn] = objeto;
        if (!out.fornObjetosList[forn]) out.fornObjetosList[forn] = new Set();
        out.fornObjetosList[forn].add(objeto);
    }
    if (forn && modalidade) {
        out.fornModalidade[forn] = modalidade;
        if (!out.fornModalidadesList[forn]) out.fornModalidadesList[forn] = new Set();
        out.fornModalidadesList[forn].add(modalidade);
    }
    if (forn && contrato) {
        out.fornContrato[forn] = contrato;
        if (!out.fornContratosList[forn]) out.fornContratosList[forn] = new Set();
        out.fornContratosList[forn].add(contrato);
    }
    if (forn && nf) out.fornNf[forn] = nf;
    if (forn && docFiscal) out.fornTipDoc[forn] = docFiscal;
    if (forn && tipo) out.fornTipNf[forn] = tipo;
    if (forn && periodo) out.fornPeriodo[forn] = periodo;
    if (forn && ordemCompra) out.fornOrdemCompra[forn] = ordemCompra;

    if (cnpj && forn) out.cnpjForn[cnpj] = forn;
    if (modalidade && contrato) {
        out.modalContrato[modalidade] = contrato;
        if (!out.modalContratosList[modalidade]) out.modalContratosList[modalidade] = new Set();
        out.modalContratosList[modalidade].add(contrato);
    }
    if (objeto && modalidade) out.objModalidade[objeto] = modalidade;
    if (objeto && contrato) out.objContrato[objeto] = contrato;

    if (secretario) out.allSecretarios.add(secretario);
    if (cnpj) out.allCnpjs.add(cnpj);
    if (contrato) out.allContratos.add(contrato);
    if (objeto) out.allObjsHist.add(objeto);
    if (docFiscal) out.allDocFiscais.add(docFiscal);
    if (tipo) out.allTiposNf.add(tipo);
    if (modalidade) out.allModalidades.add(modalidade);
    if (orgao) out.allOrgaos.add(orgao);
    if (forn) out.allFornecedores.add(forn);
  }

  const toSortedArray = (set) => [...set].sort();
  const multiToSortedArray = (map) => {
    const res = {};
    for (const k in map) res[k] = toSortedArray(map[k]);
    return res;
  };

  out.fornObjetosList = multiToSortedArray(out.fornObjetosList);
  out.fornContratosList = multiToSortedArray(out.fornContratosList);
  out.fornModalidadesList = multiToSortedArray(out.fornModalidadesList);
  out.modalContratosList = multiToSortedArray(out.modalContratosList);
  out.orgaoContratosList = multiToSortedArray(out.orgaoContratosList);
  out.orgaoModalidadesList = multiToSortedArray(out.orgaoModalidadesList);

  out.allSecretarios = toSortedArray(out.allSecretarios);
  out.allCnpjs = toSortedArray(out.allCnpjs);
  out.allContratos = toSortedArray(out.allContratos);
  out.allObjsHist = toSortedArray(out.allObjsHist);
  out.allDocFiscais = toSortedArray(out.allDocFiscais);
  out.allTiposNf = toSortedArray(out.allTiposNf);
  out.allModalidades = toSortedArray(out.allModalidades);
  out.allOrgaos = toSortedArray(out.allOrgaos);
  out.allFornecedores = toSortedArray(out.allFornecedores);

  return out;
}

function runBenchmark(name, fn) {
  const start = performance.now();
  for (let i = 0; i < 50; i++) {
    fn(processos);
  }
  const end = performance.now();
  console.log(`${name}: ${(end - start).toFixed(2)} ms`);
}

// Compare correctness first
const oldResult = buildMapDataOld(processos);
const newResult = buildMapDataNew(processos);

const assert = require('assert');
try {
  assert.deepStrictEqual(oldResult, newResult);
  console.log("Results are identical!");
} catch (e) {
  console.error("Results differ:");
  const diffKeys = Object.keys(oldResult).filter(k => JSON.stringify(oldResult[k]) !== JSON.stringify(newResult[k]));
  console.log("Differing keys:", diffKeys);
}

// Warmup
buildMapDataOld(processos);
buildMapDataNew(processos);

runBenchmark("Old", buildMapDataOld);
runBenchmark("New", buildMapDataNew);
