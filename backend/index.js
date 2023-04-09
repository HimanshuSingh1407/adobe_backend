require("dotenv").config()
const express = require("express");
const cors = require("cors");
const ConnectDatabase = require("./src/config/connectDatabase.config");
const UserRoute=require("./src/routes/user.route")
const app = express();
const PostRoute = require("./src/routes/post.route");


app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

app.use("/users",UserRoute)
app.use("/posts",PostRoute)


const port = process.env.PORT;
app.listen(port, async () => {
  await ConnectDatabase();
  console.log(`http://localhost:${port}`);
});
