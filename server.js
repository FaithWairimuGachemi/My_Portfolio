const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false, // Allow inline styles for our portfolio
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Contact form rate limiting (more restrictive)
const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // limit each IP to 5 contact form submissions per hour
    message: 'Too many contact form submissions, please try again later.'
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Email transporter configuration
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Routes

// Serve the main portfolio page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to get portfolio stats
app.get('/api/stats', (req, res) => {
    const stats = {
        projectsCompleted: 2,
        technicalSkills: 8,
        yearsExperience: 2,
        lastUpdated: new Date().toISOString()
    };
    res.json(stats);
});

// Contact form endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address'
            });
        }

        // Email to you (notification)
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
            subject: `Portfolio Contact: ${subject || 'New Message'}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <hr>
                <p><small>Sent from your portfolio website</small></p>
            `
        };

        // Auto-reply to sender
        const autoReply = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank you for contacting Faith Wairimu',
            html: `
                <h2>Thank you for your message!</h2>
                <p>Hi ${name},</p>
                <p>Thank you for reaching out through my portfolio website. I have received your message and will get back to you as soon as possible.</p>
                <p>Best regards,<br>Faith Wairimu</p>
                <hr>
                <p><small>This is an automated response from faithwairimu.com</small></p>
            `
        };

        // Send emails
        await transporter.sendMail(mailOptions);
        await transporter.sendMail(autoReply);

        res.json({
            success: true,
            message: 'Message sent successfully! I will get back to you soon.'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Sorry, there was an error sending your message. Please try again later.'
        });
    }
});

// API endpoint to get projects
app.get('/api/projects', (req, res) => {
    const projects = [
        {
            id: 1,
            title: 'Shinelooks',
            description: 'Customer loyalty rewards system that allows customers to earn and redeem points for services.',
            technologies: ['JavaScript', 'Node.js', 'SQL', 'HTML', 'CSS'],
            status: 'completed',
            featured: true
        },
        {
            id: 2,
            title: 'Portfolio Website',
            description: 'A responsive personal portfolio showcasing skills and projects with interactive typewriter effects.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
            status: 'completed',
            featured: true
        }
    ];
    res.json(projects);
});

// API endpoint to get skills
app.get('/api/skills', (req, res) => {
    const skills = {
        programmingLanguages: ['JavaScript', 'Java', 'C', 'Python'],
        webDevelopment: ['HTML', 'CSS', 'JavaScript', 'React'],
        databaseBackend: ['SQL', 'Python', 'Node.js', 'Database Management'],
        tools: ['Git', 'GitHub', 'VS Code', 'Responsive Design']
    };
    res.json(skills);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Error handler
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Portfolio server running on port ${PORT}`);
    console.log(`📱 Local: http://localhost:${PORT}`);
    console.log(`🌐 Network: http://your-ip:${PORT}`);
});

module.exports = app;
