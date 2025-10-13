import React, { useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
githubProvider.addScope("user.email");

const Login = () => {
  const [user, setUser] = useState(null);

  const handleGoogleSingIN = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // console.log(result.user);
        setUser(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const hangleGithubSinIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        console.log(result.user);
        const loggedInUser = result.user;

        if (!loggedInUser.email) {
          if (loggedInUser.providerData) {
            const gitProvider = loggedInUser.providerData.find(
              (p) => p.providerId === "github.com"
            );
            if (gitProvider && gitProvider.email) {
              loggedInUser.email = gitProvider.email;
            }
          }
        }

        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSingOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log("Sing Out Successfully.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-base-200 min-h-screen pt-5 md:pt-10 lg:pt-20">
      <div className="flex flex-col items-center w-10/12 mx-auto ">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-10 w-12/12 md:w-8/12 mx-auto">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input type="email" className="input" placeholder="Email" />
              <label className="label">Password</label>
              <input type="password" className="input" placeholder="Password" />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>

              {user ? (
                <div className="px-6 sm:px-0 max-w-sm mt-5">
                  <button
                    onClick={() => handleSingOut()}
                    type="button"
                    className="text-white w-full cursor-pointer  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Sign Out<div></div>
                  </button>
                </div>
              ) : (
                <>
                  <button className="btn btn-neutral mt-4">Login</button>
                  <div className="px-6 sm:px-0 max-w-sm mt-5">
                    <button
                      onClick={() => handleGoogleSingIN()}
                      type="button"
                      className="text-white w-full cursor-pointer  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
                    >
                      <svg
                        className="mr-2 -ml-1 w-4 h-4"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="google"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 488 512"
                      >
                        <path
                          fill="currentColor"
                          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                        ></path>
                      </svg>
                      Sign up with Google<div></div>
                    </button>
                  </div>
                  <button
                    onClick={() => hangleGithubSinIn()}
                    type="button"
                    className="py-2 px-4 max-w-md flex justify-center items-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="mr-2"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
                    </svg>
                    Sign in with GitHub
                  </button>
                </>
              )}
            </fieldset>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center py-5 space-y-4">
        <h2>{user?.displayName}</h2>
        <h3>{user?.email}</h3>
        <img src={user?.photoURL} alt="" />
      </div>
    </div>
  );
};

export default Login;
