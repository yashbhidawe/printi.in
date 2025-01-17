import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig.jsx";
import { toast } from "react-toastify";

function Signup() {
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [showPassword, setShowPassword] = useState(false); // Password visibility state
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      toast.success("Account created successfully", {
        position: "bottom-right",
      });
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to create account. Please try again", {
        position: "bottom-right",
      });
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-bgPrimary">
      <div className="bg-bgSecondary px-8 py-10 rounded-xl shadow-lg w-full max-w-sm">
        {/* Heading */}
        <h1 className="text-center text-textLight text-3xl mb-6 font-bold">
          Signup
        </h1>

        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="bg-inputBackground text-textDark placeholder-gray-400 px-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-primaryLight outline-none transition"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className="bg-inputBackground text-black placeholder-gray-400 px-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-primary outline-primary"
              placeholder="Create a password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 text-gray-400 hover:text-primaryLight focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Signup Button */}
          <div className="flex justify-center mb-4">
            <button
              type="submit"
              className="bg-primary text-textLight font-bold px-6 py-2 w-full rounded-lg hover:bg-primaryLight focus:ring-2 focus:ring-bgPrimary transition"
            >
              Signup
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-textDark">
            Have an account?{" "}
            <Link
              className="text-primaryLight font-bold underline hover:text-primary transition"
              to="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
