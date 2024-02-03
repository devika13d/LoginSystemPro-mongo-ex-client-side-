import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';

function Registr() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmpassword: ''
  });
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const navigate = useNavigate();

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (field === 'username') {
      const isValid = /^[A-Za-z]+$/.test(value);
      setIsUsernameValid(isValid);
    }
    setFormData({ ...formData, [field]: value });

    if (field === 'password' && formData.confirmpassword && value !== formData.confirmpassword) {
      setPasswordMatchError('Passwords do not match');
    } else if (field === 'confirmpassword' && formData.password && value !== formData.password) {
      setPasswordMatchError('Passwords do not match');
    } else {
      setPasswordMatchError('');
    }


  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false || formData.password !== formData.confirmpassword) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      e.preventDefault();
      console.log('Form submitted:', formData);

      setFormData({
        username: '',
        password: '',
        confirmpassword: ''
      });
      setValidated(false);

      try {
        const response = await axios.post('http://localhost:5000/register', {
          username: formData.username,
          password: formData.password,
        });


        // Assuming the backend sends a success message
        alert(response.data.message);

        // Redirect to login page after successful registration
        navigate('/login');
      } catch (error) {
        console.error(error);
        // Handle registration error (e.g., duplicate username)
      }
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center mt-5">
      <div className="bg-light p-5 rounded" style={{ maxWidth: '500px' }}>
        <Form noValidate validated={validated} >
          <h2 className="text-center">SIGN UP</h2>
          <Row className="mb-3">
            <Col md={12} className="mb-3">
              <Form.Group controlId="validationCustom01">
                <Form.Label className="mt-5 ms-2">User name:</Form.Label>
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
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label className="text-light mb-3">Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={(e) => handleInputChange(e, 'password')}
              />
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label className="text-light mb-3" required type="text">
                Confirm Password
              </Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmpassword}
                onChange={(e) => handleInputChange(e, 'confirmpassword')}
              />
              {passwordMatchError && (
                <div className="text-danger">{passwordMatchError}</div>
              )}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group className="mb-7">
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                  feedbackType="invalid"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Button type="submit" className="me-5 mt-4" id="b" onClick={handleSubmit}>
                Submit form
              </Button>
            </Col>
          </Row>
        </Form>
        <h6 className="mt-4 p-4">
          If you have an account, please{' '}
          <Link to={'/login'} style={{ textDecoration: 'none' }}>
            Login now
          </Link>
        </h6>
      </div>
    </Container>
  );
}

export default Registr;
