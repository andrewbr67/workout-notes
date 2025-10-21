const express = require('express');
const { getWorkouts, addWorkout, deleteWorkout } = require('../controllers/workoutController');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', authMiddleware, getWorkouts);
router.post('/', authMiddleware, addWorkout);
router.delete('/:id', authMiddleware, deleteWorkout);

module.exports = router;