const app = require("./app");

const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log("App connected to database");

    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
