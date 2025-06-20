// src/App.jsx
import { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    mobile: "",
    price: "",
    category: "Cycles",
  });
  const [productImage, setProductImage] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productImage) {
      alert("Please upload a product image.");
      return;
    }

    const data = new FormData();
    data.append("productImage", productImage);
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("mobile", formData.mobile);
    data.append("price", formData.price);
    data.append("category", formData.category);

    try {
      const res = await axios.post("http://localhost:5000/api/products/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product uploaded!");
      console.log(res.data);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    }
  };

  return (
    <div className="container">
      <h2>Upload Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Product Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Product Picture:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} required />

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>Mobile Number:</label>
        <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required />

        <label>Price:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />

        <label>Category:</label>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="Cycles">Cycles</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
