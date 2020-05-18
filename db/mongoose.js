var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user:123@personal-wm8hh.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(!err){
        console.log('MongoDB Connection Succeeded.');
    }else{
        console.log('MongoDB Connection err.'+err);
    }
})