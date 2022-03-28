const mongoose=require("mongoose");
const todoschema=mongoose.Schema({
    title:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"user", required : true}
},
{
    versionKey:false,
    timestamps:true,
});

const Todo= mongoose.model("todo",todoschema);

module.exports=Todo;