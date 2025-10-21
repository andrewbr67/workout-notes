const Workout = require('../models/Workout');
const mongoose = require('mongoose');

// Get all workouts
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.json(workouts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addWorkout = async (req, res) => {
    try {
        const { title, exercises } = req.body;
        const newWorkout = new Workout({ title, exercises });
        await newWorkout.save();
        res.json(newWorkout);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteWorkout = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Invalid workout ID' });
        }

        const workout = await Workout.findByIdAndDelete({ _id: id });

        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }

        res.json({ message: 'Workout deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getWorkouts,
    addWorkout,
    deleteWorkout
};
