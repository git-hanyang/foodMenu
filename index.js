
const express = require('express');
const app = express ();
// const port = 3000;
const mongoose = require('mongoose');
const methodOverride=require('method-override');
require("dotenv").config();

const PORT = process.env.PORT || 3000; //process.env for heroku to work // 

id=process.env.id;
password=process.env.password;
// process.env.MONGODB_URI ||

MONGODB_URI=`mongodb+srv://${id}:${password}@cluster0.cmdii1t.mongodb.net/project2`;//will replace in heroku site under Config Vars
mongoURI =  process.env.MONGODB_URI

/////ejs
app.set('view engine','ejs');

const session=require('express-session');
app.use(express.static('public')); //means anything that starts from public directory // ./img/american waffle --> (*ignored front path) public/img/american waffle
    // we use <img src="/image.jpg">. must use the forward slash WITHOUT the dot at the front

app.use(methodOverride('_method')); //use methodOverride as _method
app.use(
    session({
        secret:'anythingasdasd',
        resave:false,
        saveUninitialized:false,
    })
);//need this to define session, so must be on top before passing for session

app.use(express.urlencoded({extended:true})); //decode for POST method
app.listen(PORT,()=>{
    console.log(`listening to port: ${PORT}`)
})

//Mongoose Config
// const mongoURI='mongodb://192.168.1.103:27017/GreatFood';
const db = mongoose.connection;



mongoose.connect(
    mongoURI,
    { useNewUrlParser:true},
    ()=>{console.log(`connection to db is established`)
    }
);

db.on(`error`,(error)=>{
    console.log(`connection to db error found : ${error.message}`)
});

db.on(`disconnected`,()=>{
    console.log(`db disconnected`)
});

// app.get('/',(req,res)=>{
//     res.render('login')
// })

///require user schema for session use
// const User = require('./models/userSchema');

const userController=require('./controllers/users');
const sessionController=require('./controllers/sessions')
const foodController=require('./controllers/food')
app.use('/user',userController);
app.use('/session',sessionController);
app.use('/food',foodController);

app.get('/',(req,res)=>{
    res.redirect('/food')
})
////////////////////////////////////////////////////////////////////////////////session

// app.post('/signup',(req,res)=>{
//     User.create(req.body,(err,createdUser)=>{ //the input to the form created req.body
//                                             //using the input req.body to make createdUser in the mongoDB
//         // console.log(req.body);
//         if(err){
//             console.log(`error in create : ${err.message}`);
//             res.send('Duplicated username not allowed, please try again');
//         }else{
//             // res.send(createdUser);
//             res.redirect('/frontpage')
//         }
//     })
// }); //THIS REQUIRED ONE PAGE


// app.get('/signup/new',(req,res)=>{
//     res.render('signup')
// })

// app.post('/verify',(req,res)=>{
//     User.findOne({username:req.body.username},(err,userFound)=>{ //pass username as req.body.username
//         // console.log(userFound); //userFound is from database
//         if(err){
//             console.log('username not found '+err.message)
//         }
//         if(req.body.password===userFound.password){
//             req.session.currentUser=userFound; //pass this value to session key
//             // res.send(userFound);
//         }
//         else{
//             console.log('invalid password');
//             res.send('invalid username or password');
//         }res.redirect('/frontpage');
//     })
// });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//TO GET FOOD
// const Food=require('./models/food.js'); //each new schema is a new collection for the same database


// app.get('/frontpage',(req,res)=>{
//     res.render('frontpage',{userDetails: req.session.currentUser});//after verify, post the data, or direct to the frontpage
//     // console.log(userDetails) //userDetails undefined, will only be define in ejs frontpage
// })


// app.get('/frontpage',(req,res)=>{
//     Food.find({},(err,item)=>{
//         if(err){
//             console.log('item cannot be found: '+err.message);
//         }
//             // console.log(item.length);
//             // console.log(item);
//             res.render('frontpage',{item, userDetails: req.session.currentUser})//can pass as many objects as I want 
//                                                     //item will be undefined if same render done earlier with diff object //see line 98
//     })
// })

// app.delete('/delete/user',(req,res)=>{ //THIS REQUIRED ONE PAGE
//     req.session.destroy(  //destroy session
//         ()=>{
//         res.redirect('/')
//         }
//     )
// })

// app.get('/add/new',(req,res)=>{
//     Food.find({},(err,userDetails)=>{
//         if(err){
//             console.log('item cannot be found: '+err.message);
//         }if(req.session.currentUser){
//             if(req.session.currentUser.username=='admin'){
//                 res.render('new',{userDetails: req.session.currentUser});
//                 }else{
//                 res.redirect('/')
//                 }
//         }
//     })
// });
// ////require food schema to post food

// app.post('/frontpage',(req,res)=>{ 
//     Food.create(req.body,(err,createdFood)=>{
//         if(err){
//             console.log('fail to create food: '+err.message);
//             res.send('please fill all the required field and check whether food name is duplicated');
//         }else{
//             // res.send(createdFood);
//             res.redirect('frontpage')
//         }
//     })
// })//REQUIRE ONE PAGE
// ////////////////////////////////////////////////////////////////////////////////////////
// app.get('/delete',(req,res)=>{
//     Food.find({},(err,element)=>{
//         if(err){
//             console.log(err)
//         }if(req.session.currentUser){
//             if(req.session.currentUser.username=='admin'){
//             // res.send(item[1].id);
//             console.log(req.session.currentUser);

//             res.render('delete',{element, userDetails:req.session.currentUser});
//             }else{
//                 res.redirect('/')
//             }
//         }
//     })
// });

// app.get('/frontpage/item/:id',(req,res)=>{  //why cant I use find only..
//     Food.findById(req.params.id,(err,item)=>{ //search item based on id //filtering out?
//         // console.log(item);
//         if(err){console.log(err)
//         }else{
//             res.render('show',{item})
//         }
//     })
// });


// app.delete('/delete/items/:id',(req,res)=>{ //must same with form action="/delete/items/<%=element._id%>?_method=DELETE"
//     Food.findByIdAndRemove(req.params.id,(err,item)=>{
//         if (err){
//             console.log('delete error: '+err.message)
//         }else{
//             res.redirect('/delete')
//         }
//     })
// });//REQUIRE ONE NEW PAGE

// app.get('/edit/:id',(req,res)=>{
//     Food.findById(req.params.id,(err,editItem)=>{
//         if (err){
//             console.log('find edit error: '+err.message)
//         }if(req.session.currentUser){
//             if(req.session.currentUser.username=='admin'){
            
//             // res.send(item);
//             // console.log(editItem);
//             res.render('edit',{editItem, userDetails:req.session.currentUser})
//             }else{
//                 res.redirect('/')
//             };
//         }
//     })
// });
// // 
// app.put('/edit/:id',(req,res)=>{
//     Food.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,item)=>{ //find id from req.params.id and update to req.body
//         if(err){
//             console.log('edit error: '+err.message)
//         }else{
//             console.log(item);
//             res.redirect('/frontpage')
//         }
//     })
// })