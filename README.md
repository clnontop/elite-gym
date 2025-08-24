# Elite Gym Dashboard

A modern gym management dashboard with real-time synchronization across all devices.

## Features

- **Real-time Data Sync** - Changes made on any device instantly appear on all other devices
- **Member Registration & Management** - Complete member lifecycle management
- **Payment Tracking** - Monitor payments and defaulters
- **Dashboard Analytics** - Comprehensive reports and analytics
- **Dark Theme** - Professional dark theme throughout
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Offline Support** - Works offline with automatic sync when reconnected

## Real-time Synchronization

The dashboard uses Firebase for real-time data synchronization:
- Member registrations sync instantly across all devices
- Payment updates are reflected immediately
- Activity logs show real-time changes
- Offline changes are queued and synced when back online

## Getting Started

### Local Development
1. Clone the repository
2. Open `index.html` in your browser
3. Use admin credentials to login

### Production Deployment
The app is configured for Netlify deployment with:
- Static site hosting
- Automatic redirects
- Security headers
- Real-time database integration

## Admin Login

- **Username:** `clnontop`
- **Password:** `madebycln`

## Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Styling:** Tailwind CSS with custom dark theme
- **Database:** Firebase Realtime Database
- **Hosting:** Netlify
- **Real-time Sync:** Custom synchronization layer with offline support

## Firebase Setup (Optional)

To enable real-time synchronization:
1. Create a Firebase project
2. Enable Realtime Database
3. Update `js/firebase-config.js` with your Firebase credentials
4. Deploy to Netlify

The app works perfectly without Firebase using localStorage as fallback.

## 📋 Prerequisites

- Node.js (v12.x or higher)
- npm or yarn

## 🛠️ Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## 📁 Project Structure

```
html_app/
├── css/
│   ├── tailwind.css   # Tailwind source file with custom utilities
│   └── main.css       # Compiled CSS (generated)
├── pages/             # HTML pages
├── index.html         # Main entry point
├── package.json       # Project dependencies and scripts
└── tailwind.config.js # Tailwind CSS configuration
```

## 🎨 Styling

This project uses Tailwind CSS for styling. Custom utility classes include:


## 🧩 Customization

To customize the Tailwind configuration, edit the `tailwind.config.js` file:


## 📦 Build for Production

Build the CSS for production:

```bash
npm run build:css
# or
yarn build:css
```

## 📱 Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints:

- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up
- `2xl`: 1536px and up

## 🙏 Acknowledgments

- Built with [Rocket.new](https://rocket.new)
- Powered by HTML and Tailwind CSS

Built with ❤️ on Rocket.new
