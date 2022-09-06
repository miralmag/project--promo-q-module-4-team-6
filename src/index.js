const express = require('express');
const cors = require('cors');

const server = express();

server.use(cors());
server.use(express.json());

const port = 4000;
server.listen(port, () => {
  console.log('listening' + port);
});

//endpoints

server.post('/card', (req, resp) => {
  const responseSuccess = {
    cardURL: 'https://awesome-profile.herokuapp.com/card/',
    success: true,
  };

  const responseError = {
    success: false,
    error: 'Faltan datos',
  };

  resp.json(responseError);
});

const staticServer = './web';
server.use(express.static(staticServer));
