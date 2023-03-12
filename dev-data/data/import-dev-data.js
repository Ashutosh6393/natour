const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");
const Tour = require("./../../models/toursModel");
dotenv.config({ path: "./../../config.env" });

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

const tour = JSON.parse(
	fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

async function importData() {
	try {
		// console.log(tour);
		await Tour.create(tour);
		console.log("Data successfully loaded");
		process.exit();
	} catch (error) {
		console.log(error.message);
		process.exit();
	}
}

async function deleteAllData() {
	try {
		await Tour.deleteMany();
		console.log("Data successfully deleted");
		process.exit();
	} catch (error) {
		console.log(error.message);
		process.exit();
	}
}

if (process.argv[2] === "--importData") {
	importData();
} else if (process.argv[2] === "--deleteData") {
	deleteAllData();
}

// console.log(process.argv);
