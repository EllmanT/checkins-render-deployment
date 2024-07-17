const nodemailer = require("nodemailer");

const hbs = require("nodemailer-express-handlebars");
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

  //configuring the handlebars plugin
  // const hbsOptions = {
  //   viewEngine: {
  //     defaultLayout: false,
  //   },
  //   viewPath: "/backend/utils/email_template",
  // };

  // transporter.use("compile", hbs(hbsOptions));

  const mailOptions = {
    from: {
      name: "Axis Solutions",
      address: "revmax@axissol.com",
    },
    to: options.email,
    subject: options.subject,
  //  text: options.message,
 //   template: "emailResponse",
    html: `
    
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h3>
  Dear ${options.message},
        
    </h3>
<p>Thank you for visiting our office. We appreciate your time and trust in our services. We hope that your experience with us was positive and met your expectations.
</p>
<p>If you have any further questions, concerns, or feedback, please don't hesitate to reach out to us. We value your input and strive to continuously improve our services.
</p>
<p>We look forward to assisting you again in the future. Travel safe and have a wonderful day!
</p>
<p>Best Regards</p>
    <img src="https://i.ibb.co/gbYtgDM/footer-image.png" alt="Footer Image" style="display: block; margin-top: 1rem;">

</body>
</html>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
