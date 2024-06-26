import React from "react";
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

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    await axios
    // http://localhost:4001
      .post("/user/login", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Loggedin Successfully");
          document.getElementById("my_modal_3").close();
          setTimeout(() => {
            window.location.reload();
            localStorage.setItem("Users", JSON.stringify(res.data.user));
          }, 1000);
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
          setTimeout(() => {}, 2000);
        }
      });
  };
  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box  bg-white">
        <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
          <form onSubmit={handleSubmit(onSubmit)} method="dialog" >
            {/* if there is a button in form, it will close the modal */}
            
          
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
                        <label className="" htmlFor="email">Email</label>
                        <input
                          className="px-3 py-2 border rounded-md flex items-center gap-2 w-full "
                          type="email"
                          id="email"
                          name="email"
                          {...register("email", { required: true })}
                          
                        />
                        <br />
                         {errors.email && <span className="text-sm text-red-500">This field is required</span>}
                      </div>

                      <div className="mb-3">
                        <label className="form-label" htmlFor="password">Password</label>
                        <br />
                        <input
                          className="px-3 py-2 border rounded-md flex items-center gap-2 w-full"
                          type="password"
                          id="password"
                          name="password"
                          {...register("password", { required: true })}
                        />
                        <br />
                         {errors.password && <span className="text-sm text-red-500">This field is required</span>}
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
