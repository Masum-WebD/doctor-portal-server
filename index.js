const express = require('express')
const app = express()
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0apvg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const ServiceCollection =client.db('dorcor_portal').collection('Service')
        app.get('/service', async(req, res)=>{
            const query ={};
            const cursor = ServiceCollection.find(query);
            const service= await cursor.toArray()
            res.send(service);
        })
    }
    finally{

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('doctor portal server site')
})

app.listen(port, () => {
  console.log(`doctor portal on port ${port}`)
})