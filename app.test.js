const { validarCnpjCpf } = require('./app.js');

describe('validarCnpjCpf', () => {
  it('should return true for empty string', () => {
    expect(validarCnpjCpf('')).toBe(true);
  });

  it('should return true for string with only non-digits', () => {
    expect(validarCnpjCpf('.-/')).toBe(true);
  });

  describe('CPF (11 digits)', () => {
    it('should return true for valid 11-digit numbers (no formatting)', () => {
      expect(validarCnpjCpf('12345678901')).toBe(true);
    });

    it('should return true for valid 11-digit numbers with formatting', () => {
      expect(validarCnpjCpf('123.456.789-01')).toBe(true);
    });
  });

  describe('CNPJ (14 digits)', () => {
    it('should return true for valid 14-digit numbers (no formatting)', () => {
      expect(validarCnpjCpf('12345678901234')).toBe(true);
    });

    it('should return true for valid 14-digit numbers with formatting', () => {
      expect(validarCnpjCpf('12.345.678/9012-34')).toBe(true);
    });
  });

  describe('Invalid lengths', () => {
    it('should return false for less than 11 digits', () => {
      expect(validarCnpjCpf('1234567890')).toBe(false); // 10 digits
      expect(validarCnpjCpf('123')).toBe(false); // 3 digits
    });

    it('should return false for exactly 12 digits', () => {
      expect(validarCnpjCpf('123456789012')).toBe(false);
    });

    it('should return false for exactly 13 digits', () => {
      expect(validarCnpjCpf('1234567890123')).toBe(false);
    });

    it('should return false for more than 14 digits', () => {
      expect(validarCnpjCpf('123456789012345')).toBe(false); // 15 digits
    });
  });
});
