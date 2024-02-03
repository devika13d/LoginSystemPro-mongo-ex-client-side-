import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (field === 'username') {
      const isValid = /^[A-Za-z]+$/.test(value);
      setIsUsernameValid(isValid);
    }
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const isValid = e.currentTarget.checkValidity();
    if (!isValid) {
      setLoginError('Please fill out the form correctly.');
      return;
    }

    setLoading(true);
    setLoginError('');


    try {
      const response = await axios.post('http://localhost:5000/login', {
        username: formData.username,
        password: formData.password,
      });
      console.log(response);
      if (formData.username && formData.username.password === formData.password) {
        alert("Logged in successfully!");
        navigate('/dashboard');
      } else {
        setLoginError('Invalid username or password.');
      }
      // if (response.status == 200) {
      //   alert(response.data);

      // } else {
      //   console.log(response);
      // }

      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setLoginError('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='d-flex justify-content-center align-items-center border h-100 mt-5'>
      <div className='bg-light p-5 rounded' style={{ width: '500px' }}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h2 className='text-center'>LOGIN NOW!!</h2>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom01" action="/login" method='POST'>
              <Form.Label className='mt-5 ms-2'>User name:</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                pattern="[A-Za-z]+"
                title="Enter alphabets only"
                value={formData.username}
                onChange={(e) => handleInputChange(e, 'username')}
              />
              {!isUsernameValid && (
                <div className="text-danger mt-1">Enter alphabets only for the username</div>
              )}
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} className='mb-3'>
              <Form.Label className='text-light mb-3'>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={(e) => handleInputChange(e, 'password')}
              />
            </Form.Group>
          </Row>
          <Row className="mb-7"></Row>
          <Form.Group className="mb-7">
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
            />
          </Form.Group>
          {loginError && <div className="text-danger mt-2">{loginError}</div>}
          <Button type="submit" className='me-5 mt-4' id='b' disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'}
          </Button>
        </Form>
        <h6 className='mt-4 p-4'>
          If you haven't an account, please <br />
          <Link to={'/registration'} style={{ textDecoration: 'none' }}>
            Create an Account
          </Link>
        </h6>
      </div>
    </div>
  );
}

export default Login;
