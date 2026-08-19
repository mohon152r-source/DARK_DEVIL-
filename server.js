const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

// ⚠️ পরের স্টেপে এখানে আপনার MongoDB লিংক বসাবেন
const MONGO_URI = "mongodb+srv://billamohon:Shakib1234@cluster0.detwxzd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ DB Connected"))
  .catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, default: 'seller' },
  balance: { type: Number, default: 0 }
});
const User = mongoose.model('User', userSchema);

// Admin Create Route
app.get('/api/create-admin', async (req, res) => {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await User.create({ username: "alamin", password: hashedPassword, role: "admin" });
  res.json("Admin Created!");
});

app.listen(3000, () => console.log("Server running"));
