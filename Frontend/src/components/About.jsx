// src/components/AboutUs.js

import React from 'react';
import Navbar from './navbar';
import { useEffect, useState } from 'react';
import '../index.css'
import Footer from './footer';
import Logo from "../../public/aavhanLogo.png";

const AboutUs = () => {
    const [isScrolled, setIsScrolled] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 10) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    return (
        <>
      <div className="relative h-screen w-full">
        <Navbar />
        <div className="absolute inset-0 bg-cover bg-center blur-sm aboutUs"></div>
        <div className={`relative flex flex-col items-center justify-center  bg-opacity-50 ${isScrolled ? 'scrolled' : ''}`}>
        <div className="relative flex flex-col items-center justify-center h-full  bg-opacity-50">
          <div className="text-center text-black p-8 rounded-lg  dark:text-white">
            <div className="flex items-center justify-center mb-4">
              <img src= {Logo} alt="Company Logo" className="w-24 h-24 mr-2 bounce logo mt-10" />
              <h1 className="text-2xl font-bold transform-gpu text-3d animate-text md:text-6xl mt-10">
                {Array.from("AAVHAN").map((letter, index) => (
                  <span
                    key={index}
                    className={`inline-block bounce ${index % 2 === 0 ? 'bounce-left' : 'bounce-right'}`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {letter}
                  </span>
                ))}
              </h1>
            </div>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto about-paragraph">
              Welcome to our company! We are dedicated to providing the best service in the industry. Our team is composed of skilled professionals who are passionate about their work. We believe in innovation, quality, and customer satisfaction.
            </p>
            <p className="text-lg leading-relaxed mt-4 max-w-2xl mx-auto about-paragraph">
              Our mission is to deliver exceptional value to our customers by offering high-quality products and services. We are committed to continuous improvement and strive to exceed customer expectations.
            </p>
            <p className="text-lg leading-relaxed mt-4 max-w-2xl mx-auto about-paragraph">
              Our mission is to deliver exceptional value to our customers by offering high-quality products and services. We are committed to continuous improvement and strive to exceed customer expectations.
            </p>
            <p className="text-lg leading-relaxed mt-4 max-w-2xl mx-auto about-paragraph">
              Our mission is to deliver exceptional value to our customers by offering high-quality products and services. We are committed to continuous improvement and strive to exceed customer expectations.
            </p>
          </div>
          </div>
        </div>
        
      </div>
      <div className='dark:bg-slate-900 dark:text-white'>
        <Footer />
        </div>
      </>
    );
  };
  
  export default AboutUs;