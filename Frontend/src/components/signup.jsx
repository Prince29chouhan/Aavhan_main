import React, { useState } from "react";
import "../index.css";
import Navbar from "./navbar";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import SignUpConfirmation from "./SignUpConfirmation.js";
import Login from "./Login";

function SignUp() {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [userInfo, setUserInfo] = useState(null);
  const [referralCode, setReferralCode] = useState(""); // Add setReferralCode here
  const [confirming, setConfirming] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const generateReferralCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits = "0123456789";
    let code = "AAVHAN";

    for (let i = 0; i < 4; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    for (let i = 0; i < 2; i++) {
      code += digits.charAt(Math.floor(Math.random() * digits.length));
    }

    return code;
  };

  const onSubmit = async (data) => {
    try {
      const generatedReferralCode = generateReferralCode();
      setReferralCode(generatedReferralCode);
      setValue("referralCode", generatedReferralCode); // Set the generated referral code in the form

      const user = {
        username: data.username,
        email: data.email,
        password: data.password,
        year: data.year,
        college: data.college,
        phoneNum: data.phone,
        referralCode: generatedReferralCode,
      };

      setUserInfo(user);
      setConfirming(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again.");
    }
  };

  const goBack = () => {
    setConfirming(false);
  };

  const saveUserToDatabase = async () => {
    try {
      const response = await axios.post("/user/signup", userInfo);
      console.log("User signup response:", response.data);

      if (response.data.user) {
        toast.success("Signup Successful!");
        // Optionally clear form fields or redirect to another page
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Save user data to local storage
      } else {
        toast.error("Signup Failed. Please try again.");
      }
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error("Error saving user. Please try again.");
    }
  };

  return (
    <>
      {confirming ? (
        <SignUpConfirmation userInfo={userInfo} goBack={goBack} saveUserToDatabase={saveUserToDatabase} />
      ) : (
        <div className="signup dark:bg-slate-900 dark:text-white">
          <Navbar />
          <div className="flex h-screen items-center justify-center w-screen glass">
            <div>
              <div className="modal-box bg-white w-[300px] md:w-[1000px] h-full glass justify-center items-center">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  method="dialog"
                  className="dark:text-black"
                >
                  <Link
                    to={"/"}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  >
                    ✕
                  </Link>
                  <h2 className="font-bold text-center text-2xl">
                    Registration Form
                  </h2>
                  <div className="container d-flex justify-content-center align-items-center mt-5">
                    <div className="row">
                      <div className="card-body">
                        <div className="">
                          <label className="" htmlFor="username">
                            Name
                          </label>
                          <input
                            className="px-3 py-2 border rounded-md flex items-center gap-2 w-full"
                            type="text"
                            name="username"
                            placeholder="Enter your fullname"
                            {...register("username", { required: true })}
                          />
                          <br />
                          {errors.username && (
                            <span className="text-sm text-red-500">
                              This field is required
                            </span>
                          )}
                        </div>
                        <div className="">
                          <label className="" htmlFor="phone">
                            Phone no.
                          </label>
                          <input
                            className="px-3 py-2 border rounded-md flex items-center gap-2 w-full"
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder="Enter your phone no."
                            {...register("phone", { required: true })}
                          />
                          <br />
                          {errors.phone && (
                            <span className="text-sm text-red-500">
                              This field is required
                            </span>
                          )}
                        </div>
                        <div className="">
                          <label className="" htmlFor="email">
                            Email
                          </label>
                          <input
                            className="px-3 py-2 border rounded-md flex items-center gap-2 w-full"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
                            {...register("email", { required: true })}
                          />
                          <br />
                          {errors.email && (
                            <span className="text-sm text-red-500">
                              This field is required
                            </span>
                          )}
                        </div>
                        <div className="">
                          <label className="" htmlFor="college">
                            College
                          </label>
                          <input
                            className="px-3 py-2 border rounded-md flex items-center gap-2 w-full"
                            type="text"
                            id="college"
                            name="college"
                            placeholder="Enter your college name"
                            {...register("college", { required: true })}
                          />
                          <br />
                          {errors.college && (
                            <span className="text-sm text-red-500">
                              This field is required
                            </span>
                          )}
                        </div>
                        <div className="">
                          <label className="" htmlFor="year">
                            Year of study
                          </label>
                          <input
                            className="px-3 py-2 border rounded-md flex items-center gap-2 w-full"
                            type="number"
                            id="year"
                            name="year"
                            {...register("year", { required: true })}
                          />
                          <br />
                          {errors.year && (
                            <span className="text-sm text-red-500">
                              This field is required
                            </span>
                          )}
                        </div>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="password">
                            Password
                          </label>
                          <br />
                          <input
                            className="px-3 py-2 border rounded-md flex items-center gap-2 w-full"
                            type="password"
                            id="password"
                            name="password"
                            {...register("password", { required: true })}
                          />
                          <br />
                          {errors.password && (
                            <span className="text-sm text-red-500">
                              This field is required
                            </span>
                          )}
                        </div>
                        
                        <button className="btn bg-green-600 hover:bg-green-700 btn-block border-none">
                          Register
                        </button>
                        <div className="flex justify-around mt-4">
                          <p className="text-center">
                            Already have an account?{" "}
                            <button
                              className="underline text-white cursor-pointer"
                              onClick={() =>
                                document
                                  .getElementById("my_modal_3")
                                  .showModal()
                              }
                            >
                              Login
                            </button>
                          </p>
                          <Login />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUp;
