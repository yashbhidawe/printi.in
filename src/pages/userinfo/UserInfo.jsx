import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig.jsx"; // Ensure this path is correct
import Layout from "../../components/layout/Layout.jsx";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const UserInfo = () => {
  const currentUser = getUserFromLocalStorage();
  const userId = currentUser ? currentUser.uid : null;

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

  useEffect(() => {
    if (userId) {
      const fetchUserInfo = async () => {
        const userDoc = await getDoc(doc(fireDB, "users", userId));
        if (userDoc.exists()) {
          console.log(userDoc.data());
          setUserInfo(userDoc.data());
        }
      };
      fetchUserInfo();
    }
  }, [userId]);

  const handleEdit = () => {
    navigate("/editUserInfo", { state: { userInfo } });
  };

  return (
    <Layout>
      <div className="p-10 max-w-lg mx-auto bg-white rounded-xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-center text-primary">
          User Information
        </h2>
        <div className="flex justify-center mb-4">
          <img
            src={userInfo.photoURL}
            alt="User Avatar"
            className="w-24 h-24 rounded-full shadow-md"
          />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Name:</span>
            <span className="text-lg text-gray-900">
              {userInfo.displayName}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Email:</span>
            <span className="text-lg text-gray-900">{userInfo.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">
              Phone Number:
            </span>
            <span className="text-lg text-gray-900">
              {userInfo.phoneNumber
                ? userInfo.phoneNumber
                : "Edit profile to add phone number"}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                House Number:
              </span>
              <span className="text-lg text-gray-900">
                {userInfo.houseNumber
                  ? userInfo.houseNumber
                  : "Edit profile to add house number"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Street Name:
              </span>
              <span className="text-lg text-gray-900">
                {userInfo.streetName
                  ? userInfo.streetName
                  : "Edit profile to add street name"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">City:</span>
              <span className="text-lg text-gray-900">
                {userInfo.city ? userInfo.city : "Edit profile to add city"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">State:</span>
              <span className="text-lg text-gray-900">
                {userInfo.state ? userInfo.state : "Edit profile to add state"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Postal Code:
              </span>
              <span className="text-lg text-gray-900">
                {userInfo.postalCode
                  ? userInfo.postalCode
                  : "Edit profile to add postal code"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleEdit}
            className="inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primaryLight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <FaEdit className="mr-2" />
            Edit Info
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default UserInfo;
