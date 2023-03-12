const Tour = require("./../models/toursModel");

exports.getAllTours = async (req, res) => {
	try {
		const allTours = await Tour.find();
		res.status(200).json({
			status: "success",
			result: allTours.length,
			data: { allTours },
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
			message: error.message,
		});
	}
};

exports.getTour = async (req, res) => {
	try {
		const tour = await Tour.findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: { tour },
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
			message: error.message,
		});
	}
};

exports.createNewTour = async (req, res) => {
	try {
		const newTour = req.body;
		const data = await Tour.create(newTour);
		console.log("created..");
		res.status(201).json({
			status: "success",
			data: { data },
		});
	} catch (error) {
		console.log("not created");
		res.status(400).json({
			status: "fail",
			message: error.message,
		});
	}
};

exports.patchTour = async (req, res) => {
	try {
		const updatedTour = await Tour.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);
		res.status(200).json({
			status: "success",
			data: { updatedTour },
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
			message: error.message,
		});
	}
};

exports.deleteTour = async (req, res) => {
	try {
		const d = await Tour.findByIdAndDelete(req.params.id);
		console.log(d);
		res.status(204).json({
			status: "success",
			data: null,
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
			message: error.message,
		});
	}
};
