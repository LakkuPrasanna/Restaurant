import React from 'react'
import '../custom.css'
import book from '../images/book.jpg'
import right from '../images/right.png'
import { Button, Carousel, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { Avatar, TextField } from '@mui/material';
const About = () => {
  return (
    <div className='bg-body-secondary'>
      <div className='about1 bg-black'>
        <img style={{ width: "100%", height: "500px" }} src={book}></img>
        <div><b>  <h2 style={{
          position: "absolute",
          color:'white',
          top: "40%",
          left: "30%",
          transform: "translate(-50%, -50%)", fontFamily: "cursive,fantasy"
        }}>THINK FOOD<br></br> THINK RESTORAN</h2></b> </div>
      </div>
    
      <div>
      <div className='carousel'>
        <h1 style={{ fontFamily: 'fantasy', textAlign: 'center', padding: '10px' }}>Our client Says</h1>
        <Carousel>

          <Carousel.Item >
            <div className='b border'>

              <img style={{ width: '70px' }} src={right}></img>
              <p>“Their brunch is awesome, I love the avocado toast and the California focaccia. Pizza is really good as well.”</p>
              <div className='d-flex' >

                <div style={{ paddingRight: '20px' }}>
                  <Avatar style={{ width: '60px', height: '60px' }} />
                </div>
                <div>
                  <h5>Sangeetha</h5>
                  <p>student</p>
                </div>


              </div>
            </div>

          </Carousel.Item>

          <Carousel.Item >
            <div className='b border'>

              <img style={{ width: '70px' }} src={right}></img>
              <p>"The food at The Gourmet Spot was absolutely delicious—perfectly cooked and bursting with flavor. The service could have been quicker, but the amazing dishes made up for it!"</p>
              <div className='d-flex' >

                <div style={{ paddingRight: '20px' }}>
                  <Avatar style={{ width: '60px', height: '60px' }} />
                </div>
                <div>
                  <h5>John</h5>
                  <p>student</p>
                </div>


              </div>
            </div>

          </Carousel.Item>

          <Carousel.Item >
            <div className='b border'>

              <img style={{ width: '70px' }} src={right}></img>
              <p>
              "Incredible flavors and beautifully presented dishes! The pasta was fresh, and the desserts were a perfect finish. Can’t wait to return!"</p>
              <div className='d-flex' >

                <div style={{ paddingRight: '20px' }}>
                  <Avatar style={{ width: '60px', height: '60px' }} />
                </div>
                <div>
                  <h5>Lasya</h5>
                  <p>student</p>
                </div>


              </div>
            </div>

          </Carousel.Item>




        </Carousel>


      </div>

      </div>

      <div className='d-flex col-12 bg-body-secondary'>
        <div className='border rounded-1 m-3 p-3 ' style={{ textAlign: "justify" }}>
          <h4>About Us</h4>
          <p>Welcome to RESTORAN, where culinary passion meets warm hospitality! Established in 2021, our restaurant has become a beloved destination in Nellore for food enthusiasts and casual diners alike.</p>
        </div> <div className='border rounded-1 m-3 p-3' style={{ textAlign: "justify" }}><h4>Our Story</h4>
          <p>At RESTORAN, we believe that great food is more than just a meal; our journey began with a vision to create a place where flavors come alive and every dish tells a story. Our founder,X, wanted to bring a taste of specific cultures to Nellore, and that dream has blossomed into the vibrant eatery you see today.</p>
        </div> <div className='border rounded-1 m-3 p-3' style={{ textAlign: "justify" }}><h4>Our Philosophy</h4>
          <p>We prioritize quality and freshness above all else. Each day, our talented chefs hand-select the finest local and seasonal ingredients to craft our menu. We are committed to sustainability and support local farmers and producers, ensuring that every bite is delicious and responsible.

          </p></div><div className='border rounded-1 m-3 p-3' style={{ textAlign: "justify" }}>
          <h4>Our Menu</h4>
          <p>Our menu features a delightful array of  contemporary Italian, vibrant Asian fusion, classic American comfort food, etc. From sumptuous starters to mouthwatering mains and irresistible desserts, there's something for everyone to savor. Don't forget to check out our specials! We embrace creativity and seasonal changes, allowing our guests to enjoy new flavors with each visit.</p>
        </div><div className='border rounded-1 m-3 p-3' style={{ textAlign: "justify" }}><h4>Join Us</h4>
          <p>
            At RESTORAN, we strive to create a welcoming atmosphere where friends and family can gather, celebrate milestones, or simply enjoy a great meal together. Whether you’re dining in, ordering takeout, or booking a special event, we look forward to serving you with a smile.

            Thank you for being a part of our story. We can’t wait to welcome you to RESTORAN!
          </p></div>
      </div>
    </div>



  )
}

export default About