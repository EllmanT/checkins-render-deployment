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
      address: process.env.SMPT_MAIL,
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
    <h1>
        Testing handlebars
        
    </h1>
    <p>${options.message}</p>
    <img src="./footer-image.png" alt="Footer Image" style="display: block; margin-top: 1rem;">

</body>
</html>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
