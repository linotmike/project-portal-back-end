const router = require("express").Router();

const projectRoutes = require('./projectController');

router.use('/projects', projectRoutes);

module.exports = router;