const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bz2bbta.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
  try {
    const serviceCollection = client.db("allservices").collection("services");
    const blogsCollection = client.db('blogs').collection('newblog');
    const serviceReviewsCollection = client.db('serviceReview').collection('reviews');

    app.get('/services', async (req, res) => {
      const query = {};
      const size = parseInt(req.query.size);
      const cursor = serviceCollection.find(query);
      const result = await cursor.limit(size).toArray();
      res.send(result);
    })

    app.get('/services/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await serviceCollection.findOne(query);
      res.send(service);
    })

    app.get('/blog', async (req, res) => {
      const query = {};
      const cursor = blogsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post('/reviews', async (req, res) => {
      const review = req.body;
      const result = await serviceReviewsCollection.insertOne(review);
      console.log(`Inserted with the _id: ${result.insertedId}`);
      res.send({result,review});
      // console.log(review)
    })

    app.get('/reviews',async(req,res)=>{
      let query = {};
      const service_id_query = req.query.service_id;
      if(service_id_query){
        query = {service_id:service_id_query};
      }
      const cursor = await serviceReviewsCollection.find(query);
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