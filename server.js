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
	.then(() => {
		console.log("Database connection successful ..");
	})
	.catch((err) => {
		console.log(err.message);
	});

const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`Server start at localhost port ${port}: `);
});
