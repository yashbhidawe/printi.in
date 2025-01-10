import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import { MdPadding } from "react-icons/md";
import MyContext from "../../context/data/myContext";
import { collection } from "firebase/firestore";
import { setDoc, getDoc, doc } from "firebase/firestore";
const googleProvider = new GoogleAuthProvider();

const fetchUserFromFirestore = async (uid) => {
  const userRef = doc(fireDB, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data(); // Returns user data including the role
  } else {
    console.error("No such user found in Firestore");
    return null;
  }
};
const saveUserToFirestore = async (userData) => {
  try {
    const userRef = doc(fireDB, "users", userData.uid); // Reference to the user's document
    await setDoc(userRef, userData, { merge: true }); // Save the user data, merging with existing data if any
  } catch (error) {
    console.error("Error saving user data to Firestore:", error);
  }
};
function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null); // Store confirmation result

  const navigate = useNavigate();
  const signupWithGoogle = async function () {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      let userData = await fetchUserFromFirestore(user.uid);

      // Prepare user data to store in Firestore
      if (!userData) {
        userData = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber || null,
          role: user.email === "imagegalaxy001@gmail.com" ? "admin" : "user",
          providerId: user.providerData[0]?.providerId || "google.com",
        };
        await saveUserToFirestore(userData);
      }
      localStorage.setItem("user", JSON.stringify(userData));

      // Save user data in Firestore under 'users' collection
      await setDoc(doc(fireDB, "users", user.uid), userData, { merge: true });

      navigate(userData.role === "admin" ? "/dashboard" : "/");
      toast.success("Signed in successfully", { position: "bottom-right" });
    } catch (error) {
      toast.error("Google sign-in failed. Please try again.", {
        position: "bottom-right",
      });
      console.error("Google sign-in failed:", error);
    }
  };
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value); // 'value' is the phone number with country code
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const requestOtp = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptcha
      );
      setConfirmationResult(confirmation); // Store confirmation object here
      setShowOtpField(true);
    } catch (error) {
      console.error(error);
    }
  };

  const verifyOtp = async () => {
    if (!confirmationResult) {
      console.error("No confirmation result found");
      return;
    }

    try {
      await confirmationResult.confirm(otp); // Use the confirmation result stored in state
      toast.success("otp varified");
      // Add further actions, like redirecting user or storing session
    } catch (error) {
      toast.error("OTP verification failed");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-bgPrimary">
      <div className="bg-bgSecondary px-8 py-10 rounded-xl shadow-lg w-full max-w-sm">
        {/* Heading */}
        <h1 className="text-center text-textLight text-3xl mb-6 font-bold">
          Login
        </h1>

        {/* Phone Number Input */}
        <div className="mb-4 p-4">
          <PhoneInput
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            defaultCountry="IN"
            className="bg-inputBackground text-black placeholder-gray-400  w-full rounded-lg focus:ring-2 focus:ring-primary outline-primary transition phoneInput"
          />
        </div>

        {/* Request OTP Button */}
        <div className="flex justify-center mb-4 flex-col gap-4">
          <button
            className="bg-primary text-textLight font-bold px-6 py-2 w-full rounded-lg hover:bg-primaryLight focus:ring-2 focus:ring-bgPrimary transition"
            onClick={requestOtp}
          >
            Request OTP
          </button>
          <div className="items-center justify-center flex w-full">
            <button
              className="px-5 py-3 flex gap-3 items-center border border-primaryLight rounded-lg bg-bgSecondary text-primaryLight hover:bg-primary hover:text-textLight hover:shadow-md transition-all duration-150 ease-in-out"
              onClick={signupWithGoogle}
            >
              <img
                className="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
              <span className="text-sm font-semibold">Login with Google</span>
            </button>
          </div>
        </div>
        <div id="recaptcha"></div>

        {/* OTP Input (Only show after requesting OTP) */}
        {showOtpField && (
          <div className="mb-6">
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={handleOtpChange}
              className="bg-inputBackground text-black placeholder-gray-400 px-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-primaryLight outline-none transition"
              placeholder="Enter OTP"
              maxLength="6"
            />
          </div>
        )}

        {/* Verify OTP Button */}
        {showOtpField && (
          <div className="flex justify-center mb-4">
            <button
              className="bg-primary text-textLight font-bold px-6 py-2 w-full rounded-lg hover:bg-primaryLight focus:ring-2 focus:ring-bgPrimary transition"
              onClick={verifyOtp}
            >
              Verify OTP
            </button>
          </div>
        )}

        {/* Signup Link */}
        <div className="text-center">
          <p className="text-textDark">
            Don’t have an account?{" "}
            <Link
              className="text-primaryLight font-bold underline hover:text-primary transition"
              to="/signup"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
