import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent, please check spam folder", {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error("Failed to send password reset email.", {
        position: "bottom-right",
      });
      console.error("Error sending password reset email:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-bgPrimary">
      <div className="bg-bgSecondary px-8 py-10 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-center text-textLight text-3xl mb-6 font-bold">
          Reset Password
        </h1>
        <form onSubmit={handlePasswordReset}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="bg-inputBackground text-black placeholder-gray-400 px-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-primary outline-primary"
              required
            />
          </div>
          <div className="flex justify-center mb-4">
            <button
              type="submit"
              className="bg-primary text-textLight font-bold px-6 py-2 w-full rounded-lg hover:bg-primaryLight focus:ring-2 focus:ring-bgPrimary transition"
            >
              Reset Password
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-textDark">
            Remembered your password?{" "}
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

export default ResetPassword;
