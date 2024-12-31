// // //////////////////
// // Import required modules
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const mongoose = require("mongoose");
// require("dotenv").config();

// // Initialize the app
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Define Schemas and Models
// const CategorySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: String,
//   image: String,
//   icon: String,
// });

// const ReviewSchema = new mongoose.Schema({
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Product",
//     required: true,
//   },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   rating: { type: Number, required: true, min: 1, max: 5 },
//   comment: String,
// });

// const ProductSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: String,
//   price: { type: Number, required: true },
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Category",
//     required: true,
//   },
//   image: [String],
//   size: String,
//   color: String,
//   quantity: Number,
//   brand: String,
//   rating: { type: Number, default: 0 },
//   numReviews: { type: Number, default: 0 },
//   countInStock: { type: Number, required: true },
//   reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
// });

// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   type: { type: String, enum: ["admin", "customer"], default: "customer" },
// });

// const CartSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   items: [
//     {
//       product: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product",
//         required: true,
//       },
//       quantity: { type: Number, required: true },
//     },
//   ],
// });

// const OrderSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   items: [
//     {
//       product: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product",
//         required: true,
//       },
//       quantity: { type: Number, required: true },
//     },
//   ],
//   total: { type: Number, required: true },
//   status: {
//     type: String,
//     enum: ["Pending", "Shipped", "Delivered"],
//     default: "Pending",
//   },
// });

// const Category = mongoose.model("category", CategorySchema);
// const Product = mongoose.model("product", ProductSchema);
// const User = mongoose.model("user", UserSchema);
// const Cart = mongoose.model("cart", CartSchema);
// const Order = mongoose.model("order", OrderSchema);
// const Review = mongoose.model("review", ReviewSchema);

// // Routes
// // Home Route
// app.get("/", (req, res) => {
//   res.send("Welcome to the Home Page");
// });

// // JWT Secret
// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// // Middleware for Authentication
// const authenticateToken = (req, res, next) => {
//   const token = req.header("Authorization")?.split(" ")[1];
//   if (!token) return res.status(401).send("Access Denied: No Token Provided");

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).send("Access Denied: Invalid Token");
//     req.user = user;
//     next();
//   });
// };

// // Category Routes
// app.get("/categories", async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.json(categories);
//   } catch (err) {
//     res.status(500).send("Error retrieving categories");
//   }
// });

// // Featured Products Route
// app.get("/featured-products", async (req, res) => {
//   try {
//     const featuredProducts = await Product.find({ featured: true });
//     res.json(featuredProducts);
//   } catch (err) {
//     res.status(500).send("Error retrieving featured products");
//   }
// });

// // User Routes
// app.post("/signup", async (req, res) => {
//   try {
//     const { username, password, email } = req.body;
//     const existingUser = await User.findOne({ username });
//     if (existingUser) return res.status(400).send("Username already exists");
//     const user = new User({ username, password, email });
//     await user.save();

//     // Generate JWT Token
//     const token = jwt.sign(
//       { id: user._id, username: user.username },
//       JWT_SECRET,
//       {
//         expiresIn: "1h",
//       }
//     );
//     res.json({ message: "Signup successful", token });
//   } catch (err) {
//     res.status(500).send("Error during signup");
//   }
// });

// app.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username, password });
//     if (!user) return res.status(401).send("Invalid credentials");

//     // Generate JWT Token
//     const token = jwt.sign(
//       { id: user._id, username: user.username },
//       JWT_SECRET,
//       {
//         expiresIn: "1h",
//       }
//     );
//     res.json({ message: "Login successful", token });
//   } catch (err) {
//     res.status(500).send("Error during login");
//   }
// });

// app.get("/category/:categoryId", async (req, res) => {
//   try {
//     const { categoryId } = req.params;
//     const category = await Category.findById(categoryId);
//     if (!category) return res.status(404).send("Category not found");
//     res.json(category);
//   } catch (err) {
//     res.status(500).send("Error retrieving category");
//   }
// });

// // Product Routes
// app.get("/product/:productId", async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const product = await Product.findById(productId).populate(
//       "category reviews"
//     );
//     if (!product) return res.status(404).send("Product not found");
//     res.json(product);
//   } catch (err) {
//     res.status(500).send("Error retrieving product");
//   }
// });

// // Cart Routes
// app.get("/cart", async (req, res) => {
//   try {
//     const { userId } = req.query;
//     const cart = await Cart.findOne({ user: userId }).populate("items.product");
//     if (!cart) return res.status(404).send("Cart not found");
//     res.json(cart);
//   } catch (err) {
//     res.status(500).send("Error retrieving cart");
//   }
// });

// // Checkout and Order Routes
// app.post("/checkout", async (req, res) => {
//   try {
//     const { userId, items } = req.body;
//     const total = items.reduce(
//       (sum, item) => sum + item.quantity * item.product.price,
//       0
//     );
//     const order = new Order({ user: userId, items, total });
//     await order.save();
//     res.send("Checkout Complete");
//   } catch (err) {
//     res.status(500).send("Error during checkout");
//   }
// });

// app.get("/order-confirmation", async (req, res) => {
//   try {
//     const { orderId } = req.query;
//     const order = await Order.findById(orderId).populate("items.product");
//     if (!order) return res.status(404).send("Order not found");
//     res.json(order);
//   } catch (err) {
//     res.status(500).send("Error retrieving order");
//   }
// });

// // User Routes
// app.get("/account", async (req, res) => {
//   try {
//     const { userId } = req.query;
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).send("User not found");
//     res.json(user);
//   } catch (err) {
//     res.status(500).send("Error retrieving user account");
//   }
// });

// // Review Routes
// app.get("/reviews", async (req, res) => {
//   try {
//     const { productId } = req.query;
//     const reviews = await Review.find({ product: productId }).populate("user");
//     res.json(reviews);
//   } catch (err) {
//     res.status(500).send("Error retrieving reviews");
//   }
// });

// app.post("/reviews", async (req, res) => {
//   try {
//     const { productId, userId, rating, comment } = req.body;
//     const review = new Review({
//       product: productId,
//       user: userId,
//       rating,
//       comment,
//     });
//     await review.save();
//     const product = await Product.findById(productId);
//     if (product) {
//       product.numReviews += 1;
//       product.rating =
//         (product.rating * (product.numReviews - 1) + rating) /
//         product.numReviews;
//       await product.save();
//     }
//     res.send("Review added successfully");
//   } catch (err) {
//     res.status(500).send("Error adding review");
//   }
// });

// // Admin Route
// app.get("/admin", (req, res) => {
//   res.send("Admin Dashboard");
// });

// // 404 Not Found Route
// app.use((req, res) => {
//   res.status(404).send("404 Not Found");
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// //////////////////
