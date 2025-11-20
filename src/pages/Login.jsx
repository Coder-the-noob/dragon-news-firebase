import React, { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const Login = () => {

    const {logIn} = use(AuthContext);

    const handleLogin = (event) => {    
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value
        console.log({email, password});
        // handle login logic here
        logIn(email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            alert("User logged in successfully");
            form.reset();
        })
        .catch(error => {
            console.log(error);
            alert(error.message);
        });
    };
  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h2 className="font-semibold text-2xl text-center">
          Login Your Account
        </h2>
        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset">
            {/* email */}
            <label className="label">Email</label>
            <input name="email" type="email" className="input" placeholder="Email" />
            {/* password */}
            <label className="label">Password</label>
            <input name="password" type="password" className="input" placeholder="Password" />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button type="submit" className="btn btn-neutral mt-4">Login</button>
            <p className="mt-4 font-semibold text-center">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="link link-hover text-red-500"
              >
                Register
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
