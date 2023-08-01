const connectToMongo = require('./db.js');
const express = require('express');
const cors = require('cors');

connectToMongo();
const app = express();
const port = 5000;

app.use(cors());
// databases -> collections -> documents(JSON file)
app.use(express.json());
//Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
// app.use('/', require('./routes/home'))

// app.get('/', (req, res) => {
//     res.send('Hello Aman');
// })

// app.get('/home', (req, res) => {
//     res.send('Hello home');
// })

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
