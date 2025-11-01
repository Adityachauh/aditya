import nodemailer from 'nodemailer';

// Create a test account for development
// In production, use real SMTP credentials from environment variables
export async function createTransporter() {
  // For development, create a test account
  if (process.env.NODE_ENV !== 'production') {
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  // Production transporter
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendPrizeEmail(
  email: string,
  prizeName: string,
  prizeCode?: string,
  prizeValue?: string
) {
  const transporter = await createTransporter();

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .prize-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #667eea; }
          .code { font-size: 24px; font-weight: bold; color: #667eea; letter-spacing: 2px; margin: 10px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Congratulations!</h1>
            <p>You've won a prize!</p>
          </div>
          <div class="content">
            <h2>Your Prize: ${prizeName}</h2>
            <div class="prize-box">
              ${prizeCode ? `
                <p><strong>Your Prize Code:</strong></p>
                <div class="code">${prizeCode}</div>
                <p>Use this code at checkout to claim your prize!</p>
              ` : `
                <p>${prizeValue || 'Your prize details will be sent separately.'}</p>
              `}
            </div>
            <p>Thank you for participating in our Spin-to-Win promotion!</p>
            <p>If you have any questions, please don't hesitate to contact us.</p>
          </div>
          <div class="footer">
            <p>This email was sent because you participated in our Spin-to-Win promotion.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const info = await transporter.sendMail({
    from: '"Spin-to-Win" <noreply@spintowin.com>',
    to: email,
    subject: `🎉 You Won: ${prizeName}!`,
    html: htmlContent,
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  return info;
}

// Mailchimp integration placeholder
export async function addToMailchimp(email: string, name?: string) {
  // In production, implement actual Mailchimp API integration
  // const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
  // const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
  
  console.log('Adding to Mailchimp:', email, name);
  
  // Example implementation:
  // const response = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`, {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     email_address: email,
  //     status: 'subscribed',
  //     merge_fields: {
  //       FNAME: name || '',
  //     },
  //   }),
  // });
  
  return { success: true };
}

// HubSpot integration placeholder
export async function addToHubSpot(email: string, name?: string) {
  // In production, implement actual HubSpot API integration
  // const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
  
  console.log('Adding to HubSpot:', email, name);
  
  // Example implementation:
  // const response = await fetch('https://api.hubapi.com/contacts/v1/contact', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     properties: [
  //       { property: 'email', value: email },
  //       { property: 'firstname', value: name || '' },
  //     ],
  //   }),
  // });
  
  return { success: true };
}
