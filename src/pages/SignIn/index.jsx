import React, { useState, useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RiLoader2Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app } from "../../Database/firebase";
const auth = getAuth(app);

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const signIn = (e) => {
    e.preventDefault();
    if (!email || !password) {
      if (!email) {
        toast.warn("email is required");
      }
      if (!password) {
        toast.warn("password is required");
      }
    } else {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((e) => {
          window.location.href = "/";
          setLoading(false);
        })
        .catch((e) => {
          toast.error("auth/invalid-credential");
          setLoading(false);
        });
    }
  };

  const resetPassword = (e) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("check your email");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  const [open, setOpen] = useState(true);
  return (
    <section className="  h-svh flex bg-gradient-to-b  from-[#10132a] via-[#00061a] to-[#000000f9] bg-black ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
        <div className="text-white py-3">
          <h1 className="text-[25px] underline">Demo account</h1>
          <h1>email: demo@gmail.com</h1>
          <h1>password: 123456</h1>
        </div>
        <div className="w-full bg-white backdrop:blur-sm rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-black">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-800"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className="relative peer focus:invalid:text-red-500 bg-transparent border border-gray-300 text-gray-900 sm:text-sm rounded-lg placeholder:text-gray-700  block w-full p-2.5 outline-none  "
                  placeholder="Email"
                />
                <p className="absolute invisible peer-invalid:visible text-red-500 text-[12px]">
                  Please provide a valid email address.
                </p>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className=" relative block mb-2 text-sm font-medium text-gray-800 "
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
                  className="bg-transparent border border-gray-300 text-gray-900 sm:text-sm rounded-lg placeholder:text-gray-700  block w-full p-2.5 outline-none "
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-600 focus:ring-3 outline-none  "
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-700 ">
                      Remember me
                    </label>
                  </div>
                </div>
                <div
                  className="text-sm font-medium  hover:underline text-blue-600 cursor-pointer"
                  onClick={resetPassword}
                >
                  Forgot password?
                </div>
              </div>
              <button
                type="submit"
                onClick={signIn}
                className="w-full text-white bg-blue-800 hover:bg-primary-700 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center gap-2"
              >
                Sign in
                {loading && <RiLoader2Fill className="animate-spin" />}
              </button>
              <p className="text-sm font-light text-gray-800">
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
      <div>
        <ToastContainer />
      </div>
    </section>
  );
};

export default SignIn;
