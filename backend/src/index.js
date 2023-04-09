require("dotenv").config()
const express = require("express");
const cors = require("cors");
const ConnectDatabase = require("./config/connectDatabase.config");
const UserRoute=require("./routes/user.route")
const app = express();
const PostRoute = require("./routes/post.route");


app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

app.use("/users",UserRoute)
app.use("/posts",PostRoute)


const port = process.env.PORT || 8000;
app.listen(port, async () => {
  await ConnectDatabase();
  console.log(`http://localhost:${port}`);
});
