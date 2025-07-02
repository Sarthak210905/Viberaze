const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Replace with your Gmail and App Password (use environment variables for production)
const GMAIL_USER = 'yourgmail@gmail.com';
const GMAIL_PASS = 'your-app-password';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

const sendOrderEmail = functions.https.onRequest(async (req, res) => {
  const { customerEmail, adminEmail, orderInfo } = req.body;

  if (!customerEmail || !adminEmail || !orderInfo) {
    return res.status(400).send('Missing required fields');
  }

  // Email to customer
  const customerMailOptions = {
    from: GMAIL_USER,
    to: customerEmail,
    subject: 'Your Order Confirmation',
    text: `Thank you for your order!\n\nOrder Details:\n${JSON.stringify(orderInfo, null, 2)}`,
  };

  // Email to admin
  const adminMailOptions = {
    from: GMAIL_USER,
    to: adminEmail,
    subject: 'New Order Received',
    text: `A new order has been placed:\n\n${JSON.stringify(orderInfo, null, 2)}`,
  };

  try {
    await transporter.sendMail(customerMailOptions);
    await transporter.sendMail(adminMailOptions);
    return res.status(200).send('Emails sent');
  } catch (error) {
    console.error('Error sending emails:', error);
    return res.status(500).send('Failed to send emails');
  }
});

module.exports = { sendOrderEmail }; 