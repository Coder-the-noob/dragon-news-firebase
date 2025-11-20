import React, { use } from "react";
import { Link, NavLink } from "react-router";
import userIcon from "../assets/user.png";
import { AuthContext } from "../Provider/AuthProvider";
const Navbar = () => {
  const {user,logOut} = use(AuthContext);
  const handleLogout = () => {
    // handle logout logic here
   
    logOut()
    .then(() => {
      alert("User logged out successfully");
    })
    .catch(error => {
      console.log(error);
      alert(error.message);
    });
  };
  return (
    <div className="flex justify-between items-center">
      <div className="">{user && user.email}</div>
      <div className="nav flex gap-5 text-accent">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/career">Career</NavLink>
      </div>
      <div className="login-btn flex gap-5">
        <img className="w-12 rounded-full" src={`${user && user.photoURL ? user.photoURL : userIcon}`} alt="" />
        {
          user ? <button onClick={handleLogout} className="btn btn-primary px-10 ">Logout</button> : <Link to="/auth/login" className="btn btn-primary px-10 ">Login</Link>
        }
        
      </div>
    </div>
  );
};

export default Navbar;
