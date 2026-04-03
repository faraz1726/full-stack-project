const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

//login credentials
const ADMIN = {
  username: "admin",
  password: "12345"
};
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN.username && password === ADMIN.password) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});


// MongoDB Connection (PUT YOUR OWN LINK HERE)
mongoose.connect("mongodb://faraz1726:farazahmed2004@ac-4hujhce-shard-00-00.ioec6ma.mongodb.net:27017,ac-4hujhce-shard-00-01.ioec6ma.mongodb.net:27017,ac-4hujhce-shard-00-02.ioec6ma.mongodb.net:27017/?ssl=true&replicaSet=atlas-9y2d44-shard-0&authSource=admin&appName=Cluster0")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Models
const Travel = require("./models/Travel");
const Pack = require("./models/Pack");

// Test route
app.get("/", (req, res) => {
  res.send("Server Running");
});

// Travel API
app.post("/api/travel", async (req, res) => {
  console.log("API HIT 🔥");
  console.log(req.body);

  try {
    const booking = new Travel(req.body);
    await booking.save();
    res.json({ message: "Travel booking saved" });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ message: "Error saving travel booking" });
  }
});

app.get("/api/travel", async (req, res) => {
  try {
    const data = await Travel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching data" });
  }
});
app.delete("/api/travel/:id", async (req, res) => {
  try {
    await Travel.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});
// Packers GET API
app.get("/api/pack", async (req, res) => {
  try {
    const data = await Pack.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching pack data" });
  }
});

// Pack API
app.post("/api/pack", async (req, res) => {
  try {
    const booking = new Pack(req.body);
    await booking.save();
    res.json({ message: "Pack booking saved" });
  } catch (err) {
    res.status(500).json({ message: "Error saving pack booking" });
  }
});
app.delete("/api/pack/:id", async (req, res) => {
  try {
    await Pack.findByIdAndDelete(req.params.id);
    res.json({ message: "Pack deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

// Start server
app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});