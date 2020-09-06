const express = require('express');
const app = express();
const path = require('path');

// Serve a static file
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

let responseObject = {};
app.enable('trust proxy');
app.get('/api/whoami', (req, res) => {
  responseObject['ipaddress'] = req.ip;
  responseObject['language'] = req.get('Accept-Language');
  responseObject['software'] = req.get('User-Agent');

  res.json(responseObject);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
