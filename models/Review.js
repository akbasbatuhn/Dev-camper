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

// Prevent user from submitting more than one review per bootcamp
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

// Static method to get avg rating and save
ReviewSchema.statics.getAverageRating = async function (bootcampId) {
    const obj = await this.aggregate([
        // Find bootcamp with given id
        {
            $match: { bootcamp: bootcampId },
        },
        // For each group, return '_id' and 'averageCost' as defined in hte JSON object
        {
            $group: {
                _id: "$bootcamp",
                averageRating: { $avg: "$rating" },
            },
        },
    ]);

    try {
        await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
            averageRating: obj[0].averageRating,
        });
    } catch (error) {
        console.error(error);
    }
};

// Call averageRating after save
ReviewSchema.post("save", async function () {
    await this.constructor.getAverageRating(this.bootcamp);
});

// Call getAverageRating before remove
ReviewSchema.pre("remove", async function () {
    await this.constructor.getAverageRating(this.bootcamp);
});

module.exports = Review = mongoose.model("Review", ReviewSchema);
