const twilio = require('twilio');
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

exports.sendClosedComplaintMessage = async (phone, complaintId, notes) => {
  const message = 
` تم إغلاق الشكوى رقم ${complaintId}
 السبب: ${notes}

شكراً لتواصلك معنا، ونأمل أن نكون قد قدمنا لك الخدمة المناسبة `;

  await client.messages.create({
    from: 'whatsapp:+14155238886',
    to: `whatsapp:${phone}`, // must start +976 or +970
    body: message,
  });
};
