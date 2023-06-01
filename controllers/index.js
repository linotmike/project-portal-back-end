const router = require("express").Router();

const profileRoutes = require("./profileController");
const userRoutes = require("./userController");
const projectRoutes = require('./projectController');

router.use("/profiles", profileRoutes);
router.use("/signup", userRoutes);
router.use('/projects', projectRoutes);


module.exports = router;