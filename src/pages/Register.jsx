import React, { use, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const Register = () => {
  const { createUser, setUser } = use(AuthContext);

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleRegister = (e) => {
    e.preventDefault();
    // handle registration logic here
    console.log("Register form submitted");
    const form = e.target;
    const name = form.name.value;
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      setNameError("Name can only contain letters and spaces.");
      return;
    } else {
      setNameError("");
    }
    const photo = form.photo.value;
    const email = form.email.value;
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please provide a valid email address.");
      return;
    } else {
      setNameError("");
    }
    const password = form.password.value;
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      setPasswordError(
        "Password must be at least 8 characters and include uppercase, lowercase, number & special character."
      );
      return;
    } else {
      setPasswordError("");
    }

    console.log({ name, photo, email, password });
    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        // console.log(loggedUser);
        setUser(loggedUser);
        alert("User registered successfully");
        form.reset();
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };
  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h2 className="font-semibold text-2xl text-center">
          Register Your Account
        </h2>
        <form onSubmit={handleRegister} className="card-body">
          <fieldset className="fieldset">
            {/* Name */}
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              className="input"
              placeholder="Name"
              required
            />

            {nameError && <p className="text-red-500 text-sm">{nameError}</p>}

            {/* photo url */}
            <label className="label">Photo URL</label>
            <input
              name="photo"
              type="text"
              className="input"
              placeholder="Photo URL"
              required
            />

            {/* email */}
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              required
            />
            {nameError && <p className="text-red-500 text-sm">{nameError}</p>}

            {/* password */}
            <label className="label">Password</label>
            <input
              name="password"
              type="password"
              className="input"
              placeholder="Password"
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
            <button type="submit" className="btn btn-neutral mt-4">
              Register
            </button>
            <p className="mt-4 font-semibold text-center">
              Already have an account?{" "}
              <Link to="/auth/login" className="link link-hover text-red-500">
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
