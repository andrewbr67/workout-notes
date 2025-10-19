import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Workout } from './types/workout';
import WorkoutList from './components/WorkoutList';
import WorkoutForm from './components/WorkoutForm';

function App() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const fetchWorkouts = async () => {
    const res = await axios.get('http://localhost:5000/api/workouts');
    setWorkouts(res.data);
  };
  
  useEffect(() => {
    fetchWorkouts();
  }, []);

  const addWorkout = async (workout: Omit<Workout, "_id">) => {
    try {
      const res = await axios.post('http://localhost:5000/api/workouts', workout);
      setWorkouts([...workouts, res.data]);
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  };

  return (
    <div className="App">
      <h1>Workout Notes</h1>
      <WorkoutForm onAdd={addWorkout} />
      <WorkoutList workouts={workouts} />
    </div>
  );
}

export default App;