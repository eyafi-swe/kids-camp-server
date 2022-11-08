const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors');
require('dotenv').config();
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bz2bbta.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async()=>{
  try {
    const testcollection = client.db("testServices").collection("testing");

    const doc = {
      title: "Active Teaching",
      image:"https://i.postimg.cc/DyZbjh1k/ativelearning.png",
      content: "No bytes, no problem. Just insert a document, KIDS CAMP",
      date:new Date()
    }
    const result = await testcollection.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
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