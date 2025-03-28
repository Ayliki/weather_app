import { Box, TextField, Button, Typography, Paper, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import styles from './AuthForm.module.css';

interface AuthFormProps {
    title: string;
    formData: Record<string, string>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    fields: {
        name: string;
        label: string;
        type: string;
        required?: boolean;
    }[];
    submitButtonText: string;
    alternateLinkText: string;
    alternateLinkPath: string;
    alternateLinkLabel: string;
    error?: string | null;
}

const AuthForm = ({
    title,
    formData,
    onChange,
    onSubmit,
    fields,
    submitButtonText,
    alternateLinkText,
    alternateLinkPath,
    alternateLinkLabel,
    error,
}: AuthFormProps) => {
    return (
        <Box className={styles.container}>
            <Paper elevation={3} className={styles.paper}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {title}
                </Typography>
                {error && (
                    <Typography color="error" align="center" gutterBottom>
                        {error}
                    </Typography>
                )}
                <form onSubmit={onSubmit} className={styles.form}>
                    {fields.map((field) => (
                        <TextField
                            key={field.name}
                            fullWidth
                            label={field.label}
                            name={field.name}
                            type={field.type}
                            value={formData[field.name]}
                            onChange={onChange}
                            margin="normal"
                            required={field.required}
                        />
                    ))}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={styles.submitButton}
                    >
                        {submitButtonText}
                    </Button>
                </form>
                <Typography variant="body2" align="center" className={styles.alternateLink}>
                    {alternateLinkText}{' '}
                    <Link component={RouterLink} to={alternateLinkPath} color="primary">
                        {alternateLinkLabel}
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default AuthForm; 