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
    process.exit(1);
  }
}

exports.handler = async event => {
    try {
      await connectDB();
      const category = event.queryStringParameters.category.toString();
      var newCategory = {category}
      const createdCategory = await Category.create(newCategory)
      console.log(createdCategory)
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Category Added :)' }),
      }
    } catch (error) {
      return { statusCode: 500, body: error.toString() }
    }
  }
