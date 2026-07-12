const PDFDocument = require('pdfkit');
const fs = require('fs');
const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 28 });
const out = fs.createWriteStream('tmp_full.pdf');
doc.pipe(out);
const colors = {
  primary: '#1F3A5F',
  light: '#F7F9FB',
  border: '#D9E2EC',
  text: '#243B55',
  muted: '#6B7C93',
  white: '#FFFFFF'
};
const COMPANY_INFO = {
  name: 'SARA DECOREX',
  address: 'VILLAGE IRYAHEN COMMUNE TALA HAMZA WILAYA DE BEJAIA',
  phone: '034 18 12 92',
  email: 'sara.decorex@gmail.com'
};
const DELIVERY_TERMS = { text: 'Délai de livraison: 15 à 60 jours après le versement' };
const PAYMENT_TERMS_TEXT = '50% à la commande • 45% à la livraison • 5% après installation';
const VALIDITY_TEXT = "Valable 1 mois après l'obtention du devis";
const devis = {
  numero: 'DEV-TEST-001',
  created_at: '2026-06-11T12:19:43.047Z',
  statut: 'BROUILLON',
  tva: 19,
  client_prenom: 'Saad',
  client_nom: 'Moussa',
  client_adresse: '123 Rue Exemple, Béjaïa',
  client_telephone: '0770 16 01 91'
};
const articles = [
  { designation: 'Aménagement salon complet', quantite: 2, prix_unitaire: 12000 },
  { designation: 'Pose de cloisons vitrées', quantite: 1, prix_unitaire: 8500 },
  { designation: 'Réalisation de faux plafond LED', quantite: 1, prix_unitaire: 6000 }
];
const formatPrice = (num) => num.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\u202f/g, ' ');
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
const cols = {
  no: leftX + 10,
  desc: leftX + 60,
  qty: leftX + 400,
  pu: leftX + 470,
  total: leftX + 560
};

doc.rect(leftX, topY, contentWidth, pageHeaderHeight).fill(colors.primary);
doc.font('Helvetica-Bold').fontSize(34).fillColor(colors.white).text('DEVIS', leftX + 14, topY + 18);
doc.font('Helvetica').fontSize(10).fillColor(colors.white).text(`N° ${devis.numero}`, leftX + 14, topY + 62).text(`Date : ${new Date(devis.created_at).toLocaleDateString('fr-FR')}`, leftX + 220, topY + 62);

doc.rect(leftX, companyBoxY, Math.round((contentWidth - 18) * 0.45), companyBoxH).fill(colors.white).stroke(colors.border);
doc.font('Helvetica-Bold').fontSize(11).fillColor(colors.primary).text('Société', leftX + 10, companyBoxY + 10);
doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.text).text(COMPANY_INFO.name, leftX + 10, companyBoxY + 28, { width: Math.round((contentWidth - 18) * 0.45) - 20 });
doc.font('Helvetica').fontSize(9).fillColor(colors.muted).text(COMPANY_INFO.address, leftX + 10, companyBoxY + 44, { width: Math.round((contentWidth - 18) * 0.45) - 20, lineGap: 2 }).text(`Tél : ${COMPANY_INFO.phone}`, leftX + 10, companyBoxY + 74).text(COMPANY_INFO.email, leftX + 10, companyBoxY + 90);

doc.rect(leftX + Math.round((contentWidth - 18) * 0.45) + 18, companyBoxY, contentWidth - Math.round((contentWidth - 18) * 0.45) - 18, companyBoxH).fill(colors.white).stroke(colors.border);
doc.font('Helvetica-Bold').fontSize(11).fillColor(colors.primary).text('Détails du devis', leftX + Math.round((contentWidth - 18) * 0.45) + 18 + 10, companyBoxY + 10);
const detailsX = leftX + Math.round((contentWidth - 18) * 0.45) + 18;
const detailsW = contentWidth - Math.round((contentWidth - 18) * 0.45) - 18;
const detailsLines = [
  ['Statut', devis.statut || '-'],
  ['TVA', devis.tva ? `${devis.tva}%` : '0%'],
  ['Validité', VALIDITY_TEXT],
  ['Paiement', PAYMENT_TERMS_TEXT]
];
let detailsY = companyBoxY + 34;
detailsLines.forEach(([label, value]) => {
  doc.font('Helvetica-Bold').fontSize(9).fillColor(colors.text).text(`${label}:`, detailsX + 10, detailsY, { continued: true }).font('Helvetica').fillColor(colors.muted).text(` ${value}`, detailsX + 85, detailsY, { width: detailsW - 100 });
  detailsY += 14;
});

