const email = require('../email/email.js');

module.exports = {
    sendEmail
}

function sendEmail(req, res, next) {
    email.send(req.body, function (err) {
        if (err)
            res.status(err).json({ error: dados });
        else
            res.status(200).json({ email: dados });
    });  
}
