import { jsPDF } from 'jspdf';

export interface PDFReceiptData {
  orderId: string;
  receiptNo: string;
  customerName: string;
  phone: string;
  email: string;
  division: string;
  district: string;
  upazila: string;
  address: string;
  paymentMethod: string;
  paymentAmount: string;
  cartItems: any[];
  cartTotal: number;
  deliveryFee: number;
  grandTotal: number;
  amountToPay: number;
  date: string;
  time?: string;
}

export function generateOrderPDF(order: PDFReceiptData, lang: 'bn' | 'en' = 'en'): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Color Palette Definitions
  const primaryColor = [0, 69, 61]; // Deep Green "#00453e"
  const secondaryColor = [245, 130, 32]; // Vibrant Orange "#f58220"
  const darkTextColor = [45, 55, 72]; // Slate Hex
  const lightBgColor = [247, 250, 252];

  // Draw Header Border & Background Accent
  doc.rect(0, 0, 210, 8, 'F');
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 8, 'F');

  doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.rect(0, 8, 210, 2, 'F');

  // Title Brand Label
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('AAM BAHAR', 14, 25);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(110, 110, 110);
  doc.text('Premium Fresh Organic Mangoes', 14, 30);

  // Brand Contact Details (Right align)
  doc.setFontSize(9);
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.text('Website: www.aambahar.com', 196, 20, { align: 'right' });
  doc.text('Phone: +8801919270836', 196, 25, { align: 'right' });
  doc.text('Email: ambahar04@gmail.com', 196, 30, { align: 'right' });
  doc.text('Address: Sreepur, Gazipur, Bangladesh', 196, 35, { align: 'right' });

  // Divider Line
  doc.setDrawColor(226, 232, 240);
  doc.line(14, 40, 196, 40);

  // Sub Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(lang === 'bn' ? 'OFFICIAL INVOICE RECEIPT' : 'OFFICIAL INVOICE RECEIPT', 14, 48);

  // Left Section - Bill To Contact
  doc.setFontSize(9);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text('BILLED TO:', 14, 57);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.text(order.customerName, 14, 63);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(80, 80, 80);
  doc.text(`Phone: ${order.phone}`, 14, 69);
  if (order.email) {
    doc.text(`Email: ${order.email}`, 14, 74);
  }
  
  // Custom Address Word Wrapper
  const splitAddress = doc.splitTextToSize(`Address: ${order.address}, ${order.upazila}, ${order.district}, ${order.division}`, 85);
  doc.text(splitAddress, 14, 79);

  // Right Section - Invoice Meta Details
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text('RECEIPT DETAILS:', 110, 57);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(80, 80, 80);
  
  // Draw Metadata rows
  doc.text('Invoice No:', 110, 63);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(200, 30, 30);
  doc.text(order.receiptNo || 'MEMO-2026-9042', 145, 63);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text('Order ID:', 110, 68);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(order.orderId, 145, 68);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text('Date & Time:', 110, 73);
  doc.text(`${order.date} ${order.time || ''}`, 145, 73);

  doc.text('Payment Method:', 110, 78);
  doc.setFont('helvetica', 'bold');
  doc.text(order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Mobile Banking (bKash/Nagad)', 145, 78);

  // Status Highlight Box
  doc.setFillColor(lightBgColor[0], lightBgColor[1], lightBgColor[2]);
  doc.rect(110, 82, 86, 12, 'F');
  doc.setDrawColor(230, 230, 230);
  doc.rect(110, 82, 86, 12, 'S');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  doc.text('Payment Status:', 113, 89);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  if (order.paymentMethod === 'cod') {
    doc.setTextColor(180, 100, 10);
    doc.text('Collect on Delivery', 142, 89);
  } else if (order.paymentAmount === 'half') {
    doc.setTextColor(20, 130, 80);
    doc.text('50% Advanced Paid', 142, 89);
  } else {
    doc.setTextColor(20, 130, 80);
    doc.text('100% Fully Paid', 142, 89);
  }

  // Draw Items Table Header
  let tableY = 104;
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(14, tableY, 182, 8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text('Qty', 18, tableY + 5.5);
  doc.text('Item Description', 40, tableY + 5.5);
  doc.text('Unit Price', 135, tableY + 5.5);
  doc.text('Amount (BDT)', 192, tableY + 5.5, { align: 'right' });

  // Draw Table Columns / Rows
  tableY += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);

  order.cartItems.forEach((item, index) => {
    // Fill alternating background colour
    if (index % 2 === 0) {
      doc.setFillColor(252, 253, 254);
      doc.rect(14, tableY, 182, 11, 'F');
    }
    doc.setDrawColor(240, 240, 240);
    doc.line(14, tableY + 11, 196, tableY + 11);

    // Qty
    doc.setFont('helvetica', 'bold');
    doc.text(String(item.quantity), 19, tableY + 7);
    
    // Description (fallback to english if layout breaks)
    doc.setFont('helvetica', 'normal');
    const itemName = item.product.nameEn || item.product.name || 'Premium Mango Orchard Selection';
    doc.text(itemName, 40, tableY + 5.5);
    
    doc.setFontSize(7.5);
    doc.setTextColor(120, 120, 120);
    const cageType = item.packageType === '12KG' ? '12 KG Crate' : '24 KG Crate';
    doc.text(`${cageType} - (${item.product.price} BDT / Kg) | ID: ${item.itemOrderId || 'N/A'}`, 40, tableY + 9.5);

    // Unit value rate
    const kgWeight = item.packageType === '12KG' ? 12 : 24;
    const itemUnitValPrice = item.product.price * kgWeight;
    doc.setFontSize(9);
    doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
    doc.text(`BDT ${itemUnitValPrice.toLocaleString()}`, 135, tableY + 7);

    // Subtotal
    const itemTotalVal = itemUnitValPrice * item.quantity;
    doc.setFont('helvetica', 'bold');
    doc.text(`BDT ${itemTotalVal.toLocaleString()}`, 192, tableY + 7, { align: 'right' });

    tableY += 11;
  });

  // Subtotal lines
  tableY += 3;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text('Cart Subtotal:', 130, tableY + 5);
  doc.text(`BDT ${order.cartTotal.toLocaleString()}`, 192, tableY + 5, { align: 'right' });

  doc.text('Delivery Charge:', 130, tableY + 10);
  doc.text(`BDT ${order.deliveryFee.toLocaleString()}`, 192, tableY + 10, { align: 'right' });

  // Horizontal rules
  doc.setDrawColor(220, 220, 220);
  doc.line(125, tableY + 13, 196, tableY + 13);

  // Grand Total rows
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('Grand Total (BDT):', 130, tableY + 18);
  doc.text(`BDT ${order.grandTotal.toLocaleString()}`, 192, tableY + 18, { align: 'right' });

  // Paid, Due status line
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  doc.text('Advance Amount Paid:', 130, tableY + 23);
  const totalPaidPre = order.paymentMethod === 'cod' ? 0 : order.amountToPay;
  doc.text(`BDT ${totalPaidPre.toLocaleString()}`, 192, tableY + 23, { align: 'right' });

  doc.setFillColor(254, 242, 242);
  doc.rect(128, tableY + 26, 68, 7.5, 'F');
  doc.setDrawColor(254, 226, 226);
  doc.rect(128, tableY + 26, 68, 7.5, 'S');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(190, 30, 30);
  doc.text('Amount Due on Delivery:', 131, tableY + 31);
  const dueAmt = order.grandTotal - totalPaidPre;
  doc.text(`BDT ${dueAmt.toLocaleString()}`, 192, tableY + 31, { align: 'right' });

  // Add Special Terms and Important notice
  tableY += 38;
  doc.setDrawColor(240, 240, 240);
  doc.line(14, tableY, 196, tableY);

  tableY += 5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text('IMPORTANT TERMS & CONDITIONS:', 14, tableY);

  tableY += 5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(200, 30, 30);
  doc.text('1. Mango Return policy: If 4 to 5 mangoes are found damaged, it is not eligible for return.', 14, tableY);

  tableY += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('2. Ensure checking the crate contents live in front of the courier executive. Claims after confirmation are rejected.', 14, tableY);

  tableY += 4.5;
  doc.text('3. Official Personal Payment Channels: bKash (01303456220), Nagad (01957821195).', 14, tableY);

  tableY += 4.5;
  doc.text('4. Order Tracking issues? Call +8801919270836 or send WhatsApp chat to +8801303456220.', 14, tableY);

  // Signatures or footer brand banner
  tableY += 12;
  doc.setFont('sans-serif', 'oblique');
  doc.setFontSize(8.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('Thank you for choosing Aam Bahar - Sweetening lives with pure Rajshahi goodness!', 14, tableY);

  // Bottom Border Stripe matching company guidelines
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 289, 210, 8, 'F');

  return doc;
}
