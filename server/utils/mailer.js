const nodemailer = require("nodemailer");

const mailer = (to, subject, html) => {
    let status;

    //set mail transporter
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        requireTLS: true,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    });

    const mailOptions = {
        from: `"OpenXcell" <${process.env.EMAIL}>`,
        to: to,
        subject: subject,
        html: html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error);
    });

    return status;
};

module.exports = mailer;
