import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig.jsx";
import Layout from "../../components/layout/Layout.jsx";
import { toast } from "react-toastify";
import { User, Mail, Phone, Home, MapPin, Camera } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (userId) {
      const fetchUserInfo = async () => {
        setIsLoading(true);
        try {
          const userDoc = await getDoc(doc(fireDB, "users", userId));
          if (userDoc.exists()) {
            setUserInfo(userDoc.data());
          }
        } catch (error) {
          toast.error("Failed to load user information");
        } finally {
          setIsLoading(false);
        }
      };
      fetchUserInfo();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsDirty(true);
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!userInfo.displayName?.trim())
      newErrors.displayName = "Name is required";
    if (!userInfo.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!userInfo.phoneNumber?.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(userInfo.phoneNumber.replace(/\D/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }
    if (!userInfo.houseNumber?.trim())
      newErrors.houseNumber = "House number is required";
    if (!userInfo.streetName?.trim())
      newErrors.streetName = "Street name is required";
    if (!userInfo.city?.trim()) newErrors.city = "City is required";
    if (!userInfo.state?.trim()) newErrors.state = "State is required";
    if (!userInfo.postalCode?.trim()) {
      newErrors.postalCode = "Postal code is required";
    } else if (!/^\d{6}$/.test(userInfo.postalCode)) {
      newErrors.postalCode = "Please enter a valid 6-digit postal code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!isDirty) {
      toast.info("No changes to save");
      return;
    }

    if (validate()) {
      setIsLoading(true);
      try {
        if (userId) {
          await updateDoc(doc(fireDB, "users", userId), userInfo);
          localStorage.setItem("user", JSON.stringify(userInfo));
          toast.success("User information updated successfully!");
          setIsDirty(false);
          setTimeout(() => {
            window.location.href = "/userinfo";
          }, 1000);
        }
      } catch (error) {
        toast.error("Failed to update user information");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please correct the errors before saving");
    }
  };

  const FormInput = ({ icon: Icon, label, name, type = "text", ...props }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        <div className="flex items-center gap-2">
          <Icon size={16} className="text-primary" />
          {label}
        </div>
      </label>
      <input
        type={type}
        name={name}
        value={userInfo[name]}
        onChange={handleChange}
        className={`mt-1 p-2 pl-3 block w-full rounded-md border ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } shadow-sm focus:border-primary focus:ring focus:ring-primary-light focus:ring-opacity-50 transition-colors`}
        {...props}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  );

  if (isLoading && !isDirty) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 md:p-8 max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-2xl font-bold text-primary">Edit Profile</h2>
            <p className="text-gray-600 mt-1">
              Update your personal information
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Personal Details
              </h3>
              <FormInput
                icon={User}
                label="Full Name"
                name="displayName"
                placeholder="Enter your full name"
              />
              <FormInput
                icon={Mail}
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter your email"
              />
              <FormInput
                icon={Phone}
                label="Phone Number"
                name="phoneNumber"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Address Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Address Details
              </h3>
              <FormInput
                icon={Home}
                label="House Number"
                name="houseNumber"
                placeholder="Enter house number"
              />
              <FormInput
                icon={Home}
                label="Street Name"
                name="streetName"
                placeholder="Enter street name"
              />
              <FormInput
                icon={MapPin}
                label="City"
                name="city"
                placeholder="Enter city"
              />
              <FormInput
                icon={MapPin}
                label="State"
                name="state"
                placeholder="Enter state"
              />
              <FormInput
                icon={MapPin}
                label="PIN Code"
                name="postalCode"
                placeholder="Enter PIN code"
              />
            </div>
          </div>

          {/* Profile Photo Section */}
          <div className="pt-4 border-t">
            <FormInput
              icon={Camera}
              label="Profile Photo URL"
              name="photoURL"
              placeholder="Enter photo URL"
            />
          </div>

          <div className="flex gap-4 pt-6">
            <button
              onClick={() => window.history.back()}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading || !isDirty}
              className={`flex-1 py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white 
                ${
                  isLoading || !isDirty
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-primary-dark"
                }
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin h-4 w-4 mr-2 border-b-2 border-white rounded-full"></span>
                  Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditUserInfo;
