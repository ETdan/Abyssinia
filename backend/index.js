const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongoose").Types;
require("dotenv").config();

// Initialize the app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

mongoose.set("debug", true);
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
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
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

const FeaturedProductsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
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
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: { type: Number, required: false, default: 1 },
    },
  ],
});

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
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
const WishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
    },
  ],
});
const Category = mongoose.model("Category", CategorySchema);
const Product = mongoose.model("product", ProductSchema, "product");
const User = mongoose.model("User", UserSchema);
const Cart = mongoose.model("Cart", CartSchema, "cart");
const Order = mongoose.model("Order", OrderSchema);
const Review = mongoose.model("Review", ReviewSchema);
const FeaturedProducts = mongoose.model(
  "Featured_Products",
  FeaturedProductsSchema
);
const Wishlist = mongoose.model("Wishlist", WishlistSchema, "wishlist");

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Middleware for Authentication
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ status: "error", message: "Access Denied: No Token Provided" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ status: "error", message: "Access Denied: Invalid Token" });
    req.user = user;
    req.userId = user.id;
    next();
  });
};

// Routes
// Home Route
app.get("/", (req, res) => {
  res.json({ status: "success", message: "Welcome to the Home Page" });
});

// Public Routes
app.post("/signup", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid email format" });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        status: "error",
        message:
          "Password must be at least 8 characters long and contain both letters and numbers",
      });
    }

    const existingUserName = await User.findOne({ username });
    if (existingUserName)
      return res
        .status(400)
        .json({ status: "error", message: "Username already exists" });

    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail)
      return res
        .status(400)
        .json({ status: "error", message: "Email already exists" });

    const user = new User({ username, password, email });
    await user.save();

    const token = jwt.sign(
      { id: user._id, username: user.username, type: user.type },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ status: "success", message: "Signup successful", token });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Error during signup" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Username or password is incorrect",
      });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username, type: user.type },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ status: "success", message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Error during login" });
  }
});

// Protected Routes
app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ status: "success", data: categories });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Error retrieving categories" });
  }
});

app.get("/category/:categoryName", async (req, res) => {
  try {
    const { categoryName } = req.params;

    const category = await Category.findOne({
      name: { $regex: categoryName, $options: "i" },
    });

    if (!category) {
      return res
        .status(404)
        .json({ status: "error", message: "Category not found" });
    }

    const categoryId = new ObjectId(category._id);
    const products = await Product.find({ category: categoryId });

    res.json({ status: "success", data: products });
  } catch (err) {
    console.error("Error retrieving products:", err);
    res
      .status(500)
      .json({ status: "error", message: "Error retrieving products" });
  }
});

app.get("/featured-products", async (req, res) => {
  try {
    const featuredProducts = await FeaturedProducts.find();
    res.json({ status: "success", data: featuredProducts });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Error retrieving featured products" });
  }
});

app.get("/product/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(productId, "//////////");
    const product = await Product.findOne({ _id: productId });
    if (!product)
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    res.json({ status: "success", data: product });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Error retrieving product" });
  }
});

app.get("/cart", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.find({ user: userId }).populate("items.product");

    if (!cart)
      return res
        .status(404)
        .json({ status: "error", message: "Cart not found" });
    res.json({ status: "success", data: cart });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ status: "error", message: "Error retrieving cart" });
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
    res.json({ status: "success", message: "Checkout Complete" });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Error during checkout" });
  }
});

app.get("/order-confirmation", authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.query;
    const order = await Order.findById(orderId).populate("items.product");
    if (!order)
      return res
        .status(404)
        .json({ status: "error", message: "Order not found" });
    res.json({ status: "success", data: order });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Error retrieving order" });
  }
});

app.get("/account", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    res.json({ status: "success", data: user });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Error retrieving user" });
  }
});

