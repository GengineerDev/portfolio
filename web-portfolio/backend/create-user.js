const bcrypt = require('bcrypt');
require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const createUser = async () => {
  try {
    // Connect to the MongoDB Atlas cluster
    await client.connect();

    // Hash the password using bcrypt
    const password = 'asdsdfds';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user in the 'users' collection
    const db = client.db('user');
    const users = db.collection('user');
    const result = await users.insertOne({ username: 'sdfdsf', password: hashedPassword });
    console.log(result); // The user that was just created

  } catch (err) {
    console.error(err);
  } finally {
    // Close the MongoDB Atlas cluster connection
    await client.close();
  }
};

createUser();
