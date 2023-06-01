const router = require("express").Router();

const profileController = require("./profileController");
const userController = require("./userController");
const projectController = require('./projectController');

router.use("/profiles", profileController);
router.use("/users", userController);
router.use('/projects', projectController);


module.exports = router;