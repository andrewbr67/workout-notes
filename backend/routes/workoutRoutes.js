const express = require('express');
const { getWorkouts, addWorkout, deleteWorkout } = require('../controllers/workoutController');

const router = express.Router();

router.get('/', getWorkouts);
router.post('/', addWorkout);
router.delete('/:id', deleteWorkout);

module.exports = router;