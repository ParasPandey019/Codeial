const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "altair paras",
    pass: "123",
  },
});


const renderTemplate = (data, relPath) => {
    let mailHTML;
    ejs.RenderFileCallback(
        path.join(__dirname,'../views/mailers',relPath),
        data,
        function(err, template){
            if(err){console.log("Template render error"); return;}
            mailHTML = template;
        });

        return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}
