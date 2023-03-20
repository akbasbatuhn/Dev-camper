const Bootcamp = require("../models/Bootcamp");

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find();

        res.status(200).json({
            success: true,
            count: bootcamps.length,
            data: bootcamps,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

// @desc      Get single bootcamp
// @route     GET /api/v1/bootcamps/:id
// @access    Public
exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);

        if (!bootcamp) {
            return res.status(404).send("Bootcamp not found");
        }

        res.status(200).json({ success: true, data: bootcamp });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

// @desc      Create new bootcamp
// @route     POST /api/v1/bootcamps
// @access    Private
exports.createBootcamp = async (req, res, next) => {
    const bootcamp = new Bootcamp(req.body);
    try {
        const bootcamp = new Bootcamp(req.body);
        await bootcamp.save();

        res.status(201).json({
            success: true,
            data: bootcamp,
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access    Private
exports.updateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!bootcamp) {
            return res.status(404).json({ msg: "Bootcamp not found" });
        }

        res.status(200).json({ success: true, data: bootcamp });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }

    res.status(200).json({
        success: true,
        msg: `Update bootcamp ${req.params.id}`,
    });
};

// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamps/:id
// @access    Private
exports.deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        if (!bootcamp) {
            return res.status(404).json({ msg: "Bootcamp not found" });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};
