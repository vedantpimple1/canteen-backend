const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getAll, create, updateStatus, remove } = require("../controllers/orderController");

router.get("/", auth, getAll);
router.post("/", create);
router.put("/:id/status", auth, updateStatus);
router.delete("/:id", auth, remove);

module.exports = router;
