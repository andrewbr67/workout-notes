import { useState } from 'react';
import axios from 'axios';

interface LoginProps {
    onLogin: (token: string, user: { id: string, username: string, email: string }) => void;
}

export default function Login({ onLogin } : LoginProps) {

    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState ("");
    const [error, setError] = useState<string | null>(null);

    //Handle login form submission
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            //send a login request through the API
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });

            //API result returns user token and user object if login is successful
            const { token, user } = res.data;

            //save the token to the browser so we can use it later
            localStorage.setItem('token', token);

            //tell app that we are logged in
            onLogin(token, user);

        } catch (err) {
            if (axios.isAxiosError(err)){
                setError(err.response?.data?.error || "Login failed, check email and password"); //set error message
            } else if (err instanceof Error) {
                setError(err.message); //set error message
            } else {
                setError("An unknown error occurred"); //set error message
            }
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    );
}