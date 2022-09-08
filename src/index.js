const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cors = require('cors');

const server = express();
server.set('view engine', 'ejs');

server.use(cors());
server.use(express.json({ limit: '10mb' }));

const Database = require('better-sqlite3');
const db = new Database('./database.db', { verbose: console.log });

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
  // console.log(req.params);
  // const cardObject = saveCard.find((card) => card.id === req.params.id);
  // res.render('card', cardObject);
  const idParam = req.params.id;

  const query = db.prepare('SELECT * FROM datacard WHERE id=?');
  const uniqueCard = query.all(idParam);
  console.log(uniqueCard);
  res.json({ success: true, uniqueCard });
});

const staticServer = './web';
server.use(express.static(staticServer));

const staticServerStyles = './public';
server.use(express.static(staticServerStyles));
