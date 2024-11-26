const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT | 5000;
const cors = require("cors");

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fbieij7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const prmsAppDB = client.db("prmsAppDB");
        const reportColelction = prmsAppDB.collection("reports");

        // GET method for collection all reports from DB
        app.get('/reports', async (req, res) => {
            const query = {};
            const cursor = reportColelction.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        // POST method for saving reports to DB
        app.post('/reports', async (req, res) => {
            const reportData = req.body;
            const result = await reportColelction.insertOne(reportData);
            res.send(result);
        })

        // DELETE method for deleting reports from DB
        app.delete('/reports/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await reportColelction.deleteOne(query);
            res.send(result);
        })

        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("Welcome to the PRM App Server!");
})

app.listen(port, () => {
    console.log("Server is running from the Port:", port);
})