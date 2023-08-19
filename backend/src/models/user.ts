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

    favouritesList:[mongoose.Schema.Types.ObjectId],

})


export default mongoose.model("User", UserSchema, 'users');
