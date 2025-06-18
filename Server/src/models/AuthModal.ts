import mongoose from "mongoose";

const AuthSchema= new mongoose.Schema({

firstName:{
    type:String,
    require:true,
} ,
lastName:{
    type:String,
    require:true,
} ,

email:{
    type:String,
    require:true,
    unique: true,

},

password:{
     type:String,
    require:true,
   
},
confirmPassword:{
    type:String,
    require:true,
}


})

const Auth =mongoose.model("Auth", AuthSchema)

export default Auth;


