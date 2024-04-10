import nodemailer from "nodemailer";
import inlineBase64 from 'nodemailer-plugin-inline-base64';

export const sendMail = (row, sheets) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    // Apply the inlineBase64 plugin to the transporter
    transporter.use('compile', inlineBase64({ cidPrefix: 'somePrefix_' }));

    // Extract base64 image data from sheets
    const base64Image = sheets.values[row][1].split(",")[1]; // Extracting base64 part after the comma

    const mailOptions = {
        from: `<${process.env.EMAIL}>`,
        to: `${sheets.values[row][0]}`,
        subject: 'NodeMailer Testing',
        html: `
            <html>
            <head>
                <title>NodeMailer Testing</title>
            </head>
            <body>
                <img src="data:image/png;base64,${base64Image}" alt="Image">
            </body>
            </html>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Message sent: %s", info.messageId);
        }
    });
};


