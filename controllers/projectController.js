const router = require('express').Router();
const { Project, Language, UserProject, User } = require('../models');
const jwt = require('jsonwebtoken');

// get all projects
router.get('/', async (req, res) => {
    try {
        const projectData = await Project.findAll({
            include: [
                {
                    model: Language,
                },
                {
                    model: User,
                    as: 'Owner',
                },
                {
                    model: User,
                    as: 'Developer',
                },
            ],
        });

        res.status(200).json(projectData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get project by ID 
router.get('/:id', async (req, res) => {
    try {
        const projectData = await Project.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Language,
                },
                {
                    model: User,
                    as: 'Owner',
                },
                {
                    model: User,
                    as: 'Developer',
                },
            ],
        });

        if(!projectData) {
            return res.status(404).json({msg: "no such project"})
        }

        res.status(200).json(projectData);
    } catch (error) {
        console.log(error);
        res.json(500).json({ msg: "Error loading project", error })
    }
})

// get projects by user
router.get('/user/:userid', async (req, res) => {
    try {
        const projectData = await User.findByPk(req.params.userid, {
            include: [
                {
                    model: Project,
                    as: 'Owner',
                },
                {
                    model: Project,
                    as: 'Developer',
                },
            ],
        });

        // combines projects user owns with those they are a developer on
        const allProjects = [...projectData.Owner, ...projectData.Developer];

        if(!allProjects || allProjects.length === 0) {
            return res.status(404).json({msg: "no such project"})
        }

        res.status(200).json(allProjects);
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
            include: [
                {
                    model: Language,
                },
                {
                    model: User,
                    as: 'Owner',
                },
                {
                    model: User,
                    as: 'Developer',
                },
            ],
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
            include: [
                {
                    model: Language,
                },
                {
                    model: User,
                    as: 'Owner',
                },
                {
                    model: User,
                    as: 'Developer',
                },
            ],
        });

        res.json(projectData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get projects by language
router.get('/language/:language', async (req, res) => {
    try {
        const projectData = await Project.findAll({
            include: [
                {
                    model: Language,
                    where: {
                        name: req.params.language,
                    },
                },
                {
                    model: User,
                    as: 'Owner',
                },
                {
                    model: User,
                    as: 'Developer',
                },
            ]
        });

        if(!projectData || projectData.length === 0) {
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

        res.json(projectData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// join a project
router.post('/:projectid/:userid', async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.projectid, {
            include: [
                {
                    model: Language,
                },
                {
                    model: User,
                    as: 'Owner',
                },
                {
                    model: User,
                    as: 'Developer',
                },
            ],
        });

        if(!project) {
            return res.status(404).json({msg: "no such project"});
        }
        else {
            const numDevelopers = project.Developer.length;

            // + 1 is to include the owner
            if(numDevelopers + 1 >= project.capacity) {
                return res.status(404).json({msg: "project has reached max capacity"});
            }
        }

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
        const project = await Project.findByPk(projectId, {
            include: [
                {
                    model: Language,
                },
                {
                    model: User,
                    as: 'Owner',
                },
                {
                    model: User,
                    as: 'Developer',
                },
            ],
        });

        if(!project) {
            return res.status(404).json({msg: "Project not found"});
        }
        else {
            const numDevelopers = project.Developer.length;

            // + 1 is to include the owner
            if(numDevelopers + 1 > req.body.capacity) {
                return res.status(404).json({msg: "Project capacity can't be less than number of developers"});
            }
        }

        await Project.update(projectData, {where: {id: projectId}});

        res.json(project);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Internal server error", err});
    }
});

module.exports = router;