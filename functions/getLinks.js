const fetch = require("node-fetch");
const mongoose = require('mongoose');
const Link = require('../models/LinkModel.js')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })
    console.log(`MongoDB Connect: ${conn.connection.host}`)

  } catch (err) {
    console.error(`Error: ${err.message}`);
    return err
  }
}

const getLinks = async () => {
  const Links = await Link.find({})

  return Links;
}


module.exports = async (req, res) => {
  var err = await connectDB().catch(err);
  if(err) {
    return { statusCode: 500, statusText: err.message.toString() }
  }
  const links = await getLinks()

  try {
    res.send(links)
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

exports.handler = async event => {

  
}
