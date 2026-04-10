const { mascararCnpjCpf } = require('./app.js');

describe('mascararCnpjCpf', () => {
  describe('CPF masking (length <= 11)', () => {
    it('should return up to 3 digits as is', () => {
      expect(mascararCnpjCpf('1')).toBe('1');
      expect(mascararCnpjCpf('123')).toBe('123');
    });

    it('should format up to 6 digits as XXX.XXX', () => {
      expect(mascararCnpjCpf('1234')).toBe('123.4');
      expect(mascararCnpjCpf('123456')).toBe('123.456');
    });

    it('should format up to 9 digits as XXX.XXX.XXX', () => {
      expect(mascararCnpjCpf('1234567')).toBe('123.456.7');
      expect(mascararCnpjCpf('123456789')).toBe('123.456.789');
    });

    it('should format up to 11 digits as XXX.XXX.XXX-XX', () => {
      expect(mascararCnpjCpf('1234567890')).toBe('123.456.789-0');
      expect(mascararCnpjCpf('12345678901')).toBe('123.456.789-01');
    });
  });

  describe('CNPJ masking (length > 11)', () => {
    it('should return up to 2 digits as is (though functionally unreachable unless input > 11 initially but stripped)', () => {
      // In this function logic, if input length > 11, we hit the second block.
      // E.g. '123456789012' has length 12
      // Let's test the CNPJ formatting rules with a full 14-digit CNPJ
      expect(mascararCnpjCpf('12345678901234')).toBe('12.345.678/9012-34');
    });

    it('should format 12 digits as XX.XXX.XXX/XXXX', () => {
      expect(mascararCnpjCpf('123456789012')).toBe('12.345.678/9012');
    });

    it('should format 13 digits as XX.XXX.XXX/XXXX-X', () => {
      expect(mascararCnpjCpf('1234567890123')).toBe('12.345.678/9012-3');
    });
  });

  describe('Edge cases and non-digits', () => {
    it('should strip non-digit characters before applying mask', () => {
      expect(mascararCnpjCpf('123.456.789-01')).toBe('123.456.789-01');
      expect(mascararCnpjCpf('12.345.678/9012-34')).toBe('12.345.678/9012-34');
      expect(mascararCnpjCpf('abc123xyz456')).toBe('123.456');
    });

    it('should handle empty string', () => {
      expect(mascararCnpjCpf('')).toBe('');
    });

    it('should handle inputs with only non-digits', () => {
      expect(mascararCnpjCpf('abc.-/')).toBe('');
    });
  });
});
