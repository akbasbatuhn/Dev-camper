const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        maxLength: 100,
        required: [true, "Please add a title for your review"],
    },
    text: {
        type: String,
        required: [true, "Please add a description"],
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, "Please add rating between 1 and 10"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: "Bootcamp",
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = Review = mongoose.model("Review", ReviewSchema);
