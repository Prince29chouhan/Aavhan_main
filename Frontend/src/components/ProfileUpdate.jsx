import React, { useState, useEffect } from "react";
import "../index.css";
import Navbar from "./navbar";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ProfileUpdate() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    // Fetch user data from localStorage
    const user = JSON.parse(localStorage.getItem("Users"));
    if (user) {
      setUserInfo(user);
      reset(user); 
    }
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      data.userId = userInfo._id; 
      const response = await axios.put("/user/update", data); 
      setUserInfo(response.data.user);
      toast.success("Profile updated successfully");
      localStorage.setItem("Users", JSON.stringify(response.data.user));
      navigate("/profile"); 
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      }
    }
  };

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <>
      <div className="profile-update dark:bg-slate-900 dark:text-white">
        <Navbar />
        <div className="flex h-screen items-center justify-center w-screen glass">
          <div>
            <div className="modal-box bg-white w-[300px] md:w-[1000px] h-full glass justify-center items-center">
              <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="dark:text-black">
                <h2 className="font-bold text-center text-2xl">Update Profile</h2>
                <div className="container d-flex justify-content-center align-items-center mt-5">
                  <div className="row">
                    <div className="card-body">
                      <div className="">
                        <label className="" htmlFor="username">Name</label>
                        <input
                          className="px-3 py-2 border rounded-md flex items-center gap-2 w-full"
                          type="text"
                          name="username"
                          placeholder="Enter your fullname"
                          {...register("username", { required: true })}
                        />
                        <br />
                        {errors.username && <span className="text-sm text-red-500">This field is required</span>}
                      </div>
                      <div className="">
                        <label className="" htmlFor="phone">Phone no.</label>
                        <input
                          className="px-3 py-2 border rounded-md flex items-center gap-2 w-full"
                          type="text"
                          id="phone"
                          name="phone"
                          placeholder="Enter your phone no."
                          {...register("phone", { required: true })}
                        />
                        <br />
                        {errors.phone && <span className="text-sm text-red-500">This field is required</span>}
                      </div>
                      <div className="">
                        <label className="" htmlFor="email">Email</label>
                        <input
                          className="px-3 py-2 border rounded-md flex items-center gap-2 w-full"
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Enter your email address"
                          {...register("email", { required: true })}
                        />
                        <br />
                        {errors.email && <span className="text-sm text-red-500">This field is required</span>}
                      </div>
                      <div className="">
                        <label className="" htmlFor="college">College</label>
                        <input
                          className="px-3 py-2 border rounded-md flex items-center gap-2 w-full"
                          type="text"
                          id="college"
                          name="college"
                          placeholder="Enter your college name"
                          {...register("college", { required: true })}
                        />
                        <br />
                        {errors.college && <span className="text-sm text-red-500">This field is required</span>}
                      </div>
                      <div className="">
                        <label className="" htmlFor="year">Year of study</label>
                        <input
                          className="px-3 py-2 border rounded-md flex items-center gap-2 w-full"
                          type="number"
                          id="year"
                          name="year"
                          {...register("year", { required: true })}
                        />
                        <br />
                        {errors.year && <span className="text-sm text-red-500">This field is required</span>}
                      </div>
                      <button className="btn bg-green-600 hover:bg-green-700 btn-block border-none">
                        Update Profile
                      </button>
                      <button
                        type="button"
                        className="btn bg-gray-600 hover:bg-gray-700 btn-block border-none mt-4"
                        onClick={goBack}
                      >
                        Go Back
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileUpdate;
