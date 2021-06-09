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
    //const subject = JSON.parse(event.body).id || 'World'
    const id = JSON.parse(event.body).id;
    const category = JSON.parse(event.body).category;

    const link = await Link.findById(id)
    var updatedLink;
    if (link) {
      link.category = category;

      updatedLink = await link.save();
      return {
        statusCode: 200,
        body: JSON.stringify(updatedLink),
      }
    } else {
      return { statusCode: 404, body: "Link Not Found" }
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}
