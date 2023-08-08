import mongoose from "mongoose";

const Schema = mongoose.Schema


const AuthorSchema = new Schema({
    key: String,
    name: String,
    bio: String,
    birth_date: String,
    death_date: String,
    links: [
        {
            url: String,
            title: String,
            type:{
                key: String
            }
        }
    ]
    
})


export default mongoose.model("Author", AuthorSchema, 'authors');
