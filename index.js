const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
const db = client.db('hasan-portfolio');
const userColl = db.collection('visitorData');
const reviewColl = db.collection('reviewData');
const orderColl = db.collection('orderData');


const run = async () => {
    try {
        // TODO:when backend is deployment this line going to commet
        // await client.connect();
        // TODO:when backend is deployment this line going to commet
        // await client.db('admin').command({ ping: 1 })
        console.log("Pinged your deployment!!!!");
    }
    finally {
        // await client.close()
    }
}
run().catch(console.dre);

// VISITOR DATA POST
app.post('/visitor', async(req, res) => {
    const data = req.body;
    const result = await userColl.insertOne(data);
    res.send(result)
})

// GET VISITOR DATA
app.get('/visitor', async (req, res) => {
    const data = await userColl.find().toArray();
    res.send(data)
})

// REVIEWR DATA POST
app.post('/review', async(req, res) => {
    const data = req.body;
    const result = await reviewColl.insertOne(data);
    res.send(result)
})

// GET REVIEWR DATA
app.get('/review', async (req, res) => {
    const data = await reviewColl.find().toArray();
    res.send(data)
})

// DELETE REVIEW DATA
app.delete('/review/:id', async (req, res) =>{
    const {id} = req.params;
    const data = await reviewColl.deleteOne({
        _id: new ObjectId(id)
    })
    res.send(data)
})

// FOOTER ORDER API
app.post('/order', async(req, res) => {
    const data = req.body;
    const result = await orderColl.insertOne(data);
    res.send(result)
})

// GET ORDER DATA
app.get('/order', async (req, res) => {
    const data = await orderColl.find().toArray();
    res.send(data)
})

app.get('/', (req, res) => {
  res.send('Surver is runing fine')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})