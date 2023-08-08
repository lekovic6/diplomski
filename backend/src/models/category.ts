import mongoose from "mongoose";

const Schema = mongoose.Schema

const CategorySchema = new Schema({
    categoryName: String,
    showName:String,
})


export default mongoose.model("Category", CategorySchema, 'categories');
