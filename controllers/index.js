const router = require("express").Router();

const profileRoutes = require("./profileRoutes");
const userRoutes = require("./userRoutes");


router.use("/profiles", profileRoutes);
router.use("/signup", userRoutes);


module.exports = router;