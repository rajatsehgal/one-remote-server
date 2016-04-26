const express = require('express');
const bodyParser = require('body-parser');
const exec = require('child_process').exec;

const app = express();
const PORT = 2346;

app.use(bodyParser.json());

app.post('/command', (req, res) => {
  const body = req.body;
  const type = body.type;
  const device = body.device.toUpperCase();
  const key = body.key.toUpperCase();
  const commandString = `irsend ${type} ${device} KEY_${key}`;

  exec(commandString, function (error) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    res.status(200).end();
  });
});

app.listen(PORT, function () {
  console.log(`One Remote listening at http://localhost:${PORT}`);
});
