import './custom.css'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import cart23 from './images/cart-image.jpg'

import { AppBar, Toolbar, Typography,Button } from '@mui/material';
function Header() {
   return (
      <div className='head'>
         <AppBar sx={{ backgroundColor: 'BLACK',marginBottom:'1px' }}>
            <Toolbar>
               <Typography>
                  <div className="navbar text-light">
                  <Link to='/'>  <div className='d-flex '> <img className="restlogo" src={"https://img.freepik.com/premium-vector/retro-vintage-style-ornament-design-logo-retro-restaurant-typography-emblem-vector-line-simple-elegant-fork-spoon-knife_638875-8647.jpg"}></img>
                       <h1 style={{ color: "#fea116" }}>Restoran</h1></div></Link>
                     <Link to="/"><h6>Home</h6></Link>
                     <Link to="/about"><h6>About</h6></Link>
                     <Link to="/menulist2"><h6 >Menu</h6></Link>
                     <Link to="/service"> <h6>Service</h6> </Link>
                     <Link to="/contact">  <h6>Contact</h6> </Link>
                     <Link to='/login'><h6>Login</h6></Link>
                     <Link to='/sign'><h6>Signup</h6> </Link>
                     <Link to="/Viewcart"><h6>Cart</h6></Link>
                     <Link to="/book"> <Button style={{ backgroundColor: 'orange', borderRadius: '0.5rem', padding: '10px' ,textDecoration:'none'}}>Book A Table</Button></Link>
                    

                  </div>
               </Typography>
            </Toolbar>
         </AppBar>

      </div>

   )
}
export default Header;
const Wrapper = styled.div`






`;