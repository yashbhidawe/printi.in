import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig.jsx";
import { toast } from "react-toastify";
import { collection } from "firebase/firestore";
import { setDoc, getDoc, doc } from "firebase/firestore";
const googleProvider = new GoogleAuthProvider();

const fetchUserFromFirestore = async (uid) => {
  const userRef = doc(fireDB, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    console.error("No such user found in Firestore");
    return null;
  }
};

const saveUserToFirestore = async (userData) => {
  try {
    const userRef = doc(fireDB, "users", userData.uid);
    await setDoc(userRef, userData, { merge: true });
  } catch (error) {
    console.error("Error saving user data to Firestore:", error);
  }
};

const handleUserLogin = async (user, navigate) => {
  try {
    let userData = await fetchUserFromFirestore(user.uid);

    if (!userData) {
      userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber || null,
        role: user.email === "imagegalaxy001@gmail.com" ? "admin" : "user",
        providerId: user.providerData[0]?.providerId || "firebase",
      };
      await saveUserToFirestore(userData);
    }
    localStorage.setItem("user", JSON.stringify(userData));
    await setDoc(doc(fireDB, "users", user.uid), userData, { merge: true });

    navigate(userData.role === "admin" ? "/dashboard" : "/");
    toast.success(`Welcome back, ${userData.displayName}!`);
  } catch (error) {
    console.error("Error handling user login:", error);
    toast.error("Failed to handle login. Please try again", {
      position: "bottom-right",
    });
  }
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await handleUserLogin(user, navigate);
    } catch (error) {
      toast.error("Failed to log in. Please check your credentials", {
        position: "bottom-right",
      });
      console.error("Login error:", error);
    }
  };

  const signupWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await handleUserLogin(user, navigate);
    } catch (error) {
      toast.error("Google sign-in failed. Please try again.", {
        position: "bottom-right",
      });
      console.error("Google sign-in failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-bgPrimary">
      <div className="bg-bgSecondary px-8 py-10 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-center text-textLight text-3xl mb-6 font-bold">
          Login
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-inputBackground text-black placeholder-gray-400 px-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-primary outline-primary"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="bg-inputBackground text-black placeholder-gray-400 px-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-primary outline-primary"
              required
            />
          </div>
          <div className="flex justify-center mb-4">
            <button
              type="submit"
              className="bg-primary text-textLight font-bold px-6 py-2 w-full rounded-lg hover:bg-primaryLight focus:ring-2 focus:ring-bgPrimary transition"
            >
              Login
            </button>
          </div>
        </form>

        <div className="flex justify-center mb-4">
          <button
            onClick={signupWithGoogle}
            className="px-5 py-3 flex gap-3 items-center border border-primaryLight rounded-lg bg-bgSecondary text-primaryLight hover:bg-primary hover:text-textLight hover:shadow-md transition-all duration-150 ease-in-out"
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
          <p className="text-textDark">
            Forgot your password?{" "}
            <Link
              className="text-primaryLight font-bold underline hover:text-primary transition"
              to="/reset-password"
            >
              Reset Password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
