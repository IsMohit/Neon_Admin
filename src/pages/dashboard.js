import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlusCircle,
  FaTrashAlt,
  FaBlog,
  FaTachometerAlt,
  FaUtensils,
  FaEdit,
} from "react-icons/fa";
import "../App.css";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const Dashboard = () => {
  const navigate = useNavigate();

  // Messages State
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // To determine message type (success, error)

  async function handleLogout() {
    try {
      await auth.signOut();
      navigate("/");
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  // Menu and Blog States
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    category: "",
    price: 0,
    size: "", // Added size field
  });

  const [blogPosts, setBlogPosts] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    body: "",
    date: new Date().toLocaleDateString("en-GB"),
  });

  // State to manage editing
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedPrice, setEditedPrice] = useState(0);

  // Fetch Menu Items and Blog Posts
  useEffect(() => {
    const unsubscribeMenu = onSnapshot(collection(db, "menu"), (snapshot) => {
      setMenuItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    const unsubscribeBlog = onSnapshot(collection(db, "blogs"), (snapshot) => {
      setBlogPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeMenu();
      unsubscribeBlog();
    };
  }, []);

  // Add Menu Item
  const handleAddMenuItem = async () => {
    try {
      await addDoc(collection(db, "menu"), newItem);
      setNewItem({
        name: "",
        description: "",
        category: "",
        price: 0,
        size: "",
      });
      setMessage("Menu item added successfully!");
      setMessageType("success");
      setTimeout(() => setMessage(""), 4000); // Clear message after 4 seconds
    } catch (error) {
      console.error("Error adding menu item:", error);
      setMessage("Failed to add menu item.");
      setMessageType("error");
      setTimeout(() => setMessage(""), 4000);
    }
  };

  // Delete Menu Item
  const handleDeleteMenuItem = async (id) => {
    try {
      await deleteDoc(doc(db, "menu", id));
      setMessage("Menu item deleted successfully!");
      setMessageType("error");
      setTimeout(() => setMessage(""), 4000);
    } catch (error) {
      console.error("Error deleting menu item:", error);
      setMessage("Failed to delete menu item.");
      setMessageType("error");
      setTimeout(() => setMessage(""), 4000);
    }
  };

  // Add Blog Post
  const handleAddBlog = async () => {
    try {
      await addDoc(collection(db, "blogs"), newBlog);
      setNewBlog({
        title: "",
        body: "",
        date: new Date().toLocaleDateString("en-GB"),
      });
      setMessage("Blog post added successfully!");
      setMessageType("success");
      setTimeout(() => setMessage(""), 4000);
    } catch (error) {
      console.error("Error adding blog post:", error);
      setMessage("Failed to add blog post.");
      setMessageType("error");
      setTimeout(() => setMessage(""), 4000);
    }
  };

  // Delete Blog Post
  const handleDeleteBlog = async (id) => {
    try {
      await deleteDoc(doc(db, "blogs", id));
      setMessage("Blog post deleted successfully!");
      setMessageType("error");
      setTimeout(() => setMessage(""), 4000);
    } catch (error) {
      console.error("Error deleting blog post:", error);
      setMessage("Failed to delete blog post.");
      setMessageType("error");
      setTimeout(() => setMessage(""), 4000);
    }
  };

  // Handle Input Changes
  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleBlogChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  // Edit Price
  const handleEditPrice = (id, price) => {
    setEditingItemId(id);
    setEditedPrice(price);
  };

  const handleSavePrice = async () => {
    if (editingItemId !== null) {
      try {
        const itemRef = doc(db, "menu", editingItemId);
        await updateDoc(itemRef, { price: editedPrice });
        setEditingItemId(null); // Reset editing state
        setMessage("Price updated successfully!");
        setMessageType("warning");
        setTimeout(() => setMessage(""), 4000);
      } catch (error) {
        console.error("Error updating price:", error);
        setMessage("Failed to update price.");
        setMessageType("error");
        setTimeout(() => setMessage(""), 4000);
      }
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">
        <span className="text-primary">
          <FaTachometerAlt /> Admin Dashboard
        </span>
        <small className="d-block text-muted mt-2">
          Manage your menu, blog posts, and more!
        </small>
      </h2>

      {/* Message Popup */}
      {message && (
        <div
          className={`alert ${
            messageType === "success"
              ? "alert-success"
              : messageType === "error"
              ? "alert-danger"
              : "alert-warning"
          } alert-dismissible fade show`}
          role="alert"
        >
          {message}
        </div>
      )}

      {/* Menu Management Section */}
      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white">
          <h4>
            <FaUtensils /> Menu Management
          </h4>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="name">Item Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={newItem.name}
              onChange={handleItemChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price">Price (₹)</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              min="0"
              max="999"
              value={newItem.price}
              onChange={handleItemChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category">Category</label>
            <select
              className="form-select"
              id="category"
              name="category"
              value={newItem.category}
              onChange={handleItemChange}
            >
              <option value="">Choose a category</option>
              <option value="Snacks">Snacks</option>
              <option value="Drinks">Drinks</option>
              <option value="Desserts">Desserts</option>
              <option value="Main Course">Main Course</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="size">Size (optional)</label>
            <select
              className="form-select"
              id="size"
              name="size"
              value={newItem.size}
              onChange={handleItemChange}
            >
              <option value="">Select size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="XL">XL</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="2"
              required
              value={newItem.description}
              onChange={handleItemChange}
            ></textarea>
          </div>
          <button
            className="btn btn-success"
            onClick={handleAddMenuItem}
            disabled={
              !newItem.name || !newItem.description || !newItem.category
            }
          >
            <FaPlusCircle /> Add Menu Item
          </button>
        </div>
      </div>

      {/* Menu Items List */}
      <div className="card shadow mb-4">
        <div className="card-header bg-info text-white">
          <h4>
            <FaUtensils /> Current Menu Items
          </h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{item.name}</strong>
                  <p>
                    <strong>₹{item.price}</strong> -{" "}
                    <small>
                      {item.size ? `Size: ${item.size}` : "No size specified"}
                    </small>
                  </p>
                  <p>
                    <i>{item.description}</i>
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  {/* Edit Price Button - If editing */}
                  {editingItemId === item.id ? (
                    <div className="d-flex">
                      <input
                        type="number"
                        className="form-control form-control-sm mx-1 w-100"
                        value={editedPrice}
                        onChange={(e) => setEditedPrice(Number(e.target.value))}
                      />

                      <button
                        className="btn btn-warning btn-sm mx-2"
                        onClick={handleSavePrice}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-warning btn-sm mx-1"
                      onClick={() => handleEditPrice(item.id, item.price)}
                    >
                      <FaEdit /> Edit Price
                    </button>
                  )}

                  {/* Delete Button */}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteMenuItem(item.id)}
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Blog Management */}
      <div className="card shadow mb-4">
        <div className="card-header bg-success text-white">
          <h4>
            <FaBlog /> Blog Management
          </h4>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="blogTitle">Blog Title</label>
            <input
              type="text"
              className="form-control"
              id="blogTitle"
              name="title"
              value={newBlog.title}
              onChange={handleBlogChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="blogBody">Blog Content</label>
            <textarea
              className="form-control"
              id="blogBody"
              name="body"
              rows="4"
              value={newBlog.body}
              onChange={handleBlogChange}
            ></textarea>
          </div>
          <button
            className="btn btn-success"
            onClick={handleAddBlog}
            disabled={!newBlog.title || !newBlog.body}
          >
            <FaPlusCircle /> Add Blog Post
          </button>
        </div>
      </div>

      {/* Blog List */}
      <div className="card shadow mb-4">
        <div className="card-header bg-info text-white">
          <h4>
            <FaBlog /> Blog Posts
          </h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {blogPosts.map((post) => (
              <li
                key={post.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{post.title}</strong>
                  <p>{post.body}</p>
                  <small>{post.date}</small>
                </div>
                <div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteBlog(post.id)}
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <center>
        <button onClick={handleLogout} className="btn btn-danger btn-m  mt-3">
          Logout
        </button>
      </center>
    </div>
  );
};

export default Dashboard;
