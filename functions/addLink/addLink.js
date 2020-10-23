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

exports.handler = async event => {
  try {
    connectDB();
    const link = event.queryStringParameters.link || 'World'
    var newLink = {
      link,
      read: false
    }
    const createdLink = await Link.create(newLink)
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Link Added :)' }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}
