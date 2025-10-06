const sgMail = require("@sendgrid/mail");
require("dotenv").config(); // load .env file

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: "nidhishj100@gmail.com",
  from: process.env.SENDGRID_FROM_EMAIL,
  subject: "✅ SendGrid Test Email from CognivistaX",
  text: "This is a test email using SendGrid and Node.js!",
  html: "<strong>This is a test email using SendGrid and Node.js!</strong>",
};

sgMail
  .send(msg)
  .then(() => console.log("✅ Email sent successfully!"))
  .catch((error) => console.error("❌ Error sending email:", error));
