import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import "../index.css";
import banner2 from "../../public/Banner2.png";
import { Link } from 'react-router-dom';


const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem('Users');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile h-auto md:h-[699px]">
      <Navbar />
      
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        <div className="w-full order-2 md:order-1 md:w-1/2 md:h-[500px] mt-10 md:mt-20 glass  transition duration-300 ease-in-out hover:scale-105">
          <div className="space-y-8 text-center md:mt-[100px]">
            
            <h1 className=" md:text-2xl font-bold  mt-10" id="username">
                 Name: {user.username} 
            </h1>
            <h3 className=" md:text-4xl  text-center mt-[50px]">
            College: {user.college}
            </h3>
            <h3 className="text-2xl md:text-4xl font-bold text-center mt-[50px]">
            Referral code: ##AV123
            </h3>
            
            
          </div>
          <div className="regButton">
          <Link to={'/tasks'} className="btn mt-6 bg-orange-500 hover:bg-orange-700 border-none justify-center transition duration-300 ease-in-out hover:scale-110">View Task!</Link>
          </div>
        </div>

        
        <div className=" order-1 w-full mt-20 md:w-1/2  md:ml-12 md:h-[500px] glass text-left p-10">
        <div id="image-zoom">
        <h2 className="text-xl font-bold mb-4">Rules</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Rule 1: Always be respectful. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio iure magni aspernatur! Voluptatum !</li>
          <li>Rule 2: Follow the community guidelines. Lorem ipsum dolor, sit amet consectetinima sapiente at dolorem velit sit exercitationem dignissimos quo?</li>
          <li>Rule 3: Keep your profile information up-to-date. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates repudiandae, neque nesciunt nis cumque est at quibusdam!</li>
          <li>Rule 4: Report any suspicious activity. Lorem ipsum dolor sit amet consecitecto labore aliquid natu non omnis provident modi inventore, deleniti minima.</li>
          <li>Rule 5: Enjoy your time here! Lorem ipsum dolor sistiae qudolore eaque similique, dolores aliquam molestias dicta eligendi aperiam?</li>
          
        </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
