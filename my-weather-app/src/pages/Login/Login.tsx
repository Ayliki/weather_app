import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
import { loginUser } from '../../hooks/api';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await loginUser({
                email: formData.email,
                password: formData.password,
            });

            // Store the access token
            localStorage.setItem('access_token', response.access_token);

            // Redirect to dashboard
            navigate('/');
        } catch (err) {
            setError('Invalid email or password. Please try again.');
            console.error('Login error:', err);
        }
    };

    const loginFields = [
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            required: true,
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
            required: true,
        },
    ];

    return (
        <AuthForm
            title="Login"
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            fields={loginFields}
            submitButtonText="Login"
            alternateLinkText="Don't have an account?"
            alternateLinkPath="/signup"
            alternateLinkLabel="Sign up"
            error={error}
        />
    );
};

export default Login; 