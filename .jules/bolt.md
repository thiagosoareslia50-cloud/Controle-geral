## 2024-05-19 - [Optimize importarExcel loop performance]
**Learning:** Pre-caching header column canonical names outside the main data loop when reading an Excel file via SheetJS resolves a significant performance bottleneck by eliminating redundant nested string encoding and canonical lookups (`canonCol`) for every cell during row iteration.
**Action:** Extract repeated header and string formatting logic outside of nested data loops when processing large arrays/sheets.
