import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
import { registerUser } from '../../hooks/api';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
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

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await registerUser({
                email: formData.email,
                password: formData.password,
            });

            // Redirect to login page after successful registration
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Please try again.');
            console.error('Registration error:', err);
        }
    };

    const signupFields = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
        },
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
        {
            name: 'confirmPassword',
            label: 'Confirm Password',
            type: 'password',
            required: true,
        },
    ];

    return (
        <AuthForm
            title="Sign Up"
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            fields={signupFields}
            submitButtonText="Sign Up"
            alternateLinkText="Already have an account?"
            alternateLinkPath="/login"
            alternateLinkLabel="Login"
            error={error}
        />
    );
};

export default Signup; 