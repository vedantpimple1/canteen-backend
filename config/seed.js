const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const Category = require("../models/Category");
const Product = require("../models/Product");
const Order = require("../models/Order");

const seedData = async () => {
  try {
    console.log("⟳  Reinitializing database...");

    // ── Step 1: Drop ALL existing collections cleanly ──
    const db = mongoose.connection.db;
    const existingCollections = await db.listCollections().toArray();
    for (const col of existingCollections) {
      await db.collection(col.name).drop();
      console.log(`  Dropped collection: ${col.name}`);
    }
    console.log("✓  All old collections dropped");

    // ── Step 2: Seed Admin ──
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await Admin.create({ email: "admin@canteen.com", password: hashedPassword });
    console.log("✓  Admin created  →  admin@canteen.com / admin123");

    // ── Step 3: Seed Categories ──
    const categories = await Category.insertMany([
      { name: "Breakfast",  description: "Morning meals and snacks" },
      { name: "Lunch",      description: "Afternoon main course meals" },
      { name: "Snacks",     description: "Light bites and quick snacks" },
      { name: "Beverages",  description: "Hot and cold drinks" },
      { name: "Desserts",   description: "Sweet treats and desserts" },
    ]);
    console.log("✓  Categories seeded (5)");

    // ── Step 4: Seed Products ──
    await Product.insertMany([
      {
        name: "Poha",
        category: categories[0]._id,
        price: 30,
        description: "Flattened rice with spices and peanuts",
        available: true,
        image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=400",
      },
      {
        name: "Idli Sambar",
        category: categories[0]._id,
        price: 40,
        description: "Steamed rice cakes served with sambar and chutney",
        available: true,
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400",
      },
      {
        name: "Dal Rice",
        category: categories[1]._id,
        price: 60,
        description: "Yellow lentil curry with steamed basmati rice",
        available: true,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400",
      },
      {
        name: "Rajma Chawal",
        category: categories[1]._id,
        price: 70,
        description: "Kidney beans curry with steamed rice",
        available: true,
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
      },
      {
        name: "Paneer Butter Masala",
        category: categories[1]._id,
        price: 90,
        description: "Cottage cheese in rich tomato butter gravy",
        available: true,
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400",
      },
      {
        name: "Samosa",
        category: categories[2]._id,
        price: 15,
        description: "Crispy fried pastry stuffed with spiced potatoes",
        available: true,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
      },
      {
        name: "Vada Pav",
        category: categories[2]._id,
        price: 20,
        description: "Mumbai street style spiced potato burger",
        available: true,
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400",
      },
      {
        name: "Bread Pakora",
        category: categories[2]._id,
        price: 25,
        description: "Bread slices dipped in spiced gram flour batter and fried",
        available: true,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
      },
      {
        name: "Masala Chai",
        category: categories[3]._id,
        price: 15,
        description: "Spiced Indian tea with ginger and cardamom",
        available: true,
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
      },
      {
        name: "Cold Coffee",
        category: categories[3]._id,
        price: 50,
        description: "Chilled blended coffee with milk and ice cream",
        available: true,
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
      },
      {
        name: "Fresh Lime Soda",
        category: categories[3]._id,
        price: 30,
        description: "Refreshing lime juice with soda water",
        available: true,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400",
      },
      {
        name: "Gulab Jamun",
        category: categories[4]._id,
        price: 25,
        description: "Soft milk-solid dumplings soaked in rose syrup",
        available: true,
        image: "https://images.unsplash.com/photo-1666195966573-f8e5e2e3e2e2?w=400",
      },
      {
        name: "Kheer",
        category: categories[4]._id,
        price: 35,
        description: "Creamy rice pudding with cardamom and dry fruits",
        available: true,
        image: "https://images.unsplash.com/photo-1571167530149-c1105da4c2c0?w=400",
      },
    ]);
    console.log("✓  Products seeded (13)");

    console.log("✓  Database reinitialization complete");
    console.log("─────────────────────────────────────");
    console.log("  Collections: admins, categories, products, orders");
    console.log("  Admin login: admin@canteen.com / admin123");
    console.log("─────────────────────────────────────");
  } catch (err) {
    console.error("✗  Seed error:", err.message);
  }
};

module.exports = seedData;
