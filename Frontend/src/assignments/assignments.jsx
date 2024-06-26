import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Task from "../components/task";


function Assignment() {
  return(
  <>
  <Navbar />
  <div className="min-h-screen">
  <Task />
  </div>
  <Footer />
  </>
  );
}

export default Assignment;
