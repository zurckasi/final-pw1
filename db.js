require("dotenv").config();
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    `mongodb+srv://zurckasi:m1908c3ig@cluster0.qg18e4c.mongodb.net/?retryWrites=true&w=majority`
  );
}
module.exports = mongoose;
