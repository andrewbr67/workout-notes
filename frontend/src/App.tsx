import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Workout } from './types/workout';
import WorkoutList from './components/WorkoutList';
import WorkoutForm from './components/WorkoutForm';
import Login from './components/Login';
import Register from './components/Register';

function App() {

  //declare token, initially try set as a stored token
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  //declare user
  const [user, setUser] = useState<{ id: string, username: string, email: string } | null>(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null);
  const [showLogin, setShowLogin] = useState(true);

  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const fetchWorkouts = async () => {
    if (!token) return; //dont try fetch if not logged in

    try{
      const res = await axios.get('http://localhost:5000/api/workouts', { headers: { Authorization: `Bearer ${token}` } });
      setWorkouts(res.data);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };
  
  useEffect(() => {
    fetchWorkouts();
  }, [token]);

  const addWorkout = async (workout: Omit<Workout, "_id">) => {
    if (!token) return;


    try {
      console.log("Using token:", token);
      const res = await axios.post('http://localhost:5000/api/workouts', workout, { headers: { Authorization: `Bearer ${token}` } });
      setWorkouts([...workouts, res.data]);
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  };
  
  const deleteWorkout = async (id: string) => {
    if (!token) return;

    try {
      await axios.delete(`http://localhost:5000/api/workouts/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setWorkouts(workouts.filter(workout => workout._id !== id));
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  }; 
  
  //when the user logs in, save their information
  const handleAuthSuccess = (token: string, user : { id: string, username: string, email: string }) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };
  
  //when the user logs out, remove their information
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  if (!token) {
    return (
      <div className="App">
        {showLogin ? (
          <>
          <Login onLogin={handleAuthSuccess} />
          <p>Don't have an account? {" "}<button onClick={() => setShowLogin(false)}>Register</button></p>
          </>
        ) : (
          <>
          <Register onRegister={handleAuthSuccess} />
          <p>Already have an account? {" "}<button onClick={() => setShowLogin(true)}>Login</button></p>
          </>
        )}
      </div>
    );
  }

  //if there is a token, show the app with workouts
  return (
    <div className="App">
      <h1>Workout Notes</h1>
      <p>Logged in as: {user?.username}</p>
      <button onClick={logout}>Logout</button>
      <WorkoutForm onAdd={addWorkout} />
      <WorkoutList workouts={workouts} onDelete={deleteWorkout} />
    </div>
  );
}

export default App;