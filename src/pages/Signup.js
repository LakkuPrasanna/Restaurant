import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const navigate = useNavigate();

  const CreateAccount = async (e) => {
    e.preventDefault(); 
  
    try {
      const result = await axios.post('http://localhost:3008/sign', {
        email,
        fname,
        lname,
        password,
        phonenumber,
      });
      
      if (result.status === 201) {
        sessionStorage.setItem('user', JSON.stringify(result.data.user));
        navigate('/login');
      } else {
        console.log("Unexpected response:", result);
      }
    } catch (err) {
      if (err.response) {
        console.error('API error:', err.response.data);
        if (err.response.status === 400) {
          alert('Email already exists. Please use a different email');
        } else {
          alert('An error occurred. Please try again.');
        }
      } else {
        console.error('Error:', err);
        alert('Network error. Please check your connection.');
      }
    }
  };
  
  const backgroundImageStyle = {
    backgroundImage:
      'url(https://th.bing.com/th/id/R.bdf95c96be32441a63bb49cbec89a4bd?rik=C7b2gigEOJ6Ghg&riu=http%3a%2f%2fwww.textures4photoshop.com%2ftex%2fthumbs%2fitalian-restaurant-menu-with-chalkboard-background-1449.jpg&ehk=IMG0z3c5wTY9z8N8pof9oLwogJpIC4SvYrOa9Tls7f0%3d&risl=&pid=ImgRaw&r=0)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '90vh',
  };

  return (
    <div>
      <div className="login" style={backgroundImageStyle}>
        <div className="col-3 mx-auto">
          <div className="uname shadow border p-5">
            <h3 className="text-light">Create Account</h3>
            <input
              onChange={(event) => setFname(event.target.value)}
              placeholder="First Name"
              type="text"
              className="form-control mt-3"
            />
            <input
              onChange={(event) => setLname(event.target.value)}
              placeholder="Last Name"
              type="text"
              className="form-control mt-3"
            />
            <input
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              type="email"
              className="form-control mt-3"
            />
            <input
              onChange={(event) => setphonenumber(event.target.value)}
              placeholder="Mobile No"
              type="tel"
              className="form-control mt-3"
            />
            <input
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              type="password"
              className="form-control mt-3"
            />
            <button onClick={CreateAccount} className="btn btn-warning mt-3 w-100" type="submit">
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
