const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
const filePath = process.argv[2] || path.resolve(__dirname, 'sample_devis_EXCEL2.pdf');
const buf = fs.readFileSync(filePath);
const text = buf.toString('latin1');
const regex = /(\d+)\s+(\d+)\s+obj\s*([\s\S]*?)endobj/g;
let m;
const objs = {};
while ((m = regex.exec(text)) !== null) {
  objs[`${m[1]} ${m[2]}`] = m[3];
}
const pageObjs = Object.entries(objs).filter(([key, o]) => /\/Type\s*\/Page/.test(o));
console.log('file', filePath);
console.log('page objs', pageObjs.length);
pageObjs.forEach(([key, o], idx) => {
  console.log('PAGE', idx, key, o.replace(/\n/g, '\\n').slice(0, 200));
});
function decodeStream(objText) {
  const headerMatch = /<<(.*?)>>/s.exec(objText);
  if (!headerMatch) return null;
  const header = headerMatch[1];
  const lenMatch = /\/Length\s+(\d+)/.exec(header);
  const streamPos = objText.indexOf('stream');
  const endPos = objText.indexOf('endstream');
  if (!lenMatch || streamPos < 0 || endPos < 0) return null;
  const stream = objText.slice(streamPos + 6, endPos);
  const bufData = Buffer.from(stream, 'latin1');
  try {
    return zlib.inflateSync(bufData).toString('latin1');
  } catch (err) {
    return { error: err.message, len: bufData.length, sample: bufData.slice(0, 100).toString('latin1') };
  }
}
for (const [key, objText] of Object.entries(objs)) {
  if (/\/Filter\s*\/FlateDecode/.test(objText)) {
    const decoded = decodeStream(objText);
    console.log('STREAM', key, 'decoded', typeof decoded === 'string' ? decoded.slice(0, 400).replace(/\n/g, '\\n') : decoded);
  }
}
console.log('counts', (text.match(/\/Count\s+(\d+)/g) || []).join(','));
console.log('EOF', text.includes('%%EOF'));
