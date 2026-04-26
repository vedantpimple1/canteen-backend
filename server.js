require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const seedData = require("./config/seed");

const app = express();

// CORS — allows all origins in dev; set FRONTEND_URL to your S3 URL in production
const corsOrigin = process.env.FRONTEND_URL === "*" ? "*" : process.env.FRONTEND_URL;
app.use(cors({
  origin: corsOrigin || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: corsOrigin !== "*",
}));
app.options("*", cors());

app.use(express.json());

// Health check
app.get("/", (req, res) => res.json({ message: "Canteen API running" }));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));

// 404 handler
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  const existingAdmin = await Admin.findOne({ email: "admin@canteen.com" });
if (existingAdmin) { console.log("Already seeded, skipping."); return; }

  await seedData();   // force reinit — drops old collections and reseeds fresh
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
