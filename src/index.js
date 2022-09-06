const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cors = require('cors');

const server = express();

server.use(cors());
server.use(express.json({ limit: '10mb' }));

const port = 4000;
server.listen(port, () => {
  console.log('listening' + port);
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

const staticServer = './web';
server.use(express.static(staticServer));
