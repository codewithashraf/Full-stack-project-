import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { app } from "../firebase";

const Login = () => {
  sessionStorage.clear();
  const { state } = useLocation();

  const [hidepass, setHidePass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  console.log(state);
  useEffect(() => {
    if (state) {
      const autoFill = window.confirm(
        "aap ka email or password auto fill karna hai!"
      );
      console.log(autoFill);
      if (autoFill) {
        setEmail(state.email);
        setPassword(state.password);
      }
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userData) => {
        const userEmail = userData.user.email;
        const localId = userData.user.reloadUserInfo.localId;
        if (email === userEmail && localId === "LiY1SSj3FiZUWKY58Na322uVTcY2") {
          sessionStorage.setItem("sir_logged_in", "yes");
          navigate("/dashboard");
        } else {
          sessionStorage.setItem("userId", localId);
          navigate(`/profile/${localId}`);
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Invalid email or password.");
      });
  };

  return (
    <div className="min-h-screen px-4 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-white text-center mb-6 tracking-wider">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-300 text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-gray-300 text-sm mb-1"
            >
              Password
            </label>
            <input
              type={hidepass ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm "
            />
            {hidepass ? (
              <FiEyeOff className="absolute bottom-3 cursor-pointer text-blue-900 right-3"
                onClick={() => setHidePass(false)}
              />
            ) : (
              <FiEye className="absolute bottom-3 cursor-pointer text-blue-900 right-3" 
                onClick={() => setHidePass(true)}
              />
            )}
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transform transition-transform hover:scale-105 duration-300"
          >
            Login
          </button>
        </form>
        <div className="absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-purple-600/20 to-blue-500/20 rounded-2xl blur-2xl opacity-70"></div>
      </div>
    </div>
  );
};

export default Login;
