const express=require("express");
const { Register, login } = require("./controller/authcontroller");
const app =express();
const Usercontroller=require("./controller/userController");
const todoController=require("./controller/todoController")
app.use(express.json());
app.use("/todo",todoController)
app.post("/register",Register);
app.post("/login",login);
app.use("/user",Usercontroller)

module.exports=app;