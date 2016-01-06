 Meteor.startup(function () {
     process.env.MAIL_URL = 'smtp://postmaster@sandbox6660ff6a13e846a08099f983469d65aa.mailgun.org:2cddc098196ae45c87b8dc3c1b72a330@smtp.mailgun.org:587'
     return
 });


 Meteor.methods({
     sendEmail: function (to, from, subject, text) {
         check([to, from, subject, text], [String]);

         // Let other method calls from the same client start running,
         // without waiting for the email sending to complete.
         this.unblock();

         Email.send({
             to: to,
             from: from,
             subject: subject,
             text: text
         });
     }
 });