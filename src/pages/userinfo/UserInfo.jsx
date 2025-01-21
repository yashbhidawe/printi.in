import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig.jsx";
import Layout from "../../components/layout/Layout.jsx";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaMapMarkerAlt,
  FaCity,
  FaMapMarked,
  FaEdit,
  FaExclamationCircle,
  FaSpinner,
} from "react-icons/fa";

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const UserInfo = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [userInfo, setUserInfo] = useState({
    displayName: "",
    email: "",
    phoneNumber: "",
    houseNumber: "",
    streetName: "",
    city: "",
    state: "",
    postalCode: "",
    photoURL: "",
    role: "",
    providerId: "",
  });

  const navigate = useNavigate();
  const currentUser = getUserFromLocalStorage();
  const userId = currentUser?.uid;

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userId) {
        setError("User not found");
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(fireDB, "users", userId));
        if (userDoc.exists()) {
          setUserInfo(userDoc.data());
        } else {
          setError("User profile not found");
        }
      } catch (err) {
        setError("Error loading user profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [userId]);

  const handleEdit = () => {
    navigate("/editUserInfo", { state: { userInfo } });
  };

  const InfoItem = ({ icon: Icon, label, value, placeholder }) => (
    <div className="flex items-center p-4 bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100">
      <Icon className="w-5 h-5 text-primary" />
      <div className="ml-4 flex-1">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-gray-900">
          {value || <span className="text-gray-400 italic">{placeholder}</span>}
        </p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <FaSpinner className="w-8 h-8 text-primary animate-spin" />
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-center">
            <FaExclamationCircle className="w-12 h-12 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-900">{error}</h2>
            <button
              onClick={() => navigate("/")}
              className="text-primary hover:text-primaryLight font-medium"
            >
              Return to Home
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="relative bg-primary/10 px-6 py-8">
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 mb-4">
                {!imageLoaded && userInfo.photoURL && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-full">
                    <FaSpinner className="w-6 h-6 text-primary animate-spin" />
                  </div>
                )}
                {userInfo.photoURL ? (
                  <img
                    src={userInfo.photoURL}
                    alt={userInfo.displayName}
                    className={`w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg transition-opacity duration-300 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                    <FaUser className="w-12 h-12 text-primary" />
                  </div>
                )}
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {userInfo.displayName || "No Name Set"}
              </h1>
              <p className="text-gray-600">{userInfo.role || "User"}</p>
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <InfoItem
                icon={FaEnvelope}
                label="Email Address"
                value={userInfo.email}
                placeholder="No email added"
              />
              <InfoItem
                icon={FaPhone}
                label="Phone Number"
                value={userInfo.phoneNumber}
                placeholder="Add your phone number"
              />
              <InfoItem
                icon={FaHome}
                label="House Number"
                value={userInfo.houseNumber}
                placeholder="Add house number"
              />
              <InfoItem
                icon={FaMapMarkerAlt}
                label="Street Name"
                value={userInfo.streetName}
                placeholder="Add street name"
              />
              <InfoItem
                icon={FaCity}
                label="City"
                value={userInfo.city}
                placeholder="Add city"
              />
              <InfoItem
                icon={FaMapMarked}
                label="State"
                value={userInfo.state}
                placeholder="Add state"
              />
              <InfoItem
                icon={FaMapMarkerAlt}
                label="Postal Code"
                value={userInfo.postalCode}
                placeholder="Add postal code"
              />
            </div>

            {/* Edit Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleEdit}
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primaryLight transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary gap-2 font-medium"
              >
                <FaEdit className="w-5 h-5" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserInfo;
