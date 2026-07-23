const fs = require('fs');
const path = require('path');

const sqlJsEntry = require.resolve('sql.js');
const wasmPath = path.join(path.dirname(sqlJsEntry), 'sql-wasm.wasm');

if (!fs.existsSync(wasmPath)) {
  throw new Error(`sql.js WASM file is missing: ${wasmPath}`);
}

console.log(`sql.js WASM found: ${wasmPath}`);