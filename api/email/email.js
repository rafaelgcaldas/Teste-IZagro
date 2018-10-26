const nodemailer = require('nodemailer'),
    transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'email@gmail.com', //Inserir Email
            pass: 'senha{'//Inserir Senha
        },
        logger: false,
        secure: false
    });

module.exports = {
    send
}

function send(user, callback) {
    let options = {
        from: 'Cadastro Izagro <rafael.gomes@engsolutions.com.br>',
        to: user.email,
        subject: 'Confirmação de Cadastro', //assunto,       
        html: `<h1> <a href="http://www.izagro.com.br"> Olá ${user.nome} Cadastro efetuado com sucesso </a></h1>`//message,
    };

    transport.sendMail(options, function (error, info) {
        if (error)
            console.log(error);
        else
            console.log('Email enviado !' + info.response);
    });
}
