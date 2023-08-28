import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import "./App.css";

import Home from "./pages/Home/Home"
import SignIn from "./pages/signIn/signIn"
import ResetPassword from "./pages/signIn/resetPassword"
import Admin from "./pages/admin/AdminEmployeeDetails";
import Header from "./components/header/Header"
import PatientDetails from "./pages/patient/patientDetails"
function App() {
    return (
        <div className="appJS">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signIn" element={<SignIn />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/resetPassword" element={<ResetPassword />} />
                    <Route path="/patientDetails" element={<PatientDetails />} />

                </Routes>
                <ToastContainer theme="colored" />
            </BrowserRouter>
        </div>

    );
}

export default App;