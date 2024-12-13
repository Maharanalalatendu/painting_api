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
  category:String,

  like:{ type: Number, default: 0 },
  no_of_user_reating:{ type: Number, default: 0 },
  reating:{ type: Number, default: 0 },

  all_comments: [{
    comment: String,
   }]
})

const User = mongoose.model("post",post_schema);
module.exports = User;