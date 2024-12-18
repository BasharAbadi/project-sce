const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/auth'); // חיבור לנתיבי האימות
const Paint = require('./models/Paint'); // Import the Paint model
const Drywall = require('./models/drywall'); // Import the Drywall model
const User = require('./models/user'); // Import the User model

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('website')); // שיתוף קבצי סטטיים מהתיקייה 

// חיבור למסד הנתונים
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// חיבור לנתיבי auth
app.use('/api/auth', authRoutes);

// דף ברירת מחדל
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'website', 'main_page.html')));

// הפעלת השרת
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'dashbord.html'));
});

app.get('/api/paints', async (req, res) => {
    try {
        const paints = await Paint.find(); // Fetch all paints from MongoDB
        res.json(paints); // Send the paints as a JSON response
    } catch (error) {
        console.error('Error fetching paints:', error);
        res.status(500).json({ error: 'Failed to fetch paints' });
    }
});
app.get('/paint', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'paint.html')); // Serve paint.html
});




app.get('/api/drywalls', async (req, res) => {
    try {
        const drywalls = await Drywall.find(); // Fetch all drywall products
        res.json(drywalls); // Send the drywall products as a JSON response
    } catch (error) {
        console.error('Error fetching drywalls:', error);
        res.status(500).json({ error: 'Failed to fetch drywalls' });
    }
});
app.get('/drywall', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'drywall.html'));
})






//for UsersList in the admin page.


// Endpoint to fetch all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from MongoDB
    res.json(users); // Send the users as a JSON response
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Route to serve the Users List page
app.get('/users', (req, res) => {
  res.sendFile(path.join(__dirname, 'website', 'Admin/UsersList.html')); // Ensure the path to the HTML file is correct
});