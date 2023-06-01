const router = require('express').Router();
const { Project, UserProject, User } = require('../models');
const jwt = require('jsonwebtoken');

// get all projects
router.get('/', async (req, res) => {
    try {
        const projectData = await Project.findAll();

        res.status(200).json(projectData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get project by name
router.get('/:name', async (req, res) => {
    try {
        const projectData = await Project.findOne(req.params.name);

        res.status(200).json(projectData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get project by language
router.get('/:language', async (req, res) => {
    try {
        const projectData = await Project.findOne(req.params.language);

        res.status(200).json(projectData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// add a project
router.post('/', async (req, res) => {
    try {
        // adds project to table
        const projectData = await Project.create(req.body);

        // adds project and signed in user to UserProject junction table
        const userProject = await UserProject.create({
            user_id: req.body.user_id, // should use token to pass this in
            project_id: projectData.id,
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;