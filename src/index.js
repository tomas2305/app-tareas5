import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import NotLogedinRoute from "./components/NotLogedinRoute";
import LogedinRoute from "./components/LogedinRoute";
import FormTarea from "./components/FormTarea";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            path="/login"
            element={
              <NotLogedinRoute>
                <Login />
              </NotLogedinRoute>
            }
          />
          <Route
            path="/register"
            element={
              <NotLogedinRoute>
                <Register />
              </NotLogedinRoute>
            }
          />
          <Route
            path="/resetPassword"
            element={
              <NotLogedinRoute>
                <ResetPassword />
              </NotLogedinRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
