import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../Database/firebase";
const auth = getAuth(app);

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signUp = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((e) => {
      window.location.href = "/";
    });
  };

  const [open, setOpen] = useState(true);
  return (
    <section className="  h-svh flex radial_bg ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
        <div className="text-white py-3">
          <h1 className="text-[25px] underline">Demo account</h1>
          <h1>email: demo@gmail.com</h1>
          <h1>password: 123456</h1>
        </div>
        <div className="w-full bg-[#a6a6a6a5] backdrop:blur-sm rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className="bg-[#e5e5e5a5] border border-gray-300 text-gray-900 sm:text-sm rounded-lg   block w-full p-2.5 outline-none "
                  placeholder="Email"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className=" relative block mb-2 text-sm font-medium text-white "
                >
                  Password
                  {open ? (
                    <AiOutlineEyeInvisible
                      onClick={() => setOpen(!open)}
                      className="absolute top-[40px] right-[15px] text-[20px] text-gray-900"
                    />
                  ) : (
                    <AiOutlineEye
                      onClick={() => setOpen(!open)}
                      className="absolute top-[40px] right-[15px] text-[20px]  text-gray-900"
                    />
                  )}
                </label>
                <input
                  type={open ? "password" : "text"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  placeholder="password"
                  className="bg-[#e5e5e5a5] border border-gray-300 text-gray-900 sm:text-sm rounded-lg   block w-full p-2.5 outline-none "
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-600 focus:ring-3 outline-none "
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-700 ">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium  hover:underline text-blue-600"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                onClick={signUp}
                className="w-full text-white bg-blue-800 hover:bg-primary-700 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Sign in
              </button>
              <p className="text-sm font-light text-white">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:underline "
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
