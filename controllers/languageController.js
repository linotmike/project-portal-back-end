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

// add languages to associated user
// req.body is an array of languages
router.post('/user/:userid', async (req, res) => {
    try {
        // loop through each language, check if it's a duplicate
        // if duplicate, don't add, else add to table
        for(let i = 0; i < req.body.array.length; i++) {
            const languageName = req.body.array[i].trim().toUpperCase();
            
            let language = await Language.findOne({ where: { name: languageName } });

            // check if language already exists in Language table
            if(!language) {
                // add to table if doesn't exist
                language = await Language.create({
                    name: languageName
                });
            }

            const userLanguage = await UserLanguage.findOne({ where: { user_id: req.params.userid, language_id: language.id } });

            // check if user is already associated with this language
            if(!userLanguage) {
                // add language to junction table
                await UserLanguage.create({
                    user_id: req.params.userid,
                    language_id: language.id, 
                });
            }
        }

        res.json({msg: "Success!"});
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:"internal server error", err});
    }
});

// add languages to associated project
// req.body is an array of languages
router.post('/project/:projectid', async (req, res) => {
    try {
        // loop through each language, check if it's a duplicate
        // if duplicate, don't add, else add to table
        for(let i = 0; i < req.body.array.length; i++) {
            const languageName = req.body.array[i].trim().toUpperCase();
            
            let language = await Language.findOne({ where: { name: languageName } });

            // check if language already exists in Language table
            if(!language) {
                // add to table if doesn't exist
                language = await Language.create({
                    name: languageName
                });
            }

            const projectLanguage = await ProjectLanguage.findOne({ where: { project_id: req.params.projectid, language_id: language.id } });

            // check if project is already associated with this language
            if(!projectLanguage) {
                // add language to junction table
                await ProjectLanguage.create({
                    project_id: req.params.projectid,
                    language_id: language.id, 
                });
            }
        }

        res.json({msg: "Success!"});
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:"internal server error", err});
    }
});

module.exports = router;