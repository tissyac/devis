const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
const file = path.resolve(__dirname, 'sample_devis_EXCEL.pdf');
const buf = fs.readFileSync(file);
const text = buf.toString('latin1');
const pageObjs = [];
const regex = /(\d+)\s+(\d+)\s+obj\s*([\s\S]*?)endobj/g;
let m;
const objs = {};
while ((m = regex.exec(text)) !== null) {
  objs[`${m[1]} ${m[2]}`] = m[3];
}
for (const key of Object.keys(objs)) {
  const obj = objs[key];
  if (/\/Type\s*\/Page/.test(obj)) {
    pageObjs.push({ key, obj: obj.slice(0, 200).replace(/\n/g, '\\n') });
  }
}
console.log('page count', pageObjs.length);
pageObjs.forEach((p, idx) => console.log('PAGE', idx, p.key, p.obj));
const contentKeys = Object.keys(objs).filter(k => /\/Length/.test(objs[k]) && /\/Filter\s*\/FlateDecode/.test(objs[k]));
console.log('content streams count', contentKeys.length, contentKeys);
for (const key of contentKeys) {
  const obj = objs[key];
  const mlen = /\/Length\s+(\d+)/.exec(obj);
  const idx = obj.indexOf('stream');
  const eidx = obj.indexOf('endstream');
  if (idx >= 0 && eidx >= 0) {
    const stream = obj.slice(idx + 6, eidx);
    try {
      const dec = zlib.inflateSync(Buffer.from(stream, 'latin1')).toString('latin1');
      console.log('STREAM', key, 'decoded len', dec.length);
      console.log(dec.slice(0, 800).replace(/\n/g, '\\n'));
    } catch (err) {
      console.log('STREAM', key, 'inflate failed', err.message);
    }
  }
}
console.log('%%EOF present', text.includes('%%EOF'));
