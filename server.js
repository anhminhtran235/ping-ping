const express = require('express');
const connectDb = require('./config/db');
const sendPing = require('./sendPing');
const path = require('path');

const app = express();

// Connect Database
connectDb();

// Init Middleware
app.use(express.json({ extended: false }));

// Router
app.use('/api/appUrl', require('./routes/api/appUrl'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port ' + PORT));

// Sending ping to subscribed urls
const tenMinutes = 10 * 60 * 1000;
setInterval(sendPing, tenMinutes);
