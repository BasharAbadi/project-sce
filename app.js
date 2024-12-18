const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const authRoutes = require("./routes/auth"); // חיבור לנתיבי האימות
const Paint = require("./models/Paint"); // Import the Paint model
const Drywall = require("./models/drywall"); // Import the Drywall model
const User = require("./models/user"); // Import the User model

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("website")); // שיתוף קבצי סטטיים מהתיקייה

// חיבור למסד הנתונים
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// חיבור לנתיבי auth
app.use("/api/auth", authRoutes);

// דף ברירת מחדל
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "website", "main_page.html"))
);

// הפעלת השרת
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "website", "dashbord.html"));
});

app.get("/api/paints", async (req, res) => {
  try {
    const paints = await Paint.find(); // Fetch all paints from MongoDB
    res.json(paints); // Send the paints as a JSON response
  } catch (error) {
    console.error("Error fetching paints:", error);
    res.status(500).json({ error: "Failed to fetch paints" });
  }
});
app.get("/paint", (req, res) => {
  res.sendFile(path.join(__dirname, "website", "paint.html")); // Serve paint.html
});

app.post("/api/paints/update", async (req, res) => {
  const { id, name, quality, price, rating } = req.body; // Extract data from request body

  try {
    const updatedPaint = await Paint.findByIdAndUpdate(
      id, // Paint ID
      { name, quality, price, rating }, // Updated fields
      { new: true } // Return the updated document
    );
    res.status(200).json(updatedPaint); // Send the updated paint as a response
  } catch (error) {
    console.error("Error updating paint:", error);
    res.status(500).json({ error: "Failed to update paint" });
  }
});
app.delete("/api/paints/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPaint = await Paint.findByIdAndDelete(id);
    if (deletedPaint) {
      res.status(200).json({ message: "Paint deleted successfully!" });
    }
  } catch (error) {
    console.error("Error deleting paint:", error);
    res.status(500).json({ error: "Failed to delete paint" });
  }
});


app.post("/api/paints", async (req, res) => {
    const { name, quality, price, rating } = req.body; // Extract data from request body
  
    try {
      // Create a new paint
      const newPaint = new Paint({ name, quality, price, rating });
  
      // Save the paint to the database
      await newPaint.save();
  
      // Return the newly created paint as a response
      res.status(201).json(newPaint);
    } catch (error) {
      console.error("Error adding paint:", error);
      res.status(500).json({ error: "Failed to add paint" });
    }
  });








app.get("/api/drywalls", async (req, res) => {
  try {
    const drywalls = await Drywall.find(); // Fetch all drywall products
    res.json(drywalls); // Send the drywall products as a JSON response
  } catch (error) {
    console.error("Error fetching drywalls:", error);
    res.status(500).json({ error: "Failed to fetch drywalls" });
  }
});
app.get("/drywall", (req, res) => {
  res.sendFile(path.join(__dirname, "website", "drywall.html"));
});

//for UsersList in the admin page.
// Endpoint to fetch all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from MongoDB
    res.json(users); // Send the users as a JSON response
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Route to serve the Users List page
app.get("/users", (req, res) => {
  res.sendFile(path.join(__dirname, "website", "Admin/UsersList.html")); // Ensure the path to the HTML file is correct
});





