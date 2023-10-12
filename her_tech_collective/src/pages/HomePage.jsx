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
          Her Tech Collective aims to inspire young women in the community by
          showcasing a collection of relatable role models who work in the tech
          industry. By sharing this website, we can show young people that
          anyone can work in tech.
        </h1>
      </div>
      <div className="homepage-btn-container">
        <Link to="/profiles/" className="homepage-btn">click here to view the collective</Link>
      </div>
      
      
    </>
  );
}

export default HomePage;