const router = require("express").Router();
const { User, Profile } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.get("/",(req,res)=>{
    User.findAll().then(users=>{
        res.json(users)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            msg:"womp womp",
            err
        });
    });
});

router.get("/:id", (req, res) => {
    User.findByPk(req.params.id)
    .then(userData => {
        if(!userData) {
            return res.status(404).json({msg: "no such user"})
        }

        res.json(userData);
    }).catch(err => {
        console.log(err);
        res.status(500).json({msg:"womp womp", err})
    });
});

//  login
router.post("/login", async (req, res) => {
    console.log(req.body);
    try {
      const userData = await User.findOne({
        where: { username: req.body.username },
      });
      if (!userData) {
        console.log("no user with this username!");
        res.status(403).json({ msg: "invalid login" });
      } else if (!bcrypt.compareSync(req.body.password, userData.password)) {
            return res.status(401).json({msg:"invalid login"})
        } 
      else {
        const token = jwt.sign({
            username:userData.username,
            userId:userData.id
        },process.env.JWT_SECRET,{
            expiresIn:"2h"
        })
        res.json({
            token,
            user:userData
        })
    }
      
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

//   create new user
  router.post("/",(req,res)=>{
    console.log(req.body)
        User.create({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    }).then(newUser=>{
        const token = jwt.sign({
            username:newUser.username,
            userId:newUser.id
        },process.env.JWT_SECRET,{
            expiresIn:"2h"
        })
        res.json({
            token,
            user:newUser
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            msg:"womp womp",
            err
        });
    });
});

router.get("/verifytoken",(req,res)=>{
    const token = req.headers.authorization?.split(" ")[1];
    try {
        const data = jwt.verify(token,process.env.JWT_SECRET)
        User.findByPk(data.userId).then(foundUser=>{
            res.json(foundUser)
        })
    } catch (err) {
        console.log(err);
        res.status(403).json({msg:"bad token",err})
    }
});

module.exports = router;