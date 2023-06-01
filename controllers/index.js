const router = require("express").Router();

const profileRoutes = require("./profileRoutes");
const userRoutes = require("./userRoutes");
const projectRoutes = require('./projectController');

router.use("/profiles", profileRoutes);
router.use("/signup", userRoutes);
router.use('/projects', projectRoutes);


module.exports = router;