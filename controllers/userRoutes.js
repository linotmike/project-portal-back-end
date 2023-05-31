const router = require("express").Router();
const { User, Profile } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
            username:foundUser.username,
            userId:foundUser.id
        },process.env.JWT_SECRET,{
            expiresIn:"2h"
        })
        res.json({
            token,
            user:foundUser
        })
    }
      
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

  router.post("/",(req,res)=>{
    console.log
    User.create({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    }).then(newser=>{
        const token = jwt.sign({
            username:newser.username,
            userId:newser.id
        },process.env.JWT_SECRET,{
            expiresIn:"2h"
        })
        res.json({
            token,
            user:newser
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            msg:"womp womp",
            err
        })
    })
});

router.get("/verifytoken",(req,res)=>{
    const token = req.headers.authorization?.split(" ")[1];
    try {
        const data = jwt.verify(token,process.env.JWT_SECRET)
        User.findByPk(data.userId,{
            include:[Pallet]
        }).then(foundUser=>{
            res.json(foundUser)
        })
    } catch (err) {
        console.log(err);
        res.status(403).json({msg:"bad token",err})
    }
});

module.exports = router;