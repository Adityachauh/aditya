# 🚀 Deployment Guide

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit: Spin-to-Win application"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables** (Optional)
   Add these in Vercel dashboard under Settings → Environment Variables:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   MAILCHIMP_API_KEY=your-key
   MAILCHIMP_LIST_ID=your-list-id
   HUBSPOT_API_KEY=your-key
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site is live! 🎉

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Deploy to Other Platforms

### Netlify

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add environment variables in Netlify dashboard

### Railway

1. Connect your GitHub repository
2. Railway will auto-detect Next.js
3. Add environment variables
4. Deploy!

### Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t spin-to-win .
docker run -p 3000:3000 spin-to-win
```

## Post-Deployment Checklist

- [ ] Test the spin wheel functionality
- [ ] Verify email submission works
- [ ] Check admin dashboard at `/admin`
- [ ] Test prize distribution
- [ ] Verify email sending (check spam folder)
- [ ] Test on mobile devices
- [ ] Set up Google Analytics
- [ ] Configure email marketing integration
- [ ] Test duplicate prevention (cookies/localStorage)
- [ ] Monitor error logs

## Environment Variables Explained

### Email Configuration
- `SMTP_HOST`: Your email provider's SMTP server
- `SMTP_PORT`: Usually 587 for TLS or 465 for SSL
- `SMTP_USER`: Your email address
- `SMTP_PASS`: Your email password or app-specific password

**Gmail Setup:**
1. Enable 2-factor authentication
2. Generate an app-specific password
3. Use that password in `SMTP_PASS`

### Marketing Integrations
- `MAILCHIMP_API_KEY`: From Mailchimp account settings
- `MAILCHIMP_LIST_ID`: From your audience settings
- `HUBSPOT_API_KEY`: From HubSpot integrations

### Analytics
- Update `G-XXXXXXXXXX` in `app/layout.tsx` with your GA4 ID

## Troubleshooting

### Build Fails
- Check Node.js version (18+)
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Emails Not Sending
- Check SMTP credentials
- Verify firewall/port settings
- Check spam folder
- Review Vercel logs for errors

### Data Not Persisting
- Vercel's filesystem is ephemeral
- Consider using:
  - Vercel KV (Redis)
  - Vercel Postgres
  - MongoDB Atlas
  - Supabase

### Cookies Not Working
- Ensure site is served over HTTPS
- Check browser privacy settings
- Verify cookie domain settings

## Performance Optimization

1. **Enable Caching**
   - Add cache headers for static assets
   - Use Vercel's Edge Network

2. **Optimize Images**
   - Use Next.js Image component
   - Compress images before upload

3. **Monitor Performance**
   - Use Vercel Analytics
   - Set up error tracking (Sentry)

## Security Best Practices

1. **Protect Admin Routes**
   - Add authentication middleware
   - Use environment variable for admin password

2. **Rate Limiting**
   - Implement rate limiting for API routes
   - Prevent spam submissions

3. **Data Validation**
   - All inputs are validated with Zod
   - Server-side validation on all API routes

4. **Environment Variables**
   - Never commit `.env` files
   - Use Vercel's environment variables

## Scaling Considerations

### Database Migration
When you outgrow JSON files, migrate to:
- **PostgreSQL**: For relational data
- **MongoDB**: For flexible schema
- **Redis**: For caching and sessions

### Email Service
For production email sending:
- **SendGrid**: Reliable email API
- **AWS SES**: Cost-effective for high volume
- **Postmark**: Great deliverability

### File Storage
For user uploads or assets:
- **Vercel Blob**: Simple file storage
- **AWS S3**: Scalable object storage
- **Cloudinary**: Image optimization

## Support

For issues or questions:
- Check the [README.md](README.md)
- Review Vercel deployment logs
- Open an issue on GitHub

---

**Happy Spinning! 🎡**
