import React, { useEffect, useState } from "react";
import '../index.css'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import axios from "axios";

import Cards from "./cards";
import { Link } from "react-router-dom";
function Task() {
    const [task, setTask] = useState([]);
    useEffect(() => {
      const getTask = async () => {
        try {
          const res = await axios.get("http://localhost:4001/task");
          console.log(res.data);
          setTask(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      getTask();
    }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
   <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 dark:bg-slate-900 dark:text-white">
        <div className= "mt-10 items-center justify-center text-center dark:bg-slate-900">
          <div >
          <h1 className="text-2xl font-semibold md:text-4xl dark:bg-slate-900 p-10">
            Welcome to Task Management System of{" "}
            <span className="text-orange-500">Aavhan! :) </span>
          </h1>
          </div>
          <p className="mt-5">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non qui
            molestias cumque nam odio eaque quos provident ipsa. Inventore
            impedit, culpa tenetur pariatur molestias rerum numquam possimus vel
            nisi voluptate.
          </p>
        </div>

        <div >
          <Slider {...settings}>
            {task.map((item) => (
              <Cards item={item} key={item.id} />
            ))}
          </Slider>
        </div>
        <div className="justify-center max-[100px] items-center backButton transition duration-300 ease-in-out hover:scale-110">
        
<Link to={'/'} className="btn  bg-orange-500 px-10 mt-5 hover:bg-orange-700 border-none mb-12 items-center"> Go Back
</Link>

        </div>
      </div>
    </>
  );
}
export default Task;