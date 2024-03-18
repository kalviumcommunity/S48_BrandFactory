import React from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom'
 function About() {
    const navigate = useNavigate()
  return (
    <div id="about">
        <div className="App">
        <header className="App-header">
            <center><h1>Welcome to Your Ultimate Guide to Top Clothing Brands - BrandFactory</h1></center><hr /><br />
            <p>
            Are you passionate about fashion? Do you love exploring the latest trends and iconic styles? Look no further! Our platform is your one-stop destination to dive deep into the captivating world of clothing brands.
            </p>
        </header>     
        <br />
            <li>Explore the Best in Fashion</li>
            <p>
            From timeless classics to avant-garde designs, we've curated a comprehensive list of the top clothing brands that are making waves in the fashion industry. Delve into the stories behind these iconic labels and uncover what sets them apart.
            </p>
            <li>Detailed Brand Descriptions</li>
            <p>
            Get ready to immerse yourself in the rich history, visionary founders, and inspiring mission statements of each clothing brand. Our detailed descriptions provide invaluable insights into their origins, philosophies, and unique selling points, giving you a deeper appreciation for their craftsmanship and creativity.
            </p>
            <li>Quality Standards and Production</li>
            <p>
            Ever wondered how your favorite brands maintain impeccable quality standards throughout the production process? We'll take you behind the scenes to discover the meticulous craftsmanship, ethical practices, and innovative techniques that ensure each garment meets the highest standards of excellence.
            </p>
            <li>Save Your Favorites</li>
            <p>
            With our user-friendly interface, you can easily sign up and create a personalized profile. Keep track of your favorite brands with the click of a button, making it effortless to revisit and explore further whenever inspiration strikes.
            </p>
            <li>Join Our Fashion Community</li>
            <p>
            Connect with fellow fashion enthusiasts, share your insights, and stay updated on the latest trends. Our vibrant community is fueled by passion, creativity, and a shared love for all things fashion.
            </p>
            <li>Start Your Fashion Journey Today</li>
            <p>
            Embark on a journey of discovery and inspiration with our curated collection of top clothing brands. Whether you're a seasoned fashion aficionado or just beginning to explore the world of style, there's something here for everyone.
            </p>
            <li>Get Started Now</li>
            <p>
            Sign up to unlock exclusive features and start exploring the fascinating world of fashion today! <br />
            </p>
            <div className="buttons">
                <button onClick={()=>{navigate('/home')}} className='bt'>Get Started</button>
            </div>
            <br /><hr /><br />
            <center><p className='thought'>Join us as we celebrate the artistry, innovation, and diversity of the fashion world. Your adventure begins here.</p></center>
        </div>
        </div>
  )
}
export default About