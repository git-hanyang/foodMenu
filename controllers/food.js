
//7 Restful Routes

// Index  : GET    '/food/frontpage'            1/7
// Show   : GET    '/food/frontpage/item/:id'   2/7
// New    : GET    '/food/add/new'              3/7

// Create : POST   '/food/frontpage'            4/7
// Edit   : GET    '/food/edit/:id'             5/7
// Update : PUT    '/food/edit/:id'             6/7
// Delete : DELETE '/food/delete/items/:id'     7/7

const express=require('express');
const router=express.Router();
const Food=require('../models/food');
////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/',(req,res)=>{
    res.render('login')
});

router.get('/frontpage',(req,res)=>{
    Food.find({},(err,item)=>{
        if(err){
            console.log('item cannot be found: '+err.message);
        }
            // console.log(item.length);
            // console.log(item);
            res.render('frontpage',{item, userDetails: req.session.currentUser})//can pass as many objects as I want 
                                                    //item will be undefined if same render done earlier with diff object //see line 98
    })
});

router.delete('/delete/user',(req,res)=>{ //THIS REQUIRED ONE PAGE
    req.session.destroy(  //destroy session
        ()=>{
        res.redirect('/food')
        }
    )
});

router.get('/add/new',(req,res)=>{
    Food.find({},(err,userDetails)=>{
        if(err){
            console.log('item cannot be found: '+err.message);
        }if(req.session.currentUser){
            if(req.session.currentUser.username=='admin'){
                res.render('new',{userDetails: req.session.currentUser});
                }else{
                res.redirect('/food')
            }
        }
    })
});
////require food schema to post food

router.post('/frontpage',(req,res)=>{ 
    Food.create(req.body,(err,createdFood)=>{
        if(req.body.name != '' && req.body.description !='' && req.body.price !=''){
            if(err){
                console.log('fail to create food: '+err.message);
                res.send('Duplicated food name not allowed');
            }else{
                // res.send(createdFood);
                res.redirect('/food/frontpage')
            }
        }else {
            res.send('please fill in the required fields')
        }
    })
});//REQUIRE ONE PAGE
////////////////////////////////////////////////////////////////////////////////////////
router.get('/delete',(req,res)=>{
    Food.find({},(err,element)=>{
        if(err){
            console.log(err)
        }if(req.session.currentUser){
            if(req.session.currentUser.username=='admin'){
            // res.send(item[1].id);
            console.log(req.session.currentUser);

            res.render('delete',{element, userDetails:req.session.currentUser});
            }else{
                res.redirect('/food')
            }
        }
    })
});

router.get('/frontpage/item/:id',(req,res)=>{  //why cant I use find only..
    Food.findById(req.params.id,(err,item)=>{ //search item based on id //filtering out?
        // console.log(item);
        if(err){console.log(err)
        }else{
            res.render('show',{item})
        }
    })
});

router.delete('/delete/items/:id',(req,res)=>{ //must same with form action="/delete/items/<%=element._id%>?_method=DELETE"
    Food.findByIdAndRemove(req.params.id,(err,item)=>{
        if (err){
            console.log('delete error: '+err.message)
        }else{
            res.redirect('/food/delete')
        }
    })
});//REQUIRE ONE NEW PAGE

router.get('/edit/:id',(req,res)=>{
    Food.findById(req.params.id,(err,editItem)=>{
        if (err){
            console.log('find edit error: '+err.message)
        }if(req.session.currentUser){
            if(req.session.currentUser.username=='admin'){
            
            // res.send(item);
            // console.log(editItem);
            res.render('edit',{editItem, userDetails:req.session.currentUser})
            }else{
                res.redirect('/food')
            };
        }
    })
});

router.put('/edit/:id',(req,res)=>{
    Food.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,item)=>{ //find id from req.params.id and update to req.body
        // console.log(req.body.name);
        if(err){
            console.log('edit error: '+err.message)
        }else{
            // console.log(item.name);
            res.redirect('/food/frontpage')
        }
    })
});

router.get('/seed/items',(req,res)=>{

    const addFood=[
        {
        _id:"633f9db50cb98210c35727fb",
        name: "Cheezy Fries",
        description:"This gooey cheese sauce smothers the crispy baked potatoes in sumptuous goodness.",
        price:10,
        img:"cheesyfries",
        __v:0,

        },
        {
            _id:"633ff7ae4efdbe8f38fa2d2c",
            name: "Belgian Waffles",
            description:"Healthy Dark Chocolate Waffles. My light and crispy dark chocolate waffles are super delicious and totally healthy for you! Belgian waffles with chocolate are the perfect romantic Valentine's breakfast to make for someone special.",
            price:13,
            img:"belgian waffle",
            __v:0,
    
        },
        {
            _id:"633ffa374efdbe8f38fa2d32",
            name: "Oreo Balls",
            description:"These No Bake Oreo Balls, also known as Oreo Truffles.The basic premise is crushed Oreo cookies mixed with cream cheese, then shaped into balls and dipped in chocolate.",
            price:8,
            img:"oreo balls",
            __v:0,
    
        },
        {
            _id:"633ffb5c4efdbe8f38fa2d35",
            name: "Ice Cream Sandwich Cake",
            description:"This ice cream sandwich cake features layers of hot fudge, peanut butter, whipped topping and peanut butter cups.",
            price:15,
            img:"ice cream sandwich",
            __v:0,
    
        },
        {
            _id:"633ffd874efdbe8f38fa2d3a",
            name: "Oreo White Russian",
            description:"This drink is creamy with that little hint of coffee that a classic white Russian is known for, but it also has the texture and flavor of the Oreos.",
            price:25,
            img:"oreo white russian",
            __v:0,
    
        }]

    Food.create(addFood,(err,foodadded)=>{
        if(err){
            console.log('seeding error '+err.message)
        }else{
            res.redirect('/food')
        }
    })
});


///////////unable to combine two database request

// router.put('/edit/:id',(req,res)=>{
//     Food.find({},(err,element)=>{
//         for(let i=0;i<element.length;i++){
//             // console.log(element[0].name);
//             // console.log(element.length);
//             if(element[i].name==req.body.name){
//                     res.send('duplicated name')
//                 }else{
//                     Food.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,item)=>{
//                         if(err){
//                             console.log('update error'+err.message)
//                             }else{
//                             res.redirect('/food/frontpage')
//                             }
//                     })
//                 }        
//         }
//     })
// });
//////////////////////////////////////////////////////////////////////////////

// Hi Han
// In your schema have you declared unique?
// If yes then you can use find({name:req.body.name}, (err, foundItem) =>{
// If(foundItem){
// res.send(‘duplicate name’);
// }else{
//your code to update


module.exports=router;