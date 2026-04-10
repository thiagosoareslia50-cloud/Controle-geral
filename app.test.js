const { proxNumero } = require('./app.js');

describe('proxNumero', () => {
  it('should return 1 when there are no processes', () => {
    expect(proxNumero([])).toBe(1);
    expect(proxNumero(null)).toBe(1);
    expect(proxNumero(undefined)).toBe(1);
  });

  it('should return the next number when processes are present', () => {
    const processos = [
      { "NÚMERO DO DOCUMENTO": "1" },
      { "NÚMERO DO DOCUMENTO": "2" },
      { "NÚMERO DO DOCUMENTO": "3" }
    ];
    expect(proxNumero(processos)).toBe(4);
  });

  it('should handle unordered numbers', () => {
    const processos = [
      { "NÚMERO DO DOCUMENTO": "3" },
      { "NÚMERO DO DOCUMENTO": "1" },
      { "NÚMERO DO DOCUMENTO": "2" }
    ];
    expect(proxNumero(processos)).toBe(4);
  });

  it('should skip formulas and return the next available number', () => {
    const processos = [
      { "NÚMERO DO DOCUMENTO": "1" },
      { "NÚMERO DO DOCUMENTO": "=L2+1" },
      { "NÚMERO DO DOCUMENTO": "2" }
    ];
    expect(proxNumero(processos)).toBe(3);
  });

  it('should handle strings with spaces', () => {
    const processos = [
      { "NÚMERO DO DOCUMENTO": "  1  " },
      { "NÚMERO DO DOCUMENTO": " 2" }
    ];
    expect(proxNumero(processos)).toBe(3);
  });

  it('should handle duplicate numbers', () => {
    const processos = [
      { "NÚMERO DO DOCUMENTO": "1" },
      { "NÚMERO DO DOCUMENTO": "2" },
      { "NÚMERO DO DOCUMENTO": "2" }
    ];
    expect(proxNumero(processos)).toBe(3);
  });

  it('should find the next available number skipping gaps if gap starts after max', () => {
    // Actually, the current logic is `next = Math.max(...nums) + 1`
    // and then while `usados.has(next)` `next++`
    // So it does NOT fill gaps. It just takes max + 1.
    const processos = [
      { "NÚMERO DO DOCUMENTO": "1" },
      { "NÚMERO DO DOCUMENTO": "5" }
    ];
    expect(proxNumero(processos)).toBe(6);
  });

  it('should handle invalid/empty documents', () => {
    const processos = [
      { "NÚMERO DO DOCUMENTO": "" },
      { "NÚMERO DO DOCUMENTO": "abc" },
      { "OTHER": "value" }
    ];
    expect(proxNumero(processos)).toBe(1);
  });
});
