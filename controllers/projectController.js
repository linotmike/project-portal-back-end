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
router.get('/name/:name', async (req, res) => {
    try {
        const projectData = await Project.findOne({
            where: {
                name: req.params.name
            },
        });

        if(!projectData) {
            return res.status(404).json({msg: "no such project"})
        }

        res.status(200).json(projectData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get open projects
router.get('/status/open', async (req, res) => {
    try {
        const projectData = await Project.findAll({
            where: {
                status: true
            },
        });

        res.json(projectData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get project by language
router.get('/language/:language', async (req, res) => {
    try {
        const projectData = await Project.findOne({
            where: {
                language: req.params.language
            },
        });

        if(!projectData) {
            return res.status(404).json({msg: "no such project"})
        }

        res.status(200).json(projectData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create a project
router.post('/', async (req, res) => {
    try {
        // adds project to table
        const projectData = await Project.create(req.body);

        // adds project and signed in user to UserProject junction table
        const userProject = await UserProject.create({
            user_id: req.body.user_id, // should use token to pass this in
            project_id: projectData.id,
        })

        res.json(userProject);
    } catch (err) {
        res.status(500).json(err);
    }
});

// join a project
router.post('/:projectid/:userid', async (req, res) => {
    try {
        // adds user to UserProject junction table
        const userProject = await UserProject.create({
            user_id: req.params.userid,
            project_id: req.params.projectid,
        })

        res.json(userProject);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update a project
router.put('/:id', async (req, res) => {
    const projectId = req.params.id;
    const projectData = req.body;

    try {
        const project = Project.findByPk(projectId);

        if(!project) {
            return res.status(404).json({msg: "Project not found"});
        }

        await Project.update(projectData, {where: {id: projectId}});

        res.json(project);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Internal server error", err});
    }
});

module.exports = router;