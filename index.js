const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

// connection db start

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.blxur.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// connection db end


const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 4000;

app.get('/', (req, res) => {
    res.send("hello from db it's working working")
})



// DB counnect

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Add_service section start
client.connect(err => {
  const AddServiceCollection = client.db("Home_service_agency").collection("Add_service");

app.post('/addService', (req,res)=>{
    const service = req.body;
    console.log('service data..',service);
    AddServiceCollection.insertOne(service)
    .then(result=>{
        res.send(result.insertedCount > 0)
    })
})

app.get('/addService', (req,res)=>{
    AddServiceCollection.find()
    .toArray((err,items)=>{
        res.send(items)
    })
})


});

// Add_service section end



// testimonial section start
client.connect(err => {
    const testimonialCollection = client.db("Home_service_agency").collection("testimonial");
  app.post('/Review', (req,res)=>{
      const testimonials_public = req.body;
      console.log('testimonial data..',testimonials_public);
      testimonialCollection.insertOne(testimonials_public)
      .then(result=>{
          res.send(result.insertedCount > 0)
      })
  })
  app.get('/Review', (req,res)=>{

    testimonialCollection.find()
    .toArray((err,items)=>{
        res.send(items)
    })
})
  });
  // testimonial section end





  client.connect(err => {
    const orderListCollection = client.db("Home_service_agency").collection("orderList");
  app.post('/OrderList', (req,res)=>{
      const order = req.body;
      console.log('service data..',order);
      orderListCollection.insertOne(order)
      .then(result=>{
          res.send(result.insertedCount > 0)
      })
      app.get('/OrderList', (req,res)=>{
        orderListCollection.insertOne(order)
        .find()
          .toArray((err,items)=>{
              res.send(items)
          })
      })
  })
  


  

  
  });






app.listen(process.env.PORT || port)


