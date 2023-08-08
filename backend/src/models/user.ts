import mongoose from "mongoose";

const Schema = mongoose.Schema


const UserSchema = new Schema({
    // for all - client, agency and admin
    username:String,
    password:String,

    firstname:String,
    lastname:String,

    email:String,
    role:String,
    
    profilePicture:{
        data: String,
        contentType: String
    },

    // ne znam dal cu ovo da imam iskr
    verifiedByAdmin:Boolean,
    declined:Boolean
})


export default mongoose.model("User", UserSchema, 'users');
