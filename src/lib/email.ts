import nodemailer from "nodemailer";

// Email configuration
const getEmailConfig = async () => {
  // Use Ethereal for development/testing by default
  if (
    process.env.NODE_ENV !== "production" ||
    process.env.USE_ETHEREAL === "true"
  ) {
    // If credentials are provided, use them
    if (process.env.ETHEREAL_USER && process.env.ETHEREAL_PASS) {
      return {
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: process.env.ETHEREAL_USER,
          pass: process.env.ETHEREAL_PASS,
        },
      };
    }

    // Otherwise, create a test account automatically
    console.log("🔄 Creating Ethereal test account...");
    const testAccount = await nodemailer.createTestAccount();
    console.log("✅ Ethereal account created:", testAccount.user);

    return {
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    };
  }

  // Use production SMTP settings
  return {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };
};

// Create transporter
const createTransporter = async () => {
  const config = await getEmailConfig();
  return nodemailer.createTransport(config);
};

// Create Ethereal test account (for development)
export const createEtherealAccount = async () => {
  try {
    const testAccount = await nodemailer.createTestAccount();
    console.log("Ethereal test account created:");
    console.log("Email:", testAccount.user);
    console.log("Password:", testAccount.pass);
    console.log("Web interface: https://ethereal.email");

    return testAccount;
  } catch (error) {
    console.error("Error creating Ethereal account:", error);
    throw error;
  }
};

// Email templates
export const emailTemplates = {
  staffInvitation: (data: {
    name: string;
    workEmail: string;
    inviteUrl: string;
    companyName?: string;
  }) => ({
    subject: `Welcome to ${
      data.companyName || "Our Team"
    } - Complete Your Account Setup`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Our Team</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Welcome to Our Team!</h1>
            <p>You're invited to join our staff directory</p>
          </div>
          <div class="content">
            <h2>Hello ${data.name},</h2>
            <p>You've been added to our staff directory. To complete your account setup and access your profile, please click the button below:</p>

            <div style="text-align: center;">
              <a href="${
                data.inviteUrl
              }" class="button">Complete Account Setup</a>
            </div>

            <p>This invitation will expire in 7 days. If you have any questions, please contact your administrator.</p>

            <p>Best regards,<br>The ${data.companyName || "Team"} Team</p>
          </div>
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </body>
      </html>
    `,
    text: `
      Welcome to Our Team!

      Hello ${data.name},

      You've been added to our staff directory. To complete your account setup and access your profile, please visit: ${
        data.inviteUrl
      }

      This invitation will expire in 7 days. If you have any questions, please contact your administrator.

      Best regards,
      The ${data.companyName || "Team"} Team

      ---
      This is an automated message. Please do not reply to this email.
    `,
  }),
};

// Send email function
export const sendEmail = async (options: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}) => {
  try {
    const transporter = await createTransporter();
    const config = await getEmailConfig();

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || "CaseStream"}" <${
        process.env.EMAIL_FROM || config.auth.user
      }>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    const info = await transporter.sendMail(mailOptions);

    // Log success with Ethereal preview URL if using Ethereal
    if (config.host === "smtp.ethereal.email") {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log("📧 Ethereal email sent successfully!");
      console.log("Message ID:", info.messageId);
      console.log("📨 Preview your email here:", previewUrl);
    } else {
      console.log("Email sent successfully:", info.messageId);
    }

    return {
      success: true,
      messageId: info.messageId,
      previewUrl:
        config.host === "smtp.ethereal.email"
          ? nodemailer.getTestMessageUrl(info)
          : undefined,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(
      `Failed to send email: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

// Send staff invitation email
export const sendStaffInvitation = async (staffData: {
  name: string;
  workEmail: string;
  inviteUrl?: string;
  companyName?: string;
}) => {
  const inviteUrl =
    staffData.inviteUrl ||
    `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/invite/token-placeholder`;

  const template = emailTemplates.staffInvitation({
    ...staffData,
    inviteUrl,
  });

  return await sendEmail({
    to: staffData.workEmail,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });
};
