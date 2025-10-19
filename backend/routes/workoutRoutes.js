const express = require('express');
const { getWorkouts, addWorkout } = require('../controllers/workoutController');

const router = express.Router();

router.get('/', getWorkouts);
router.post('/', addWorkout);

module.exports = router;