
import { useState } from 'react';
import axios from 'axios';

interface RegisterProps {
    onRegister: (token : string, user : { id: string, username: string, email: string }) => void;
}

export default function Register({ onRegister }: RegisterProps) {
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
            const { token, user } = res.data;
            //tell parent app that user registered
            onRegister(token, user);

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
    );

}            
            