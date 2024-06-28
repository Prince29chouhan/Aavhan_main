import React, { Profiler } from 'react'
import Home from './home/home'
import { Navigate, Route, Routes } from 'react-router-dom'
import Assignment from './assignments/assignments'
import SignUp from './components/signup'
import Profile from './components/profile'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './context/authProvider'
import SubmissionForm from './components/submissionForm'
import AboutUs from './components/About'
import ProfileUpdate from './components/profileUpdate'





export default function App() {
  const [authUser, setAuthUser] = useAuth();
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={authUser? <Assignment />: <Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/submission" element={<SubmissionForm />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/updateProfile" element={<ProfileUpdate />} />
        


      </Routes>
      <Toaster />
      </div>
    </>
  )
}

