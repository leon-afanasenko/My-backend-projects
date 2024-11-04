const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendEmail = async (recipient) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: recipient.email,
    subject: recipient.subject,
    text: recipient.text,
    html: `<p>${recipient.text}</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Письмо отправлено: " + info.response);
  } catch (error) {
    console.log("Ошибка: " + error.message);
  }
};

const recipients = [
  { email: process.env.RECIPIENT_1, subject: "Тема 1", text: "Текст 1" },
  { email: process.env.RECIPIENT_2, subject: "Тема 2", text: "Текст 2" },
  { email: process.env.RECIPIENT_3, subject: "Тема 3", text: "Текст 3" },
];

const sendEmails = async () => {
  for (const recipient of recipients) {
    await sendEmail(recipient);
  }
};

sendEmails();
