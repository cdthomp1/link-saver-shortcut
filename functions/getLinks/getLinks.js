const fetch = require("node-fetch");
const mongoose = require('mongoose');
const Link = require('../../models/LinkModel.js')

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
    process.exit(1);
  }
}

const getLinks = async () => {
  const Links = await Link.find({})

  return Links;
}

async function getUsers() {
  const users = await fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => { return json });

  return users;
}


exports.handler = async event => {
  connectDB();
  const links = await getLinks()

  try {
    return {
      statusCode: 200,
      body: JSON.stringify(links),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}
