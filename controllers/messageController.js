const router = require("express").Router();
const { Message, User, Profile } = require("../models");

router.get('/:projectid', async (req, res) => {
    try {
        const messages = await Message.findAll({
            order:[["createdAt", "ASC"]],
             where: {
                project_id: req.params.projectid
            },
            include: [
                {
                    model: User,
                    include: [Profile],
                },
            ],
        });

        const messageObj = [];

        for(let i = 0; i < messages.length; i++) {
            messageObj.push({
                user_id: messages[i].user_id,
                username: messages[i].User.username,
                picture: messages[i].User.Profile.picture,
                createdAt: messages[i].createdAt,
                project_id: messages[i].project_id,
                text: messages[i].text,
            });
        }

        res.json(messageObj);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/:userid/:projectid', async (req, res) => {
    console.log(req.params.projectid)
    try {
    const message = await Message.create({
        user_id: req.params.userid,
        project_id: req.params.projectid,
        text: req.body.text
    });
        
        res.json(message);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;