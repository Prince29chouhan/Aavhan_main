import React from "react";
import "../index.css";
import Navbar from "./navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import "../index.css";


function SignUp() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      _id: data._id,
      username: data.username,
      email: data.email,
      password: data.password,
      year: data.year,
      college: data.college,
      phoneNum: data.phone,
    };
    await axios
      .post("/user/signup", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Signup Successfully");
          navigate(from, { replace: true });
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };


  return(
    <>
    
    <div className="signup  dark:bg-slate-900 dark:text-white">
        <Navbar />
      <div className="flex h-screen items-center justify-center w-screen glass">
        <div >
        <div className="modal-box bg-white w-[300px] md:w-[1000px] h-full glass justify-center items-center">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="  dark:text-black">
            {/* if there is a button in form, it will close the modal */}
            <Link to={'/'} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </Link>
      
          <h2 className="font-bold text-center text-2xl">Registration Form</h2>
          <div className="container d-flex justify-content-center align-items-center mt-5">
    <div className="row">
        <div className="">
            <div className=" ">
                {/* <img src="https://process.filestackapi.com/Ar1JhJgKrRMCHY5XInB1Iz/resize=width:742,fit:clip/cache=expiry:max/https://cdn.filepicker.io/api/file/joI1b3uCSeGNt5F7XMzM"
                    alt="" className="card-img-top" /> */}
                <div className="card-body">
                    
                <div className="">
                            <label className="" htmlFor="username">Name</label>
                            <input className="px-3 py-2 border rounded-md flex items-center gap-2 w-full " type="text" id="" name="username"  placeholder="Enter your fullname" {...register("username", { required: true })}/>
                            <br />
                         {errors.username && <span className="text-sm text-red-500">This field is required</span>}
                        </div>
                        <div className="">
                            <label className="" htmlFor="phone">Pnone no.</label>
                            <input className="px-3 py-2 border rounded-md flex items-center gap-2 w-full " type="text" id="phone" name="phone"  placeholder="Enter your phone no." {...register("phone", { required: true })}/>
                            <br />
                         {errors.phone && <span className="text-sm text-red-500">This field is required</span>}
                        </div>
                        <div className="">
                            <label className="" htmlFor="email" >Email</label>
                            <input className="px-3 py-2 border rounded-md flex items-center gap-2 w-full " type="Email" id="email" name="email" placeholder="Enter your email address" {...register("email", { required: true })}/>
                            <br />
                         {errors.email && <span className="text-sm text-red-500">This field is required</span>}
                        </div>
                        <div className="">
                            <label className=""  htmlFor="college">College</label>
                            <input className="px-3 py-2 border rounded-md flex items-center gap-2 w-full " type="text" id="college" name="college" placeholder="Enter your collage name" {...register("college", { required: true })}/>
                            <br />
                         {errors.college && <span className="text-sm text-red-500">This field is required</span>}
                        </div>
                        <div className="">
                            <label className="" htmlFor="year">Year of study</label>
                            <input className="px-3 py-2 border rounded-md flex items-center gap-2 w-full " type="number" id="year" name="year"  {...register("year", { required: true })}/>
                            <br />
                         {errors.year && <span className="text-sm text-red-500">This field is required</span>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="password">Password</label>
                            <br />
                            <input className="px-3 py-2 border rounded-md flex items-center gap-2 w-full" type="password" id="password" name="password" {...register("password", { required: true })}/>
                            <br />
                         {errors.password && <span className="text-sm text-red-500">This field is required</span>}
                        </div>
                        <button className="btn bg-green-600 hover:bg-green-700 btn-block border-none">Register</button>
                        <div className="flex justify-around mt-4">
                            <p className="text-center">Already have account? <button className="underline text-white cursor-pointer"  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }>Login</button></p>{" "}
                  <Login />
                        </div>
                   
                </div>
            </div>
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


export default SignUp;
