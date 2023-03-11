const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const DB = process.env.DATABASE.replace(
	"<PASSWORD>",
	process.env.DATABASE_PASSWORD
);

mongoose
	// .connect(process.env.DATABASE_LOCAL, {
		.connect(DB, {
		useNewUrlParser: true,
	})
	.then((con) => {
		// console.log(con.connections);
		console.log("Database connection successful ..");
	})
	.catch((err) => {
		console.log(err.message);
	});
const tourSchema = mongoose.Schema({
	name: { type: String, required: [true, "Name is required"], unique: true },
	price: { type: Number, required: [true, "Price is required"] },
	rating: { type: Number, default: 4.5 },
});

const Tour = mongoose.model("tours", tourSchema);

const testTour = new Tour({
	name: "Thailand trip",
	price: 498,
	// rating: 4.6,
	
});

// testTour
// 	.save()
// 	.then((data) => {
// 		console.log('Data saved successfully');
// 		console.log(data);
// 	})
// 	.catch((err) => {
// 		console.log('Data not saved ERROR->')
// 		console.log(err.message);
// 	});

// console.log(app.get('env'));
// console.log(process.env);
const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`Server start at localhost port ${port}: `);
});
