function parseMonetario(str) {
  if (!str) return 0;
  const s = String(str).replace(/[^\d]/g, "");
  return s ? parseInt(s, 10) / 100 : 0;
}

function formatVal(n) {
  return "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

async function hashSenha(salt, senha) {
  const e = new TextEncoder(),
    b = await crypto.subtle.digest("SHA-256", e.encode(salt + senha));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join("");
}

window.ContratosPage = function ContratosPage({ historico, processos, dark, contratosMeta, setContratosMeta, toast, user, orgaosConfig, salvarOrgaos }) {
  orgaosConfig = orgaosConfig || {};
  const [editingId, setEditingId] = React.useState(null);
  const [isCreatingNew, setIsCreatingNew] = React.useState(false);
  const [editForm, setEditForm] = React.useState({ valorTotal: 0, validade: "", aditivos: 0, cnpj: "" });
  const [filterStatus, setFilterStatus] = React.useState("ativos");
  const [filterOrgao, setFilterOrgao] = React.useState("");
  const [filterModalidade, setFilterModalidade] = React.useState("");
  const [filterVencimento, setFilterVencimento] = React.useState("all");
  const [passwordPrompt, setPasswordPrompt] = React.useState(null);
  const [renewedFromId, setRenewedFromId] = React.useState(null);

  const handleNewContrato = () => {
    setIsCreatingNew(true);
    setEditingId(null);
    setEditForm({
      contratoId: "",
      valorTotal: 0,
      validade: "",
      aditivos: 0,
      valorExecutado: 0,
      saldo: 0,
      objeto: "",
      fornecedor: "",
      cnpj: "",
      orgao: "",
      modalidade: "",
      inativo: false
    });
  };

  const contratosList = React.useMemo(() => {
    const ehPequenas = c => {
      const s = String(c).toUpperCase();
      return s.includes("PEQUENAS COMPRAS") || s.includes("PEQUENA COMPRA") || 
             s.includes("DISPENSA DE PEQUENAS") || s.includes("DISPENSA DE PEQUENA") || 
             s.includes("TERMO DE DISPENSA DE PEQUENAS") || s.includes("TERMO DE DISPENSA DE PEQUENA");
    };
    const map = {};
    const extractContrato = p => {
      const raw = p["CONTRATO"] || p["Contrato"] || p["contrato"] || 
                  p["NUMERO CONTRATO"] || p["N CONTRATO"] || p["Nº CONTRATO"] || 
                  p["CONTRATO N"] || p["NR_CONTRATO"] || p["Nr. Contrato"] || 
                  p["Número do Contrato"] || "";
      return cleanContrato(raw);
    };
    const extractFornecedor = p => {
      return p["FORNECEDOR"] || p["Fornecedor"] || p["CREDOR"] || p["Credor"] || 
             p["EMPRESA"] || p["Empresa"] || p["NM_CREDOR"] || p["Nome do Credor"] || 
             p["Nome Credor"] || p["Razão Social"] || p["Razao Social"] || 
             p["Beneficiário"] || p["Beneficiario"] || p["NOME"] || p["Nome"] || "";
    };
    const extractCnpj = p => {
      return p["CNPJ"] || p["CNPJ/CPF"] || p["CPF/CNPJ"] || p["CPF"] || "";
    };
    const extractOrgao = p => {
      return p["ÓRGÃO"] || p["ORGÃO"] || p["Orgao"] || p["Orgão"] || 
             p["SECRETARIA"] || p["Secretaria"] || p["SECRETARIA ORGAO"] || 
             p["SECRETARIA ÓRGÃO"] || p["UNIDADE"] || p["Unidade"] || 
             p["DEPARTAMENTO"] || p["Departamento"] || "";
    };
    const extractModalidade = p => {
      return p["MODALIDADE"] || p["Modalidade"] || p["TIPO DE CONTRATAÇÃO"] || p["Tipo de Contratação"] || "";
    };

    (historico || []).forEach(p => {
      const c = extractContrato(p);
      if ((c.endsWith("/2025") || c.endsWith("/2026")) && !ehPequenas(c)) {
        if (!map[c]) {
          map[c] = {
            id: c,
            orgao: extractOrgao(p),
            fornecedor: extractFornecedor(p),
            cnpj: extractCnpj(p),
            modalidade: extractModalidade(p),
            objeto: p["OBJETO"] || p["DESCRICAO"] || p["DESCRIÇÃO"] || "",
            valorExecutado: 0,
            has2026Process: false
          };
        } else {
          if (!map[c].fornecedor) map[c].fornecedor = extractFornecedor(p);
          if (!map[c].cnpj) map[c].cnpj = extractCnpj(p);
          if (!map[c].orgao) map[c].orgao = extractOrgao(p);
          if (!map[c].modalidade) map[c].modalidade = extractModalidade(p);
          if (!map[c].objeto) map[c].objeto = p["OBJETO"] || p["DESCRICAO"] || p["DESCRIÇÃO"] || "";
        }
        const dataIso = toISO(p["DATA"] || p["Data"] || "");
        if (dataIso >= "2026-01-01") {
          map[c].valorExecutado += parseMonetario(p["Valor"] || p["VALOR"] || p["Valor Líquido"] || "0");
          map[c].has2026Process = true;
        }
      }
    });

    (processos || []).forEach(p => {
      const c = extractContrato(p);
      if ((c.endsWith("/2025") || c.endsWith("/2026")) && !ehPequenas(c)) {
        if (!map[c]) {
          map[c] = {
            id: c,
            orgao: extractOrgao(p),
            fornecedor: extractFornecedor(p),
            cnpj: extractCnpj(p),
            modalidade: extractModalidade(p),
            objeto: p["OBJETO"] || p["DESCRICAO"] || p["DESCRIÇÃO"] || "",
            valorExecutado: 0,
            has2026Process: false
          };
        } else {
          if (!map[c].fornecedor) map[c].fornecedor = extractFornecedor(p);
          if (!map[c].cnpj) map[c].cnpj = extractCnpj(p);
          if (!map[c].orgao) map[c].orgao = extractOrgao(p);
          if (!map[c].modalidade) map[c].modalidade = extractModalidade(p);
          if (!map[c].objeto) map[c].objeto = p["OBJETO"] || p["DESCRICAO"] || p["DESCRIÇÃO"] || "";
        }
        const dataIso = toISO(p["DATA"] || p["Data"] || p["dataDoc"] || "");
        if (dataIso >= "2026-01-01") {
          map[c].valorExecutado += parseMonetario(p["Valor"] || p["VALOR"] || p["VALOR LÍQUIDO"] || p["Valor Líquido"] || "0");
          map[c].has2026Process = true;
        }
      }
    });

    if (contratosMeta && typeof contratosMeta === 'object') {
      Object.keys(contratosMeta).forEach(k => {
        const c = cleanContrato(k);
        if (c && !ehPequenas(c)) {
          const meta = contratosMeta[k];
          if (!map[c]) {
            map[c] = {
              id: c,
              orgao: meta.orgao || "",
              fornecedor: meta.fornecedor || "",
              cnpj: meta.cnpj || "",
              modalidade: meta.modalidade || "",
              objeto: meta.objeto || "",
              valorExecutado: 0,
              has2026Process: false
            };
          }
        }
      });
    }

    return Object.values(map).map(c => {
      let meta = (contratosMeta && typeof contratosMeta === 'object') ? contratosMeta[c.id] : null;
      if (!meta && contratosMeta && typeof contratosMeta === 'object') {
        const matchingKey = Object.keys(contratosMeta).find(k => cleanContrato(k) === c.id);
        if (matchingKey) {
          meta = contratosMeta[matchingKey];
        }
      }
      meta = meta || { valorTotal: 0, validade: "", aditivos: 0 };
      if (meta.excluido) return null;
      const valorTotal = meta.valorTotal || 0;
      const aditivos = meta.aditivos || 0;
      const validade = meta.validade || "";
      const totalComAditivos = valorTotal + aditivos;
      const valorExecutado = (meta.valorExecutadoManual !== undefined && meta.valorExecutadoManual !== null)
        ? meta.valorExecutadoManual
        : c.valorExecutado;
      const saldo = totalComAditivos - valorExecutado;
      const progresso = totalComAditivos > 0 ? (valorExecutado / totalComAditivos) * 100 : 0;
      const objeto = (meta.objeto && meta.objeto.trim()) ? meta.objeto : (c.objeto || "");
      const fornecedor = (meta.fornecedor && meta.fornecedor.trim()) ? meta.fornecedor : (c.fornecedor || "");
      const cnpj = (meta.cnpj && meta.cnpj.trim()) ? meta.cnpj : (c.cnpj || "");
      const orgao = (meta.orgao && meta.orgao.trim()) ? meta.orgao : (c.orgao || "");
      const modalidade = (meta.modalidade && meta.modalidade.trim()) ? meta.modalidade : (c.modalidade || "");

      let diasRestantes = null;
      let corPrazo = "#22c55e";
      let isExpired = false;
      if (validade) {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        const parts = validade.split("-");
        if (parts.length === 3) {
          const fim = new Date(parts[0], parts[1] - 1, parts[2]);
          const diffTime = fim - hoje;
          diasRestantes = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diasRestantes < 0) {
            isExpired = true;
          }
          if (diasRestantes < 30) corPrazo = "#ef4444";
          else if (diasRestantes < 90) corPrazo = "#f59e0b";
        }
      }

      const limiteAditivo = valorTotal * 0.25;
      const alertaAditivo = aditivos >= limiteAditivo && valorTotal > 0;

      let inativo = false;
      if (isExpired) {
        inativo = true;
      } else if (!c.has2026Process) {
        if (meta && meta.inativo === false && meta.reativadoManual === true) {
          inativo = false;
        } else {
          inativo = true;
        }
      } else {
        if (meta && meta.inativo !== undefined && meta.inativo !== null) {
          inativo = meta.inativo;
        } else {
          inativo = false;
        }
      }

      return {
        ...c, fornecedor, cnpj, orgao, modalidade, objeto, valorExecutado, meta, valorTotal, aditivos, totalComAditivos, saldo, progresso,
        validade, diasRestantes, corPrazo, alertaAditivo, inativo
      };
    }).filter(c => c !== null).sort((a, b) => a.id.localeCompare(b.id));
  }, [historico, processos, contratosMeta]);

  const uniqueOrgaos = React.useMemo(() => {
    const s = new Set();
    contratosList.forEach(c => {
      if (c.orgao) s.add(c.orgao);
    });
    if (orgaosConfig) {
      Object.keys(orgaosConfig).forEach(org => {
        if (orgaosConfig[org] && orgaosConfig[org].ativo !== false) s.add(org);
      });
    }
    return Array.from(s).sort();
  }, [contratosList, orgaosConfig]);

  const uniqueModalidades = React.useMemo(() => {
    const s = new Set();
    contratosList.forEach(c => {
      if (c.modalidade) s.add(c.modalidade);
    });
    return Array.from(s).sort();
  }, [contratosList]);

  const verifyPassword = async (pwd) => {
    if (!user) return false;
    const hash = await hashSenha(user.salt, pwd);
    return hash === user.senha;
  };

  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredList = React.useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return contratosList.filter(c => {
      if (filterStatus === "ativos" && c.inativo) return false;
      if (filterStatus === "inativos" && !c.inativo) return false;
      if (filterOrgao && c.orgao !== filterOrgao) return false;
      if (filterModalidade && c.modalidade !== filterModalidade) return false;
      if (filterVencimento !== "all") {
        if (filterVencimento === "vencidos") {
          if (c.diasRestantes === null || c.diasRestantes >= 0) return false;
        } else if (filterVencimento === "vencer30") {
          if (c.diasRestantes === null || c.diasRestantes < 0 || c.diasRestantes > 30) return false;
        } else if (filterVencimento === "vencer90") {
          if (c.diasRestantes === null || c.diasRestantes < 0 || c.diasRestantes > 90) return false;
        } else if (filterVencimento === "vigentes") {
          if (c.diasRestantes !== null && c.diasRestantes < 0) return false;
        }
      }
      if (!q) return true;
      return (
        String(c.id).toLowerCase().includes(q) ||
        String(c.fornecedor).toLowerCase().includes(q) ||
        String(c.cnpj).toLowerCase().includes(q) ||
        String(c.orgao).toLowerCase().includes(q) ||
        String(c.objeto).toLowerCase().includes(q) ||
        String(c.modalidade).toLowerCase().includes(q)
      );
    });
  }, [contratosList, filterStatus, filterOrgao, filterModalidade, filterVencimento, searchQuery]);

  const handleEdit = (c) => {
    setIsCreatingNew(false);
    setEditingId(c.id);
    setEditForm({
      contratoId: c.id,
      valorTotal: c.valorTotal || 0,
      validade: c.validade || "",
      aditivos: c.aditivos || 0,
      valorExecutado: c.valorExecutado || 0,
      saldo: c.saldo || 0,
      objeto: c.objeto || "",
      fornecedor: c.fornecedor || "",
      cnpj: c.cnpj || "",
      orgao: c.orgao || "",
      modalidade: c.modalidade || "",
      inativo: c.inativo || false
    });
  };

  const updateForm = (field, val) => {
    const numeric = parseFloat(val) || 0;
    setEditForm(prev => {
      const form = { ...prev, [field]: val };
      const vTotal = parseFloat(field === "valorTotal" ? val : prev.valorTotal) || 0;
      const adit = parseFloat(field === "aditivos" ? val : prev.aditivos) || 0;
      const total = vTotal + adit;
      
      if (field === "valorTotal" || field === "aditivos") {
        const exec = parseFloat(prev.valorExecutado) || 0;
        form.saldo = total - exec;
      } else if (field === "valorExecutado") {
        form.saldo = total - numeric;
      } else if (field === "saldo") {
        form.valorExecutado = total - numeric;
      }
      return form;
    });
  };

  const handleSave = async () => {
    const targetId = isCreatingNew ? cleanContrato(editForm.contratoId) : editingId;
    if (!targetId) {
      if (toast) toast("⚠️ Por favor, informe o número do contrato.", "error");
      else alert("Por favor, informe o número do contrato.");
      return;
    }
    const ehPequenas = c => {
      const s = String(c).toUpperCase();
      return s.includes("PEQUENAS COMPRAS") || s.includes("PEQUENA COMPRA") || 
             s.includes("DISPENSA DE PEQUENAS") || s.includes("DISPENSA DE PEQUENA") || 
             s.includes("TERMO DE DISPENSA DE PEQUENAS") || s.includes("TERMO DE DISPENSA DE PEQUENA");
    };
    if (ehPequenas(targetId)) {
      if (toast) toast("⚠️ Contratos do tipo pequenas compras não devem ser cadastrados aqui.", "error");
      else alert("Contratos do tipo pequenas compras não devem ser cadastrados aqui.");
      return;
    }
    if (editForm.cnpj && window.validarCnpjCpf && !window.validarCnpjCpf(editForm.cnpj)) {
      if (toast) toast("⚠️ CNPJ/CPF inválido. Verifique os dígitos.", "error");
      else alert("CNPJ/CPF inválido.");
      return;
    }
    const newMeta = {
      ...contratosMeta,
      [targetId]: {
        valorTotal: parseFloat(editForm.valorTotal) || 0,
        validade: editForm.validade,
        aditivos: parseFloat(editForm.aditivos) || 0,
        valorExecutadoManual: parseFloat(editForm.valorExecutado),
        objeto: editForm.objeto || "",
        fornecedor: editForm.fornecedor || "",
        cnpj: editForm.cnpj || "",
        orgao: editForm.orgao || "",
        modalidade: editForm.modalidade || "",
        inativo: editForm.inativo || false,
        reativadoManual: !editForm.inativo
      }
    };
    if (renewedFromId && newMeta[renewedFromId]) {
      newMeta[renewedFromId] = {
        ...newMeta[renewedFromId],
        inativo: true
      };
    }
    setContratosMeta(newMeta);
    await window.ST.set("contratos_meta", newMeta);

    if (editForm.orgao && salvarOrgaos && (!orgaosConfig || !orgaosConfig[editForm.orgao])) {
      const novOrgConfig = { ...(orgaosConfig || {}), [editForm.orgao]: { ativo: true } };
      salvarOrgaos(novOrgConfig);
    }

    setEditingId(null);
    setIsCreatingNew(false);
    setRenewedFromId(null);
    if (toast) toast(isCreatingNew ? "✅ Contrato cadastrado com sucesso!" : "✅ Contrato atualizado com sucesso!", "success");
  };

  const performToggleInativo = async (c, nextInativo) => {
    let meta = (contratosMeta && typeof contratosMeta === 'object') ? contratosMeta[c.id] : null;
    if (!meta && contratosMeta && typeof contratosMeta === 'object') {
      const matchingKey = Object.keys(contratosMeta).find(k => cleanContrato(k) === c.id);
      if (matchingKey) {
        meta = contratosMeta[matchingKey];
      }
    }
    meta = meta || {
      valorTotal: c.valorTotal || 0,
      validade: c.validade || "",
      aditivos: c.aditivos || 0,
      valorExecutadoManual: c.valorExecutadoManual !== undefined ? c.valorExecutadoManual : null,
      objeto: c.objeto || "",
      fornecedor: c.fornecedor || "",
      cnpj: c.cnpj || "",
      orgao: c.orgao || "",
      modalidade: c.modalidade || ""
    };
    const newMeta = {
      ...contratosMeta,
      [c.id]: {
        ...meta,
        inativo: nextInativo,
        reativadoManual: !nextInativo
      }
    };
    setContratosMeta(newMeta);
    await window.ST.set("contratos_meta", newMeta);
    if (toast) {
      toast(nextInativo ? `🚫 Contrato ${c.id} inativado!` : `✅ Contrato ${c.id} reativado!`, "success");
    }
  };

  const handleToggleInativo = async (c) => {
    const nextInativo = !c.inativo;
    if (nextInativo) {
      setPasswordPrompt({
        title: "Confirmar Inativação",
        onConfirm: async (pwd) => {
          const isValid = await verifyPassword(pwd);
          if (isValid) {
            await performToggleInativo(c, true);
            setPasswordPrompt(null);
          } else {
            if (toast) toast("❌ Senha incorreta!", "error");
            else alert("Senha incorreta!");
          }
        }
      });
    } else {
      if (c.diasRestantes !== null && c.diasRestantes < 0) {
        if (toast) toast("⚠️ Este contrato está vencido e não pode ser reativado sem alterar a data de validade.", "error");
        else alert("Este contrato está vencido e não pode ser reativado sem alterar a data de validade.");
        return;
      }
      await performToggleInativo(c, false);
    }
  };

  const performDeleteContrato = async (c) => {
    let meta = (contratosMeta && typeof contratosMeta === 'object') ? contratosMeta[c.id] : null;
    if (!meta && contratosMeta && typeof contratosMeta === 'object') {
      const matchingKey = Object.keys(contratosMeta).find(k => cleanContrato(k) === c.id);
      if (matchingKey) {
        meta = contratosMeta[matchingKey];
      }
    }
    meta = meta || {
      valorTotal: c.valorTotal || 0,
      validade: c.validade || "",
      aditivos: c.aditivos || 0,
      valorExecutadoManual: c.valorExecutadoManual !== undefined ? c.valorExecutadoManual : null,
      objeto: c.objeto || "",
      fornecedor: c.fornecedor || "",
      cnpj: c.cnpj || "",
      orgao: c.orgao || "",
      modalidade: c.modalidade || ""
    };
    const newMeta = {
      ...contratosMeta,
      [c.id]: {
        ...meta,
        excluido: true
      }
    };
    setContratosMeta(newMeta);
    await window.ST.set("contratos_meta", newMeta);
    if (toast) toast(`🗑️ Contrato ${c.id} excluído com sucesso!`, "success");
  };

  const handleDeleteContrato = async (c) => {
    if (user?.perfil !== "admin") {
      if (toast) toast("⚠️ Apenas administradores podem excluir contratos.", "error");
      else alert("Apenas administradores podem excluir contratos.");
      return;
    }
    setPasswordPrompt({
      title: `Excluir Contrato: ${c.id}`,
      onConfirm: async (pwd) => {
        const isValid = await verifyPassword(pwd);
        if (isValid) {
          await performDeleteContrato(c);
          setPasswordPrompt(null);
        } else {
          if (toast) toast("❌ Senha incorreta!", "error");
          else alert("Senha incorreta!");
        }
      }
    });
  };

  const getRenewedContratoId = (oldId) => {
    if (!oldId) return "";
    const s = String(oldId).trim();
    const match = s.match(/^(\d+)º\s*(?:termo\s+aditivo\s+(?:de|ao)\s+contrato)\s+(.+)$/i);
    if (match) {
      const num = parseInt(match[1], 10) + 1;
      const base = match[2].trim();
      return `${num}º termo aditivo de contrato ${base}`;
    }
    return `1º termo aditivo de contrato ${s}`;
  };

  const handleRenewContrato = async (c) => {
    if (user?.perfil !== "admin") {
      if (toast) toast("⚠️ Apenas administradores podem renovar contratos.", "error");
      else alert("Apenas administradores podem renovar contratos.");
      return;
    }
    setPasswordPrompt({
      title: `Renovar Contrato: ${c.id}`,
      onConfirm: async (pwd) => {
        const isValid = await verifyPassword(pwd);
        if (isValid) {
          setPasswordPrompt(null);
          let newValidade = "";
          if (c.validade) {
            const parts = c.validade.split("-");
            if (parts.length === 3) {
              newValidade = `${parseInt(parts[0], 10) + 1}-${parts[1]}-${parts[2]}`;
            }
          }
          const nextId = getRenewedContratoId(c.id);
          setRenewedFromId(c.id);
          setIsCreatingNew(true);
          setEditingId(null);
          setEditForm({
            contratoId: nextId,
            fornecedor: c.fornecedor || "",
            cnpj: c.cnpj || "",
            orgao: c.orgao || "",
            modalidade: c.modalidade || "",
            objeto: c.objeto || "",
            valorTotal: c.valorTotal || 0,
            aditivos: 0,
            valorExecutado: 0,
            saldo: c.valorTotal || 0,
            validade: newValidade,
            inativo: false
          });
        } else {
          if (toast) toast("❌ Senha incorreta!", "error");
          else alert("Senha incorreta!");
        }
      }
    });
  };

  const handleGerarRelatorio = async () => {
    try {
      const { jsPDF } = await window.loadJsPDF();
      const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const W = 297, H = 210;
      const ML = 15;
      
      doc.setFillColor(10, 40, 100);
      doc.rect(0, 0, W, 22, "F");
      try { doc.addImage(window.BRASAO_B64, "PNG", ML, 2.5, 16, 17); } catch(e) {}
      doc.setFont("helvetica", "bold"); doc.setFontSize(10.5); doc.setTextColor(255, 255, 255);
      doc.text("ESTADO DO MARANHÃO", ML + 20, 7.5);
      doc.text("PREFEITURA MUNICIPAL DE JOÃO LISBOA", ML + 20, 12.5);
      doc.setFontSize(9);
      doc.text("CONTROLADORIA GERAL DO MUNICÍPIO - CGM", ML + 20, 17.5);
      
      let y = 22 + 8;
      doc.setFont("helvetica", "bold"); doc.setFontSize(12); doc.setTextColor(10, 40, 100);
      doc.text("RELATÓRIO DE GESTÃO DE CONTRATOS", W / 2, y, { align: "center" });
      y += 5;
      
      let filtroInfo = `Total de registros: ${filteredList.length}`;
      if (searchQuery) filtroInfo += ` | Busca: "${searchQuery}"`;
      if (filterStatus === "ativos") filtroInfo += ` | Apenas Ativos`;
      else if (filterStatus === "inativos") filtroInfo += ` | Apenas Inativos`;
      else filtroInfo += ` | Todos (Ativos/Inativos)`;
      
      if (filterOrgao) filtroInfo += ` | Órgão: ${filterOrgao}`;
      if (filterModalidade) filtroInfo += ` | Modalidade: ${filterModalidade}`;
      if (filterVencimento !== "all") {
        if (filterVencimento === "vigentes") filtroInfo += ` | Vigentes`;
        else if (filterVencimento === "vencidos") filtroInfo += ` | Vencidos`;
        else if (filterVencimento === "vencer30") filtroInfo += ` | Vence em 30 dias`;
        else if (filterVencimento === "vencer90") filtroInfo += ` | Vence em 90 dias`;
      }
      
      doc.setFont("helvetica", "normal"); doc.setFontSize(8.5); doc.setTextColor(80, 80, 80);
      doc.text(filtroInfo, W / 2, y, { align: "center" });
      y += 8;
      
      const cols = [
        { title: "CONTRATO", w: 25 },
        { title: "EMPRESA (FORNECEDOR)", w: 68 },
        { title: "ÓRGÃO", w: 48 },
        { title: "MODALIDADE", w: 32 },
        { title: "VALIDADE", w: 22 },
        { title: "VALOR TOTAL", w: 25, align: "right" },
        { title: "EXECUTADO", w: 25, align: "right" },
        { title: "SALDO", w: 23, align: "right" }
      ];
      
      doc.setFillColor(10, 40, 100);
      doc.rect(ML, y, W - 2*ML, 8, "F");
      doc.setFont("helvetica", "bold"); doc.setFontSize(7.5); doc.setTextColor(255, 255, 255);
      let curX = ML;
      cols.forEach(col => {
        const textX = col.align === "right" ? curX + col.w - 2 : curX + 2;
        doc.text(col.title, textX, y + 5.5, { align: col.align || "left" });
        curX += col.w;
      });
      y += 8;
      
      doc.setFont("helvetica", "normal"); doc.setFontSize(7);
      filteredList.forEach((c, idx) => {
        const fLines = doc.splitTextToSize(c.fornecedor || "—", cols[1].w - 3);
        const oLines = doc.splitTextToSize(c.orgao || "—", cols[2].w - 3);
        const numLines = Math.max(fLines.length, oLines.length, 1);
        const rowH = numLines * 4.2 + 2;
        
        if (y + rowH > H - 15) {
          doc.addPage();
          y = 22 + 8;
          doc.setFillColor(10, 40, 100);
          doc.rect(ML, y, W - 2*ML, 8, "F");
          doc.setFont("helvetica", "bold"); doc.setFontSize(7.5); doc.setTextColor(255, 255, 255);
          let curX2 = ML;
          cols.forEach(col => {
            const textX = col.align === "right" ? curX2 + col.w - 2 : curX2 + 2;
            doc.text(col.title, textX, y + 5.5, { align: col.align || "left" });
            curX2 += col.w;
          });
          y += 8;
          doc.setFont("helvetica", "normal"); doc.setFontSize(7);
        }
        
        doc.setFillColor(idx % 2 === 0 ? 245 : 255, idx % 2 === 0 ? 248 : 255, idx % 2 === 0 ? 255 : 255);
        doc.rect(ML, y, W - 2*ML, rowH, "F");
        
        doc.setDrawColor(210, 220, 235); doc.setLineWidth(0.1);
        doc.rect(ML, y, W - 2*ML, rowH, "S");
        
        let cx = ML;
        doc.setFont("helvetica", "bold"); doc.setTextColor(c.inativo ? 180 : 10, c.inativo ? 0 : 40, c.inativo ? 0 : 100);
        doc.text(c.id + (c.inativo ? " (INAT)" : ""), cx + 2, y + 4.2);
        cx += cols[0].w;
        
        doc.setFont("helvetica", "normal"); doc.setTextColor(40, 40, 40);
        fLines.forEach((line, li) => {
          doc.text(line, cx + 2, y + 4.2 + li * 4);
        });
        cx += cols[1].w;
        
        oLines.forEach((line, li) => {
          doc.text(line, cx + 2, y + 4.2 + li * 4);
        });
        cx += cols[2].w;
        
        const mText = c.modalidade || "—";
        const mLines = doc.splitTextToSize(mText, cols[3].w - 3);
        mLines.forEach((line, li) => {
          doc.text(line, cx + 2, y + 4.2 + li * 4);
        });
        cx += cols[3].w;

        const vText = c.validade ? c.validade.split("-").reverse().join("/") : "—";
        doc.text(vText, cx + 2, y + 4.2);
        cx += cols[4].w;
        
        doc.setFont("helvetica", "bold");
        const valTotalStr = formatVal(c.valorTotal).replace("R$", "").trim();
        const valExecStr = formatVal(c.valorExecutado).replace("R$", "").trim();
        const valSaldoStr = formatVal(c.saldo).replace("R$", "").trim();
        
        doc.text(valTotalStr, cx + cols[5].w - 2, y + 4.2, { align: "right" });
        cx += cols[5].w;

        doc.setFont("helvetica", "normal");
        doc.text(valExecStr, cx + cols[6].w - 2, y + 4.2, { align: "right" });
        cx += cols[6].w;
        
        doc.setFont("helvetica", "bold");
        if (c.saldo <= 0) doc.setTextColor(180, 0, 0);
        else doc.setTextColor(0, 100, 0);
        doc.text(valSaldoStr, cx + cols[7].w - 2, y + 4.2, { align: "right" });
        
        y += rowH;
      });
      
      const totalPgs = doc.internal.getNumberOfPages();
      for (let pg = 1; pg <= totalPgs; pg++) {
        doc.setPage(pg);
        doc.setFillColor(10, 40, 100);
        doc.rect(0, H - 10, W, 10, "F");
        doc.setFont("helvetica", "normal"); doc.setFontSize(7.5); doc.setTextColor(255, 255, 255);
        doc.text("Sistema de Controle de Processos de Pagamento — Prefeitura Municipal de João Lisboa", W / 2, H - 4, { align: "center" });
        doc.text(`Página ${pg} de ${totalPgs}`, W - ML - 5, H - 4, { align: "right" });
      }
      
      doc.save(`RELATORIO_CONTRATOS_${new Date().toISOString().slice(0,10)}.pdf`);
      if (toast) toast("✅ Relatório de contratos gerado com sucesso!", "success");
    } catch(err) {
      if (toast) toast(`❌ Erro ao gerar relatório: ${err.message}`, "error");
      console.error(err);
    }
  };

  const totalContratos = contratosList.length;
  const totalAtivos = contratosList.filter(c => !c.inativo).length;
  const totalInativos = contratosList.filter(c => c.inativo).length;

  return React.createElement("div", {
    style: {
      padding: 24,
      background: dark ? "#1e293b" : "#f8fafc",
      minHeight: "100vh",
      color: dark ? "#f8fafc" : "#0f172a"
    }
  }, 
    React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
        flexWrap: "wrap",
        gap: 16
      }
    },
      React.createElement("h2", { style: { margin: 0, fontSize: 26, fontWeight: 800 } }, "🤝 Gestão de Contratos"),
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
        React.createElement("button", {
          onClick: handleGerarRelatorio,
          style: {
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            background: "#0284c7",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6
          }
        }, "📊 Gerar Relatório"),
        React.createElement("button", {
          onClick: handleNewContrato,
          style: {
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            background: "#006000",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6
          }
        }, "➕ Novo Contrato")
      )
    ),

    React.createElement("div", { style: { marginBottom: 24 } },
      React.createElement("input", {
        type: "text",
        value: searchQuery,
        onChange: e => setSearchQuery(e.target.value),
        placeholder: "🔍 Pesquisar por número, fornecedor, órgão, modalidade ou objeto...",
        style: {
          width: "100%",
          padding: "10px 16px",
          borderRadius: 8,
          border: dark ? "1px solid #475569" : "1px solid #cbd5e1",
          background: dark ? "#334155" : "#fff",
          color: dark ? "#fff" : "#000",
          fontSize: 14,
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          outline: "none"
        }
      })
    ),

    React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
        marginBottom: 24,
        background: dark ? "#334155" : "#f1f5f9",
        padding: 16,
        borderRadius: 8,
        border: dark ? "1px solid #475569" : "1px solid #e2e8f0"
      }
    },
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 4, minWidth: 140 } },
        React.createElement("label", { style: { fontSize: 11, fontWeight: 700, opacity: 0.8 } }, "Status:"),
        React.createElement("select", {
          value: filterStatus,
          onChange: e => setFilterStatus(e.target.value),
          style: {
            padding: 8, borderRadius: 6,
            border: dark ? "1px solid #475569" : "1px solid #cbd5e1",
            background: dark ? "#1e293b" : "#fff",
            color: dark ? "#fff" : "#000",
            fontSize: 13, outline: "none"
          }
        },
          React.createElement("option", { value: "all" }, "Todos os Contratos"),
          React.createElement("option", { value: "ativos" }, "Apenas Ativos"),
          React.createElement("option", { value: "inativos" }, "Apenas Inativos")
        )
      ),
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 4, minWidth: 160, flex: 1 } },
        React.createElement("label", { style: { fontSize: 11, fontWeight: 700, opacity: 0.8 } }, "Órgão / Secretaria:"),
        React.createElement("select", {
          value: filterOrgao,
          onChange: e => setFilterOrgao(e.target.value),
          style: {
            padding: 8, borderRadius: 6,
            border: dark ? "1px solid #475569" : "1px solid #cbd5e1",
            background: dark ? "#1e293b" : "#fff",
            color: dark ? "#fff" : "#000",
            fontSize: 13, outline: "none"
          }
        },
          React.createElement("option", { value: "" }, "Todos os Órgãos"),
          uniqueOrgaos.map(org => React.createElement("option", { key: org, value: org }, org))
        )
      ),
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 4, minWidth: 160, flex: 1 } },
        React.createElement("label", { style: { fontSize: 11, fontWeight: 700, opacity: 0.8 } }, "Modalidade:"),
        React.createElement("select", {
          value: filterModalidade,
          onChange: e => setFilterModalidade(e.target.value),
          style: {
            padding: 8, borderRadius: 6,
            border: dark ? "1px solid #475569" : "1px solid #cbd5e1",
            background: dark ? "#1e293b" : "#fff",
            color: dark ? "#fff" : "#000",
            fontSize: 13, outline: "none"
          }
        },
          React.createElement("option", { value: "" }, "Todas as Modalidades"),
          uniqueModalidades.map(mod => React.createElement("option", { key: mod, value: mod }, mod))
        )
      ),
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 4, minWidth: 160 } },
        React.createElement("label", { style: { fontSize: 11, fontWeight: 700, opacity: 0.8 } }, "Prazo de Vigência:"),
        React.createElement("select", {
          value: filterVencimento,
          onChange: e => setFilterVencimento(e.target.value),
          style: {
            padding: 8, borderRadius: 6,
            border: dark ? "1px solid #475569" : "1px solid #cbd5e1",
            background: dark ? "#1e293b" : "#fff",
            color: dark ? "#fff" : "#000",
            fontSize: 13, outline: "none"
          }
        },
          React.createElement("option", { value: "all" }, "Todos os Prazos"),
          React.createElement("option", { value: "vigentes" }, "Apenas Vigentes"),
          React.createElement("option", { value: "vencidos" }, "Apenas Vencidos"),
          React.createElement("option", { value: "vencer30" }, "Vence em até 30 dias"),
          React.createElement("option", { value: "vencer90" }, "Vence em até 90 dias")
        )
      ),
      React.createElement("button", {
        onClick: () => {
          setFilterStatus("ativos");
          setFilterOrgao("");
          setFilterModalidade("");
          setFilterVencimento("all");
          setSearchQuery("");
        },
        style: {
          alignSelf: "flex-end",
          padding: "8px 12px",
          borderRadius: 6,
          border: "none",
          background: dark ? "#475569" : "#cbd5e1",
          color: dark ? "#fff" : "#334155",
          fontSize: 13,
          fontWeight: "bold",
          cursor: "pointer"
        }
      }, "🧹 Limpar Filtros")
    ),

    React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 16,
        marginBottom: 24
      }
    },
      [
        { label: "📋 Total de Contratos", val: totalContratos, color: dark ? "#38bdf8" : "#0284c7" },
        { label: "🟢 Contratos Ativos", val: totalAtivos, color: "#22c55e" },
        { label: "🚫 Contratos Inativos", val: totalInativos, color: "#ef4444" }
      ].map((st, idx) => 
        React.createElement("div", {
          key: idx,
          className: "contrato-card",
          style: {
            background: dark ? "#334155" : "#fff",
            padding: "16px 20px",
            borderRadius: 12,
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
            borderLeft: `5px solid ${st.color}`,
            display: "flex",
            flexDirection: "column",
            gap: 6
          }
        },
          React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: dark ? "#94a3b8" : "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" } }, st.label),
          React.createElement("span", { style: { fontSize: 24, fontWeight: 800, color: st.color } }, st.val)
        )
      )
    ),
    
    (editingId || isCreatingNew) && React.createElement("div", {
      style: {
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999
      }
    }, React.createElement("div", {
      style: {
        background: dark ? "#334155" : "#fff", padding: 24, borderRadius: 12, width: 420,
        maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
      }
    },
      React.createElement("h3", { style: { marginBottom: 15 } }, isCreatingNew ? "Cadastrar Novo Contrato" : `Editar Contrato: ${editingId}`),
      isCreatingNew && React.createElement("label", { style: { display: "block", marginBottom: 10 } },
        "Número do Contrato (ex: 002/2026):",
        React.createElement("input", {
          type: "text",
          value: editForm.contratoId || "",
          onChange: e => setEditForm(prev => ({ ...prev, contratoId: e.target.value })),
          placeholder: "Ex: 002/2026",
          style: { width: "100%", padding: 8, marginTop: 4, borderRadius: 6, border: "1px solid #ccc", background: dark ? "#1e293b" : "#fff", color: dark ? "#fff" : "#000" }
        })
      ),
      React.createElement("label", { style: { display: "block", marginBottom: 10 } },
        "Empresa (Fornecedor):",
        React.createElement("input", {
          type: "text",
          value: editForm.fornecedor || "",
          onChange: e => setEditForm(prev => ({ ...prev, fornecedor: e.target.value })),
          style: { width: "100%", padding: 8, marginTop: 4, borderRadius: 6, border: "1px solid #ccc", background: dark ? "#1e293b" : "#fff", color: dark ? "#fff" : "#000" }
        })
      ),
      React.createElement("label", { style: { display: "block", marginBottom: 10 } },
        "CNPJ do Fornecedor:",
        React.createElement("input", {
          type: "text",
          value: editForm.cnpj || "",
          onChange: e => setEditForm(prev => ({ ...prev, cnpj: window.mascararCnpjCpf ? window.mascararCnpjCpf(e.target.value) : e.target.value })),
          style: { width: "100%", padding: 8, marginTop: 4, borderRadius: 6, border: "1px solid #ccc", background: dark ? "#1e293b" : "#fff", color: dark ? "#fff" : "#000" }
        })
      ),
      React.createElement("label", { style: { display: "block", marginBottom: 10 } },
        "Órgão / Secretaria:",
        React.createElement("input", {
          type: "text",
          list: "lista-orgaos-contrato",
          value: editForm.orgao || "",
          onChange: e => setEditForm(prev => ({ ...prev, orgao: e.target.value })),
          style: { width: "100%", padding: 8, marginTop: 4, borderRadius: 6, border: "1px solid #ccc", background: dark ? "#1e293b" : "#fff", color: dark ? "#fff" : "#000" }
        }),
        React.createElement("datalist", { id: "lista-orgaos-contrato" },
          uniqueOrgaos.map(org => React.createElement("option", { key: org, value: org }))
        )
      ),
      React.createElement("label", { style: { display: "block", marginBottom: 10 } },
        "Modalidade:",
        React.createElement("input", {
          type: "text",
          value: editForm.modalidade || "",
          onChange: e => setEditForm(prev => ({ ...prev, modalidade: e.target.value })),
          placeholder: "Ex: Pregão Eletrônico",
          style: { width: "100%", padding: 8, marginTop: 4, borderRadius: 6, border: "1px solid #ccc", background: dark ? "#1e293b" : "#fff", color: dark ? "#fff" : "#000" }
        })
      ),
      React.createElement("label", { style: { display: "block", marginBottom: 10 } },
        "Valor Total Original (R$):",
        React.createElement("input", {
          type: "number", step: "0.01",
          value: editForm.valorTotal,
          onChange: e => updateForm("valorTotal", e.target.value),
          style: { width: "100%", padding: 8, marginTop: 4, borderRadius: 6, border: "1px solid #ccc", background: dark ? "#1e293b" : "#fff", color: dark ? "#fff" : "#000" }
        })
      ),
      React.createElement("label", { style: { display: "block", marginBottom: 10 } },
        "Aditivos (R$):",
        React.createElement("input", {
          type: "number", step: "0.01",
          value: editForm.aditivos,
          onChange: e => updateForm("aditivos", e.target.value),
          style: { width: "100%", padding: 8, marginTop: 4, borderRadius: 6, border: "1px solid #ccc", background: dark ? "#1e293b" : "#fff", color: dark ? "#fff" : "#000" }
        })
      ),
      React.createElement("label", { style: { display: "block", marginBottom: 10 } },
        "Valor Executado (R$):",
        React.createElement("input", {
          type: "number", step: "0.01",
          value: editForm.valorExecutado,
          onChange: e => updateForm("valorExecutado", e.target.value),
          style: { width: "100%", padding: 8, marginTop: 4, borderRadius: 6, border: "1px solid #ccc", background: dark ? "#1e293b" : "#fff", color: dark ? "#fff" : "#000" }
        })
      ),
      React.createElement("label", { style: { display: "block", marginBottom: 10 } },
        "Saldo Restante (R$):",
        React.createElement("input", {
          type: "number", step: "0.01",
          value: editForm.saldo,
          onChange: e => updateForm("saldo", e.target.value),
          style: { width: "100%", padding: 8, marginTop: 4, borderRadius: 6, border: "1px solid #ccc", background: dark ? "#1e293b" : "#fff", color: dark ? "#fff" : "#000" }
        })
      ),
      React.createElement("label", { style: { display: "block", marginBottom: 10 } },
        "Validade (Fim da Vigência):",
        React.createElement("input", {
          type: "date",
          value: editForm.validade,
          onChange: e => setEditForm(prev => ({ ...prev, validade: e.target.value })),
          style: { width: "100%", padding: 8, marginTop: 4, borderRadius: 6, border: "1px solid #ccc", background: dark ? "#1e293b" : "#fff", color: dark ? "#fff" : "#000" }
        })
      ),
      React.createElement("label", { style: { display: "block", marginBottom: 15 } },
        "Objeto do Contrato:",
        React.createElement("textarea", {
          value: editForm.objeto || "",
          onChange: e => setEditForm(prev => ({ ...prev, objeto: e.target.value })),
          rows: 3,
          style: { width: "100%", padding: 8, marginTop: 4, borderRadius: 6, border: "1px solid #ccc", background: dark ? "#1e293b" : "#fff", color: dark ? "#fff" : "#000", fontFamily: "inherit", fontSize: 13, resize: "vertical" }
        })
      ),
      React.createElement("label", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 15, cursor: "pointer", fontWeight: 600, color: "#ef4444", fontSize: 13 } },
        React.createElement("input", {
          type: "checkbox",
          checked: editForm.inativo || false,
          onChange: e => setEditForm(prev => ({ ...prev, inativo: e.target.checked })),
          style: { width: 16, height: 16, accentColor: "#ef4444" }
        }),
        "Marcar como INATIVO"
      ),
      React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } },
        React.createElement("button", {
          onClick: () => {
            setEditingId(null);
            setIsCreatingNew(false);
            setRenewedFromId(null);
          },
          style: { padding: "8px 16px", borderRadius: 6, border: "none", background: dark ? "#475569" : "#cbd5e1", color: dark ? "#fff" : "#334155", fontWeight: "bold", cursor: "pointer" }
        }, "Cancelar"),
        React.createElement("button", {
          onClick: handleSave,
          style: { padding: "8px 16px", borderRadius: 6, border: "none", background: "#006000", color: "#fff", fontWeight: "bold", cursor: "pointer" }
        }, "Salvar")
      )
    )),

    passwordPrompt && React.createElement("div", {
      style: {
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
      }
    }, React.createElement("div", {
      style: {
        background: dark ? "#334155" : "#fff", padding: 24, borderRadius: 12, width: 320,
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
      }
    },
      React.createElement("h4", { style: { marginBottom: 10, marginTop: 0 } }, passwordPrompt.title),
      React.createElement("p", { style: { fontSize: 13, marginBottom: 15, opacity: 0.8 } }, "Digite sua senha para confirmar esta ação:"),
      React.createElement("input", {
        type: "password",
        autoFocus: true,
        placeholder: "Sua senha...",
        onKeyDown: e => {
          if (e.key === "Enter") passwordPrompt.onConfirm(e.target.value);
          if (e.key === "Escape") setPasswordPrompt(null);
        },
        style: { width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", background: dark ? "#1e293b" : "#fff", color: dark ? "#fff" : "#000", marginBottom: 15 }
      }),
      React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } },
        React.createElement("button", {
          onClick: () => setPasswordPrompt(null),
          style: { padding: "6px 12px", borderRadius: 6, border: "none", background: dark ? "#475569" : "#cbd5e1", color: dark ? "#fff" : "#334155", fontWeight: "bold", cursor: "pointer" }
        }, "Cancelar"),
        React.createElement("button", {
          onClick: e => passwordPrompt.onConfirm(e.target.previousElementSibling.previousElementSibling.value),
          style: { padding: "6px 12px", borderRadius: 6, border: "none", background: "#dc2626", color: "#fff", fontWeight: "bold", cursor: "pointer" }
        }, "Confirmar")
      )
    )),

    React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: 16
      }
    },
      filteredList.length === 0 ? React.createElement("div", { style: { gridColumn: "1 / -1", textAlign: "center", padding: 40, opacity: 0.6 } }, "Nenhum contrato encontrado.") : null,
      filteredList.map(c => React.createElement("div", {
        key: c.id,
        style: {
          background: dark ? "#1e293b" : "#fff",
          border: dark ? "1px solid #334155" : "1px solid #e2e8f0",
          borderRadius: 12,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          position: "relative",
          opacity: c.inativo ? 0.65 : 1,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          transition: "all 0.2s"
        }
      },
        c.inativo && React.createElement("div", {
          style: { position: "absolute", top: -8, right: -8, background: "#ef4444", color: "#fff", padding: "4px 8px", borderRadius: "8px", fontSize: 10, fontWeight: "bold", boxShadow: "0 2px 4px rgba(239,68,68,0.3)" }
        }, "INATIVO"),
        
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" } },
          React.createElement("div", null,
            React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: dark ? "#94a3b8" : "#64748b", textTransform: "uppercase" } }, c.modalidade || "Contrato"),
            React.createElement("div", { style: { fontSize: 18, fontWeight: 800, color: dark ? "#e2e8f0" : "#0f172a", marginTop: 2 } }, c.id)
          ),
          React.createElement("div", { style: { display: "flex", gap: 4 } },
            React.createElement("button", {
              onClick: () => handleEdit(c),
              title: "Editar Contrato",
              style: { padding: 6, borderRadius: 6, border: "none", background: dark ? "#334155" : "#f1f5f9", color: dark ? "#94a3b8" : "#64748b", cursor: "pointer" }
            }, "✏️"),
            React.createElement("button", {
              onClick: () => handleToggleInativo(c),
              title: c.inativo ? "Reativar Contrato" : "Inativar Contrato",
              style: { padding: 6, borderRadius: 6, border: "none", background: dark ? "#334155" : "#f1f5f9", color: dark ? "#94a3b8" : "#64748b", cursor: "pointer" }
            }, c.inativo ? "✅" : "🚫"),
            user?.perfil === "admin" && React.createElement("button", {
              onClick: () => handleRenewContrato(c),
              title: "Renovar (Criar Aditivo)",
              style: { padding: 6, borderRadius: 6, border: "none", background: dark ? "#334155" : "#f1f5f9", color: "#0284c7", cursor: "pointer" }
            }, "🔄"),
            user?.perfil === "admin" && React.createElement("button", {
              onClick: () => handleDeleteContrato(c),
              title: "Excluir Contrato",
              style: { padding: 6, borderRadius: 6, border: "none", background: dark ? "#334155" : "#f1f5f9", color: "#ef4444", cursor: "pointer" }
            }, "🗑️")
          )
        ),
        
        React.createElement("div", { style: { fontSize: 13, color: dark ? "#cbd5e1" : "#334155" } },
          React.createElement("div", { style: { marginBottom: 4 } }, React.createElement("strong", null, "🏢 Empresa: "), c.fornecedor || "—"),
          React.createElement("div", { style: { marginBottom: 4 } }, React.createElement("strong", null, "📝 CNPJ: "), c.cnpj || "—"),
          React.createElement("div", { style: { marginBottom: 4 } }, React.createElement("strong", null, "🏛️ Órgão: "), c.orgao || "—"),
          React.createElement("div", { style: { marginBottom: 4, display: "flex", alignItems: "center", gap: 6 } }, 
            React.createElement("strong", null, "📅 Validade: "), 
            c.validade ? React.createElement("span", {
              style: {
                background: `${c.corPrazo}15`, color: c.corPrazo, padding: "2px 6px", borderRadius: 4, fontSize: 11, fontWeight: "bold", border: `1px solid ${c.corPrazo}30`
              }
            }, `${c.validade.split("-").reverse().join("/")} ${c.diasRestantes !== null ? `(${c.diasRestantes >= 0 ? `faltam ${c.diasRestantes} dias` : 'vencido'})` : ''}`) : "—"
          )
        ),
        
        React.createElement("div", { style: { background: dark ? "#334155" : "#f8fafc", padding: 12, borderRadius: 8, fontSize: 12, display: "flex", flexDirection: "column", gap: 6 } },
          React.createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
            React.createElement("span", { style: { color: dark ? "#94a3b8" : "#64748b" } }, "Valor Original:"),
            React.createElement("strong", null, formatVal(c.valorTotal))
          ),
          React.createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
            React.createElement("span", { style: { color: dark ? "#94a3b8" : "#64748b" } }, "Aditivos:"),
            React.createElement("strong", { style: { color: c.alertaAditivo ? "#ef4444" : "inherit" } }, formatVal(c.aditivos))
          ),
          React.createElement("div", { style: { display: "flex", justifyContent: "space-between", borderTop: dark ? "1px dashed #475569" : "1px dashed #cbd5e1", paddingTop: 6, marginTop: 2 } },
            React.createElement("span", { style: { color: dark ? "#94a3b8" : "#64748b", fontWeight: "bold" } }, "Total Global:"),
            React.createElement("strong", null, formatVal(c.totalComAditivos))
          ),
          React.createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
            React.createElement("span", { style: { color: dark ? "#94a3b8" : "#64748b" } }, "Total Executado:"),
            React.createElement("strong", { style: { color: "#38bdf8" } }, formatVal(c.valorExecutado))
          ),
          React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 13 } },
            React.createElement("span", { style: { color: dark ? "#94a3b8" : "#64748b", fontWeight: "bold" } }, "Saldo Restante:"),
            React.createElement("strong", { style: { color: c.saldo <= 0 ? "#ef4444" : "#22c55e" } }, formatVal(c.saldo))
          ),
          
          c.totalComAditivos > 0 && React.createElement("div", { style: { marginTop: 6 } },
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 4, color: dark ? "#94a3b8" : "#64748b" } },
              React.createElement("span", null, "Execução"),
              React.createElement("span", null, `${c.progresso.toFixed(1)}%`)
            ),
            React.createElement("div", { style: { width: "100%", height: 6, background: dark ? "#475569" : "#e2e8f0", borderRadius: 3, overflow: "hidden" } },
              React.createElement("div", { style: { width: `${Math.min(100, c.progresso)}%`, height: "100%", background: c.progresso > 90 ? "#ef4444" : c.progresso > 75 ? "#f59e0b" : "#38bdf8", borderRadius: 3 } })
            )
          )
        )
      ))
    )
  );
};
