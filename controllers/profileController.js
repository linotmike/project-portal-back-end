const router = require("express").Router();
const { User, Profile } = require("../models");

router.get("/", async (req, res) => {
    try {
        const userData = await User.findByPk({
            include: Profile,
        });

        const user = userData.map((user) => user.get({ plain: true }));

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router;