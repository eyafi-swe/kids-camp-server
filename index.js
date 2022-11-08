const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors');
require('dotenv').config();
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bz2bbta.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
  try {
    const serviceCollection = client.db("allservices").collection("services");
    const blogsCollection = client.db('blogs').collection('newblog');
    app.get('/services',async(req,res)=>{
      const query = {};
      const size = parseInt(req.query.size);
      const cursor = serviceCollection.find(query);
      const result = await cursor.limit(size).toArray();
      res.send(result);
    })

    app.get('/blog', async(req,res)=>{
      const query = {};
      const cursor = blogsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    })

  } finally {

  }
}

run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Kids camp server running!')
})



app.listen(port, () => {
  console.log(`Kids app server listening on port ${port}`)
})