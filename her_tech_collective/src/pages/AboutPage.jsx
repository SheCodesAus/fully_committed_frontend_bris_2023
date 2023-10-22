import React from "react";
import "./AboutPage.css";

function AboutPage() {
    return (
        <div>
            <section className="about">
            <h1>About Us</h1>
            <p>
            Her Tech Collective envisions a world where young women in our community are empowered 
            to pursue and excel in the tech industry. Our vision is to light the path of inspiration 
            by presenting a diverse array of relatable role models who thrive in the world of 
            technology. We are committed to proving that, indeed, anyone can work in tech.
            
            Her Tech Collective is committed to simplifying the path to involvement. Our vision is 
            to make it effortless for individuals to log in, create their profiles, explore the rich 
            diversity of tech role models, and connect with those they aspire to learn from. 
            We believe that every click, every connection, and every moment spent on our platform 
            is a step toward a more diverse and innovative tech community.
            </p>
            </section>
            <section className="textandimage">
            <section className="dotpoints">
            <h2>Get the most out of this site...</h2>
            <ul>
            <li><h3>Inspiration</h3></li>
            <p>Sift through profiles of inspirational women to see what is possible and build your own career aspirations</p>
            <li><h3>Recruitment</h3></li>
            <p>Headhunt your next new hire, or add your own profile to get noticed!</p>
            <li><h3>Mentoring</h3></li>
            <p>Seek out a personal or professional mentorship and get the support you need to succeed</p>
            <li><h3>Development</h3></li>
            <p>Get some inspiration for your next development goal and make contact to discuss how best to gain that skill or attribute</p>
            </ul>
            <h4>Don't forget to have fun!</h4>
            </section>
            <section className="aboutimg">
            <img src= "https://images.unsplash.com/photo-1455849318743-b2233052fcff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80" alt="Like a Boss" />  
            </section>
            </section>
            <div className="footer">
            <h1>Powered by Fully Committed 🚀</h1>
            </div>
            </div>

    );   

}

export default AboutPage;