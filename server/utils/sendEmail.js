const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: process.env.SMPT_MAIL,
        subject: 'New Message from Contact Form',
        text: `Name: ${options.name}\nEmail: ${options.email}\nMessage: ${options.message}`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;