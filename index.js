const express = require('express');
cors = require('cors');
const { connection } = require('./db');
require('dotenv').config();
const port = process.env.PORT;
const app = express();
app.use(cors())
app.use(express.json());
const { userRouter } = require('./routes/user.routes');
app.use('/user', userRouter);
const { dataRouter } = require('./routes/data.routes');
app.use('/data', dataRouter);


app.get('/', (req, res) => {
    res.send(
        {
            message: 'API is working'
        })
    })

app.listen(port, async (req, res) => {
    try {
        await connection;
      
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
})

console.log('Server is running on port', port);
