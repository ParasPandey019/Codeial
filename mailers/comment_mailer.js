const nodemailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    console.log('inside newComment Mailer', comment);
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'abc@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published",
        // html: '<h1>Yup, your comment is now published</h1>'
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}