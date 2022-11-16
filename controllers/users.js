const express=require('express');

const router=express.Router();


const User = require('../models/userSchema');
const Food= require('../models/food');


router.post('/signup',(req,res)=>{
    if(req.body.username != '' && req.body.password!=''){
        User.create(req.body,(err,createdUser)=>{ //the input to the form created req.body
                                                //using the input req.body to make createdUser in the mongoDB
            // console.log(req.body);
            if(err){
                console.log(`error in create : ${err.message}`);
                res.send('Duplicated username not allowed, please try again');
            }else{
                // res.send(createdUser);
                // router.post('/session/verify',(req,res)=>{
                    Food.find({},(err,item)=>{
                        if(err){
                            console.log('asd' +err.message)
                        }else{
                            res.render('frontpage',{item,userDetails:req.body})
                        }
                    })
            }
        })}else{
            res.send('please fill in the required fields')
        }
}); //THIS REQUIRED ONE PAGE


router.get('/signup/new',(req,res)=>{
    res.render('signup')
})


module.exports=router;