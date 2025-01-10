import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [phoneNumber, setPhoneNumber] = useState(""); // Phone number state
  const [otp, setOtp] = useState(""); // OTP state
  const [isOtpSent, setIsOtpSent] = useState(false); // State to track if OTP is sent
  const [isOtpVerified, setIsOtpVerified] = useState(false); // State to track if OTP is verified
  const [showPassword, setShowPassword] = useState(false); // Password visibility state

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = () => {
    // Implement OTP sending logic (e.g., make an API call)
    console.log("Sending OTP to:", phoneNumber);
    setIsOtpSent(true);
  };

  const handleVerifyOtp = () => {
    // Implement OTP verification logic (e.g., make an API call)
    console.log("Verifying OTP:", otp);
    setIsOtpVerified(true); // For now, assume OTP is always verified successfully
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isOtpVerified) {
      // Proceed with signup logic after OTP verification
      console.log("OTP Verified. Proceeding with signup...");
      // Add signup logic here (e.g., API call for signup)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-bgPrimary">
      <div className="bg-bgSecondary px-8 py-10 rounded-xl shadow-lg w-full max-w-sm">
        {/* Heading */}
        <h1 className="text-center text-textLight text-3xl mb-6 font-bold">
          Signup
        </h1>

        {/* Phone Number Input */}
        {!isOtpSent ? (
          <div className="mb-4">
            <input
              type="tel"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              className="bg-inputBackground text-textDark placeholder-gray-400 px-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-primaryLight outline-none transition"
              placeholder="Enter your phone number"
              maxLength="10"
            />
            <button
              onClick={handleSendOtp}
              className="bg-primary text-textLight font-bold px-6 py-2 w-full rounded-lg hover:bg-primaryLight focus:ring-2 focus:ring-bgPrimary transition mt-4"
            >
              Send OTP
            </button>
          </div>
        ) : !isOtpVerified ? (
          <div className="mb-4">
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={handleOtpChange}
              className="bg-inputBackground text-textLight placeholder-gray-400 px-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-primaryLight outline-none transition"
              placeholder="Enter OTP"
            />
            <button
              onClick={handleVerifyOtp}
              className="bg-primary text-textLight font-bold px-6 py-2 w-full rounded-lg hover:bg-primaryLight focus:ring-2 focus:ring-bgPrimary transition mt-4"
            >
              Verify OTP
            </button>
          </div>
        ) : (
          <div>
            {/* After OTP is verified, show password input */}
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="bg-inputBackground text-textLight placeholder-gray-400 px-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-primaryLight outline-none transition"
                placeholder="Create a password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 text-gray-400 hover:text-primaryLight focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Signup Button */}
            <div className="flex justify-center mb-4">
              <button
                onClick={handleSubmit}
                className="bg-primary text-textLight font-bold px-6 py-2 w-full rounded-lg hover:bg-primaryLight focus:ring-2 focus:ring-bgPrimary transition"
              >
                Signup
              </button>
            </div>
          </div>
        )}

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
