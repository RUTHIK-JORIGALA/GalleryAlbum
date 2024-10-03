import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";

const Layout = () => {
  const navigate = useNavigate();
  if (localStorage.getItem("token")) {
  }
  const userName = localStorage.getItem("userName");
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      navigate("/login");
      toast.success("Logged out Successfully");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div>
      <div className="bg-indigo-600 text-white flex justify-between p-6 sticky top-0 z-50 ">
        <Link to="/albums">
          <h1 className="font-bold text-2xl tracking-wide">Gallery</h1>
        </Link>

        <div className="flex items-center gap-6">
          <p className="text-lg italic hidden sm:block">
            {userName ? userName : "John"}
          </p>
          <div
            className="flex items-center gap-2 border rounded-md px-2 py-0.5 hover:bg-white/20 hover:cursor-pointer"
            onClick={() => handleLogout()}
          >
            Logout
            <IoIosLogOut className="size-6" />
          </div>
        </div>
      </div>
      <main className="max-w-screen-xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
