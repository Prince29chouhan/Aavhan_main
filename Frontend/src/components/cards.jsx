import React from "react";
import '../index.css';
import { Link } from "react-router-dom";
import SubmissionForm from "./submissionForm";
import Login from "./Login";

function Cards({ item }) {
  return (
    <>
      <div className="mt-4 my-3 p-3 transition duration-300 ease-in-out hover:scale-105">
        <div className="card card-compact bg-base-100 w-96 shadow-xl dark:bg-slate-800 dark:shadow-2xl p-4">
          <figure className="mt-5">
            <img src={item.image} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title justify-center">{item.title}</h2>
            <p>{item.description}</p>
            <div className="card-actions justify-between">
              <div className=" card-actions justify-center display-flex">
              <a
                  className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  Submit Task!
                </a>
                <SubmissionForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
