const PDFDocument = require('pdfkit');
const fs = require('fs');
const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 28 });
const out = fs.createWriteStream('tmp_test.pdf');
doc.pipe(out);

const colors = {
  primary: '#1F3A5F',
  light: '#F7F9FB',
  border: '#D9E2EC',
  text: '#243B55',
  muted: '#6B7C93',
  white: '#FFFFFF'
};

const leftX = 28;
const rightX = doc.page.width - 28;
const contentWidth = rightX - leftX;
const topY = 28;
const pageHeaderHeight = 86;
const companyBoxY = topY + pageHeaderHeight + 12;
const companyBoxH = 90;
const clientBoxY = companyBoxY + companyBoxH + 14;
const clientBoxH = 62;
const tableTop = clientBoxY + clientBoxH + 18;
const tableHeaderHeight = 28;
const rowHeight = 24;
let rowY = tableTop + tableHeaderHeight;
for (let i = 0; i < 3; i++) {
  rowY += rowHeight;
}
const totalsY = rowY + 16;
const totalsBoxHeight = 82;
const pageBottom = doc.page.height - 28;
console.log('totalsY', totalsY, 'pageBottom', pageBottom, 'fits', totalsY + totalsBoxHeight + 18 <= pageBottom);

const conditionsX = leftX;
const conditionsW = contentWidth - 320 - 12;
const paymentTermsText = '50% à la commande • 45% à la livraison • 5% après installation';
const validityText = 'Valable 1 mois après l\'obtention du devis';
const DELIVERY_TERMS = { text: 'Délai de livraison: 15 à 60 jours après le versement' };

function logPage(msg) {
  console.log(msg, 'page', doc.page.number, 'y', doc.y);
}

logPage('before conditions');
doc.font('Helvetica-Bold').fontSize(10).text('CONDITIONS', conditionsX + 12, totalsY + 12);
logPage('after conditions');
doc.font('Helvetica').fontSize(8).text(`• Paiement : ${paymentTermsText}`, conditionsX + 12, totalsY + 30, { width: conditionsW - 24, lineGap: 3 });
logPage('after paiement');
doc.font('Helvetica').fontSize(8).text(`• Livraison : ${DELIVERY_TERMS.text}`, conditionsX + 12, totalsY + 46, { width: conditionsW - 24, lineGap: 3 });
logPage('after livraison');
doc.font('Helvetica').fontSize(8).text(`• Validité : ${validityText}`, conditionsX + 12, totalsY + 62, { width: conditionsW - 24, lineGap: 3 });
logPage('after validite');

doc.end();
