const router = require("express").Router();
const { Language, UserLanguage, ProjectLanguage } = require("../models");

// get all languages
router.get('/', (req, res) => {
    Language.findAll().then(languages => {
        res.json(languages);
    }).catch(err => {
        console.log(err);
        res.status(500).json({msg: "womp womp", err});
    });
});

// get a language by name
router.get('/:name', (req, res) => {
    Language.findOne({
        where: {
            name: req.params.name
        },
    }).then(languageData => {
        if(!languageData) {
            return res.status(404).json({msg: "no such language"})
        }

        res.json(languageData);
    }).catch(err => {
        console.log(err);
        res.status(500).json({msg: "womp womp", err})
    })
});

// add a language
router.post('/', (req, res) => {
    Language.create({
        name: req.body.name
    }).then(newLanguage=> {
        res.json(newLanguage);
    }).catch(err => {
        console.log(err);
        res.status(500).json({msg:"internal server error", err});
    })
});

// add a language to associated user
// params:
// ':name' - language name
// ':userid' - user id
router.post('/:name/user', async (req, res) => {
    try {
        const language = await Language.findOne({
            where: {
                name: req.params.name
            },
        })

        if(!language) {
            return res.status(404).json({msg: "no such language"})
        }

        const userLanguageData = await UserLanguage.create({
            user_id: req.body.user_id,
            language_id: language.id,
        })

        res.json(userLanguageData);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:"internal server error", err});
    }
});

router.post('/:name/project', async (req, res) => {
    try {
        const language = await Language.findOne({
            where: {
                name: req.params.name
            },
        })

        if(!language) {
            return res.status(404).json({msg: "no such language"})
        }

        const projectLanguageData = await ProjectLanguage.create({
            project_id: req.body.project_id,
            language_id: language.id,
        })

        res.json(projectLanguageData);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:"internal server error", err});
    }
});

module.exports = router;