const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://prmsAppDBUser:9Q9VGf5uelf3q8OD@cluster0.fbieij7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
        app.get('/', async (req, res) => {
            const query = {};
            const cursor = reportColelction.find(query);
            const result = await cursor.toArray();
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



// app.get('/', (req, res) => {
//     res.send("Welcome to the PRM App Server!");
// })

app.listen(port, () => {
    console.log("Server is running from the Port:", port);
})