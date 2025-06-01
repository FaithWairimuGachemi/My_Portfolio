
# Faith Wairimu - Portfolio Website

A modern, responsive portfolio website with an animated background, typewriter effects, and a full-stack backend for contact form functionality.

## 🌟 Features

### Frontend
- **Animated Background**: Sky blue gradient with rotating moons, twinkling stars, and geometric shapes
- **Typewriter Effect**: Continuous typing animation for the introduction
- **Responsive Design**: Works perfectly on all devices
- **Glass Morphism**: Modern frosted glass effects throughout
- **Smooth Navigation**: Hamburger menu with smooth page transitions

### Backend
- **Contact Form**: Functional contact form with email notifications
- **API Endpoints**: RESTful API for portfolio data
- **Security**: Rate limiting, CORS protection, and input validation
- **Email Service**: Automated email responses using Nodemailer

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Gmail account (for email functionality)

### Installation

1. **Clone or download the project**
   ```bash
   cd My_Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your credentials:
   ```env
   PORT=3000
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   CONTACT_EMAIL=faithnimoh7@gmail.com
   ```

4. **Get Gmail App Password**
   - Go to Google Account settings
   - Security > 2-Step Verification
   - App passwords > Generate new password
   - Use that password in `EMAIL_PASS`

5. **Start the server**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
My_Portfolio/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── .env.example           # Environment variables template
├── index.html             # Main HTML file
├── styles.css             # All CSS styles
├── script.js              # Frontend JavaScript
├── Faith_Wairimu_CV.pdf   # Your CV file (add this)
└── README.md              # This file
```

## 🔧 API Endpoints

- `GET /` - Serve the portfolio website
- `GET /api/stats` - Get portfolio statistics
- `GET /api/projects` - Get projects data
- `GET /api/skills` - Get skills data
- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check

## 📧 Contact Form Setup

The contact form sends emails using Gmail SMTP. To set it up:

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password for the application
3. Use your Gmail address in `EMAIL_USER`
4. Use the App Password in `EMAIL_PASS`
5. Set your contact email in `CONTACT_EMAIL`

## 🎨 Customization

### Adding Your CV
1. Save your CV as `Faith_Wairimu_CV.pdf`
2. Place it in the project root directory
3. The download link will work automatically

### Updating Content
- **Personal Info**: Edit the text in `index.html`
- **Skills**: Update the skills section in `index.html`
- **Projects**: Add new projects in `index.html`
- **Contact Info**: Update your social links in `index.html`

### Styling
- **Colors**: Modify CSS variables in `styles.css`
- **Animations**: Adjust animation timings and effects
- **Layout**: Customize responsive breakpoints

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Deploy to Cloud
The app is ready to deploy to:
- Heroku
- Vercel
- Netlify
- DigitalOcean
- AWS

Make sure to set environment variables in your hosting platform.

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3 (with animations and glass morphism)
- Vanilla JavaScript
- Responsive Design

### Backend
- Node.js
- Express.js
- Nodemailer (email service)
- CORS (cross-origin requests)
- Helmet (security)
- Express Rate Limit (rate limiting)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📄 License

MIT License - feel free to use this code for your own portfolio.

---

**Built with ❤️ by Faith Wairimu**


