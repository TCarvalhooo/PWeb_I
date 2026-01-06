const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.redirect("/users/signup")
})

router.get("/signup", (req, res) => {
    res.send("user signup page");
});

router.get("/signin", (req, res) => {
    res.send("signin page")
})

router.get("/:userid", (req, res) => {
    const userid = req.params.userid; 
    res.send("Welcome, "+userid+"!")
})

module.exports = router