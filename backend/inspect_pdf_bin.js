const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
const buf = fs.readFileSync(path.resolve(__dirname, 'sample_devis_EXCEL.pdf'));
const text = buf.toString('latin1');
const regex = /(\d+)\s+(\d+)\s+obj\s*([\s\S]*?)endobj/g;
let m;
const objs = {};
while ((m = regex.exec(text)) !== null) {
  objs[`${m[1]} ${m[2]}`] = {
    text: m[3],
    start: m.index,
    end: m.index + m[0].length
  };
}
const pageObjs = Object.entries(objs).filter(([key, o]) => /\/Type\s*\/Page/.test(o.text));
console.log('page count', pageObjs.length);
pageObjs.forEach(([key, o], idx) => {
  console.log('PAGE', idx, key, o.text.replace(/\n/g, '\\n').slice(0, 200));
});
function decodeObj(key) {
  const obj = objs[key];
  if (!obj) return null;
  const header = obj.text;
  const lenMatch = /\/Length\s+(\d+)/.exec(header);
  if (!lenMatch) return null;
  const len = parseInt(lenMatch[1], 10);
  const streamPos = buf.indexOf(Buffer.from('stream\n'), obj.start);
  const endPos = buf.indexOf(Buffer.from('endstream'), obj.start);
  if (streamPos < 0 || endPos < 0) return null;
  const start = streamPos + 'stream\n'.length;
  const data = buf.slice(start, endPos);
  try {
    return zlib.inflateSync(data).toString('latin1');
  } catch (err) {
    return { error: err.message, len: data.length, sample: data.slice(0, 100).toString('latin1') };
  }
}
for (const key of Object.keys(objs)) {
  const obj = objs[key].text;
  if (/\/Filter\s*\/FlateDecode/.test(obj)) {
    console.log('DECODING', key);
    const decoded = decodeObj(key);
    console.log(decoded && decoded.error ? 'error:' + decoded.error : decoded.slice(0, 400).replace(/\n/g, '\\n'));
  }
}
console.log('EOF', text.includes('%%EOF'));
