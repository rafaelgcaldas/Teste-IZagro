const emailCtrl = require('../controller/emailController.js');

module.exports = (app) => {
    app.route('/api/email')
        .post(emailCtrl.sendEmail)
} 