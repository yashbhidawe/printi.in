import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig.jsx"; // Ensure this path is correct
import Layout from "../../components/layout/Layout.jsx";
import { toast } from "react-toastify";

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const EditUserInfo = () => {
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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userId) {
      const fetchUserInfo = async () => {
        const userDoc = await getDoc(doc(fireDB, "users", userId));
        if (userDoc.exists()) {
          setUserInfo(userDoc.data());
        }
      };
      fetchUserInfo();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!userInfo.displayName) newErrors.displayName = "Name is required";
    if (!userInfo.email) newErrors.email = "Email is required";
    if (!userInfo.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";
    if (!userInfo.houseNumber)
      newErrors.houseNumber = "House number is required";
    if (!userInfo.streetName) newErrors.streetName = "Street name is required";
    if (!userInfo.city) newErrors.city = "City is required";
    if (!userInfo.state) newErrors.state = "State is required";
    if (!userInfo.postalCode) newErrors.postalCode = "Postal code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validate()) {
      if (userId) {
        await updateDoc(doc(fireDB, "users", userId), userInfo);
        localStorage.setItem("user", JSON.stringify(userInfo));
        toast.success("User info updated successfully!");
        setTimeout(() => {
          window.location.href = "/userinfo";
        }, 300);
      }
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  return (
    <Layout>
      <div className="p-20 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-primary">User Info</h2>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            name="displayName"
            value={userInfo.displayName}
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary-light focus:ring-opacity-50"
          />
          {errors.displayName && (
            <p className="text-red-500 text-xs">{errors.displayName}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary-light focus:ring-opacity-50"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Phone Number:
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={userInfo.phoneNumber}
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary-light focus:ring-opacity-50"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs">{errors.phoneNumber}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            House Number:
          </label>
          <input
            type="text"
            name="houseNumber"
            value={userInfo.houseNumber}
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary-light focus:ring-opacity-50"
          />
          {errors.houseNumber && (
            <p className="text-red-500 text-xs">{errors.houseNumber}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Street Name:
          </label>
          <input
            type="text"
            name="streetName"
            value={userInfo.streetName}
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary-light focus:ring-opacity-50"
          />
          {errors.streetName && (
            <p className="text-red-500 text-xs">{errors.streetName}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            City:
          </label>
          <input
            type="text"
            name="city"
            value={userInfo.city}
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary-light focus:ring-opacity-50"
          />
          {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            State:
          </label>
          <input
            type="text"
            name="state"
            value={userInfo.state}
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary-light focus:ring-opacity-50"
          />
          {errors.state && (
            <p className="text-red-500 text-xs">{errors.state}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            PIN Code:
          </label>
          <input
            type="text"
            name="postalCode"
            value={userInfo.postalCode}
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary-light focus:ring-opacity-50"
          />
          {errors.postalCode && (
            <p className="text-red-500 text-xs">{errors.postalCode}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Photo URL:
          </label>
          <input
            type="text"
            name="photoURL"
            value={userInfo.photoURL}
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary-light focus:ring-opacity-50"
          />
        </div>
        <button
          onClick={handleSave}
          className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primaryLight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Save
        </button>
      </div>
    </Layout>
  );
};

export default EditUserInfo;
