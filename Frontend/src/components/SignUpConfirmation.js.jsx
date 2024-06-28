import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function SignUpConfirmation({ userInfo, goBack }) {
  const navigate = useNavigate();

  const handleFinalSubmit = async () => {
    try {
      const res = await axios.post("/user/signup", userInfo);
      console.log(res.data);
      if (res.data) {
        toast.success("Signup Successfully");
        navigate("/", { replace: true });
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      }
    } catch (err) {
      if (err.response) {
        console.log(err);
        toast.error("Error: " + err.response.data.message);
      }
    }
  };

  return (
    <div className="signup-confirmation dark:bg-slate-900 dark:text-white signup ">
      <div className="flex h-screen items-center justify-center w-screen glass ">
        <div className="modal-box bg-white w-full md:max-w-[600px] h-auto  justify-center items-center rounded-lg shadow-lg">
          <div className="p-8">
            <h2 className="font-bold text-center text-3xl mb-6 text-green-800">
              Confirm Your Details
            </h2>
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="w-1/3">
                  <label className="font-semibold">Name:</label>
                </div>
                <div className="w-2/3">
                  <p>{userInfo.username}</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-1/3">
                  <label className="font-semibold">Phone:</label>
                </div>
                <div className="w-2/3">
                  <p>{userInfo.phoneNum}</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-1/3">
                  <label className="font-semibold">Email:</label>
                </div>
                <div className="w-2/3">
                  <p>{userInfo.email}</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-1/3">
                  <label className="font-semibold">College:</label>
                </div>
                <div className="w-2/3">
                  <p>{userInfo.college}</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-1/3">
                  <label className="font-semibold">Year of Study:</label>
                </div>
                <div className="w-2/3">
                  <p>{userInfo.year}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="btn bg-green-600 hover:bg-green-700 w-full md:w-auto border-none py-3 px-6 mr-2"
                onClick={handleFinalSubmit}
              >
                Confirm and Register
              </button>
              <button
                className="btn bg-gray-600 hover:bg-gray-700 w-full md:w-auto border-none py-3 px-6 ml-2"
                onClick={goBack}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpConfirmation;
