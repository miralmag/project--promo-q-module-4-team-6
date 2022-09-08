const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cors = require('cors');

const server = express();
server.set('view engine', 'ejs');

server.use(cors());
server.use(express.json({ limit: '10mb' }));

const serverPort = process.env.PORT || 4000;
server.listen(serverPort, () => {
  console.log('listening' + serverPort);
});

const saveCard = [];

//endpoints

server.post('/card', (req, resp) => {
  if (
    req.body.palette === '' &&
    req.body.name === '' &&
    req.body.job === '' &&
    req.body.phone === '' &&
    req.body.email === '' &&
    req.body.linkedin === '' &&
    req.body.github === '' &&
    req.body.photo === ''
  ) {
    const responseError = {
      success: false,
      error: 'Faltan datos',
    };
  } else {
    const newCard = {
      id: uuidv4(),
      ...req.body,
    };
    saveCard.push(newCard);
    const responseSuccess = {
      cardURL: `http://localhost:4000/card/${newCard.id}`,
      success: true,
    };
    console.log(req.body);
    resp.json(responseSuccess);
  }
});

server.get('/card/:id', (req, res) => {
  console.log(req.params);

  const cardObject = saveCard.find((card) => card.id === req.params.id);

  res.render('card', cardObject);
});

const staticServer = './web';
server.use(express.static(staticServer));

const staticServerStyles = './public';
server.use(express.static(staticServerStyles));
