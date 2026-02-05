import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    console.log('❌ Missing fields:', { name: !!name, email: !!email, message: !!message });
    return res.status(400).json({ error: 'Missing required fields' });
  }

  console.log('📧 Sending emails to:', email);

  // Check environment variables
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('❌ Gmail credentials not configured');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  // Create transporter with Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  let notificationSent = false;
  let thankYouSent = false;

  // 1. Send notification email to site owner
  try {
    console.log('📤 Sending notification to owner...');
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `💬 New Message from ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <p style="margin: 0 0 10px;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 0 0 10px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 0;"><strong>Message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 8px; margin-top: 10px; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            Sent from your portfolio website at ${new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })}
          </p>
        </div>
      `,
    });
    notificationSent = true;
    console.log('✅ Notification sent to owner');
  } catch (error) {
    console.error('❌ Failed to send notification:', error.message);
  }

  // 2. Send thank-you email to the sender
  try {
    console.log('📤 Sending thank-you email to:', email);
    await transporter.sendMail({
      from: `"Thanakorn Ngamsuth" <${process.env.GMAIL_USER}>`,
      to: email,
      replyTo: process.env.GMAIL_USER,
      subject: `Thank you for reaching out, ${name}! 🙏`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1a1a1a; font-size: 28px; margin: 0;">Thank You! 🎉</h1>
          </div>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Hi <strong>${name}</strong>,
          </p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Thank you for reaching out! I've received your message and will get back to you as soon as possible.
          </p>
          
          <div style="background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%); padding: 20px; border-radius: 12px; margin: 25px 0;">
            <p style="color: #666; font-size: 14px; margin: 0 0 10px;"><strong>Your message:</strong></p>
            <p style="color: #333; font-size: 14px; margin: 0; white-space: pre-wrap; background: white; padding: 15px; border-radius: 8px;">${message}</p>
          </div>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            In the meantime, feel free to check out my work or connect with me on social media!
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://thnakon.dev" style="display: inline-block; background: #000; color: #fff; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 600;">
              Visit My Portfolio
            </a>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #999; font-size: 12px; text-align: center;">
            Best regards,<br>
            <strong>Thanakorn Ngamsuth</strong><br>
            Frontend Developer
          </p>
        </div>
      `,
    });
    thankYouSent = true;
    console.log('✅ Thank-you email sent to:', email);
  } catch (error) {
    console.error('❌ Failed to send thank-you email:', error.message);
  }

  // Return response
  if (notificationSent && thankYouSent) {
    res.status(200).json({ success: true, message: 'Both emails sent successfully' });
  } else if (notificationSent || thankYouSent) {
    res.status(200).json({
      success: true,
      partial: true,
      notificationSent,
      thankYouSent,
      message: 'Some emails sent'
    });
  } else {
    res.status(500).json({ error: 'Failed to send emails' });
  }
}
