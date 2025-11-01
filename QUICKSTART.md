# 🚀 Quick Start Guide

Get your Spin-to-Win wheel running in 5 minutes!

## Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

### 3. Open Your Browser

Visit [http://localhost:3000](http://localhost:3000)

That's it! 🎉

## What You'll See

### Main Page (/)
- Beautiful gradient background
- Email entry form
- Interactive spinning wheel
- Prize modal with results

### Admin Dashboard (/admin)
- Statistics dashboard
- Prize management
- Inventory tracking
- Edit prize probabilities

## First Steps

1. **Test the Wheel**
   - Enter your email on the main page
   - Click "Spin the Wheel!"
   - See your prize result

2. **Check Admin Dashboard**
   - Visit `/admin`
   - View statistics
   - Edit prize quantities and probabilities

3. **Customize Prizes**
   - Click "Edit" on any prize
   - Adjust probability, quantity, or name
   - Save changes

## Default Prizes

The wheel comes pre-configured with 6 prizes:

| Prize | Type | Probability | Quantity |
|-------|------|-------------|----------|
| 50% OFF | Digital | 20% | 100 |
| Free Shipping | Digital | 25% | 150 |
| $10 Gift Card | Digital | 15% | 75 |
| 20% OFF | Digital | 25% | 200 |
| Mystery Box | Physical | 5% | 20 |
| Try Again | Digital | 10% | 1000 |

## Key Features

✅ **Email Validation** - Ensures valid email addresses
✅ **Duplicate Prevention** - One spin per user (cookies + localStorage)
✅ **Smooth Animations** - Framer Motion powered wheel
✅ **Mobile Responsive** - Works perfectly on all devices
✅ **Admin Dashboard** - Easy prize management
✅ **Email Integration** - Ready for Mailchimp/HubSpot
✅ **Analytics Ready** - Google Analytics events

## Testing the Flow

### User Flow
1. User enters email → Validation
2. User clicks spin → Wheel spins
3. Prize is selected → Modal shows result
4. Digital prize → Code displayed and emailed
5. Physical prize → Address form appears

### Admin Flow
1. Visit `/admin`
2. View total spins, emails, prizes distributed
3. Edit prize details
4. Monitor inventory levels

## Data Storage

All data is stored in JSON files in the `/data` directory:

- `prizes.json` - Prize configuration
- `users.json` - User entries and spins
- `addresses.json` - Shipping addresses for physical prizes

**Note:** For production, consider migrating to a database (see DEPLOYMENT.md)

## Customization

### Change Colors
Edit `tailwind.config.ts` and component files

### Modify Prizes
Edit default prizes in `lib/prizes.ts` or use admin dashboard

### Update Email Templates
Edit `lib/email.ts` → `sendPrizeEmail` function

### Add Sound Effects
Replace `/public/sounds/spin.mp3` with your audio file

## Common Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
node test-api.js
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Data Not Saving
- Check file permissions in `/data` directory
- Ensure write access to project folder

## Next Steps

1. **Deploy to Vercel** - See [DEPLOYMENT.md](DEPLOYMENT.md)
2. **Set Up Email** - Configure SMTP in `.env`
3. **Add Analytics** - Update GA ID in `app/layout.tsx`
4. **Customize Design** - Make it match your brand
5. **Test on Mobile** - Ensure responsive design works

## Need Help?

- 📖 Read the full [README.md](README.md)
- 🚀 Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment
- 🐛 Open an issue on GitHub

---

**Enjoy your Spin-to-Win wheel! 🎡**
