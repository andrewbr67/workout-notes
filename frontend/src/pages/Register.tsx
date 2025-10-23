
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import type { User } from '../types/user';

export default function Register() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirm) {
            setError('Passwords do not match');
            return;
        }

        try {
            //send user reg info to backend
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                username,
                email,
                password
            });

            //backend returns token and new user object
            const { token, user } = res.data as { token: string, user: User };

            //save the token to the browser so we can use it later
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            //now that user is registered, redirect to the workouts page
            navigate('/workouts');

        } catch (err) {
            if(axios.isAxiosError(err)){
                setError(err.response?.data?.error || "Registration failed, check email and password");
            } else if (err instanceof Error){
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };

    return (

        <div>
        <form onSubmit={handleRegister}>

            <h2>Register</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
            />
            <button type="submit">Register</button>
        </form>

        <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );

}            
            