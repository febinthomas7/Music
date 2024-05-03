import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../Database/firebase";
import { Link } from "react-router-dom";
const auth = getAuth(app);
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const signUp = (e) => {
    setLoading(true);
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((e) => {
        setLoading(false);
        window.location.href = "/signin";
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  const [open, setOpen] = useState(true);
  return (
    <section className=" h-svh flex bg-gradient-to-b  from-[#10132a] via-[#00061a] to-[#000000f9] bg-black ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white backdrop:blur-sm rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-gray-800">
              Create Your Account
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
                  className="bg-transparent border border-gray-300 text-gray-900 sm:text-sm rounded-lg placeholder:text-gray-700  block w-full p-2.5 outline-none "
                  placeholder="Email"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className=" relative block mb-2 text-sm font-medium text-gray-800"
                >
                  Password
                  {open ? (
                    <AiOutlineEyeInvisible
                      onClick={() => setOpen(!open)}
                      className="absolute top-[40px] right-[15px] text-[20px]  text-gray-900"
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
                  required=""
                />
              </div>
              <div className="flex items-center justify-between gap-4">
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
                    <label htmlFor="remember" className="text-gray-700">
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
                className="w-full text-white bg-blue-800 hover:bg-primary-700 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center  flex justify-center items-center gap-2"
              >
                Sign Up
                {loading && <RiLoader2Fill />}
              </button>
              <p className="text-sm font-light text-gray-800">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-medium text-primary-600 hover:underline "
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
