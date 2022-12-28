// function signin()
// {
// var user=document.getElementById("username").value;
// //document.write(user);
// console.log(user);
// var pass=document.getElementById("password").value;
// //document.write(pass);
// console.log(pass);
// }
// var user='Arjan';
// var pass='@Arjan196'
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/database";
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("pharmacyms");
//     dbo.collection("users").findOne({username:user,password:pass}, function(err, result) {
//       if (err) throw err;
//       console.log(result.password);
//       db.close();
//     });
//   });

var express=require("express");
var json=require("json");
var bodyParser=require("body-parser");
var ejs=require("ejs");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ELibrary');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
   console.log("connection succeeded");
})
var app=express()
app.set("view engine","ejs");

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
   extended: true
}));
const router = express.Router();



 router.get('/index',function(req,res){
    res.sendFile(__dirname+'/index.html');
    //__dirname : It will resolve to your project folder.
  });
  router.get('/signup',function(req,res){
   res.sendFile(__dirname+'/signup.html');
   //__dirname : It will resolve to your project folder.
 });
 router.get('/signin',function(req,res){
   res.sendFile(__dirname+'/signin.html');
   //__dirname : It will resolve to your project folder.
 });
 

app.post('/sign_up', function(req,res){
  
   var name= req.body.name;
   var email =req.body.username;
   var pass = req.body.password;
 

   var data = {
      "name":name,
      "email":email,
      "password":pass
     
   }
   db.collection('users').insertOne(data,function(err, collection){
   if (err) throw err;
      console.log("Record inserted Successfully");
   });
   return res.sendFile(__dirname+'/success.html');
})

app.post('/contact', function(req,res){
  
   var name= req.body.name;
   var email =req.body.email;
   var pass = req.body.phone;
   var comm = req.body.comments;
 

   var data = {
      "name":name,
      "email":email,
      "password":pass,
      "comments":comm
   }
   db.collection('contactus').insertOne(data,function(err, collection){
   if (err) throw err;
      console.log("Record inserted Successfully");
     // window.alert("We will get back to you shortly");
   });
   return res.sendFile(__dirname+'/index.html');
})


// const userschema=
// {
//    username:String,
//    password:String
// }

// const User=mongoose.model('User',userschema);




// router.get('/fetch',function(req,res){
//    // var email =req.body.email;
//    // var pass = req.body.password;
//    // console.log(email);
//    // console.log(pass);
//    // var data = {
//    //    "name": name,
//    //    "email":email,
//    //    "password":pass,
//    //    "phone":phone
//    // }
//    var cursor =db.collection('users').find({});
//    cursor.forEach(json.printjson());
//   res.render('view',{

//   });
 
//    });


app.post('/sign_in', function(req,res){
   var email =req.body.username;
   var pass = req.body.password;
   console.log(email);
   console.log(pass);
   // var data = {
   //    "name": name,
   //    "email":email,
   //    "password":pass,
   //    "phone":phone
   // }
   db.collection('users').count({email:email,password:pass},function(err, collection){
   if (err) throw err;

   console.log(collection);
 if(collection!=0)
 {

      console.log("login successfull");
      return res.sendFile(__dirname+'/index.html');
 }
 else
 {
   
   console.log("login unsuccessfull");
   
  return res.redirect('signinfailure.html');


 }
   });
})

app.use('/', router);
app.get('/',router,function(req,res){
   res.set({
      'Access-control-Allow-Origin': '*'
   });
   return res.sendFile(__dirname+'/signin.html');
}).listen(3000)

console.log("server listening at port 3000");