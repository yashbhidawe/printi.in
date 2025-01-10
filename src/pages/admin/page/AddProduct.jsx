import React, { useContext, useEffect } from "react";
import Layout from "../../../components/layout/Layout.jsx";
import MyContext from "../../../context/data/MyContext.jsx";
function AddProduct() {
  const context = useContext(MyContext);
  const { products, setProducts, addProduct, resetProductsState } = context;
  useEffect(() => {
    resetProductsState();
  }, []);
  return (
    <Layout>
      <div className="flex justify-center items-center h-screen mt-20 mb-20">
        <div className="bg-primary px-10 py-10  rounded-xl shadow-lg w-full max-w-xl">
          <h1 className="text-center text-white text-2xl mb-10 mt-10 font-bold">
            Add Product
          </h1>
          <div>
            <input
              type="text"
              name="title"
              value={products.title}
              onChange={(e) =>
                setProducts({ ...products, title: e.target.value })
              }
              className="bg-bgLight mb-4 px-4 py-2 w-full rounded-lg text-textDark placeholder:text-textDark outline-none focus:ring-2 focus:ring-accent"
              placeholder="Product title"
            />
          </div>
          <div>
            <input
              type="text"
              name="price"
              value={products.price}
              onChange={(e) =>
                setProducts({ ...products, price: e.target.value })
              }
              className="bg-bgLight mb-4 px-4 py-2 w-full rounded-lg text-textDark placeholder:text-textDark outline-none focus:ring-2 focus:ring-accent"
              placeholder="Product price"
            />
          </div>
          <div>
            <input
              type="text"
              name="quantity"
              value={products.quantity}
              onChange={(e) =>
                setProducts({ ...products, quantity: e.target.value })
              }
              className="bg-bgLight mb-4 px-4 py-2 w-full rounded-lg text-textDark placeholder:text-textDark outline-none focus:ring-2 focus:ring-accent"
              placeholder="Product quantity"
            />
          </div>
          <div>
            <input
              type="text"
              name="imageurl"
              value={products.imageUrl}
              onChange={(e) =>
                setProducts({ ...products, imageUrl: e.target.value })
              }
              className="bg-bgLight mb-4 px-4 py-2 w-full rounded-lg text-textDark placeholder:text-textDark outline-none focus:ring-2 focus:ring-accent"
              placeholder="Product imageUrl"
            />
          </div>
          <div>
            <input
              type="text"
              name="category"
              value={products.category}
              onChange={(e) =>
                setProducts({ ...products, category: e.target.value })
              }
              className="bg-bgLight mb-4 px-4 py-2 w-full rounded-lg text-textDark placeholder:text-textDark outline-none focus:ring-2 focus:ring-accent"
              placeholder="Product category"
            />
          </div>
          <div>
            <textarea
              cols="30"
              rows="5"
              name="description"
              value={products.description}
              onChange={(e) =>
                setProducts({ ...products, description: e.target.value })
              }
              className="bg-bgLight mb-4 px-4 py-2 w-full rounded-lg text-textDark placeholder:text-textDark outline-none focus:ring-2 focus:ring-accent"
              placeholder="Product description"
            ></textarea>
          </div>
          <div className="flex justify-center mb-3">
            <button
              className="bg-accent text-bgLight font-bold px-6 py-3 rounded-lg w-full hover:bg-primaryLight transition-colors duration-200"
              onClick={addProduct}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddProduct;
