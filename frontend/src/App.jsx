import React, { Suspense } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  Navigate,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Albums from "./pages/Albums";
import Layout from "./components/Layout";
import PhotoGallery from "./pages/PhotoGallery";
import CheckAuth from "./components/CheckAuth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          to="/"
          element={
            <CheckAuth>
              {" "}
              <Layout />
            </CheckAuth>
          }
        >
          <Route
            path="/albums"
            element={
              <CheckAuth>
                <Albums />
              </CheckAuth>
            }
          ></Route>
          <Route
            path="/albums/:albumId"
            element={
              <CheckAuth>
                <PhotoGallery />
              </CheckAuth>
            }
          ></Route>
        </Route>
        <Route path="*" element={<h1>Page not found</h1>}></Route>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <ScrollToTop />
    </BrowserRouter>
  );
};

export default App;
