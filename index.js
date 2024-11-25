const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to the PRM App Server!");
})

app.listen(port, () => {
    console.log("Server is running from the Port:", port);
})