var express = require('express');
var router = express.Router();

var User = require('../models/userModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/add', function(req, res, next) {
  res.render('add');
});
router.post('/add',(req,res)=>{
 var post = new User({
   name : req.body.name,
   class : req.body.class,
   rollNo : req.body.rollno
 })

 let promise = post.save();
 promise.then((doc)=>{
   console.log(doc)
 });
 promise.catch((err)=>{
   console.log(err)
 })
  res.redirect("/");
})

router.get('/view', function(req, res, next) {

  var promise =  User.find();
  promise.then((result)=>{
    res.render('view',{result : result});
  });
  promise.catch((error)=>{
    console.log(error)
  })
});

/* GET search page. */
router.get('/search', function(req, res, next) {
  res.render('search');
  });
  router.post('/search',(req,res)=>{
  User.find({'class': req.body.search})
  .then((data)=>{

    res.render('view',{result : data})
  })
  })
router.get('/delete/:id',(req,res)=>{
  console.log("id = " + req.params.id);
  var id=req.params.id;
  var promise = User.deleteOne({"_id" : id});
  promise.then((data)=>{
    res.redirect('/view');
  });
  promise.catch((err)=>{
    console.log(err)
  })
})

router.get('/update/:id',(req,res)=>{
  var id=req.params.id;
  var promise =User.findOne({"_id" : id});
  promise.then((doc)=>{
    res.render('update',{result : doc})
  })
})

router.post('/update/:id',(req,res)=>{
  console.log("id = " + req.params.id);
  var id=req.params.id;
  var promise = User.findOne({"_id" : id});
  promise.then((data)=>{
    data.name = req.body.name,
    data.class = req.body.class,
    data.rollNo = req.body.rollno
    console.log(data);
    data.save()
    .then((result)=>{
      res.redirect('/view');
    })
    .catch((err)=>{
      console.log(err);
    })
 
  });
  promise.catch((err)=>{
    console.log(err)
  })
})
module.exports = router;
