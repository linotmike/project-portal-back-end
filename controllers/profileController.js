const router = require("express").Router();
const { User, Profile } = require("../models");

router.get("/:id", async (req, res) => {
    console.log(req.params.id)
    try {
        const userData = await Profile.findByPk(req.params.id);

        const user = userData.map((user) => user.get({ plain: true }));

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
      }
});

router.post("/",(req,res)=>{
    try {
        Profile.create({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            bio:req.body.bio,
            picture:req.body.picture,
            bestWorks:req.body.bestWorks,
            user_id:req.body.user_id
        }).then(newProfile=>{
            res.json(newProfile)
        }).catch(err=>{
            console.log(err);
            res.status(500).json({msg:"womp womp",err})
        })
    } catch (err) {
        console.log(err);
        res.status(403).json({msg:"bad token",err})
    }
});

router.put("/", (req,res)=>{
    try {
        Profile.update({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            bio:req.body.bio,
            picture:req.body.picture,
            bestWorks:req.body.bestWorks,
            user_id:req.body.user_id
        }).then(updatedProfile=>{
            res.json(updatedProfile)
        })
    } catch (err) {
        console.log(err);
        res.status(403).json({msg:"bad token",err})
    }
});

module.exports = router;