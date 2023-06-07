const router = require("express").Router();

const profileController = require("./profileController");
const userController = require("./userController");
const projectController = require('./projectController');
const languageController = require('./languageController');
const messageController = require('./messageController');

router.use("/profiles", profileController);
router.use("/users", userController);
router.use('/projects', projectController);
router.use('/languages', languageController);
router.use('/messages', messageController);

module.exports = router;