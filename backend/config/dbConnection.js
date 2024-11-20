const mongoose = require("mongoose");
// require("dotenv").config({path:"./.env"});
// const _DBUrl =process.env.DB;

mongoose.set('strictQuery', true); 
const password = encodeURIComponent("Dhoni@2005");
mongoose
  .connect(`mongodb+srv://duginisaisharan:${password}@cluster0.h4tlhz1.mongodb.net/test`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log("Connected Successful")).catch((err) => console.log(`Connection failed ! Error : ${err}`));

