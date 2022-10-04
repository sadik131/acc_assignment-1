const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
require('dotenv').config();
const server = express()
const port = process.env.PORT || 4000;


//middleware
server.use(cors())
server.use(express.json())

//router middleware
server.use('/user', userRoutes)


//defult 
server.get('/', (req, res) => {
    res.send('Hello, Server running successfully.')
})

server.listen(port, () => {
    console.log(`Listening port: ${port}`)
})