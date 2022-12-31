

var express = require('express');
var app = express();
const cors = require("cors")
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { MongoClient, ServerApiVersion } = require('mongodb');
const { default: Post } = require('../CRUD-APP/client/src/Post');
const uri = "mongodb://localhost:27017";
mongoose.set('strictQuery', false)


mongoose.connect('mongodb://127.0.0.1:27017/db', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  
});

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())




const AdsModel = mongoose.model(
  'ads',
  new Schema({
    company_id: String,
    Primarytext: String,
    headline: String,
    description: String,
    CTA: String,
    imageUrl: String,
  })
);


const CompanyModel = mongoose.model(
  'companies',
  new Schema({
    id: String,
    name: String,
    url: String
  })
);

app.get("/",(req,res)=>{
  res.send("Hello there")
})



app.get('/test', async (req, res) => 

{
  const search = req.query.search
  console.log(search)
  AdsModel.aggregate([
  {
     $lookup: {
        from: "companies",
        localField: "company_id",
        foreignField: "id",
        as: "company"
     }
  },
  {$unwind:"$company"},
  {
    $match:{
      
      $or:[
        {"company.name": {$regex: search}} ,
        {"Primarytext":{$regex: search}},
       { "headline":{$regex: search}},
        {"description":{$regex: search}}
      
      ]
    }
  }


 
]).exec(function(error, result) {
  res.send(result)
});
})


app.put("/update/:id",(req,res)=>{
      Post.findByIdAndUpdate(
        {_id: req.params.id},
        {title:req.body.title,
        description:req.body.description}
      ).then((doc) => console.log(doc))
      .catch((err) => console.log(err));
} )

app.listen(3001);
