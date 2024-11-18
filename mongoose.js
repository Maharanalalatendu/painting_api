const mongoose=require("mongoose")
require('dotenv').config();
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI);
//mongoose.connect("mongodb://127.0.0.1:27017/painting")
const post_schema=mongoose.Schema({
  image_url:String,
  title:String,
  deseription:String,
  select_image_type:String,
  like:Number,
  all_comments: [{
    comment: String,
   }]
})

const User = mongoose.model("post",post_schema);
module.exports = User;