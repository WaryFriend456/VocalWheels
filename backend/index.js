const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const WebSocket = require('ws');
const axios = require('axios');

const app = express();
const port = 5000;

// MongoDB setup
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { useUnifiedTopology: true });

// WebSocket setup
const ws = new WebSocket('ws://localhost:8081');
let resolveWebSocketData;
let websocketDataPromise = new Promise(resolve => {
    resolveWebSocketData = resolve;
});

ws.on('open', async () => {
    try {
        ws.send(JSON.stringify({ source: "website" }));
        resolveWebSocketData(await new Promise((resolve) => ws.once('message', resolve))); // Ensure initial data
    } catch (err) {
        console.error('Error establishing WebSocket connection:', err);
    }
});

ws.on('message', (data) => {
    console.log('Received: %s', data);
    resolveWebSocketData(data);
    websocketDataPromise = new Promise(resolve => {
        resolveWebSocketData = resolve;
    });
});

// Middleware setup
app.use(cors());
app.use(express.json());

async function fetchMongoData() {
    try {
        const db = client.db("test");
        const collection = db.collection("websitedata");
        const docs = await collection.find().toArray();
        // console.log("fetch",docs);
        return docs;
    } catch (err) {
        console.error("Error fetching MongoDB data:", err);
        throw err;
    }
}

async function getLatestWebSocketData() {
    return websocketDataPromise;
}

app.post('/example', async (req, res) => {
    try {
        const direction = req.body.direction;
        ws.send(JSON.stringify({ direction }));

        // Insert data into MongoDB
        const db = client.db("test");
        const collection = db.collection("websitedata");
        const doc = {
            direction: direction,
            timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        };
        await collection.insertOne(doc);

        // Fetch data from MongoDB
        // const mongoData = await fetchMongoData();

        // const mongoData = await collection.find().toArray();
        // console.log("mongoData",mongoData);
        // const websocketData = await getLatestWebSocketData();
        // console.log("websocketData", websocketData);

        const [mongoData, websocketData] = await Promise.all([
            collection.find().toArray(),
            getLatestWebSocketData()
        ]);

        console.log("mongoData", mongoData);
        console.log("websocketData", websocketData);

        res.json({ mongoData, websocketData: websocketData });
        console.log("Data sent to client");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error processing request: ' + err.message);
    }
});

app.get('/mongodb-data', async (req, res) => {
    try {
        const docs = await fetchMongoData();
        res.json(docs);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching data: ' + err.message);
    }
});

// app.get('/checkStatus', async (req, res) => {
//     try {
//         console.log(websocketDataPromise);
//         if (websocketDataPromise === 'Online') {
//             console.log(websocketDataPromise);
//             res.json({ status: 'Online' });
//         } else {
//             res.json({ status: 'Offline' });
//         }
//     } catch (error) {
//         res.json({ status: 'Offline' });
//     }
//     // try {
//     //     const response = await axios.get('http://127.0.0.1:6000/Status');
//     //     res.json({ status: response.data.status });
//     // } catch (error) {
//     //     res.json({ status: 'Offline' });
//     // }
// });

app.listen(port, async () => {
    try {
        await client.connect();
        console.log(`Server listening on port ${port}`);
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
});