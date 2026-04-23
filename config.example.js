// Template para configuração de ambiente.
// Copie este arquivo para 'config.js' e preencha com seus dados reais.
// NOTA: config.js é ignorado pelo git para evitar vazamento de credenciais.

if (typeof window !== 'undefined') {
  window.ENV = window.ENV || {};
  window.ENV.SUPABASE_URL = "YOUR_SUPABASE_URL_HERE";
  window.ENV.SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY_HERE";
}

if (typeof module !== 'undefined' && module.exports) {
  // Para compatibilidade com Node.js (testes)
  process.env.SUPABASE_URL = process.env.SUPABASE_URL || "YOUR_SUPABASE_URL_HERE";
  process.env.SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY_HERE";
}
