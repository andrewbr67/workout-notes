const Workout = require('../models/Workout');

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

module.exports = {
    getWorkouts,
    addWorkout
};
