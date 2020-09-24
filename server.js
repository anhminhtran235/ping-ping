const express = require('express');
const connectDb = require('./config/db');
const sendPing = require('./sendPing');
const app = express();

// Connect Database
connectDb();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Runnning'));

// Router
app.use('/api/appUrl', require('./routes/api/appUrl'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port ' + PORT));

// Sending ping to subscribed urls
const fiveSeconds = 5 * 1000;
setInterval(sendPing, fiveSeconds);
