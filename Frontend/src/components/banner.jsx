import React, { useEffect } from 'react';
import banner from '../../public/Banner.png';
import bubble from '../../public/bubble.png';
import '../index.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authProvider';

const Banner = () => {
  const [authUser] = useAuth();

  useEffect(() => {
    // Trigger animation on mount
    const bannerImage = document.getElementById('image-zoom-wrapper');
    if (bannerImage) {
      bannerImage.classList.add('slide-from-left');
    }

    // Animate text reveal
    const textAavhan = document.getElementById('aavhan');
    if (textAavhan) {
      textAavhan.innerHTML = textAavhan.textContent.split('').map((char, index) => {
        return `<span class="letter glow-orange" style="animation-delay: ${index * 0.1}s">${char}</span>`;
      }).join('');
    }

    const textUnify = document.getElementById('unify');
    if (textUnify) {
      textUnify.innerHTML = textUnify.textContent.split('').map((char, index) => {
        return `<span class="letter glow-black" style="animation-delay: ${index * 0.1}s">${char}</span>`;
      }).join('');
    }

    return () => {
      // Clean up animation classes if needed
      if (bannerImage) {
        bannerImage.classList.remove('slide-from-left');
      }
    };
  }, []);

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10 relative banner">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36 z-10 relative">
          <div className="space-y-8">
            <h1 className="text-2xl text-left md:text-4xl font-bold transition duration-300 ease-in-out hover:scale-110">
              <span id="aavhan" className='m-0 text-2xl '>
                Aavhan{' '}</span>
              <span id='unify' className="text-orange-500 hover:scale-[2px]">Unify</span>{' '}
            </h1>
            <h1 className="text-2xl md:text-4xl font-bold">
              <span className="text-orange-500">College Ambassadors</span>{' '}
              Program
            </h1>
            <p className="text-sm md:text-xl">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor,
              et totam. Tempora amet atque expedita, quae corrupti totam sed
              pariatur corporis at veniam est voluptas animi!
            </p>
          </div>
          
          <div className="">
            {!authUser ? (
              <Link
                to={'/signup'}
                className="btn mt-6 bg-orange-500 hover:bg-orange-700 border-none justify-center transition duration-300 ease-in-out hover:scale-110"
              >
                Register Now!
              </Link>
            ) : (
              <Link
                to={'/profile'}
                className="btn mt-6 bg-orange-500 hover:bg-orange-700 border-none  transition duration-300 ease-in-out hover:scale-110 w-40 items-center"
              >
                Visit your profile!
              </Link>
            )}
          </div>
        </div>
        <div className="order-1 w-full mt-20 md:w-1/2 relative">
          <div id="image-zoom" className='animated-image'>
            <img
              src={banner}
              id="image-zoom-wrapper"
              className="md:w-[600px] md:h-[500px] md:ml-12 "
              alt=""
              data-tilt
            />
          </div>
        </div>
      </div>
      <div className="bubbles">
        <img src={bubble} alt="" />
        <img src={bubble} alt="" />
        <img src={bubble} alt="" />
        <img src={bubble} alt="" />
        <img src={bubble} alt="" />
        <img src={bubble} alt="" />
        <img src={bubble} alt="" />
        <img src={bubble} alt="" />
        <img src={bubble} alt="" />
      </div>
    </>
  );
};

export default Banner;
