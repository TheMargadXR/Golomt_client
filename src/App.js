import react from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import Login from "./Page/Login";
import SignUp from "./Page/SignUp";
import NotFound from "./Page/404";
import Dashboard from "./Page/Dashboard";
import BankAccountCreate from "./Page/BankAccountCreate";
import FrequencyTransaction from "./Page/FrequencyTransaction";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/bankaccount" element={<BankAccountCreate />} />
          <Route
            path="/FrequencyTransaction"
            element={<FrequencyTransaction />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
