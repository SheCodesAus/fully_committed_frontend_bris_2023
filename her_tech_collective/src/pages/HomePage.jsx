import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";



function HomePage() {
    const slides = [
      {
        image:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3271&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1573164574472-797cdf4a583a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1573497161079-f3fd25cc6b90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      },
    ];
  
  const [slideNumber, setSlideNumber] = useState(0);
  //function to go to the next slide
  const nextSlide = () => {
    setSlideNumber((preSlideNumber) => preSlideNumber === slides.length - 1 ? 0 : preSlideNumber + 1
    ) 
  }
  //function to automatically go to the next slide after 2seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);

    // return with a function of clearing up the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);



 const renderDots = () => {
   return slides.map((_, index) => {
     return (
       <span
         key={index}
         className={`dot ${index===slideNumber ? "active-dot" : ""}`}
         onClick={() => setSlideNumber(index)}
       ></span>
     );
   });
 };

  

  return (
    <>
      <section className="banner">
        <div className="slider">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === slideNumber ? "active" : ""} `}
            >
              <img src={slide.image} alt={`Slide ${index + 1}`}></img>

              <div className="slide-dots">{renderDots()}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="homepage-info">
        <h1>
        Her Tech Collective is dedicated to igniting the aspirations of the next generation of young women in our community. Our mission is to unveil a captivating ensemble of role models thriving in the dynamic realm of technology. Through the resonance of our platform, we empower the belief that technology knows no boundaries – it is a frontier where everyone is welcome.
        </h1>
      </div>
      <div className="homepage-btn-container">
        <Link to="/profiles/" className="homepage-btn">Click here to view The Collective</Link>
      </div>
      <div className="diversity">
        <h1>Diversity is important to us</h1>
        <h2>Our definition of women includes transgender and cisgender, including non-binary and gender non-conforming people and all those who identify as women. </h2>
        <h2>We acknowledge the traditional owners of the lands on which we live, work and learn and pay our respects to their elders past, present and emerging.</h2>
      </div>
      <div className="footer">
        <h1>Powered by Fully Committed 🚀</h1>
      </div>
      
      
    </>
  );
}

export default HomePage;