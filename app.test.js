const { formatValor } = require('./app.js');

describe('formatValor', () => {
  it('should return empty string for falsy or empty values', () => {
    expect(formatValor('')).toBe('');
    expect(formatValor(null)).toBe('');
    expect(formatValor(undefined)).toBe('');
  });

  it('should strip "R$" prefix and formatting spaces', () => {
    expect(formatValor('R$ 10,00')).toBe('10,00');
    expect(formatValor('r$ 10,00')).toBe('10,00');
    expect(formatValor('R$10,00')).toBe('10,00');
    expect(formatValor('  R$ 10,00  ')).toBe('10,00');
  });

  it('should format values with commas correctly', () => {
    expect(formatValor('10,00')).toBe('10,00');
    expect(formatValor('1.000,00')).toBe('1.000,00');
    expect(formatValor('1.234.567,89')).toBe('1.234.567,89');
    expect(formatValor(',5')).toBe('0,50');
  });

  it('should format values without commas correctly', () => {
    expect(formatValor('1000')).toBe('10,00');
    expect(formatValor('100')).toBe('1,00');
    expect(formatValor('10')).toBe('0,10');
    expect(formatValor('1')).toBe('0,10');
  });

  it('should handle decimal truncation and padding properly', () => {
    expect(formatValor('10,5')).toBe('10,50');
    expect(formatValor('10,555')).toBe('10,55');
  });

  it('should handle non-numeric inputs gracefully', () => {
    expect(formatValor('abc')).toBe('');
    expect(formatValor('R$ abc')).toBe('');
  });
});
