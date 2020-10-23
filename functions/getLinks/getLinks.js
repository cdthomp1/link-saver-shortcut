const fetch = require("node-fetch");

async function getUsers() {
  const users = await fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => { return json });

  return users;
}


exports.handler = async event => {

  const users = await getUsers()

  try {
    return {
      statusCode: 200,
      body: JSON.stringify(users),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}
