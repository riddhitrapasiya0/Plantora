import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({

    title:{
        type : String,
        required : [true, "Title is required"],
        minlength : [3, "Title must be at least 3 characters"],
        maxlength : [200, "Title must be at most 200 characters"]
    },

    author:{
        type : String,
        required : [true, "Author is required"],
    },

    publisher:{
        type : String,
        required : [true, "Publisher is required"],
    },

    price:{
        type : Number,
        required : [true, "Price is required"],
        min:[0, "Price cannot be negative."]
    },

    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
});

const Book = mongoose.model("Book", bookSchema);
export default Book;