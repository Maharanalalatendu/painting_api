const mongoose=require("mongoose")
require('dotenv').config();
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI);
//mongoose.connect("mongodb://127.0.0.1:27017/painting")
const contact_schema=mongoose.Schema({
  name:String,
  number:String,
  query:String
})

const User = mongoose.model("contact",contact_schema);
module.exports = User;