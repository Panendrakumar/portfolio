const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const axios = require('axios'); // To make HTTP requests

const app = express();
const PORT = process.env.PORT || 3000;
const HUNTER_API_KEY = '56f775634e0084ebe309b995378908a29e7182af'; // Replace with your Hunter.io API key

app.use(bodyParser.json());
app.use(cors());

app.post('/send', async (req, res) => {
    const { name, email, message } = req.body;

    // Verify email using Hunter.io
    try {
        const response = await axios.get(`https://api.hunter.io/v2/email-verifier`, {
            params: {
                email: email,
                api_key: HUNTER_API_KEY
            }
        });

        if (response.data.data.result === 'undeliverable') {
            return res.status(400).json({ status: 'fail', message: 'Invalid email address.' });
        }

        // Proceed with sending the email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'loganyt8ballpool@gmail.com',
                pass: 'deathwolf23456'
            }
        });

        const mailOptions = {
            from: email,
            to: 'panendrabaddiga@gmail.com',
            subject: `Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ status: 'fail' });
            }
            res.status(200).json({ status: 'success' });
        });

    } catch (error) {
        console.error('Email verification error:', error);
        res.status(500).json({ status: 'fail', message: 'Email verification failed.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
