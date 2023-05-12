const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        secure: true,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: 'New Message from Contact Form',
        html: `
        <h3>Name: ${options.name}</h3>
        <h3>Email: ${options.email}</h3>
        <p>${options.message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;