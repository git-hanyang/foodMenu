const express=require('express');

const router=express.Router();

const User=require('../models/userSchema');



router.post('/verify',(req,res)=>{ 
        User.findOne({username:req.body.username},(err,userFound)=>{ //pass username as req.body.username
            // console.log(userFound); //userFound is from database
            if(err){
                console.log('username not found '+err.message)
            }
            if (userFound && req.body.username != '' && req.body.password!=''){
                if(req.body.password===userFound.password){
                    req.session.currentUser=userFound; //pass this value to session key
                    // res.send(userFound);
                    res.redirect('/food/frontpage');
                    }
                    else{
                        res.send('incorrect username or password');
                    }
            }else{
                res.send('user id / password is wrong')
            }
        })
    });

module.exports=router;