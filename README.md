# 🎡 Spin-to-Win Prize Wheel

An engaging and interactive prize wheel website built with Next.js, designed to capture user information and provide an exciting marketing experience.

## ✨ Features

- **Interactive Prize Wheel**: Smooth animations and realistic spinning mechanics
- **Email Capture**: User-friendly form with validation
- **Prize Management**: Admin dashboard to manage prizes, probabilities, and quantities
- **Duplicate Prevention**: One spin per user using cookies and email validation
- **Prize Delivery**: 
  - Digital prizes with unique codes sent via email
  - Physical prizes with shipping address collection
- **Email Marketing Integration**: Ready-to-use integration points for Mailchimp and HubSpot
- **Analytics**: Google Analytics event tracking for spins, conversions, and engagement
- **Mobile-First Design**: Fully responsive and optimized for all devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd spin-to-win
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env` (optional for development)

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
spin-to-win/
├── app/
│   ├── api/              # API routes
│   │   ├── prizes/       # Prize CRUD operations
│   │   ├── spin/         # Spin logic
│   │   ├── submit-email/ # Email submission
│   │   ├── send-prize/   # Prize delivery
│   │   └── stats/        # Statistics
│   ├── admin/            # Admin dashboard
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Main page
│   └── globals.css       # Global styles
├── components/
│   ├── PrizeWheel.tsx    # Wheel component
│   ├── EmailForm.tsx     # Email form
│   └── PrizeModal.tsx    # Prize display modal
├── lib/
│   ├── prizes.ts         # Prize management logic
│   ├── users.ts          # User tracking
│   └── email.ts          # Email sending
├── types/
│   └── index.ts          # TypeScript types
└── data/                 # JSON data storage (auto-generated)
```

## 🎨 Customization

### Prizes

Prizes are automatically initialized with default values. You can customize them through the admin dashboard at `/admin` or by editing the default prizes in `lib/prizes.ts`.

Each prize has:
- **Name**: Display name
- **Type**: `digital` or `physical`
- **Probability**: Chance of winning (percentage)
- **Quantity**: Total available
- **Remaining**: Current stock
- **Color**: Wheel slice color
- **Value**: Prize description

### Styling

The project uses Tailwind CSS. Customize colors and styles in:
- `tailwind.config.ts` - Theme configuration
- `app/globals.css` - Global styles
- Component files - Component-specific styles

### Email Templates

Customize email templates in `lib/email.ts` in the `sendPrizeEmail` function.

## 🔌 Integrations

### Mailchimp

1. Get your API key from Mailchimp
2. Add to `.env`:
```env
MAILCHIMP_API_KEY=your-key
MAILCHIMP_LIST_ID=your-list-id
MAILCHIMP_SERVER_PREFIX=us1
```
3. Uncomment the Mailchimp implementation in `lib/email.ts`

### HubSpot

1. Get your API key from HubSpot
2. Add to `.env`:
```env
HUBSPOT_API_KEY=your-key
```
3. Uncomment the HubSpot implementation in `lib/email.ts`

### Google Analytics

1. Create a GA4 property
2. Update the GA ID in `app/layout.tsx`
3. Replace `G-XXXXXXXXXX` with your actual ID

## 📊 Admin Dashboard

Access the admin dashboard at `/admin` to:
- View total spins, emails collected, and prizes distributed
- Manage prize inventory and probabilities
- Edit prize details in real-time

## 🔒 Security Notes

- Email addresses are hashed before storage
- Cookies and localStorage prevent multiple spins
- Server-side validation for all operations
- Environment variables for sensitive data

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

Build the production version:
```bash
npm run build
npm start
```

## 📝 License

ISC

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.
