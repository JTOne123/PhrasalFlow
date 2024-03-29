const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

app.use(cors())

// Serve static files from the same directory
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.send('Hello from our server!')
})

app.listen(8080, () => {
    console.log('server listening on port 8080')
})