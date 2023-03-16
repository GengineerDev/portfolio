require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(this.mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
