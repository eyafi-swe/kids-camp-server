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

    // const doc = [
    //   {
    //     title: "Elementary Education",
    //     image: "https://i.postimg.cc/XJhkKqB7/elementary.jpg",
    //     fee: "4000 BDT",
    //     method: "At Home",
    //     tutor: "Eyafi Neo",
    //     rating: "4",
    //     description: "I serve Elementary Education to Children at home. Primary education or elementary education is typically the first stage of formal education, coming after preschool/kindergarten and before secondary school. I teach children from zero level to class five students. Making strong the basic knowledge of a kid is the main motive.",
    //     date: new Date()
    //   },
    //   {
    //     title: "Computer Training",
    //     image: "https://i.postimg.cc/BbB8J5Pz/computer.jpg",
    //     fee: "4500 BDT",
    //     method: "At Home",
    //     tutor: "Eyafi Neo",
    //     rating: "5",
    //     description: "I serve Computer Training Fundamental to Children at home. Knowledge of Computer is mandatory for all in this era. Children also should learn Computer. I train children from zero level knowledge and give them a fair training of basic usage of Computer.",
    //     date: new Date()
    //   },
    //   {
    //     title: "Painting and Drawing",
    //     image: "https://i.postimg.cc/kXqhJnt6/painting.jpg",
    //     fee: "4000 BDT",
    //     method: "At Home",
    //     tutor: "Eyafi Neo",
    //     rating: "4",
    //     description: "I teach painting and drawing to children. Painting is an amazing hobby and also good for profession.My service is home based, also available in my place. Teaching painting and drawing is done very carefully.",
    //     date: new Date()
    //   },
    //   {
    //     title: "Swimming Camp",
    //     image: "https://i.postimg.cc/7ZqTBZQV/swimming.webp",
    //     fee: "4000 BDT",
    //     method: "At My Place",
    //     tutor: "Eyafi Neo",
    //     rating: "4",
    //     description: "Swimming is a mandatory thing for all ages of human. Everyone should learng swimming from his childhood. I serve swimming training to children. The whole training session is for one month only. Children become very skillful in swimming within this period of time.",
    //     date: new Date()
    //   },
    //   {
    //     title: "Music and Guitar",
    //     image: "https://i.postimg.cc/gcsm1HJh/music.jpg",
    //     fee: "4000 BDT",
    //     method: "At Home",
    //     tutor: "Eyafi Neo",
    //     rating: "4",
    //     description: "I serve Elementary Education to Children at home. Primary education or elementary education is typically the first stage of formal education, coming after preschool/kindergarten and before secondary school. I teach children from zero level to class five students. Making strong the basic knowledge of a kid is the main motive.",
    //     date: new Date()
    //   },
    //   {
    //     title: "Yoga Session",
    //     image: "https://i.postimg.cc/t4yKFycW/image.jpg",
    //     fee: "4000 BDT",
    //     method: "At Home",
    //     tutor: "Eyafi Neo",
    //     rating: "4",
    //     description: "According to the National Institutes of Health, scientific evidence shows that yoga supports stress management, mental health, mindfulness, healthy eating, weight loss and quality sleep. I train yoga at home. Yoga is also very necessary for your children.",
    //     date: new Date()
    //   },
    // ];
    // const options = { ordered: true };
    // const result = await serviceCollection.insertMany(doc,options);
    // console.log(`${result.insertedCount} documents were inserted`);

    app.get('/services',async(req,res)=>{
      const query = {};
      
      const cursor = serviceCollection.find(query);
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