import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, Typography, Card, Alert } from '@mui/material';
// import logo from '../assets/images/logo.png';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import InputAdornment from "@mui/material/InputAdornment";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        // Token localStorage mein save karo
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Login error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bgmain'>
      <Container className='inner-container'>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Card sx={{ p: 4, maxWidth: '400px', background: 'none', boxShadow: 'none' }}>
            {/* Logo/Header */}
            <Box sx={{ textAlign: 'center', mb: 2, }}>
              <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: '300', mb: 2, fontSize: '1.8rem' }}>
                Hyundai Safety Analytics
              </Typography>
              <Typography variant="body2" sx={{ color: '#eeeeee' }}>
                Sign-In
              </Typography>
            </Box>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {/* Success Alert */}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                placeholder="Email"
                variant="outlined"
                sx={{
                  backgroundColor: "#fff",
                  "& .MuiOutlinedInput-root": {
                    height: 48,
                    "& fieldset": {
                      border: "none"
                    },
                    "&:hover fieldset": {
                      border: "none"
                    },
                    "&.Mui-focused fieldset": {
                      border: "none"
                    }
                  },
                  "& .MuiInputLabel-root": {
                    backgroundColor: "#fff",
                    px: 0.5
                  }
                }}

                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineOutlinedIcon />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                fullWidth
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
                placeholder="Password"
                variant="outlined"
                sx={{
                  backgroundColor: "#fff",
                  "& .MuiOutlinedInput-root": {
                    height: 48,
                    "& fieldset": {
                      border: "none"
                    },
                    "&:hover fieldset": {
                      border: "none"
                    },
                    "&.Mui-focused fieldset": {
                      border: "none"
                    }
                  },
                  "& .MuiInputLabel-root": {
                    backgroundColor: "#fff",
                    px: 0.5
                  }
                }}

                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  )
                }}

              />
              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: '#FFD700',
                  color: '#000',
                  fontWeight: 'bold',
                  boxShadow: 'none',
                  padding: '10px',
                  borderRadius: 0,
                  height: 48,
                  fontSize: '16px',
                  '&:hover': { backgroundColor: '#FFC700' }
                }}
                type="submit"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'LOGIN'}
              </Button>
            </form>

            {/* Sign Up Link */}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body2">
                Don't have an account?{' '}
                <span
                  onClick={() => navigate('/signup')}
                  style={{
                    cursor: 'pointer',
                    color: '#ffffff',
                    fontWeight: '400',
                    textDecoration: 'underline'
                  }}
                >
                  Sign-Up
                </span>
              </Typography>
            </Box>
          </Card>
        </Box>
      </Container>
    </div >
  );
};

export default Login;
