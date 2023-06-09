const mongoose = require("mongoose");

const tourSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required"],
		unique: true,
	},
	duration: {
		type: Number,
		required: [true, "A tour must have duration"],
	},
	price: {
		type: Number,
		required: [true, "Price is required"],
	},
	ratingsAverage: {
		type: Number,
		default: 4.5,
	},
	ratingsQuantity: {
		type: Number,
		default: 0,
	},
	maxGroupSize: {
		type: Number,
		required: [true, "A tour must have a group size"],
	},
	difficulty: {
		type: String,
		required: [true, "A tour must have a difficulty"],
	},
	priceDiscount: {
		type: Number,
		default: 0,
	},
	summary: {
		type: String,
		trim: true,
		required: [true, "Atour must have a description"],
	},
	description: {
		type: String,
		trim: true,
	},
	imageCover: {
		type: String,
		required: [true, "a tour must have a cover image"],
	},
	images: [String],
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	startDates: [Date],
});

const Tour = mongoose.model("tours", tourSchema);

module.exports = Tour;