app.put("/account", authenticateToken, async (req, res) => {
  try {
    const { userId, username, email } = req.body;
    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    user.username = username;
    user.email = email;
    await user.save();
    res.json({ status: "success", message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Error updating user" });
  }
});

app.get("/reviews", async (req, res) => {
  try {
    const { productId } = req.query;
    const reviews = await Review.find({ product: productId }).populate("user");
    res.json({ status: "success", data: reviews });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Error retrieving reviews" });
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
    res.json({ status: "success", message: "Review added successfully" });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Error adding review" });
  }
});

app.get("/orders", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user.id;
    const orders = await Order.find({ user: userId }).populate("items.product");
    res.json({ status: "success", data: orders });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Error retrieving orders" });
  }
});

app.get("/wishlist", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user.id;
    const wishlist = await Wishlist.findOne({ user: userId }).populate(
      "items.product"
    );
    res.json({ status: "success", data: wishlist });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Error retrieving wishlist" });
  }
});

app.post("/wishlist", authenticateToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;
    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, items: [productId] });
    } else {
      if (wishlist.items.includes(productId)) {
        return res
          .status(400)
          .json({ status: "error", message: "Product already in wishlist" });
      }
      wishlist.items.push(productId);
    }
    await wishlist.save();
    res.json({ status: "success", message: "Product added to wishlist" });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Error adding product to wishlist" });
  }
});

app.post("/cart", authenticateToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const { id: userId } = req.user;

    if (!productId || !quantity) {
      return res.status(400).json({ status: "error", message: "EMPTY BODY" });
    }
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: new mongoose.Types.ObjectId(productId), quantity }],
      });
    } else {
      console.log("/////////////////////");

      const item = cart.items.find((item) => item.product == productId);
      if (item) {
        res.json({ status: "success", message: "Item already in cart" });
        return;
      } else {
        cart.items = [
          ...cart.items,
          { product: new mongoose.Types.ObjectId(productId), quantity },
        ];
        console.log(cart);
      }
    }
    await cart.save();
    res.json({ status: "success", message: "Item added to cart" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "error", message: "Error adding item to cart" });
  }
});

app.delete("/cart", authenticateToken, async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ user: userId });
    if (!cart)
      return res
        .status(404)
        .json({ status: "error", message: "Cart not found" });
    cart.items = cart.items.filter((item) => item.product != productId);
    await cart.save();
    res.json({ status: "success", message: "Item removed from cart" });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Error removing item from cart" });
  }
});

app.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    const products = await Product.find({
      name: { $regex: query, $options: "i" },
    });
    res.json({ status: "success", data: products });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Error searching products" });
  }
});

// Admin Routes
app.get("/admin", authenticateToken, async (req, res) => {
  if (req.user.type !== "admin")
    return res
      .status(403)
      .json({ status: "error", message: "Access Denied: Admins only" });
  res.json({ status: "success", message: "Admin Dashboard" });
});

app.post("/admin/add-category", authenticateToken, async (req, res) => {
  if (req.user.type !== "admin")
    return res
      .status(403)
      .json({ status: "error", message: "Access Denied: Admins only" });
  try {
    const { name, description, image, icon } = req.body;
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res
        .status(400)
        .json({ status: "error", message: "Category name already exists" });
    }
    const category = new Category({ name, description, image, icon });
    await category.save();
    res.json({ status: "success", message: "Category added successfully" });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Error adding category" });
  }
});

app.post("/admin/add-product", authenticateToken, async (req, res) => {
  if (req.user.type !== "admin")
    return res
      .status(403)
      .json({ status: "error", message: "Access Denied: Admins only" });
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
    res.json({ status: "success", message: "Product added successfully" });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Error adding product" });
  }
});

app.get("/admin/statistics", authenticateToken, async (req, res) => {
  if (req.user.type !== "admin")
    return res
      .status(403)
      .json({ status: "error", message: "Access Denied: Admins only" });
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    console.log(totalOrders, totalProducts, totalUsers, "////////");
    res.json({
      status: "success",
      data: { totalUsers, totalProducts, totalOrders },
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Error retrieving statistics" });
  }
});

// 404 Not Found Route
app.use((req, res) => {
  res.status(404).json({ status: "error", message: "404 Not Found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
