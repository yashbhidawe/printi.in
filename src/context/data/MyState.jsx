import React, { useState, useEffect } from "react";
import { fireDB } from "../../firebase/FirebaseConfig.jsx";
import {
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  setDoc,
  doc,
  getDocs,
  query,
} from "firebase/firestore";
import { toast } from "react-toastify";
import MyContext from "./MyContext.jsx";

function MyState(props) {
  const [products, setProducts] = useState({
    title: "",
    price: "",
    imageUrl: "",
    category: "",
    description: "",
    quantity: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const resetProductsState = () => {
    setProducts({
      title: "",
      price: "",
      imageUrl: "",
      category: "",
      quantity: "",
      description: "",
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    });
  };

  const [product, setProduct] = useState([]);
  const [order, setOrder] = useState([]);
  const addProduct = async () => {
    if (
      !products.title ||
      !products.price ||
      !products.imageUrl ||
      !products.category ||
      !products.quantity ||
      !products.description
    ) {
      return toast.error("Please fill all fields");
    }

    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, products);
      toast.success("Successfully added!");
      resetProductsState(); // Reset form fields after adding
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 400);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    }
  };

  useEffect(() => {
    const q = query(collection(fireDB, "products"), orderBy("time"));
    const unsubscribe = onSnapshot(
      q,
      (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productArray);
      },
      (error) => {
        console.error("Error fetching products:", error);
      }
    );

    return () => unsubscribe(); // Cleanup the subscription
  }, []);

  const edithandle = (item) => {
    setProducts({
      ...item,
      time: Timestamp.now(), // Update the timestamp for editing
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    });
    console.log("Editing product:", item);
  };

  const updateProduct = async () => {
    if (!products.id) {
      return toast.error("No product selected for update");
    }

    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product updated");
      resetProductsState(); // Reset form fields after updating
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  const deleteProduct = async (item) => {
    try {
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product deleted");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const getOrderData = async () => {
    try {
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push({ ...doc.data(), id: doc.id });
      });
      setOrder(ordersArray);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateOrder = async (updatedOrder) => {
    try {
      await setDoc(doc(fireDB, "orders", updatedOrder.id), updatedOrder);
      toast.success("Order status updated");
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order");
    }
  };

  const [user, setUser] = useState([]);
  const getUserData = async () => {
    try {
      const result = await getDocs(collection(fireDB, "users"));
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
      });
      setUser(usersArray);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUserData();
    getOrderData();
  }, []);

  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const resetFilters = () => {
    setSearchKey("");
    setFilterType("");
    setFilterPrice("");
    toast.info("Filters reset");
  };

  return (
    <MyContext.Provider
      value={{
        products,
        setProducts,
        resetProductsState,
        addProduct,
        product,
        edithandle,
        updateProduct,
        deleteProduct,
        order,
        setOrder,
        updateOrder,
        user,
        searchKey,
        setSearchKey,
        filterType,
        setFilterType,
        filterPrice,
        setFilterPrice,
        resetFilters,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;
