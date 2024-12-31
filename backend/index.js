const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Initialize the app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Schemas and Models
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: String,
  icon: String,
});

const ReviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  images: [String],
  size: String,
  color: String,
  quantity: Number,
  brand: String,
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  countInStock: { type: Number, required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  type: { type: String, enum: ["admin", "customer"], default: "customer" },
});

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
});

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered"],
    default: "Pending",
  },
});

const Category = mongoose.model("Category", CategorySchema);
const Product = mongoose.model("Product", ProductSchema);
const User = mongoose.model("Users", UserSchema);
const Cart = mongoose.model("Cart", CartSchema);
const Order = mongoose.model("Order", OrderSchema);
const Review = mongoose.model("Review", ReviewSchema);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Middleware for Authentication
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).send("Access Denied: No Token Provided");

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Access Denied: Invalid Token");
    req.user = user;
    next();
  });
};

// Routes
// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page");
});

// Public Routes
app.post("/signup", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    console.log(req.body);
    console.log(username, password, email);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Invalid email format");
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .send(
          "Password must be at least 8 characters long and contain both letters and numbers"
        );
    }

    // Check if username is already taken
    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
      return res.status(400).send("Username already exists");
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).send("Username already exists");
    const user = new User({ username, password, email });
    await user.save();

    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ message: "Signup successful", token });
  } catch (err) {
    res.status(500).send("Error during signup");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) return res.status(401).send("Invalid credentials");

    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).send("Error during login");
  }
});

// Protected Routes
app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).send("Error retrieving categories");
  }
});

app.get("/featured-products", async (req, res) => {
  try {
    const featuredProducts = await Product.find({ featured: true });
    res.json(featuredProducts);
  } catch (err) {
    res.status(500).send("Error retrieving featured products");
  }
});

app.get("/category/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).send("Category not found");
    res.json(category);
  } catch (err) {
    res.status(500).send("Error retrieving category");
  }
});

app.get("/product/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate(
      "category reviews"
    );
    if (!product) return res.status(404).send("Product not found");
    res.json(product);
  } catch (err) {
    res.status(500).send("Error retrieving product");
  }
});

app.get("/cart", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.query;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) return res.status(404).send("Cart not found");
    res.json(cart);
  } catch (err) {
    res.status(500).send("Error retrieving cart");
  }
});

app.post("/checkout", authenticateToken, async (req, res) => {
  try {
    const { userId, items } = req.body;
    const total = items.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );
    const order = new Order({ user: userId, items, total });
    await order.save();
    res.send("Checkout Complete");
  } catch (err) {
    res.status(500).send("Error during checkout");
  }
});

app.get("/order-confirmation", authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.query;
    const order = await Order.findById(orderId).populate("items.product");
    if (!order) return res.status(404).send("Order not found");
    res.json(order);
  } catch (err) {
    res.status(500).send("Error retrieving order");
  }
});

app.get("/account", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (err) {
    res.status(500).send("Error retrieving user");
  }
});

app.put("/account", authenticateToken, async (req, res) => {
  try {
    const { userId, username, email } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");
    user.username = username;
    user.email = email;
    await user.save();
    res.send("User updated successfully");
  } catch (err) {
    res.status(500).send("Error updating user");
  }
});

app.get("/reviews", async (req, res) => {
  try {
    const { productId } = req.query;
    const reviews = await Review.find({ product: productId }).populate("user");
    res.json(reviews);
  } catch (err) {
    res.status(500).send("Error retrieving reviews");
  }
});

app.post("/reviews", authenticateToken, async (req, res) => {
  try {
    const { productId, userId, rating, comment } = req.body;
    const review = new Review({
      product: productId,
      user: userId,
      rating,
      comment,
    });
    await review.save();
    const product = await Product.findById(productId);
    if (product) {
      product.numReviews += 1;
      product.rating =
        (product.rating * (product.numReviews - 1) + rating) /
        product.numReviews;
      await product.save();
    }
    res.send("Review added successfully");
  } catch (err) {
    res.status(500).send("Error adding review");
  }
});

app.get("/orders", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user.id;
    const orders = await Order.find({ user: userId }).populate("items.product");
    res.json(orders);
  } catch (err) {
    res.status(500).send("Error retrieving orders");
  }
});

app.get("/wishlist", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user.id;
    const wishlist = await Wishlist.findOne({ user: userId }).populate(
      "items.product"
    );
    res.json(wishlist);
  } catch (err) {
    res.status(500).send("Error retrieving wishlist");
  }
});

app.post("/wishlist", authenticateToken, async (req, res) => {
  try {
    const { userId, productId } = req.body;
    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, items: [productId] });
    } else {
      if (wishlist.items.includes(productId)) {
        return res.status(400).send("Product already in wishlist");
      }
      wishlist.items.push(productId);
    }
    await wishlist.save();
    res.send("Product added to wishlist");
  } catch (err) {
    res.status(500).send("Error adding product to wishlist");
  }
});

app.post("/cart", authenticateToken, async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      const item = cart.items.find((item) => item.product == productId);
      if (item) {
        item.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }
    await cart.save();
    res.send("Item added to cart");
  } catch (err) {
    res.status(500).send("Error adding item to cart");
  }
});

app.delete("/cart", authenticateToken, async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).send("Cart not found");
    cart.items = cart.items.filter((item) => item.product != productId);
    await cart.save();
    res.send("Item removed from cart");
  } catch (err) {
    res.status(500).send("Error removing item from cart");
  }
});

app.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    const products = await Product.find({
      name: { $regex: query, $options: "i" },
    });
    res.json(products);
  } catch (err) {
    res.status(500).send("Error searching products");
  }
});

// Admin Routes
app.get("/admin", authenticateToken, async (req, res) => {
  if (req.user.type !== "admin")
    return res.status(403).send("Access Denied: Admins only");
  res.send("Admin Dashboard");
});

app.post("/admin/add-category", authenticateToken, async (req, res) => {
  console.log("//////////////////////////");

  console.log(req.body, req.user.type, "//////////////////////////");
  if (req.user.type !== "admin")
    return res.status(403).send("Access Denied: Admins only");
  try {
    const { name, description, image, icon } = req.body;
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).send("Category name already exists");
    }
    const category = new Category({ name, description, image, icon });
    await category.save();
    res.send("Category added successfully");
  } catch (err) {
    res.status(500).send("Error adding category");
  }
});

app.post("/admin/add-product", authenticateToken, async (req, res) => {
  if (req.user.type !== "admin")
    return res.status(403).send("Access Denied: Admins only");
  try {
    const {
      name,
      description,
      price,
      category,
      image,
      size,
      color,
      quantity,
      brand,
      countInStock,
    } = req.body;
    const product = new Product({
      name,
      description,
      price,
      category,
      image,
      size,
      color,
      quantity,
      brand,
      countInStock,
    });
    await product.save();
    res.send("Product added successfully");
  } catch (err) {
    res.status(500).send("Error adding product");
  }
});

app.get("/admin/statistics", authenticateToken, async (req, res) => {
  if (req.user.type !== "admin")
    return res.status(403).send("Access Denied: Admins only");
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    res.json({ totalUsers, totalProducts, totalOrders });
  } catch (err) {
    res.status(500).send("Error retrieving statistics");
  }
});

// 404 Not Found Route
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
