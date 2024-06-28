import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await axios.post("/user/login", userInfo);
      console.log(res.data);
      if (res.data) {
        toast.success("Welcome to Aavhan!");
        document.getElementById("my_modal_3").close();
        setTimeout(() => {
          window.location.reload();
          localStorage.setItem("Users", JSON.stringify(res.data.user));
        }, 1000);
      }
    } catch (err) {
      if (err.response) {
        console.error(err);
        toast.error("Error: " + err.response.data.message);
        setTimeout(() => {}, 2000);
      }
    }
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-white">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            <h2 className="font-bold text-center text-2xl">Login</h2>
            <div className="container d-flex justify-content-center align-items-center mt-5">
              <div className="row">
                <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                  <div className="card shadow">
                    <img
                      src="https://process.filestackapi.com/Ar1JhJgKrRMCHY5XInB1Iz/resize=width:742,fit:clip/cache=expiry:max/https://cdn.filepicker.io/api/file/joI1b3uCSeGNt5F7XMzM"
                      alt=""
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <div className="mb-3">
                        <label className="" htmlFor="email">
                          Email
                        </label>
                        <input
                          className="px-3 py-2 border rounded-md flex items-center gap-2 w-full"
                          type="email"
                          id="email"
                          name="email"
                          {...register("email", { required: true })}
                        />
                        <br />
                        {errors.email && (
                          <span className="text-sm text-red-500">
                            This field is required
                          </span>
                        )}
                      </div>

                      <div className="mb-3 relative">
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                        <br />
                        <div className="relative">
                          <input
                            className="px-3 py-2 border rounded-md flex items-center gap-2 w-full"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            {...register("password", { required: true })}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-2"
                            onClick={togglePasswordVisibility}
                            style={{ cursor: "pointer", backgroundColor: "transparent", border: "none" }}
                          >
                            {showPassword ? (
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/></svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.604 2.562l-3.346 3.137c-1.27-.428-2.686-.699-4.243-.699-7.569 0-12.015 6.551-12.015 6.551s1.928 2.951 5.146 5.138l-2.911 2.909 1.414 1.414 17.37-17.035-1.415-1.415zm-6.016 5.779c-3.288-1.453-6.681 1.908-5.265 5.206l-1.726 1.707c-1.814-1.16-3.225-2.65-4.06-3.66 1.493-1.648 4.817-4.594 9.478-4.594.927 0 1.796.119 2.61.315l-1.037 1.026zm-2.883 7.431l5.09-4.993c1.017 3.111-2.003 6.067-5.09 4.993zm13.295-4.221s-4.252 7.449-11.985 7.449c-1.379 0-2.662-.291-3.851-.737l1.614-1.583c.715.193 1.458.32 2.237.32 4.791 0 8.104-3.527 9.504-5.364-.729-.822-1.956-1.99-3.587-2.952l1.489-1.46c2.982 1.9 4.579 4.327 4.579 4.327z"/></svg>
                            )}
                          </button>
                        </div>
                        <br />
                        {errors.password && (
                          <span className="text-sm text-red-500">
                            This field is required
                          </span>
                        )}
                      </div>
                      <button className="btn bg-green-600 hover:bg-green-700 btn-block border-none">
                        Login
                      </button>
                      <div className="flex justify-around mt-4">
                        <p className="text-center">
                          Not registered?{" "}
                          <Link
                            to={"/signup"}
                            className="underline text-blue-500 cursor-pointer"
                          >
                            SignUp
                          </Link>
                        </p>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
