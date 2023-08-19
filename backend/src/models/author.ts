import mongoose from "mongoose";

const Schema = mongoose.Schema

const LinkSchema = new Schema({
    title: String,
    url: String,
    type: {
        key: String
    }
});

const AuthorSchema = new Schema({
    key: String,
    name: String,
    bio: String,
    birth_date: String,
    death_date: String,
    links: [LinkSchema],
    coverData64: String,
    coverContentType64: String,
})

export default mongoose.model("Author", AuthorSchema, 'authors');
