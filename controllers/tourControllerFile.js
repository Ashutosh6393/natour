const fs = require("fs");

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
exports.patchTour = (req, res) => {
	let id = req.params.id * 1;
	let tour = tours[id];
	const updatedTour = req.body;
	const keys = Object.keys(updatedTour);
	const values = Object.values(updatedTour);
	console.log(tour[keys[0]]);
	for (let index = 0; index < keys.length; index++) {
		tour[keys[index]] = values[index];
	}
	tours[id] = tour;
	fs.writeFile(
		`${__dirname}/dev-data/data/tours-simple.json`,
		JSON.stringify(tours),
		(err) => {
			res.status(202).json({
				status: "success",
				message: "updated successfully",
				data: {
					tour,
				},
			});
		}
	);
	console.log("Tour Updated Successfully ..");
};
exports.getTour = (req, res) => {
	let id = req.params.id * 1;
	let tour = tours.find((el) => el.id === id);
	res.status(200).json({
		status: "success",
		data: {
			tour,
		},
	});
};
const testTour = new Tour({
	name: "Thailand trip",
	price: 498,
	rating: 4.6,
});

testTour
	.save()
	.then((data) => {
		console.log("Data saved successfully");
		console.log(data);
	})
	.catch((err) => {
		console.log("Data not saved ERROR->");
		console.log(err.message);
	});

exports.checkId = (req, res, next, val) => {
	if (
		req.params.id * 1 >= tours.length ||
		req.params.id * 1 < 0 ||
		isNaN(req.params.id)
	) {
		return res.status(400).json({
			status: "fail",
			message: "Invalid ID",
		});
	}
	next();
};

exports.checkBody = (req, res, next) => {
	if (!req.body.name || !req.body.price) {
		return res.status(400).json({
			status: "fail",
			message: "a tour must contain the name and price attribute",
		});
	}
	next();
};
exports.createNewTour = (req, res) => {
	const newId = tours[tours.length - 1].id + 1;
	const newTour = Object.assign({ id: newId }, req.body);
	tours.push(newTour);
	fs.writeFile(
		`${__dirname}/dev-data/data/tours-simple.json`,
		JSON.stringify(tours),
		(err) => {
			res.status(201).json({
				status: "success",
				message: "tour created successfully",
				data: { newTour },
			});
		}
	);
};
exports.getAllTours = (req, res) => {
	res.status(200).json({
		status: "success",
		result: tours.length,
		data: {
			tours,
		},
	});
};
