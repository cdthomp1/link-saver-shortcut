const fetch = require("node-fetch");
const mongoose = require('mongoose');
const Category = require('../../models/CategoryModel.js')

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

const getCategories = async () => {
  const Categories = await Category.find({})

  return Categories;
}


exports.handler = async event => {

  var err = await connectDB().catch(err);
  if(err) {
    return { statusCode: 500, statusText: err.message.toString() }
  }
  const categories = await getCategories()

  try {
    return {
      statusCode: 200,
      body: JSON.stringify(categories),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}
