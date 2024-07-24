const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.post('/send', (req, res) => {
    const { name, email, message } = req.body;

    // Configure the transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email provider here
        auth: {
            user: 'your-email@gmail.com', // Your email
            pass: 'your-email-password' // Your email password
        }
    });

    // Configure the mail options
    const mailOptions = {
        from: email,
        to: 'your-email@gmail.com', // Your email where you want to receive the messages
        subject: `Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ status: 'fail' });
        }
        res.status(200).json({ status: 'success' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
