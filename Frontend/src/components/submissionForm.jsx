import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/authProvider"; // Import the useAuth hook
import "../index.css";

const SubmissionForm = () => {
  const [authUser] = useAuth(); // Get the authenticated user
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { email, link } = data;

      // Validate the email
      if (email !== authUser.email) {
        toast.error("Enter your correct email");
        return;
      }

      const submissionData = { email, link };

      const response = await axios.post("/submission/submit", submissionData);

      if (response.data) {
        toast.success("Successfully Submitted");
        navigate(from, { replace: true });
      }
    } catch (error) {
      if (error.response) {
        console.error("Submission failed:", error.response.data);
        toast.error("Error: " + error.response.data.message);
      } else {
        console.error("Submission failed:", error.message);
        toast.error("Failed to submit. Please try again.");
      }
    }
  };

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box bg-white glass">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-center">Submit Your Work!</h3>
        <form onSubmit={handleSubmit(onSubmit)} method="dialog">
          <div className="mb-3">
            <input
              className="px-3 py-2 border rounded-md flex items-center gap-2 w-full"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            <br />
            {errors.email && (
              <span className="text-sm text-red-500">
                Email is required
              </span>
            )}
          </div>
          <div className="mb-3">
            <input
              className="px-3 py-2 border rounded-md flex items-center gap-2 w-full"
              type="text"
              id="link"
              name="link"
              placeholder="Submit drive link of your work!"
              {...register("link", { required: true })}
            />
            <br />
            {errors.link && (
              <span className="text-sm text-red-500">
                Link is required
              </span>
            )}
          </div>
          <button className="btn bg-green-600 hover:bg-green-700 btn-block border-none">
            Submit!
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default SubmissionForm;
