import mongoose from "mongoose";

const Schema = mongoose.Schema

const BookSchema = new Schema({
    openlibrary_work: String,
    isbn:String,

    title: String,
    authors: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            name: String,
            key: String
        }
    ],
    description:String,
    genre:String,
    first_publish_year: Number,

    cover_id: Number,
    coverData64: String,
    coverContentType64: String,

    reviews:[
        {
            username:String,
            rating:Number,
            comment:String,

            pending:Boolean,
            accepted:Boolean,
            declined:Boolean,
        }
    ]
})


export default mongoose.model("Book", BookSchema, 'books');
