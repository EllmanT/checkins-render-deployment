const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

 // const imagePath = "./footer-image.png"; // Update the image path as per your file location

  const mailOptions = {
    from: {
      name: "Axis Solutions",
      address: process.env.SMPT_MAIL,
    },
    to: options.email,
    subject: options.subject,
    text: options.message,
  //  html: `<img src="${imagePath}" alt="Footer Image" style="display: block; margin-top: 1rem;">`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;