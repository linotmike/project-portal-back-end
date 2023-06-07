const router = require("express").Router();
const { Profile } = require("../models");

router.get("/", (req, res) => {
    Profile.findAll()
    .then(profileData => {
        if(!profileData) {
            return res.status(404).json({msg: "no such profiles"})
        }

        res.json(profileData);
    }).catch(err => {
        console.log(err);
        res.status(500).json({msg:"womp womp", err})
    });
});

router.get("/:id", (req, res) => {
    Profile.findByPk(req.params.id)
    .then(profileData => {
        if(!profileData) {
            return res.status(404).json({msg: "no such profile"})
        }

        res.json(profileData);
    }).catch(err => {
        console.log(err);
        res.status(500).json({msg:"womp womp", err})
    });
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

router.put("/:id", async (req,res)=>{
    const userId = req.params.id;
    const profileData = req.body;

    try {
        const profile = Profile.findOne({
            where: {
                user_id: userId
            }
        });

        if(!profile) {
            return res.status(404).json({msg: "Profile not found"});
        }

        const updatedProfile = await Profile.update(
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                bio: req.body.bio,
                picture: req.body.picture,
                bestWorks: req.body.bestWorks
            },
            {
                where: {user_id:userId}
            });

        return res.json(updatedProfile);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({msg: "Internal server error", err});
    }
});

module.exports = router;