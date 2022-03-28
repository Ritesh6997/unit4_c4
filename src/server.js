const app=require("./index");
const connect = require("./configu/db");
const res = require("express/lib/response");

app.listen(5000,async()=>{
    try {
        await connect ();
    } catch (error) {
        return res.status(500).send({message:message.error})
    }
    console.log("listing on port 5000");
})