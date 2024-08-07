const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
  const dotenv = require('dotenv');
  const result = dotenv.config({ path: 'config/.env' });
  
  if (result.error) {
      throw result.error;
  }

}
const db_url =
  process.env.NODE_ENV === "production"
    ? process.env.DB_URL
    : process.env.OFFLINE_DB_URL2;

 console.log(`The database url is: ${db_url}`)

const connectDatabase = () => {
  mongoose
    .connect(
    db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb running on : ${data.connection.host}`);
    })
    .catch((err) => {
      console.error("Database connection failed:------- ", err);
    });
};

module.exports = connectDatabase;
