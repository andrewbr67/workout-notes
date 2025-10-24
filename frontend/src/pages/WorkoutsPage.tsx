import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import type { Workout } from '../types/workout';
import WorkoutList from '../components/WorkoutList';
import WorkoutForm from '../components/WorkoutForm';
import Popup from '../components/Popup';

import { useNavigate } from 'react-router-dom';


export default function WorkoutsPage() {
    
    const navigate = useNavigate();
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [showPopup, setShowPopup] = useState(false);

    //declare token, initially try set as a stored token
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

     //declare user
    const [user, setUser] = useState<{ id: string, username: string, email: string } | null>(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null);

    const fetchWorkouts = useCallback(async () => {
            if (!token) return; //dont try fetch if not logged in

             try{
                const res = await axios.get('http://localhost:5000/api/workouts', { headers: { Authorization: `Bearer ${token}` } });
                setWorkouts(res.data);
            } catch (error) {
                console.error("Error fetching workouts:", error);
                navigate('/login');
            }
        }, [token, navigate]); 

    useEffect(() => { 
        fetchWorkouts();
    }, [fetchWorkouts]);

    const addWorkout = async (workout: Omit<Workout, "_id">) => {
    if (!token) return;


    try {
      const res = await axios.post('http://localhost:5000/api/workouts', workout, { headers: { Authorization: `Bearer ${token}` } });
      setWorkouts([...workouts, res.data]);
      setShowPopup(false);
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

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/login');
  };

  return (
    <div className ="workouts-page">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Workouts</h1>
            <div>
                <span style={{ marginRight: '10px' }}>{user?.username}</span>
                <button onClick={logout}>Logout</button>
             </div>
        </header>

        <button onClick={() => setShowPopup(true)}>Add Workout</button>

        <WorkoutList workouts={workouts} onDelete={deleteWorkout} />

        <Popup isOpen={showPopup} onClose={() => setShowPopup(false)}>
            <h2>Add Workout</h2>
            <WorkoutForm onAdd={addWorkout} />
        </Popup>
    </div>
  );
}