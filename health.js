// api/health.js — Health check endpoint
// Acesso: GET /api/health
// Retorna status do sistema sem expor dados sensíveis
module.exports = (req, res) => {
  // Só aceita GET
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const SB_URL = process.env.SUPABASE_URL;
  const SB_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || '';

  // Retorna info pública sempre
  const health = {
    status: 'ok',
    app: 'ControleGeral',
    version: process.env.APP_VERSION || '5.1.5',
    timestamp: new Date().toISOString(),
  };

  // Testa conectividade Supabase (se credenciais disponíveis no server-side)
  if (SB_URL && SB_KEY && SB_KEY.startsWith('eyJ')) {
    fetch(`${SB_URL}/rest/v1/cgel_store?select=chave&limit=1`, {
      headers: {
        'apikey': SB_KEY,
        'Authorization': `Bearer ${SB_KEY}`,
        'Content-Type': 'application/json'
      }
    })
      .then(r => r.json())
      .then(() => {
        res.json({ ...health, sb: 'connected' });
      })
      .catch(() => {
        res.json({ ...health, sb: 'error' });
      });
  } else {
    // Sem credenciais server-side — retorna só status local
    res.json({ ...health, sb: 'no_server_key' });
  }
};
