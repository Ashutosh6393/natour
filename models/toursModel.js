const mongoose = require("mongoose");

const tourSchema = mongoose.Schema({
	name: { type: String, required: [true, "Name is required"], unique: true },
	price: { type: Number, required: [true, "Price is required"] },
	rating: { type: Number, default: 4.5 },
});

const Tour = mongoose.model("tours", tourSchema);

module.exports = Tour;

