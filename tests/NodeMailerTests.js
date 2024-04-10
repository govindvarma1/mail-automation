import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config();

if(!process.env.EMAIL || !process.env.PASSWORD) {
    console.error("Please provide EMAIL and PASSWORD environment variables.");
    process.exit(1);
}

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass:  process.env.PASSWORD
    }
});


const mailOptions = {
    from: `<${process.env.EMAIL}>`,
    to: `skallepalli08@gmail.com`,
    subject: 'NodeMailer Testing',
    html: '<b>Hello World</b>',
};


transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error("Error sending email:", error);
    } else {
        console.log("Message sent: %s", info.messageId);
    }
});
