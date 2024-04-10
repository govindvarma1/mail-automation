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

    transporter.use('compile', inlineBase64({ cidPrefix: 'somePrefix_' }));

    const base64Image = sheets.values[row][1].split(",")[1]; // Extracting base64 part after the comma

    const mailOptions = {
        from: `Telugu Cultural Association <${process.env.EMAIL}>`,
        to: `${sheets.values[row][0]}`,
        subject: "Food Coupon of TCA's Ugadi Event",
        html: `
        <html>
<head>
    <title>Food Coupon</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }
        .container {
            max-width: 1000px;
            padding: 20px 0;
        }
        p {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        img {
            display: block;
            margin: 0 auto;
            max-width: 100%;
            height: auto;
        }
        .note {
            font-size: 14px;
        }
        .qr-code {
            width: 250px; /* Adjust the size of the QR code image as needed */
            margin: 20px 0;
        }
        .warning {
            color: red;
        }
    </style>
</head>
<body>
    <div class="container">
        <p>Dear <b>{name}</b>,</p>
        <p>Wish you and your family a very <b>Happy Ugadi!</b></p>
        <p>We invite you to join us at Auditorium 1, Convention Centre on 19th April to celebrate the festival of Ugadi - Telugu New Year from 7.30 PM onwards & enjoy the delicious <b>Telugu Bojanam.</b></p>
        <img class="qr-code" src="data:image/png;base64,${base64Image}" alt="QR Code">
        <p class="note">NOTE:<br/>
            1. The food will be served from 7.30 pm onwards outside the Convention Centre.<br/>
            2. Reach there with the QR Code Coupon given above to avail the food facility.<br/>
            3. <span class="warning">The coupon is Unique & One Time Redeemable.</span> So make sure you are not sharing the link with anyone else.<br/>
        </p>
    </div>
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