doc.rect(leftX, clientBoxY, contentWidth, clientBoxH).fill(colors.white).stroke(colors.border);
doc.font('Helvetica-Bold').fontSize(11).fillColor(colors.primary).text('Client', leftX + 10, clientBoxY + 10);
doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.text).text(`${devis.client_prenom || '-'} ${devis.client_nom || '-'}`, leftX + 10, clientBoxY + 28, { width: contentWidth - 20 });
doc.font('Helvetica').fontSize(9).fillColor(colors.muted).text(devis.client_adresse || '-', leftX + 10, clientBoxY + 44, { width: contentWidth - 20, lineGap: 2 }).text(`Tél : ${devis.client_telephone || '-'}`, leftX + 10, clientBoxY + 60);

doc.rect(leftX, tableTop, contentWidth, tableHeaderHeight).fill(colors.primary);
doc.font('Helvetica-Bold').fontSize(9).fillColor(colors.white).text('N°', cols.no, tableTop + 8, { width: 40, align: 'center' }).text('Désignation', cols.desc, tableTop + 8, { width: 320 }).text('Qté', cols.qty, tableTop + 8, { width: 40, align: 'center' }).text('P.U.', cols.pu, tableTop + 8, { width: 90, align: 'right' }).text('Total', cols.total, tableTop + 8, { width: 120, align: 'right' });

let rowY2 = tableTop + tableHeaderHeight;
articles.forEach((article, index) => {
  const rowColor = index % 2 === 0 ? colors.white : colors.light;
  doc.rect(leftX, rowY2, contentWidth, rowHeight).fill(rowColor).stroke(colors.border);
  const description = article.designation.length > 70 ? `${article.designation.substring(0, 67)}...` : article.designation;
  doc.font('Helvetica').fontSize(9).fillColor(colors.text).text(index + 1, cols.no, rowY2 + 8, { width: 40, align: 'center' }).text(description, cols.desc, rowY2 + 8, { width: 320 }).text(article.quantite.toString(), cols.qty, rowY2 + 8, { width: 40, align: 'center' }).text(formatPrice(article.prix_unitaire) + ' DA', cols.pu, rowY2 + 8, { width: 90, align: 'right', lineBreak: false }).font('Helvetica-Bold').text(formatPrice(article.quantite * article.prix_unitaire) + ' DA', cols.total, rowY2 + 8, { width: 120, align: 'right', lineBreak: false });
  rowY2 += rowHeight;
});

doc.strokeColor(colors.border).lineWidth(1).rect(leftX, tableTop, contentWidth, rowY2 - tableTop).stroke();
const totalsY2 = rowY2 + 16;
const totalsBoxHeight2 = 82;
const totalsX = leftX + contentWidth - 320;
const conditionsX = leftX;
const conditionsW = contentWidth - 320 - 12;

doc.rect(conditionsX, totalsY2, conditionsW, totalsBoxHeight2).fill(colors.white).stroke(colors.border);
doc.rect(totalsX, totalsY2, 320, totalsBoxHeight2).fill(colors.light).stroke(colors.border);

doc.font('Helvetica').fontSize(9).fillColor(colors.muted).text('Montant H.T.', totalsX + 14, totalsY2 + 14).font('Helvetica-Bold').fontSize(11).fillColor(colors.text).text(formatPrice(12000*2+8500+6000) + ' DA', totalsX + 170, totalsY2 + 14, { width: 126, align: 'right' });
doc.font('Helvetica-Bold').fontSize(13).fillColor(colors.primary).text('TOTAL TTC', totalsX + 14, totalsY2 + 60).text(formatPrice((12000*2+8500+6000)*1.19) + ' DA', totalsX + 170, totalsY2 + 60, { width: 126, align: 'right' });

const yStart = totalsY2 + 12;
doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.primary).text('CONDITIONS', conditionsX + 12, yStart);
doc.font('Helvetica').fontSize(8).fillColor(colors.muted).text(`• Paiement : ${PAYMENT_TERMS_TEXT}`, conditionsX + 12, yStart + 18, { width: conditionsW - 24, lineGap: 3 }).text(`• Livraison : ${DELIVERY_TERMS.text}`, conditionsX + 12, yStart + 34, { width: conditionsW - 24, lineGap: 3 }).text(`• Validité : ${VALIDITY_TEXT}`, conditionsX + 12, yStart + 50, { width: conditionsW - 24, lineGap: 3 });

doc.end();
