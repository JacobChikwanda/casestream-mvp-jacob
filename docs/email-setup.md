# Email Setup for Staff Invitations

This guide explains how to set up email functionality for sending staff invitation emails when new staff members are created.

## Prerequisites

1. Install nodemailer (if not already installed):
   ```bash
   pnpm add nodemailer @types/nodemailer
   ```

## Quick Start with Ethereal (Recommended for Development)

For development and testing, use Ethereal Email - a fake SMTP service that provides a web interface to preview sent emails.

### Automatic Setup (Simplest - Just Works!)

**No configuration needed!** The system automatically uses Ethereal for development by default.

When you create a staff member, you'll see console logs like:
```
🔄 Creating Ethereal test account...
✅ Ethereal account created: ethereal-user@ethereal.email
📧 Ethereal email sent successfully!
📨 Preview your email here: https://ethereal.email/message/...
```

### Custom Ethereal Account (Optional)

If you prefer to use your own Ethereal account:

1. Visit [Ethereal Email](https://ethereal.email/create) to create a test account
2. Add to your `.env.local`:
```bash
ETHEREAL_USER="your-ethereal-user@ethereal.email"
ETHEREAL_PASS="your-ethereal-password"
```

### Force Ethereal in Production (Testing Only)

To use Ethereal even in production (not recommended):
```bash
USE_ETHEREAL=true
```

## Production Email Setup

For production, configure real SMTP settings in your `.env.local`:

```bash
# Email Configuration for Production
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false" # true for 465, false for other ports
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
EMAIL_FROM="noreply@casestream.com"
EMAIL_FROM_NAME="CaseStream"
```

### Gmail Setup (if using Gmail)

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate a password for "Mail"
   - Use this app password as `SMTP_PASS`

## How It Works

When a new staff member is created through the staff form:

1. The system validates the staff data, including the required `workEmail` field
2. After successfully creating the staff record in the database, an invitation email is sent
3. The email contains a welcome message and a link to complete account setup
4. If email sending fails, the staff creation still succeeds but logs the error

## Email Template

The invitation email includes:
- Professional HTML template with company branding
- Personalized greeting using the staff member's name
- Call-to-action button linking to account setup
- Plain text fallback for email clients that don't support HTML

## Customization

### Company Name
Update the `companyName` parameter in the `sendStaffInvitation` call in `createStaff.ts`:
```typescript
await sendStaffInvitation({
  name: validated.name,
  workEmail: validated.workEmail,
  companyName: "Your Company Name", // Change this
});
```

### Email Template
Modify the `emailTemplates.staffInvitation` function in `src/lib/email.ts` to customize:
- Subject line
- Email content
- Styling
- Call-to-action URL

### Invitation URL
The default invitation URL is constructed as:
```
${NEXT_PUBLIC_APP_URL}/invite/staff
```

You can customize this by passing a custom `inviteUrl` to `sendStaffInvitation`.

## Troubleshooting

### Email Not Sending
1. Check your SMTP credentials in environment variables
2. Verify your email provider allows SMTP connections
3. Check server logs for detailed error messages

### Gmail Authentication Issues
- Ensure you're using an App Password, not your regular password
- Verify 2FA is enabled on your Google account
- Check if less secure app access is disabled (should be for security)

### Email Going to Spam
- Use a professional email address for `EMAIL_FROM`
- Consider setting up SPF/DKIM records for your domain
- Ask recipients to add your email to their contacts
