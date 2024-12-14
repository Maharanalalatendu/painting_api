const express=require('express');
const cors = require('cors');
const dbschema=require('./mongoose');
const dbschema2=require('./mongoose2');
const  app=express();
require('dotenv').config();

// Use the cors middleware
//*it is use to access to tata in all ip adress 
app.use(cors());
const corsOptions = {
    origin: '*',  // Allow all origins (not recommended for production)
    methods: 'GET, POST, PUT, DELETE', // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  };
app.use(cors(corsOptions));


// app.use(express.urlencoded({extended:false}));//middle ware using for req.body
app.use(express.json());//middle ware using for req.body to get json format data

app.post("/api/post",async function(req,res) {
    try{
        const body = req.body;
        const newpost = new dbschema(body);  
        await newpost.save();
        res.json({ message: 'Data added successfully', id: newpost._id });
    }catch (error) {
        res.json({ message: 'error'});
   }
})

app.get("/api/all_post",async function(req,res) {
const allpost=await dbschema.find();
res.json(allpost);
})

app.get("/api/each_post/:post_id",async function(req,res) {
    try {
        const post_id = req.params.post_id;
        const post = await dbschema.findById(post_id);
        res.json(post);
    } catch (err) {
        res.json({ error: 'Server error'});
    }
})
app.get("/api/post/:category",async function(req,res) {
    try {
        const category = req.params.category;
        const post = await dbschema.find({category: category});
        res.json(post);
    } catch (err) {
        res.json({ error: 'Server error'});
    }
})

app.post("/api/comment/:post_id",async function(req,res) {
    try {
        const post_id = req.params.post_id;
        const {comment} = req.body;
        const post = await dbschema.findById(post_id);
        
        if (!post) {
            return res.json({ error: 'Post not found' });
        }
        post.all_comments.push({comment});
        await post.save();
        res.json("comment add successfully / may be you are not hendle frontend");
    } catch (err) {
        res.json({ error: err });
   }
})

app.get("/api/like/:post_id/:value",async function(req,res) {    
    const post_id = req.params.post_id;
    const value = req.params.value;
    const post = await dbschema.findById(post_id);
    //res.json({ message: 'Data added successfully', id: post.like});
    if(value=='0'){
        post.like--;
        res.json({ message: 'dislike added successfully', id: post.like});
    }
    if(value=='1'){
        post.like++;
        res.json({ message: 'like added successfully', id: post.like});
    }
    await post.save();
})

app.get("/api/reating/:post_id/:value/:user",async function(req,res) {
   try {
    const post_id = req.params.post_id;
    const value = req.params.value;
    const user = req.params.user;
    const post = await dbschema.findById(post_id);
    let intNumber = parseInt(value);
        if(user==1){
            post.no_of_user_reating++;
            post.reating=(post.reating+intNumber);
            res.json({ message: 'reating added successfully', rating: post.reating});
        }
        if(user==0){
            post.reating=(post.reating-intNumber);
            res.json({ message: 'reating delete successfully', rating: post.reating});
        }
        await post.save();
    } catch (err) {
        res.json({ error: err });
      }
})

app.post("/api/contact",async function(req,res) {
    console.log(req.body);
    try{
        const {name, number, query} = req.body;
        const newpost = new dbschema2({name, number, query});  
        await newpost.save();
        res.json({ message: 'Data added successfully', id: newpost._id });
    }catch (error) {
        res.json({ message: 'error'});
   }
})

app.get("/api/all_contact",async function(req,res) {
    const all_contact=await dbschema2.find();
    res.json(all_contact);
    })

//app.listen(3000);
const port =  3000 || process.env.PORT;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});