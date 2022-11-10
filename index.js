const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bz2bbta.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: 'unauthorized access' });
  }
  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: 'Forbidden access' });
    }
    req.decoded = decoded;
    next();
  })
}


const run = async () => {
  try {
    const serviceCollection = client.db("allservices").collection("services");
    const blogsCollection = client.db('blogs').collection('newblog');
    const serviceReviewsCollection = client.db('serviceReview').collection('reviews');

    app.get('/services', async (req, res) => {
      const query = {};
      const size = parseInt(req.query.size);
      const cursor = serviceCollection.find(query).sort({date:-1});
      const result = await cursor.limit(size).toArray();
      res.send(result);
    })


    app.post('/services', async (req, res) => {
      let serviceObj = req.body;
      serviceObj.date = new Date();
      const result = await serviceCollection.insertOne(serviceObj);
      console.log(`Inserted with the _id: ${result.insertedId}`);
      console.log(serviceObj);
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
      res.send({ result, review });
    })

    app.post('/jwt', (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
      res.send({ token })
    })

    app.get('/reviews', verifyJWT, async (req, res) => {

      const decoded = req.decoded;


      let query = {};

      const service_id_query = req.query.service_id;
      const email_query = req.query.user_email;

      if (service_id_query) {
        query = { service_id: service_id_query };
      }
      if (email_query) {
        query = { user_email: email_query };
        if (decoded.email !== req.query.user_email) {
          res.status(403).send({ message: 'unauthorized access' })
        }

      }
      const cursor = await serviceReviewsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    })

    app.delete('/reviews/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await serviceReviewsCollection.deleteOne(query);
      console.log(result);
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