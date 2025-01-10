import React, { useContext } from "react";
import Layout from "../../../components/layout/Layout";
import MyContext from "../../../context/data/MyContext.jsx";

function UpdateProduct() {
  const context = useContext(MyContext);
  const { products, setProducts, updateProduct } = context;

  return (
    <Layout>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-primary px-10 py-10 rounded-xl shadow-lg w-full max-w-xl">
          <h1 className="text-center text-white text-2xl mb-6 font-bold">
            Update Product
          </h1>
          <div>
            <input
              type="text"
              name="title"
              value={products.title || ""}
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
              value={products.price || ""}
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
              name="price"
              value={products.quantity || ""}
              onChange={(e) =>
                setProducts({ ...products, quantity: e.target.value })
              }
              className="bg-bgLight mb-4 px-4 py-2 w-full rounded-lg text-textDark placeholder:text-textDark outline-none focus:ring-2 focus:ring-accent"
              placeholder="Product price"
            />
          </div>
          <div>
            <input
              type="text"
              name="imageurl"
              value={products.imageUrl || ""}
              onChange={(e) =>
                setProducts({ ...products, imageUrl: e.target.value })
              }
              className="bg-bgLight mb-4 px-4 py-2 w-full rounded-lg text-textDark placeholder:text-textDark outline-none focus:ring-2 focus:ring-accent"
              placeholder="Product image URL"
            />
          </div>
          <div>
            <input
              type="text"
              name="category"
              value={products.category || ""}
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
              value={products.description || ""}
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
              onClick={updateProduct}
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UpdateProduct;
