import React, { useState } from 'react';
import styled from 'styled-components';
import { Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const backgroundImageStyle = {
    backgroundImage: 'url(https://th.bing.com/th/id/OIP.-8QHzuaIRup7mydudCnHaAHaFi?pid=ImgDet&w=187&h=139&c=7&dpr=2)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '90vh',
  };

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);

  
  const users = [
    { _id: '1', email: 'user@example.com', password: '123' },
    { _id: '2', email: 'john.doe@example.com', password: '456' },
    
  ];

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:3008/login', { email, password });
        if (response.status === 200) {
            setCurrentUserId(response.data.user._id);
           
            alert("Login successful!");
           
        }
    } catch (error) {
        alert("Login failed: " + (error.response ? error.response.data : "Server error"));
    }
};


  
  const Viewcart = ({ userId }) => {
    return <div>User ID for the cart: {userId}</div>;
  };

  return (
    <Btn>
      <div className="login" style={backgroundImageStyle}>
        <div className="col-3 mx-auto">
          <form method="post" onSubmit={handleLogin} className='uname border p-5'>
            <Avatar className='mx-auto w-25' style={{ height: '50px' }} />
            <input 
              onChange={(e) => setEmail(e.target.value)}
              name="email" type='email' className='form-control mt-4' placeholder="Email" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              name="password" type='password' className='form-control mt-3' placeholder="Password" />
            <Link to="/"><button type="submit" className='w-100 mt-3 mb-5 border-0 rounded' style={{ height: '35px' }}>Login</button></Link>
            <p className='text-light'>
              New customer?
              <Link style={{ textDecoration: 'none', color: 'white' }} to="/sign">
                <button>SignUp</button>
              </Link>
            </p>
          </form>
        </div>
        
        {}
        {currentUserId && <Viewcart userId={currentUserId} />}
      </div>
    </Btn>
  );
};

export default LoginPage;

const Btn = styled.div`
.rounded:hover {
  background-color: blue;
}
`;
