const express = require("express");
require("dotenv").config();
const dbConnection = require("./db");
const auth = require('./routes/auth')
const conversation = require('./routes/conversation')
const message = require('./routes/message')
const cors = require('cors');

const app = express();
const PORT = parseInt(process.env.PORT) || 4000 ;

// DB CONNECTIONS
// YOU MUST FILL .env BEFORE START
dbConnection();

// Middlewares
app.use(express.json())
app.use(cors());

// Routes
app.use('/login',auth)
app.use('/conversation',conversation)
app.use('/message',message)
app.listen(PORT, () => console.log(`listening on ${PORT}`));
