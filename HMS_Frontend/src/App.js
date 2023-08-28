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
import Accountant from "./pages/accountant/Accountant"
import PatientDetailsAccountant from "./components/accountant/patientDetailsAccountant"

import InvalidPage from "./pages/errorHandling/InvalidPage";
import ErrorHandle from "./pages/errorHandling/ErrorHandle";

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
                    <Route path="/accountant" element={<Accountant />} />
                    <Route
                        path="/accountant/patientDetails"
                        element={<PatientDetailsAccountant />}
                    />
                    <Route path="/error" element={<ErrorHandle />} />
                    <Route path='*' element={<InvalidPage />} />
                </Routes>
                <ToastContainer theme="colored" />
            </BrowserRouter>
        </div>

    );
}

export default App;