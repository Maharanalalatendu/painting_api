const express=require('express');
const dbschema=require('./mongoose');
const dbschema2=require('./mongoose2');
const  app=express();

require('dotenv').config();

//app.use(express.urlencoded({extended:false}));//middle ware using for req.body for html
app.use(express.json({extended:false}));//middle ware using for req.body for react.js

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

app.post("/api/each_post/:post_id",async function(req,res) {
    try {
    const post_id = req.params.post_id;
    const post = await dbschema.findById(post_id);
    res.json(post);
     } catch (err) {
    res.json({ error: 'Server error' });
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
        res.json({ error: 'Server error' });
   }
})

app.post("/api/like/:post_id/:value",async function(req,res) {
    const post_id = req.params.post_id;
    const value = req.params.value;
    const post = await dbschema.findById(post_id);
    //res.json({ message: 'Data added successfully', id: post.like});
    if(value==0){
        post.like--;
        res.json({ message: 'dislike added successfully', id: post.like});
    }
    if(value==1){
        post.like++;
        res.json({ message: 'like added successfully', id: post.like});
    }
    await post.save();
})

app.post("/api/contact",async function(req,res) {
    try{
        const body = req.body;
        const newpost = new dbschema2(body);  
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