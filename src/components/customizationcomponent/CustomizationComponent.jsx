import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";
const CustomizationComponent = ({ selectedTemplate }) => {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const containerRef = useRef(null);
  const state = useRef([]);
  const currentStateIndex = useRef(-1);
  const [selectedObject, setSelectedObject] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!window.fabric) {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js";
      script.async = true;
      script.onload = initCanvas;
      document.body.appendChild(script);
    } else {
      initCanvas();
    }

    function initCanvas() {
      if (canvasRef.current && !fabricRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const canvasWidth = containerWidth - 20; // Add some padding
        const canvasHeight = (canvasWidth * 2) / 3; // Maintain 3:2 aspect ratio

        fabricRef.current = new window.fabric.Canvas(canvasRef.current, {
          width: canvasWidth,
          height: canvasHeight,
          backgroundColor: "#ffffff",
        });

        // Add selection event handlers
        fabricRef.current.on("selection:created", handleSelection);
        fabricRef.current.on("selection:updated", handleSelection);
        fabricRef.current.on("selection:cleared", () =>
          setSelectedObject(null)
        );

        // Load the selected template
        if (selectedTemplate) {
          const templateImage =
            selectedTemplate.imageUrl ||
            selectedTemplate.url ||
            selectedTemplate.preview;
          if (templateImage) {
            window.fabric.Image.fromURL(
              templateImage,
              (img) => {
                const scale = Math.min(
                  canvasWidth / img.width,
                  canvasHeight / img.height
                );
                img.set({
                  scaleX: scale,
                  scaleY: scale,
                  left: (canvasWidth - img.width * scale) / 2,
                  top: (canvasHeight - img.height * scale) / 2,
                  selectable: false,
                  evented: false,
                });
                fabricRef.current.setBackgroundImage(img, () => {
                  fabricRef.current.renderAll();
                  console.log("Template image loaded successfully");
                });
              },
              (error) => {
                console.error("Error loading image:", error);
                toast.error("Error loading template image");
              }
            );
          }
        }

        saveState();
      }
    }

    return () => {
      if (fabricRef.current) {
        fabricRef.current.dispose();
        fabricRef.current = null;
      }
    };
  }, [selectedTemplate]);

  const handleAddToCart = async () => {
    if (!fabricRef.current || !selectedTemplate) return;

    setIsProcessing(true);
    try {
      const designImage = fabricRef.current.toDataURL({
        format: "png",
        quality: 1,
        multiplier: 2,
      });

      // Create cart item with custom design and template info
      const cartItem = {
        id: `${selectedTemplate.id}-${Date.now()}`, // Unique ID for each customization
        templateId: selectedTemplate.id,
        title: selectedTemplate.title,
        category: selectedTemplate.category,
        price: selectedTemplate.price,
        quantity: selectedTemplate.quantity,
        customDesign: designImage,
        customizationDate: new Date().toISOString(),
        originalTemplate: {
          id: selectedTemplate.id,
          imageUrl: selectedTemplate.imageUrl,
          title: selectedTemplate.title,
          description: selectedTemplate.description,
        },
      };
      console.log(selectedTemplate.imageUrl);
      dispatch(addToCart(cartItem));
      toast.success("Design added to cart successfully!");
      navigate("/cart");
    } catch (error) {
      toast.error("Failed to add design to cart. Please try again.");
      console.error("Cart addition error:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  const handleSelection = (e) => {
    setSelectedObject(e.selected?.[0]);
  };

  const saveState = () => {
    if (fabricRef.current) {
      const json = fabricRef.current.toJSON();
      state.current = state.current.slice(0, currentStateIndex.current + 1);
      state.current.push(json);
      currentStateIndex.current++;
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        window.fabric.Image.fromURL(e.target.result, (img) => {
          img.scaleToWidth(200);
          fabricRef.current.add(img);
          fabricRef.current.setActiveObject(img);
          saveState();
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddText = () => {
    const text = new window.fabric.IText("Double click to edit", {
      left: 50,
      top: 50,
      fill: "#000",
      fontSize: 20,
      fontFamily: "Arial",
    });
    fabricRef.current.add(text);
    fabricRef.current.setActiveObject(text);
    saveState();
  };

  const handleExport = () => {
    try {
      const dataURL = fabricRef.current.toDataURL({
        format: "png",
        quality: 1,
        multiplier: 2, // Higher quality export
      });
      const link = document.createElement("a");
      link.download = "design-" + new Date().getTime() + ".png";
      link.href = dataURL;
      link.click();
      toast.success("Design exported successfully!");
    } catch (error) {
      toast.error("Failed to export design");
    }
  };

  const handleColorChange = (e) => {
    if (selectedObject) {
      selectedObject.set("fill", e.target.value);
      fabricRef.current.renderAll();
      saveState();
    }
  };

  const handleDeleteSelected = () => {
    if (selectedObject) {
      fabricRef.current.remove(selectedObject);
      setSelectedObject(null);
      saveState();
    }
  };

  const duplicateSelected = () => {
    if (selectedObject) {
      selectedObject.clone((cloned) => {
        cloned.set({
          left: cloned.left + 20,
          top: cloned.top + 20,
        });
        fabricRef.current.add(cloned);
        fabricRef.current.setActiveObject(cloned);
        saveState();
      });
    }
  };

  const undo = () => {
    if (currentStateIndex.current > 0) {
      currentStateIndex.current--;
      fabricRef.current.loadFromJSON(
        state.current[currentStateIndex.current],
        fabricRef.current.renderAll.bind(fabricRef.current)
      );
    }
  };

  const redo = () => {
    if (currentStateIndex.current < state.current.length - 1) {
      currentStateIndex.current++;
      fabricRef.current.loadFromJSON(
        state.current[currentStateIndex.current],
        fabricRef.current.renderAll.bind(fabricRef.current)
      );
    }
  };

  const navigate = useNavigate();

  const handleProceedToBuy = () => {
    if (!fabricRef.current) {
      toast.error("Please wait for the canvas to initialize");
      return;
    }

    const existingItem = cart.find(
      (item) => item.templateId === selectedTemplate.id
    );

    if (existingItem) {
      toast.info(
        "You already have this template in your cart. Please check your cart or create a different design.",
        {
          autoClose: 6000,
        }
      );
      return;
    }

    handleAddToCart();
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center gap-4 p-4 bg-bgLight w-full max-w-3xl mx-auto"
    >
      <div className="flex flex-wrap gap-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-primary file:text-textLight hover:file:bg-primaryLight"
        />
        <button
          onClick={handleAddText}
          className="bg-primary text-textLight px-4 py-2 rounded hover:bg-primaryLight"
        >
          Add Text
        </button>
        {selectedObject && (
          <>
            <input
              type="color"
              onChange={handleColorChange}
              className="w-10 h-10 p-1 rounded cursor-pointer"
              title="Change Color"
            />
            <button
              onClick={duplicateSelected}
              className="bg-accent text-textLight px-4 py-2 rounded hover:opacity-90"
            >
              Duplicate
            </button>
            <button
              onClick={handleDeleteSelected}
              className="bg-red-500 text-textLight px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </>
        )}
        <div className="ml-auto flex gap-2">
          <button
            onClick={undo}
            className="bg-bgSecondary text-textDark px-4 py-2 rounded hover:bg-primaryLight hover:text-textLight"
            disabled={currentStateIndex.current <= 0}
          >
            Undo
          </button>
          <button
            onClick={redo}
            className="bg-bgSecondary text-textDark px-4 py-2 rounded hover:bg-primaryLight hover:text-textLight"
            disabled={currentStateIndex.current >= state.current.length - 1}
          >
            Redo
          </button>
          <button
            onClick={handleExport}
            className="bg-accent text-textLight px-4 py-2 rounded hover:opacity-90"
          >
            Save Design
          </button>
        </div>
      </div>
      <div className="relative w-full">
        <canvas
          ref={canvasRef}
          className="border-2 border-primary rounded-lg shadow-lg mx-auto"
        />
        {selectedObject && (
          <div className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded text-sm">
            {selectedObject.type.charAt(0).toUpperCase() +
              selectedObject.type.slice(1)}{" "}
            selected
          </div>
        )}
        <div>
          <button
            onClick={handleProceedToBuy}
            disabled={isProcessing}
            className={`bg-primaryLight text-white px-6 py-3 rounded-lg hover:bg-primary w-full mt-4 transition-all font-semibold ${
              isProcessing ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isProcessing
              ? "Adding to Cart..."
              : `Add to Cart (${selectedTemplate?.quantity} pcs - ₹${selectedTemplate?.price})`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationComponent;
