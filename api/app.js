const express = require('express'),
  bodyParser = require('body-parser'),
  app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('./middlaware/middlaware.js'));

require('./routes/emailRoute.js')(app);

app.listen(3001, () => {
  console.log('Localhost rodando na porta 3001');
});

