import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import "../index.css";

const SubmissionForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const linkInfo = {
      _id: data._id,
      link: data.link,
    };
    await axios
      .post("/submission/submit", linkInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Successfully Submitted");
          navigate(from, { replace: true });
        }
        // localStorage.setItem("Users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };


  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white glass">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-center">Submit Your Work!</h3>
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            <div className="mb-3">
              <input
                className="px-3 py-2 border rounded-md flex items-center gap-2 w-full "
                type="link"
                id="link"
                name="Link"
                placeholder="Submit drive link of your work!"
                {...register("link", { required: true })}
              />
              <br />
              {errors.email && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <button className="btn bg-green-600 hover:bg-green-700 btn-block border-none">
              Submit!
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default SubmissionForm;
